/**
 * Submit GSC priority URLs to IndexNow (Bing + Yandex).
 * Run: node scripts/run-with-local-env.mjs submit-indexnow-core.mjs
 */

const site = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://pixcloak.com"
).replace(/\/$/, "");
const key =
  process.env.INDEXNOW_KEY || process.env.NEXT_PUBLIC_INDEXNOW_KEY || "";

const CORE_PATHS = [
  "/",
  "/compress",
  "/redact",
  "/guides/blur-face-in-photo",
  "/guides/compress-image-to-100kb",
  "/guides/compress-to-200kb",
  "/guides/remove-exif-wechat",
  "/guides/tinypng-alternative-free-no-upload",
  "/guides/license-plate-redaction",
  "/zh",
  "/zh/compress",
  "/zh/redact",
];

const ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

if (!key) {
  console.error("❌ Missing INDEXNOW_KEY");
  process.exit(1);
}

async function submit(endpoint, urls) {
  const host = site.replace(/^https?:\/\//, "");
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `${site}/${key}.txt`,
      urlList: urls,
    }),
  });
  const text = await res.text().catch(() => "");
  return { endpoint, ok: res.ok, status: res.status, text };
}

async function main() {
  const urls = CORE_PATHS.map((p) => `${site}${p}`);
  console.log(`📤 IndexNow core URLs (${urls.length}) → ${site}`);
  for (const endpoint of ENDPOINTS) {
    const r = await submit(endpoint, urls);
    console.log(
      r.ok ? `✅ ${endpoint} ${r.status}` : `❌ ${endpoint} ${r.status} ${r.text}`
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
