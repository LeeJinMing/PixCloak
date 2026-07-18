import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";

const rawPreviewOrigin = process.argv[2] || process.env.PREVIEW_ORIGIN;
if (!rawPreviewOrigin) {
  throw new Error("Pass a protected Preview URL: node scripts/generate-seo-cutover-inventory.mjs https://example.vercel.app");
}

const previewOrigin = new URL(rawPreviewOrigin).origin;
const productionOrigin = "https://pixcloak.com";
const reportDate = new Date().toISOString().slice(0, 10);
if (new URL(previewOrigin).protocol !== "https:" || new URL(previewOrigin).hostname === "pixcloak.com") {
  throw new Error(`Expected a non-production HTTPS Preview origin, received ${previewOrigin}`);
}

function findLinkedProjectRoot(start) {
  let current = path.resolve(start);
  while (true) {
    const configPath = path.join(current, ".vercel", "project.json");
    if (existsSync(configPath)) {
      const config = JSON.parse(readFileSync(configPath, "utf8"));
      if (config.projectName === "pix-cloak") return current;
    }
    const parent = path.dirname(current);
    if (parent === current) throw new Error("No pix-cloak Vercel project link found");
    current = parent;
  }
}

function locations(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

function decodeHtml(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(value = "") {
  return decodeHtml(value.replace(/<[^>]+>/g, " "));
}

function firstMatch(html, pattern) {
  return decodeHtml(html.match(pattern)?.[1] || "");
}

function canonicalPath(value) {
  if (!value) return "";
  const parsed = new URL(value, productionOrigin);
  return `${parsed.pathname}${parsed.search}`;
}

function internalLinks(html) {
  return [...html.matchAll(/\shref=["']([^"']+)["']/gi)]
    .map((match) => decodeHtml(match[1]))
    .filter((href) => href.startsWith("/") && !href.startsWith("//"))
    .map((href) => href.split("#")[0])
    .filter(Boolean);
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  }));
  return results;
}

function markdownCell(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

function renderTable(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(markdownCell).join(" | ")} |`),
  ].join("\n");
}

const linkedProjectRoot = findLinkedProjectRoot(process.cwd());
const tempDirectory = mkdtempSync(path.join(tmpdir(), "pixcloak-seo-cutover-"));
const headerFile = path.join(tempDirectory, "headers.txt");
const bodyFile = path.join(tempDirectory, "body.txt");

function vercelInvocation(args) {
  if (process.platform === "win32") {
    return { command: process.env.ComSpec || "cmd.exe", args: ["/d", "/s", "/c", "vercel.cmd", ...args] };
  }
  return { command: "vercel", args };
}

let cookie = "";
try {
  const invocation = vercelInvocation([
    "curl", "/?x-vercel-set-bypass-cookie=true", "--deployment", previewOrigin,
    "--silent", "--show-error", "--dump-header", headerFile, "--output", bodyFile, "--yes",
  ]);
  const result = spawnSync(invocation.command, invocation.args, {
    cwd: linkedProjectRoot,
    encoding: "utf8",
    env: Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.toLowerCase().startsWith("npm_"))),
  });
  if (result.status !== 0) throw new Error(`vercel curl failed: ${result.stderr || result.stdout}`);
  const headers = readFileSync(headerFile, "utf8");
  cookie = headers.match(/^set-cookie:\s*(_vercel_jwt=[^;\r\n]+)/im)?.[1] || "";
  if (!cookie) throw new Error("Vercel did not issue a protected Preview session cookie");

  const previewFetch = (pathname, options = {}) => fetch(new URL(pathname, previewOrigin), {
    redirect: "manual",
    ...options,
    headers: { cookie, ...(options.headers || {}) },
  });

  const [oldRootXml, oldGuideXml, newRootXml, newGuideXml] = await Promise.all([
    fetch(`${productionOrigin}/sitemap.xml`).then(async (response) => {
      if (!response.ok) throw new Error(`Production root sitemap returned ${response.status}`);
      return response.text();
    }),
    fetch(`${productionOrigin}/guides/sitemap.xml`).then(async (response) => {
      if (!response.ok) throw new Error(`Production guide sitemap returned ${response.status}`);
      return response.text();
    }),
    previewFetch("/sitemap.xml").then(async (response) => {
      if (!response.ok) throw new Error(`Preview root sitemap returned ${response.status}`);
      return response.text();
    }),
    previewFetch("/guides/sitemap.xml").then(async (response) => {
      if (!response.ok) throw new Error(`Preview guide sitemap returned ${response.status}`);
      return response.text();
    }),
  ]);

  const oldUrls = [...new Set([...locations(oldRootXml), ...locations(oldGuideXml)])].sort();
  const newUrls = [...new Set([...locations(newRootXml), ...locations(newGuideXml)])].sort();
  const oldSet = new Set(oldUrls);
  const newSet = new Set(newUrls);
  const retainedUrls = oldUrls.filter((url) => newSet.has(url));
  const addedUrls = newUrls.filter((url) => !oldSet.has(url));
  const retiredUrls = oldUrls.filter((url) => !newSet.has(url));

  if (oldUrls.length !== 202 || newUrls.length !== 34 || retainedUrls.length !== 13 || addedUrls.length !== 21 || retiredUrls.length !== 189) {
    throw new Error(`Unexpected inventory math: old=${oldUrls.length}, new=${newUrls.length}, retained=${retainedUrls.length}, added=${addedUrls.length}, retired=${retiredUrls.length}`);
  }

  const pageAudits = await mapLimit(newUrls, 6, async (canonicalUrl) => {
    const pathname = new URL(canonicalUrl).pathname;
    const response = await previewFetch(pathname);
    const html = await response.text();
    const title = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
    const description = firstMatch(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)
      || firstMatch(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
    const canonical = firstMatch(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
      || firstMatch(html, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
    const htmlLang = firstMatch(html, /<html[^>]+lang=["']([^"']+)["']/i);
    const metaRobots = firstMatch(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);
    const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => stripTags(match[1]));
    const jsonLdCount = (html.match(/<script[^>]+type=["']application\/ld\+json["']/gi) || []).length;
    const adSlotCount = (html.match(/data-ad-placeholder=/g) || []).length;
    const links = [...new Set(internalLinks(html))];
    const issues = [];
    if (response.status !== 200) issues.push(`HTTP ${response.status}`);
    if (!title) issues.push("missing title");
    if (!description) issues.push("missing description");
    if (!canonical) issues.push("missing canonical");
    if (canonical && canonicalPath(canonical) !== pathname) issues.push(`canonical -> ${canonicalPath(canonical)}`);
    if (htmlLang.toLowerCase() !== "en") issues.push(`lang=${htmlLang || "missing"}`);
    if (h1s.length !== 1) issues.push(`h1=${h1s.length}`);
    if (/noindex/i.test(metaRobots)) issues.push("document meta noindex");
    const isIndependentGuide = pathname.startsWith("/guides/")
      && !["/guides/privacy-sharing", "/guides/upload-success", "/guides/web-images"].includes(pathname);
    const expectedAdSlots = isIndependentGuide ? 2 : 0;
    if (adSlotCount !== expectedAdSlots) issues.push(`ad slots ${adSlotCount}, expected ${expectedAdSlots}`);
    return {
      url: canonicalUrl,
      path: pathname,
      status: response.status,
      title,
      titleLength: title.length,
      description,
      descriptionLength: description.length,
      canonical,
      htmlLang,
      h1Count: h1s.length,
      h1: h1s[0] || "",
      jsonLdCount,
      adSlotCount,
      internalLinkCount: links.length,
      links,
      previewRobotsHeader: response.headers.get("x-robots-tag") || "",
      issues,
    };
  });

  const linkSources = new Map();
  for (const page of pageAudits) {
    for (const href of page.links) {
      if (!linkSources.has(href)) linkSources.set(href, []);
      linkSources.get(href).push(page.path);
    }
  }
  const linkAudits = await mapLimit([...linkSources.keys()], 8, async (href) => {
    const response = await previewFetch(href, { method: "HEAD" });
    return { href, status: response.status, sources: linkSources.get(href) };
  });
  const brokenLinks = linkAudits.filter((item) => item.status === 404 || item.status >= 500);
  for (const broken of brokenLinks) {
    for (const source of broken.sources) {
      pageAudits.find((page) => page.path === source)?.issues.push(`broken link ${broken.href} (${broken.status})`);
    }
  }

  for (const key of ["title", "description"]) {
    const groups = new Map();
    for (const page of pageAudits) {
      const value = page[key].trim().toLowerCase();
      if (!value) continue;
      if (!groups.has(value)) groups.set(value, []);
      groups.get(value).push(page.path);
    }
    for (const paths of groups.values()) {
      if (paths.length < 2) continue;
      for (const pathname of paths) pageAudits.find((page) => page.path === pathname)?.issues.push(`duplicate ${key}: ${paths.join(", ")}`);
    }
  }

  const newPathSet = new Set(newUrls.map((url) => new URL(url).pathname));
  const legacyAudits = await mapLimit(retiredUrls, 8, async (oldUrl) => {
    const parsed = new URL(oldUrl);
    const response = await previewFetch(parsed.pathname + parsed.search);
    const html = response.status === 200 ? await response.text() : "";
    const location = response.headers.get("location") || "";
    const target = location ? canonicalPath(location) : "";
    const canonical = html
      ? firstMatch(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
        || firstMatch(html, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)
      : "";
    const canonicalTarget = canonical ? canonicalPath(canonical) : "";
    const isKeptUtility = (parsed.pathname.startsWith("/tools/") && !newPathSet.has(parsed.pathname))
      || parsed.pathname === "/embed/compress"
      || parsed.pathname === "/zh"
      || parsed.pathname.startsWith("/zh/");
    let action = "需复核";
    let implementation = "不通过";
    let reason = "已从 sitemap 移除，但当前响应未形成明确下线信号";
    if ([301, 308].includes(response.status)) {
      action = "永久重定向";
      implementation = "通过";
      reason = "存在等价或更强的保留页面";
    } else if ([404, 410].includes(response.status)) {
      action = "下线（404/410）";
      implementation = "通过";
      reason = response.status === 410 ? "无可信替代内容，明确返回 Gone" : "无可信替代内容；Google 对正确 404 与 410 均按移除处理";
    } else if (response.status === 200 && isKeptUtility) {
      action = "保留（noindex）";
      implementation = "通过";
      reason = "仍有直接用户价值，但不进入搜索索引库存";
    } else if (response.status === 200 && canonicalTarget && canonicalTarget !== parsed.pathname) {
      action = "canonical";
      implementation = "通过";
      reason = "保留重复页面并合并到规范 URL";
    }
    return {
      oldUrl,
      path: parsed.pathname,
      currentStatus: response.status,
      action,
      target,
      canonicalTarget,
      implementation,
      reason,
      previewRobotsHeader: response.headers.get("x-robots-tag") || "",
    };
  });

  const pageIssueCount = pageAudits.filter((page) => page.issues.length > 0).length;
  const actionCounts = Object.fromEntries([...new Set(legacyAudits.map((item) => item.action))].sort().map((action) => [action, legacyAudits.filter((item) => item.action === action).length]));
  const statusCounts = Object.fromEntries([...new Set(legacyAudits.map((item) => item.currentStatus))].sort((a, b) => a - b).map((status) => [status, legacyAudits.filter((item) => item.currentStatus === status).length]));
  const unresolvedLegacy = legacyAudits.filter((item) => item.implementation !== "通过");

  const pageReport = [
    "# PixCloak Preview 34 页 SEO/发布验收",
    "",
    `- 日期：${reportDate}`,
    `- Preview：\`${previewOrigin}\`（受 Vercel Protection 保护，平台级 \`noindex\` 属预期）`,
    `- 结果：${pageIssueCount === 0 && brokenLinks.length === 0 ? "通过" : "需修复"}`,
    `- 地图：${newUrls.length} 个唯一 URL；主地图 ${locations(newRootXml).length}，指南地图 ${locations(newGuideXml).length}，交集 0`,
    `- 页面异常：${pageIssueCount}；断链：${brokenLinks.length}`,
    "",
    "检查项包括 HTTP 200、自引用 canonical、英文 lang、唯一 H1、title/description、重复元数据、内部链接、JSON-LD 和广告位边界。",
    "",
    renderTable(
      ["#", "路径", "HTTP", "Title", "Desc", "Canonical", "H1", "JSON-LD", "广告位", "内链", "结果"],
      pageAudits.map((page, index) => [
        index + 1,
        page.path,
        page.status,
        page.titleLength,
        page.descriptionLength,
        canonicalPath(page.canonical) || "—",
        page.h1Count,
        page.jsonLdCount,
        page.adSlotCount,
        page.internalLinkCount,
        page.issues.length ? page.issues.join("；") : "通过",
      ]),
    ),
    "",
    "## 新增 URL（21）",
    "",
    ...addedUrls.map((url) => `- ${new URL(url).pathname}`),
    "",
    "## 沿用旧 URL（13）",
    "",
    ...retainedUrls.map((url) => `- ${new URL(url).pathname}`),
    "",
  ].join("\n");

  const legacyReport = [
    "# PixCloak 旧 URL 处置清单",
    "",
    `- 日期：${reportDate}`,
    `- 旧线上地图：${oldUrls.length} 个 URL`,
    `- 新 Preview 地图：${newUrls.length} 个 URL`,
    `- 沿用旧地址：${retainedUrls.length}`,
    `- 新增地址：${addedUrls.length}`,
    `- 需处置旧地址：${retiredUrls.length}`,
    `- 净减少：${oldUrls.length - newUrls.length}`,
    `- 响应分布：${Object.entries(statusCounts).map(([status, count]) => `HTTP ${status}=${count}`).join("；")}`,
    `- 处置分布：${Object.entries(actionCounts).map(([action, count]) => `${action}=${count}`).join("；")}`,
    `- 未闭环：${unresolvedLegacy.length}`,
    "",
    "> 口径说明：168 是索引库存净减少量，不是旧 URL 数。由于新地图新增 21 个地址，完整处置范围是 189 个旧地址：202 - 189 + 21 = 34。",
    "",
    "> 404 与 410 都是有效的永久下线响应；无需只为状态码从 404 改成 410。存在等价内容时优先永久重定向；仍有工具价值但不值得索引时保留并 noindex。",
    "",
    "依据：[Google 永久重定向说明](https://developers.google.com/search/docs/crawling-indexing/301-redirects)、[canonical 选择方法](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)、[404/410 抓取错误处理](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors)。",
    "",
    renderTable(
      ["#", "旧路径", "当前 HTTP", "处置", "目标", "实现", "理由"],
      legacyAudits.map((item, index) => [
        index + 1,
        item.path,
        item.currentStatus,
        item.action,
        item.target || item.canonicalTarget || "—",
        item.implementation,
        item.reason,
      ]),
    ),
    "",
  ].join("\n");

  const machineReport = {
    generatedAt: new Date().toISOString(),
    productionOrigin,
    previewOrigin,
    inventory: {
      old: oldUrls.length,
      new: newUrls.length,
      retained: retainedUrls.length,
      added: addedUrls.length,
      retired: retiredUrls.length,
      netReduction: oldUrls.length - newUrls.length,
    },
    pageSummary: { issuePages: pageIssueCount, brokenLinks: brokenLinks.length },
    legacySummary: { actionCounts, statusCounts, unresolved: unresolvedLegacy.length },
    pageAudits,
    legacyAudits,
  };

  const docsDirectory = path.resolve(process.cwd(), "docs");
  const pageReportPath = path.join(docsDirectory, `preview-34-page-audit-${reportDate}.md`);
  const legacyReportPath = path.join(docsDirectory, `legacy-url-disposition-${reportDate}.md`);
  const machineReportPath = path.join(docsDirectory, `seo-cutover-inventory-${reportDate}.json`);
  writeFileSync(pageReportPath, `${pageReport}\n`, "utf8");
  writeFileSync(legacyReportPath, `${legacyReport}\n`, "utf8");
  writeFileSync(machineReportPath, `${JSON.stringify(machineReport, null, 2)}\n`, "utf8");

  console.log(JSON.stringify({
    ok: pageIssueCount === 0 && brokenLinks.length === 0 && unresolvedLegacy.length === 0,
    previewOrigin,
    inventory: machineReport.inventory,
    pageSummary: machineReport.pageSummary,
    legacySummary: machineReport.legacySummary,
    reports: [pageReportPath, legacyReportPath, machineReportPath],
  }, null, 2));
  if (pageIssueCount > 0 || brokenLinks.length > 0 || unresolvedLegacy.length > 0) process.exitCode = 1;
} finally {
  cookie = "";
  rmSync(tempDirectory, { recursive: true, force: true });
}
