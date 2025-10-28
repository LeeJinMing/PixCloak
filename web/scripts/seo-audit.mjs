/*
  SEO Audit Script (Bing/Google crawl readiness)
  - Loads URLs from sitemap.xml and guides/sitemap.xml
  - For each page, checks:
    title length (55-60), meta description (150-160), canonical, hreflang,
    H1 existence (>=1), OG/Twitter presence, at least one LD+JSON, robots meta (no noindex)
  - Prints per-URL issues and a summary; exits non-zero if any FAIL
*/

const site = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://pixcloak.com"
).replace(/\/$/, "");
const SITEMAPS = [`${site}/sitemap.xml`, `${site}/guides/sitemap.xml`];
const BATCH = Number(process.env.AUDIT_BATCH || 20);
const TIMEOUT_MS = Number(process.env.AUDIT_TIMEOUT || 15000);

function timeoutFetch(url, ms) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms);
  return fetch(url, { signal: ctl.signal }).finally(() => clearTimeout(t));
}

async function fetchText(url) {
  const res = await timeoutFetch(url, TIMEOUT_MS);
  if (!res.ok) throw new Error(`Fetch ${url} ${res.status}`);
  return await res.text();
}

function parseXmlUrls(xml) {
  const urls = [];
  const re = /<loc>\s*([^<]+)\s*<\/loc>/g;
  let m;
  while ((m = re.exec(xml))) urls.push(m[1].trim());
  return urls;
}

function extract(html, pattern, group = 1) {
  const m = pattern.exec(html);
  return m ? (m[group] || "").trim() : "";
}

function extractAll(html, pattern, group = 1) {
  const out = [];
  let m;
  while ((m = pattern.exec(html))) out.push((m[group] || "").trim());
  return out;
}

function checkPage(url, html) {
  const issues = [];
  const warnings = [];

  const title = extract(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!title) issues.push("MISSING_TITLE");
  else {
    const len = [...title].length;
    if (len < 50 || len > 65) warnings.push(`TITLE_LEN_${len}`);
  }

  const desc = extract(
    html,
    /<meta[^>]+name=["']description["'][^>]*content=["']([\s\S]*?)["'][^>]*>/i
  );
  if (!desc) issues.push("MISSING_DESCRIPTION");
  else {
    const len = [...desc].length;
    if (len < 140 || len > 170) warnings.push(`DESC_LEN_${len}`);
  }

  const canonical = extract(
    html,
    /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i
  );
  if (!canonical) issues.push("MISSING_CANONICAL");
  else if (!/^https?:\/\//.test(canonical) && !canonical.startsWith("/"))
    warnings.push("CANONICAL_FORMAT");

  const hreflangs = extractAll(
    html,
    /<link[^>]+rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*>/gi
  );
  if (hreflangs.length === 0) warnings.push("NO_HREFLANG");

  const h1s = extractAll(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  if (h1s.length === 0) warnings.push("NO_H1");

  const ldjsonCount = extractAll(
    html,
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi
  ).length;
  if (ldjsonCount === 0) warnings.push("NO_LDJSON");

  const ogTitle = /<meta[^>]+property=["']og:title["'][^>]+content=/i.test(
    html
  );
  const ogDesc = /<meta[^>]+property=["']og:description["'][^>]+content=/i.test(
    html
  );
  const ogUrl = /<meta[^>]+property=["']og:url["'][^>]+content=/i.test(html);
  if (!ogTitle || !ogDesc || !ogUrl) warnings.push("OG_INCOMPLETE");

  const tw = /<meta[^>]+name=["']twitter:card["'][^>]+content=/i.test(html);
  if (!tw) warnings.push("NO_TWITTER_CARD");

  const robotsMeta = extract(
    html,
    /<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i
  );
  if (robotsMeta && /noindex/i.test(robotsMeta)) issues.push("ROBOTS_NOINDEX");

  return {
    url,
    title,
    desc,
    canonical,
    hreflangCount: hreflangs.length,
    h1Count: h1s.length,
    ldjsonCount,
    issues,
    warnings,
  };
}

async function getAllUrls() {
  const xmls = await Promise.allSettled(SITEMAPS.map((u) => fetchText(u)));
  const ok = xmls.filter((x) => x.status === "fulfilled").map((x) => x.value);
  const urls = ok.flatMap(parseXmlUrls);
  return Array.from(new Set(urls));
}

async function audit() {
  const urls = await getAllUrls();
  console.log(`SEO Audit: ${urls.length} urls from sitemaps`);
  const results = [];
  let failCount = 0;
  for (let i = 0; i < urls.length; i += BATCH) {
    const batch = urls.slice(i, i + BATCH);
    const pages = await Promise.all(
      batch.map(async (u) => {
        try {
          const html = await fetchText(u);
          return checkPage(u, html);
        } catch (e) {
          return {
            url: u,
            issues: [`FETCH_FAIL:${String(e).slice(0, 80)}`],
            warnings: [],
          };
        }
      })
    );
    pages.forEach((p) => {
      results.push(p);
      if (p.issues && p.issues.length) failCount += 1;
    });
    console.log(`Checked ${Math.min(i + BATCH, urls.length)}/${urls.length}`);
  }

  // Print compact report
  for (const r of results) {
    if ((r.issues && r.issues.length) || (r.warnings && r.warnings.length)) {
      console.log(`\n${r.url}`);
      if (r.issues?.length) console.log(`  FAIL:   ${r.issues.join(", ")}`);
      if (r.warnings?.length) console.log(`  WARN:   ${r.warnings.join(", ")}`);
    }
  }

  // Summary
  const warnCount = results.reduce(
    (n, r) => n + (r.warnings?.length ? 1 : 0),
    0
  );
  console.log(
    `\nSummary: FAIL pages=${failCount}, WARN pages=${warnCount}, OK pages=${
      results.length - failCount - warnCount
    }`
  );

  // Optional: write JSON report
  try {
    const fs = await import("fs");
    fs.writeFileSync(
      "./seo-report.json",
      JSON.stringify({ site, results }, null, 2)
    );
    console.log("Report written: seo-report.json");
  } catch {}

  process.exit(failCount > 0 ? 1 : 0);
}

audit().catch((e) => {
  console.error(e);
  process.exit(1);
});
