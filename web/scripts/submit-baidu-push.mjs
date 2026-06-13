/**
 * 百度站长平台 — 主动推送（普通收录）
 *
 * 环境变量（写入 web/.env.local，勿提交仓库）：
 *   BAIDU_PUSH_SITE=www.pixcloak.com   # 须与百度站长平台验证的站点一致（含不含 www）
 *   BAIDU_PUSH_TOKEN=你在站长平台「链接提交」里申请的准入密钥
 *
 * 用法：
 *   node scripts/submit-baidu-push.mjs           # 推送 sitemap 全部 URL
 *   node scripts/submit-baidu-push.mjs --zh      # 仅推送 /zh/ 路径
 *   node scripts/submit-baidu-push.mjs --urls url1 url2 ...
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.join(__dirname, "..");

const apexUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://pixcloak.com"
).replace(/\/$/, "");

const siteRaw =
  process.env.BAIDU_PUSH_SITE ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://pixcloak.com";
/** 百度 API 要求 site 为纯域名，不能带 https:// */
const site = siteRaw.replace(/^https?:\/\//, "").replace(/\/$/, "");
const token = process.env.BAIDU_PUSH_TOKEN || "";

const BATCH_SIZE = Number(process.env.BAIDU_PUSH_BATCH_SIZE || 2000);
const DELAY_MS = Number(process.env.BAIDU_PUSH_DELAY_MS || 1000);
/** sitemap 始终从主站拉取（www 会 301 到 apex，内容相同） */
const SITEMAPS = [`${apexUrl}/sitemap.xml`, `${apexUrl}/guides/sitemap.xml`];
const API = "http://data.zz.baidu.com/urls";

const args = process.argv.slice(2);
const zhOnly = args.includes("--zh");
const urlArgs = args.filter((a) => !a.startsWith("--"));

if (!token) {
  console.error("❌ 缺少 BAIDU_PUSH_TOKEN");
  console.error("   在 web/.env.local 添加：");
  console.error("   BAIDU_PUSH_SITE=www.pixcloak.com  # 与站长平台验证域名一致");
  console.error("   BAIDU_PUSH_TOKEN=你的准入密钥");
  process.exit(1);
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${url} ${res.status}`);
  return await res.text();
}

function parseXmlUrls(xml) {
  const urls = [];
  const re = /<loc>\s*([^<]+)\s*<\/loc>/g;
  let m;
  while ((m = re.exec(xml))) urls.push(m[1].trim());
  return urls;
}

async function getSitemapUrls() {
  const xmls = await Promise.all(SITEMAPS.map((u) => fetchText(u)));
  let urls = Array.from(new Set(xmls.flatMap(parseXmlUrls)));
  if (zhOnly) {
    urls = urls.filter((u) => {
      try {
        return new URL(u).pathname === "/zh" || new URL(u).pathname.startsWith("/zh/");
      } catch {
        return false;
      }
    });
  }
  return urls.map(toPushUrl);
}

/** 推送 URL 的 host 必须与 BAIDU_PUSH_SITE 一致，否则 not_same_site */
function toPushUrl(url) {
  try {
    const u = new URL(url);
    u.protocol = "https:";
    u.host = site;
    return u.href;
  } catch {
    return url;
  }
}

async function pushBatch(urls) {
  const endpoint = `${API}?site=${encodeURIComponent(site)}&token=${encodeURIComponent(token)}`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: urls.join("\n"),
    signal: AbortSignal.timeout(30000),
  });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }
  return { ok: res.ok, status: res.status, data };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  console.log("🚀 百度主动推送");
  console.log(`📍 site: ${site}`);
  console.log(`🔑 token: ${token.slice(0, 4)}****`);
  if (zhOnly) console.log("🌐 范围: 仅 /zh/*");
  console.log("");

  const urls = (
    urlArgs.length > 0 ? urlArgs : await getSitemapUrls()
  ).map(toPushUrl);

  if (!urls.length) {
    console.error("❌ 没有可推送的 URL");
    process.exit(1);
  }

  console.log(`📤 共 ${urls.length} 条 URL，每批最多 ${BATCH_SIZE} 条`);
  console.log("");

  let totalSuccess = 0;
  let lastRemain = null;

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(urls.length / BATCH_SIZE);

    console.log(`📦 批次 ${batchNum}/${totalBatches} (${batch.length} 条)`);

    const { ok, status, data } = await pushBatch(batch);

    if (!ok) {
      console.error(`   ❌ HTTP ${status}`, data);
      process.exit(1);
    }

    if (typeof data.success === "number") totalSuccess += data.success;
    if (typeof data.remain === "number") lastRemain = data.remain;

    console.log(`   ✅ success: ${data.success ?? "?"}, remain: ${data.remain ?? "?"}`);
    if (data.not_same_site?.length) {
      console.log(`   ⚠️  not_same_site (${data.not_same_site.length}):`, data.not_same_site.slice(0, 3));
    }
    if (data.not_valid?.length) {
      console.log(`   ⚠️  not_valid (${data.not_valid.length}):`, data.not_valid.slice(0, 3));
    }

    if (i + BATCH_SIZE < urls.length) {
      await sleep(DELAY_MS);
    }
  }

  console.log("");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`📊 推送完成: ${totalSuccess} 条成功`);
  if (lastRemain !== null) console.log(`   今日剩余配额: ${lastRemain}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main().catch((e) => {
  console.error("❌ 推送失败:", e);
  process.exit(1);
});
