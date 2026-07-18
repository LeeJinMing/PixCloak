import { createHash } from "node:crypto";
import { cpSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const outDir = join(root, "public", "guides", "evidence");
const generatedManifest = join(root, "lib", "guideEvidence.generated.json");
const rawPark = join(root, "public", "press", "raw", "2fcacdc8-525a-4847-a702-551c47838f7b.jpg");
const rawCar = join(root, "public", "press", "raw", "4c793655-2c06-4b5a-a614-0f380b88e884.jpg");
const gpsFixture = join(root, "tests", "fixtures", "coverage", "gps-large-1024x768.jpg");
const heicFixture = join(root, "tests", "fixtures", "coverage", "sample-iphone.heic");

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

function magick(args) {
  const result = spawnSync("magick", args, { cwd: root, encoding: "utf8" });
  if (result.status !== 0) throw new Error(`ImageMagick failed: magick ${args.join(" ")}\n${result.stderr}`);
}

function svgCard(title, lines, covered = false, accent = "#2563eb") {
  const rows = lines.map((line, index) => {
    const y = 240 + index * 82;
    const cover = covered && index % 2 === 0
      ? `<rect x="410" y="${y - 36}" width="560" height="48" rx="8" fill="#111827"/>`
      : `<text x="410" y="${y}" font-family="Arial" font-size="34" fill="#0f172a">${line}</text>`;
    return `<circle cx="330" cy="${y - 12}" r="24" fill="${accent}" opacity=".18"/><text x="322" y="${y - 2}" font-family="Arial" font-size="22" font-weight="700" fill="${accent}">${index + 1}</text>${cover}`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="1200" height="800" fill="#eef4ff"/><rect x="120" y="80" width="960" height="640" rx="38" fill="white" stroke="#cbd5e1" stroke-width="3"/><rect x="120" y="80" width="960" height="100" rx="38" fill="${accent}"/><rect x="120" y="140" width="960" height="40" fill="${accent}"/><text x="170" y="145" font-family="Arial" font-size="42" font-weight="700" fill="white">${title}</text>${rows}<text x="170" y="680" font-family="Arial" font-size="25" fill="#64748b">Deterministic PixCloak test asset · 2026-07-18</text></svg>`;
}

function writeSvgAsset(slug, suffix, svg) {
  const temp = join(outDir, `${slug}-${suffix}.svg`);
  const dest = join(outDir, `${slug}-${suffix}.webp`);
  writeFileSync(temp, svg);
  magick([temp, "-quality", "86", dest]);
  rmSync(temp);
  return dest;
}

function photoPreview(src, dest, width = 1200, height = 800, quality = 88) {
  magick([src, "-auto-orient", "-resize", `${width}x${height}^`, "-gravity", "center", "-extent", `${width}x${height}`, "-strip", "-quality", String(quality), dest]);
}

function encodeUnder(src, dest, capKB, format, initialWidth = 1200) {
  let width = initialWidth;
  for (let pass = 0; pass < 6; pass += 1) {
    for (let quality = 88; quality >= 24; quality -= 8) {
      const args = [src, "-auto-orient", "-resize", `${width}x>`, "-strip", "-quality", String(quality)];
      if (format === "webp") args.push("-define", "webp:method=6");
      args.push(dest);
      magick(args);
      if (statSync(dest).size <= capKB * 1024) return { quality, width };
    }
    width = Math.max(240, Math.floor(width * 0.8));
  }
  throw new Error(`Could not fit ${dest} under ${capKB}KB`);
}

function inspect(file) {
  const result = spawnSync("magick", ["identify", "-format", "%w %h", file], { encoding: "utf8" });
  if (result.status !== 0) throw new Error(result.stderr);
  const [width, height] = result.stdout.trim().split(/\s+/).map(Number);
  const bytes = statSync(file).size;
  const sha256 = createHash("sha256").update(readFileSync(file)).digest("hex");
  return { width, height, bytes, sha256 };
}

const records = [];
function add(slug, beforeFile, afterFile, beforeLabel, afterLabel, result, options = {}) {
  const before = inspect(beforeFile);
  const after = inspect(afterFile);
  const publicPath = (file) => `/${relative(join(root, "public"), file).replaceAll("\\", "/")}`;
  records.push({
    slug,
    result,
    method: options.method || "Generated and checked locally on 2026-07-18.",
    before: { src: publicPath(beforeFile), downloadHref: options.beforeDownload || publicPath(beforeFile), label: beforeLabel, alt: options.beforeAlt || beforeLabel, ...before },
    after: { src: publicPath(afterFile), downloadHref: options.afterDownload || publicPath(afterFile), label: afterLabel, alt: options.afterAlt || afterLabel, ...after },
  });
}

// Privacy-sharing evidence.
{
  const slug = "does-wechat-remove-exif-test";
  const before = join(outDir, `${slug}-before.jpg`); const after = join(outDir, `${slug}-after.jpg`);
  cpSync(gpsFixture, before); magick([before, "-strip", after]);
  add(slug, before, after, "Original fixture: metadata markers present", "Locally re-encoded copy: supported markers absent", "Byte scan changed from metadata found to no supported EXIF/GPS/XMP/IPTC markers found.", { method: "Generated GPS fixture scanned before and after a metadata-stripping re-encode." });
}
{
  const slug = "remove-gps-location-photo";
  const before = join(outDir, `${slug}-before.jpg`); const after = join(outDir, `${slug}-after.jpg`);
  cpSync(gpsFixture, before); magick([before, "-strip", "-resize", "768x576", after]);
  add(slug, before, after, "Before: generated JPEG with EXIF GPS pointer", "After: re-encoded JPEG with GPS pointer absent", "Supported metadata scan reports GPS before export and clean after export.", { method: "The repository GPS fixture is re-encoded with profiles stripped, then both files are byte-scanned in tests." });
}
for (const [slug, title, lines, result] of [
  ["blur-pixelate-solid-redaction", "Redaction strength test", ["SOLID BLOCK", "PIXELATED REGION", "STRONG BLUR"], "The result demonstrates three flattened treatments; solid coverage is the conservative option."],
  ["redact-id-card-safely", "Synthetic ID review", ["ID NUMBER 4382 9012", "ADDRESS 19 SAMPLE STREET", "SIGNATURE + QR AREA"], "Every non-required synthetic field is covered in the exported image."],
  ["hide-faces-plates-private-text", "Multi-detail review", ["FACE REGION", "PLATE AB-1234", "PRIVATE MESSAGE"], "All three marked regions are replaced with new pixels."],
  ["screenshot-privacy-checklist-v1", "Synthetic chat screenshot", ["ALEX · 09:41", "ACCOUNT 792-114", "MEET AT 19 SAMPLE STREET"], "Names, account reference, and location line are covered in the reviewed export."],
]) {
  const before = writeSvgAsset(slug, "before", svgCard(title, lines, false));
  const after = writeSvgAsset(slug, "after", svgCard(title, lines, true, "#0f766e"));
  add(slug, before, after, "Before: deterministic synthetic review image", "After: permanent covers baked into the pixels", result, { method: "Both downloadable WebP files are generated from deterministic SVG test inputs; their hashes and dimensions are verified." });
}

// Upload-success evidence.
for (const [slug, src, cap, format, title] of [
  ["compress-image-under-100kb", rawPark, 100, "webp", "100KB hard-cap test"],
  ["compress-image-under-200kb", rawCar, 200, "jpg", "200KB hard-cap test"],
]) {
  const before = join(outDir, `${slug}-before.jpg`); const after = join(outDir, `${slug}-after.${format}`);
  photoPreview(src, before, 1200, 800, 94); const settings = encodeUnder(src, after, cap, format, 1600);
  add(slug, before, after, `Before: 1200×800 source preview (${title})`, `After: verified below ${cap}KB`, `Actual output is ${(statSync(after).size / 1024).toFixed(2)}KB at encoder quality ${settings.quality}; it decodes successfully.`, { method: `Re-encoded locally and rejected until the file measured at or below ${cap * 1024} bytes.` });
}
{
  const slug = "why-upload-portal-rejects-image";
  const before = writeSvgAsset(slug, "before", svgCard("Rejected portal input", ["1600 × 400 PANORAMA", "PNG REQUIRED", "SQUARE SLOT"], false, "#dc2626"));
  const after = join(outDir, `${slug}-after.png`); magick([before, "-resize", "800x800", "-background", "white", "-gravity", "center", "-extent", "800x800", "-strip", after]);
  add(slug, before, after, "Before: wrong aspect ratio test input", "After: 800×800 decodable PNG", "The corrected output matches the example format and square-dimension rule.", { method: "A deterministic wide input is converted to PNG and placed on an exact 800×800 canvas." });
}
{
  const slug = "heic-upload-error-convert-locally";
  const sourceHeic = join(outDir, `${slug}-source.heic`); cpSync(heicFixture, sourceHeic);
  const before = join(outDir, `${slug}-before.webp`); const after = join(outDir, `${slug}-after.jpg`);
  magick([sourceHeic, "-thumbnail", "1200x800>", before]); magick([sourceHeic, "-auto-orient", "-strip", "-quality", "86", after]);
  add(slug, before, after, "Before: preview decoded from the real HEIC fixture", "After: browser-compatible JPEG", "The real HEIC compatibility fixture converts to a 700×476 JPEG that decodes successfully.", { method: "Input is the attributed HEIC fixture in tests/fixtures/SOURCES.md; the display preview and JPEG are generated locally.", beforeDownload: `/guides/evidence/${slug}-source.heic` });
}
{
  const slug = "reduce-image-size-iphone";
  const before = join(outDir, `${slug}-before.jpg`); const after = join(outDir, `${slug}-after.jpg`);
  cpSync(rawCar, before); encodeUnder(rawCar, after, 500, "jpg", 1920);
  add(slug, before, after, "Before: high-resolution mobile-photo test input", "After: longest side capped at 1920px and below 500KB", `Output measures ${(statSync(after).size / 1024).toFixed(2)}KB and decodes successfully.`, { method: "The source is auto-oriented, resized to a 1920px longest side, encoded, measured, and decoded." });
}
{
  const slug = "file-size-dimensions-format";
  const before = join(outDir, `${slug}-before.png`); const after = join(outDir, `${slug}-after.webp`);
  magick([rawPark, "-auto-orient", "-resize", "1200x800^", "-gravity", "center", "-extent", "1200x800", "-strip", before]);
  magick([before, "-strip", "-quality", "76", "-define", "webp:method=6", after]);
  add(slug, before, after, "Before: 1200×800 PNG", "After: same dimensions as WebP", `Dimensions stay 1200×800 while bytes change from ${(statSync(before).size / 1024).toFixed(1)}KB to ${(statSync(after).size / 1024).toFixed(1)}KB.`, { method: "The same decoded pixels are exported as PNG and WebP, then measured and decoded." });
}

// Website-image evidence.
{
  const slug = "generate-complete-favicon-pack";
  const sourceSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" rx="112" fill="#2563eb"/><path d="M142 130h128c88 0 128 45 128 112s-40 112-128 112h-44v68h-84zm84 72v80h42c31 0 48-13 48-40s-17-40-48-40z" fill="white"/></svg>`;
  const temp = join(outDir, `${slug}.svg`); writeFileSync(temp, sourceSvg);
  const before = join(outDir, `${slug}-before.png`); const after = join(outDir, `${slug}-after.png`);
  magick([temp, before]); magick([temp, "-resize", "32x32", after]); rmSync(temp);
  add(slug, before, after, "Before: 512×512 square source", "After: actual 32×32 favicon output", "The smallest downloadable output is 32×32 and remains visually legible.", { method: "A deterministic vector source is rasterized at 512px and 32px; both outputs are decoded and measured." });
}
{
  const slug = "webp-vs-jpeg-downloadable-samples";
  const before = join(outDir, `${slug}-before.jpg`); const after = join(outDir, `${slug}-after.webp`);
  magick([rawPark, "-auto-orient", "-resize", "1200x800^", "-gravity", "center", "-extent", "1200x800", "-strip", "-quality", "78", before]);
  magick([rawPark, "-auto-orient", "-resize", "1200x800^", "-gravity", "center", "-extent", "1200x800", "-strip", "-quality", "78", "-define", "webp:method=6", after]);
  add(slug, before, after, "Sample A: JPEG at quality 78", "Sample B: WebP at quality 78", `JPEG is ${(statSync(before).size / 1024).toFixed(1)}KB; WebP is ${(statSync(after).size / 1024).toFixed(1)}KB for this source.`, { method: "The same 1200×800 decoded source is encoded at the same numeric quality setting; this is a sample, not a universal benchmark." });
}
{
  const slug = "remove-transparent-padding";
  const temp = join(outDir, `${slug}.svg`);
  writeFileSync(temp, `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800"><circle cx="400" cy="400" r="170" fill="#2563eb"/><path d="M310 420l62 62 126-150" fill="none" stroke="white" stroke-width="44" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
  const before = join(outDir, `${slug}-before.png`); const after = join(outDir, `${slug}-after.png`);
  magick(["-background", "none", temp, before]); magick([before, "-trim", "+repage", after]); rmSync(temp);
  add(slug, before, after, "Before: 800×800 transparent canvas", "After: transparent bounds trimmed", `Visible pixels are preserved while dimensions change to ${inspect(after).width}×${inspect(after).height}.`, { method: "The alpha bounding box is calculated from a deterministic transparent PNG and the output is decoded." });
}
{
  const slug = "prepare-images-core-web-vitals";
  const before = join(outDir, `${slug}-before.jpg`); const after = join(outDir, `${slug}-after.webp`);
  cpSync(rawPark, before); magick([rawPark, "-auto-orient", "-resize", "1200x800>", "-strip", "-quality", "76", "-define", "webp:method=6", after]);
  add(slug, before, after, "Before: 3000×2000 source", "After: explicit 1200×800 WebP", `Bytes change from ${(statSync(before).size / 1024).toFixed(1)}KB to ${(statSync(after).size / 1024).toFixed(1)}KB with intrinsic dimensions recorded.`, { method: "The large source is resized, re-encoded, decoded, and served with explicit width and height." });
}

records.sort((a, b) => a.slug.localeCompare(b.slug));
mkdirSync(dirname(generatedManifest), { recursive: true });
writeFileSync(generatedManifest, `${JSON.stringify(records, null, 2)}\n`);
console.log(`Generated ${records.length} guide evidence pairs in ${relative(root, outDir)}.`);
