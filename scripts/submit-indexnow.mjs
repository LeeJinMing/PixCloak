const site = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://pixcloak.com"
).replace(/\/$/, "");
const key =
  process.env.INDEXNOW_KEY || process.env.NEXT_PUBLIC_INDEXNOW_KEY || "";
if (!key) {
  console.error("Missing INDEXNOW_KEY env var");
  process.exit(1);
}

const newGuides = [
  "/guides/blur-face-in-photo",
  "/guides/black-out-text-in-image",
  "/guides/blur-number-plate-online",
  "/guides/compress-image-to-100kb",
  "/guides/redact-screenshot-mac",
  "/guides/remove-gps-data-from-photos",
  "/guides/convert-jpg-to-webp-online",
];

async function submitIndexNow(urls) {
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

async function pingSitemaps() {
  const sitemaps = ["/sitemap.xml", "/guides/sitemap.xml"];
  await Promise.all(
    sitemaps.map((p) =>
      fetch(
        `https://www.bing.com/ping?sitemap=${encodeURIComponent(site + p)}`
      ).catch(() => null)
    )
  );
}

async function main() {
  const urls = newGuides.map((p) => `${site}${p}`);
  const res = await submitIndexNow(urls);
  console.log("IndexNow:", res);
  await pingSitemaps();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
