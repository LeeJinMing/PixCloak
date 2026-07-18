import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";

const origin = process.env.TEST_ORIGIN || "http://127.0.0.1:3019";
const productionOrigin = "https://pixcloak.com";
const testCookie = process.env.TEST_COOKIE;
const allowPreviewNoindex = process.env.ALLOW_PREVIEW_NOINDEX === "true";

async function request(path, options = {}) {
  return fetch(new URL(path, origin), {
    redirect: "manual",
    ...options,
    headers: { ...(testCookie ? { cookie: testCookie } : {}), ...(options.headers || {}) },
  });
}

function locations(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

function internalLinks(html) {
  return [...html.matchAll(/\shref=["']([^"']+)["']/gi)]
    .map((match) => match[1])
    .filter((href) => href.startsWith("/") && !href.startsWith("//"))
    .map((href) => href.split("#")[0])
    .filter(Boolean);
}

const internalLinkStatusCache = new Map();
function internalLinkStatus(href) {
  if (!internalLinkStatusCache.has(href)) {
    internalLinkStatusCache.set(href, request(href, { method: "HEAD" }).then((response) => response.status));
  }
  return internalLinkStatusCache.get(href);
}

const [rootMapResponse, guideMapResponse] = await Promise.all([
  request("/sitemap.xml"),
  request("/guides/sitemap.xml"),
]);
assert.equal(rootMapResponse.status, 200);
assert.equal(guideMapResponse.status, 200);

const rootUrls = locations(await rootMapResponse.text());
const guideUrls = locations(await guideMapResponse.text());
assert.deepEqual(
  rootUrls.filter((url) => guideUrls.includes(url)),
  [],
  "Root and guide sitemaps must not publish duplicate URLs",
);
const urls = [...new Set([...rootUrls, ...guideUrls])];
assert.ok(urls.length >= 30 && urls.length <= 40, `Expected 30–40 index URLs, found ${urls.length}`);

const publicEntries = await readdir(new URL("../public/", import.meta.url));
const indexNowKeyFiles = publicEntries.filter((name) => /^[a-zA-Z0-9_-]{16,128}\.txt$/.test(name));
assert.equal(indexNowKeyFiles.length, 1, `Expected one published IndexNow key, found ${indexNowKeyFiles.join(", ") || "none"}`);
const indexNowKey = indexNowKeyFiles[0].replace(/\.txt$/, "");
const indexNowKeyResponse = await request(`/${indexNowKeyFiles[0]}`);
assert.equal(indexNowKeyResponse.status, 200, "Published IndexNow key file is unavailable");
assert.equal((await indexNowKeyResponse.text()).trim(), indexNowKey, "Published IndexNow key file content does not match its filename");

const brokenLinks = [];
for (const canonicalUrl of urls) {
  const parsed = new URL(canonicalUrl);
  assert.equal(parsed.origin, productionOrigin);
  const response = await request(parsed.pathname);
  assert.equal(response.status, 200, `${parsed.pathname} returned ${response.status}`);
  if (!allowPreviewNoindex) {
    assert.ok(!/noindex/i.test(response.headers.get("x-robots-tag") || ""), `${parsed.pathname} is noindex`);
  }
  const html = await response.text();
  assert.match(html, /<html[^>]+lang="en"/i, `${parsed.pathname} lacks English lang`);
  const canonicalMatch = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
  assert.ok(canonicalMatch, `${parsed.pathname} lacks canonical`);
  const actualCanonical = new URL(canonicalMatch[1]);
  assert.equal(actualCanonical.origin, parsed.origin, `${parsed.pathname} canonical origin mismatch`);
  assert.equal(actualCanonical.pathname.replace(/\/$/, "") || "/", parsed.pathname.replace(/\/$/, "") || "/", `${parsed.pathname} canonical path mismatch`);
  const alternates = [...html.matchAll(/<link[^>]+rel="alternate"[^>]+hrefLang="([^"]+)"[^>]+href="([^"]+)"/gi)]
    .map((match) => ({ language: match[1], href: match[2] }));
  for (const alternate of alternates) {
    assert.notEqual(alternate.language.toLowerCase(), "zh-cn", `${parsed.pathname} points hreflang to a noindex language copy`);
    const alternateResponse = await request(new URL(alternate.href).pathname);
    assert.equal(alternateResponse.status, 200, `${parsed.pathname} hreflang target failed`);
    if (!allowPreviewNoindex) {
      assert.ok(!/noindex/i.test(alternateResponse.headers.get("x-robots-tag") || ""), `${parsed.pathname} hreflang target is noindex`);
    }
  }
  if (parsed.pathname.startsWith("/guides/") && !["/guides/privacy-sharing", "/guides/upload-success", "/guides/web-images"].includes(parsed.pathname)) {
    assert.deepEqual(new Set(alternates.map((item) => item.language.toLowerCase())), new Set(["x-default", "en"]), `${parsed.pathname} hreflang set is incomplete`);
  }
  await Promise.all(internalLinks(html).map(async (href) => {
    const status = await internalLinkStatus(href);
    if (status === 404 || status >= 500) brokenLinks.push(`${parsed.pathname} -> ${href} (${status})`);
  }));
}
assert.deepEqual([...new Set(brokenLinks)], [], `Broken internal links:\n${[...new Set(brokenLinks)].join("\n")}`);

const redirects = new Map([
  ["/facts", "/about"],
  ["/gallery", "/guides/webp-vs-jpeg-downloadable-samples"],
  ["/scenarios", "/guides/upload-success"],
  ["/batch", "/upload-ready"],
  ["/embed", "/embed/compress"],
  ["/guides/anonymized-sharing", "/guides/privacy-sharing"],
  ["/guides/export-without-metadata", "/safe-share"],
  ["/guides/mobile-upload-limits", "/guides/upload-success"],
  ["/guides/long-tail/notion-cover-1500px", "/tools/resize-image"],
  ["/guides/long-tail/github-readme-images", "/guides/web-images"],
  ["/guides/long-tail/jira-attachments-10mb-id", "/upload-ready?kb=10240"],
  ["/guides/convert-jpg-to-webp-online", "/tools/webp-converter"],
  ["/guides/long-tail/crop-and-pad-ratios", "/tools/crop-templates"],
  ["/guides/compress-image-to-100kb", "/guides/compress-image-under-100kb"],
  ["/guides/remove-gps-data-from-photos", "/guides/remove-gps-location-photo"],
  ["/guides/resize-to-1920", "/upload-ready?longest=1920&preset=1920px"],
  ["/compress-es", "/compress"],
  ["/compress-pt", "/compress"],
  ["/compress-id", "/compress"],
  ["/redact-es", "/redact"],
  ["/redact-pt", "/redact"],
  ["/redact-id", "/redact"],
  ["/guides/es-comprimir-a-200kb", "/upload-ready?kb=200"],
  ["/guides/es-comprimir-a-kb-objetivo", "/upload-ready"],
  ["/guides/es-exportar-sin-metadatos", "/safe-share"],
  ["/guides/es-limites-de-imagenes-plataformas", "/upload-ready"],
  ["/guides/es-redimensionar-lado-mas-largo", "/tools/resize-image"],
  ["/guides/pt-comprimir-para-500kb", "/upload-ready?kb=500"],
  ["/guides/pt-comprimir-para-kb-alvo", "/upload-ready"],
  ["/guides/pt-exportar-sem-metadados", "/safe-share"],
  ["/guides/pt-limites-de-imagens-plataformas", "/upload-ready"],
  ["/guides/pt-redimensionar-lado-mais-longo", "/tools/resize-image"],
  ["/guides/id-kompres-menjadi-1mb", "/upload-ready?kb=1024"],
  ["/guides/id-kompres-ke-kb-target", "/upload-ready"],
  ["/guides/id-ekspor-tanpa-metadata", "/safe-share"],
  ["/guides/id-batas-gambar-platform", "/upload-ready"],
  ["/guides/id-ubah-ukuran-sisi-terpanjang", "/tools/resize-image"],
  ["/guides/compress-to-300kb", "/upload-ready?kb=300"],
  ["/guides/long-tail/resize-avatar", "/tools/resize-image"],
  ["/guides/long-tail/convert-png", "/tools/png-jpg-converter"],
  ["/guides/long-tail", "/guides"],
]);
for (const [from, to] of redirects) {
  const response = await request(from);
  assert.equal(response.status, 301, `${from} should be permanent redirect`);
  assert.equal(new URL(response.headers.get("location"), origin).pathname + new URL(response.headers.get("location"), origin).search, to);
}

for (const path of ["/tools/aspect-pad", "/tools/image-diff", "/zh", "/embed/compress"]) {
  const response = await request(path);
  assert.match(response.headers.get("x-robots-tag") || "", /noindex/i, `${path} must be noindex`);
}

const indexedToolPaths = new Set([
  "/tools/exif-checker",
  "/tools/heic-converter",
  "/tools/resize-image",
  "/tools/png-jpg-converter",
  "/tools/pdf-to-image",
  "/tools/image-to-pdf",
]);
const toolRouteEntries = await readdir(new URL("../app/tools/", import.meta.url), { withFileTypes: true });
const toolPaths = toolRouteEntries
  .filter((entry) => entry.isDirectory())
  .map((entry) => `/tools/${entry.name}`);
const toolBrokenLinks = [];
for (const path of toolPaths) {
  const response = await request(path);
  assert.equal(response.status, 200, `${path} tool route failed`);
  const html = await response.text();
  if (indexedToolPaths.has(path)) {
    assert.ok(urls.includes(`${productionOrigin}${path}`), `${path} core tool is missing from sitemap`);
    if (!allowPreviewNoindex) {
      assert.ok(!/noindex/i.test(response.headers.get("x-robots-tag") || ""), `${path} core tool is noindex`);
    }
  } else {
    assert.ok(!urls.includes(`${productionOrigin}${path}`), `${path} Labs tool leaked into sitemap`);
    assert.match(response.headers.get("x-robots-tag") || "", /noindex/i, `${path} Labs tool must be noindex`);
    assert.equal((html.match(/data-ad-placeholder=/g) || []).length, 0, `${path} Labs tool must not render ad slots`);
  }
  await Promise.all(internalLinks(html).map(async (href) => {
    const status = await internalLinkStatus(href);
    if (status === 404 || status >= 500) toolBrokenLinks.push(`${path} -> ${href} (${status})`);
  }));
}
assert.deepEqual([...new Set(toolBrokenLinks)], [], `Broken tool links:\n${[...new Set(toolBrokenLinks)].join("\n")}`);

const adExpectations = new Map([
  ["/", 0], ["/safe-share", 0], ["/upload-ready", 0], ["/compress", 0], ["/redact", 0], ["/tools/exif-checker", 0],
  ["/tools/heic-converter", 0], ["/tools/resize-image", 0], ["/tools/png-jpg-converter", 0],
  ["/guides/compress-image-under-100kb", 2],
]);
for (const [path, expected] of adExpectations) {
  const html = await (await request(path)).text();
  assert.equal((html.match(/data-ad-placeholder=/g) || []).length, expected, `${path} ad-slot count drifted`);
}
for (const path of ["/privacy", "/terms", "/contact", "/embed/compress", "/tools/aspect-pad", "/not-a-real-page"]) {
  const html = await (await request(path)).text();
  assert.equal((html.match(/data-ad-placeholder=/g) || []).length, 0, `${path} must not render ad slots`);
}

for (const path of ["/research", "/benchmark", "/case-studies", "/testimonials", "/templates", "/press", "/changelog", "/api/changelog"] ) {
  const response = await request(path);
  assert.equal(response.status, 404, `${path} should be removed`);
}

console.log(`Launch audit passed: ${urls.length} unique index URLs, ${toolPaths.length} tool routes classified, no sitemap overlap or broken links, redirects/noindex/removals verified.`);
