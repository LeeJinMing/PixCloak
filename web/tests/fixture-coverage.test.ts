import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { scanImageMetadata } from "../lib/image/metadata.ts";

const fixtureRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures");
const manifest = JSON.parse(readFileSync(path.join(fixtureRoot, "manifest.json"), "utf8")) as {
  count: number;
  batchGroups: number[][];
  cases: Array<{ path: string; format: string; tags: string[] }>;
};

async function scan(relativePath: string) {
  const bytes = await readFile(path.join(fixtureRoot, relativePath));
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  return scanImageMetadata(new Blob([buffer]));
}

test("fixture corpus contains at least 60 files", () => assert.ok(manifest.count >= 60));

test("fixture manifest corresponds to distinct on-disk files with matching signatures", async () => {
  assert.equal(manifest.count, manifest.cases.length);
  assert.equal(new Set(manifest.cases.map((item) => item.path)).size, manifest.cases.length);
  for (const item of manifest.cases) {
    const result = await scan(item.path);
    assert.equal(result.format, item.format, `${item.path} signature did not match ${item.format}`);
  }
});

test("fixture corpus covers required formats", () => {
  const formats = new Set(manifest.cases.map((item) => item.format));
  for (const format of ["jpeg", "png", "webp", "heic"]) assert.ok(formats.has(format), `${format} missing`);
});

test("fixture corpus covers required edge cases", () => {
  const tags = new Set(manifest.cases.flatMap((item) => item.tags));
  for (const tag of ["transparent", "orientation", "gps", "xmp", "iptc", "large", "corrupt", "spoofed-extension", "filename-edge-case", "batch"]) {
    assert.ok(tags.has(tag), `${tag} missing`);
  }
  assert.ok(manifest.batchGroups.some((group) => group.length > 1));
});

test("JPEG EXIF orientation is detected", async () => {
  const result = await scan("coverage/exif-orientation-6.jpg");
  assert.equal(result.format, "jpeg");
  assert.equal(result.hasExif, true);
});

test("JPEG GPS pointer is detected", async () => {
  const result = await scan("coverage/gps-location.jpg");
  assert.equal(result.hasExif, true);
  assert.equal(result.hasGps, true);
});

test("JPEG XMP and IPTC are detected", async () => {
  assert.equal((await scan("coverage/xmp-document.jpg")).hasXmp, true);
  assert.equal((await scan("coverage/iptc-photoshop.jpg")).hasIptc, true);
});

test("PNG EXIF, XMP and IPTC markers are detected", async () => {
  assert.equal((await scan("coverage/png-exif.png")).hasExif, true);
  assert.equal((await scan("coverage/png-xmp.png")).hasXmp, true);
  assert.equal((await scan("coverage/png-iptc.png")).hasIptc, true);
});

test("WebP EXIF, GPS and XMP chunks are detected", async () => {
  assert.equal((await scan("coverage/webp-exif.webp")).hasExif, true);
  assert.equal((await scan("coverage/webp-gps.webp")).hasGps, true);
  assert.equal((await scan("coverage/webp-xmp.webp")).hasXmp, true);
});

test("HEIC is identified with an explicit inspection limitation", async () => {
  const result = await scan("coverage/sample-iphone.heic");
  assert.equal(result.format, "heic");
  assert.equal(result.supported, false);
  assert.match(result.note || "", /not fully inspected/i);
});

test("random corrupt data is not claimed as supported", async () => {
  const result = await scan("coverage/corrupt-random.png");
  assert.equal(result.format, "unknown");
  assert.equal(result.supported, false);
});
