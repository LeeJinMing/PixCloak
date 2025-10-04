import fs from "fs";
import path from "path";

const site = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://pixcloak.com"
).replace(/\/$/, "");
const key =
  process.env.INDEXNOW_KEY || process.env.NEXT_PUBLIC_INDEXNOW_KEY || "";
if (!key) {
  console.error("Missing INDEXNOW_KEY env var");
  process.exit(1);
}

const SITEMAPS = [`${site}/sitemap.xml`, `${site}/guides/sitemap.xml`];
const BATCH_SIZE = Number(process.env.BATCH_SIZE || 100);
const DELAY_MS = Number(process.env.DELAY_MS || 1000);

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

async function getAllUrls() {
  const xmls = await Promise.all(SITEMAPS.map((u) => fetchText(u)));
  const urls = xmls.flatMap(parseXmlUrls);
  const uniq = Array.from(new Set(urls));
  return uniq;
}

async function submitBatch(urls) {
  const host = site.replace(/^https?:\/\//, "");
  const keyLocation = `${site}/${key}.txt`;
  const payload = { host, key, keyLocation, urlList: urls };
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await res.text().catch(() => "");
  return { ok: res.ok, status: res.status, body: text };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const urls = await getAllUrls();
  console.log(`Collected ${urls.length} urls from sitemaps`);
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    const res = await submitBatch(batch);
    console.log(`Batch ${i / BATCH_SIZE + 1}:`, res.ok, res.status);
    if (!res.ok) console.log(res.body);
    await sleep(DELAY_MS);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
