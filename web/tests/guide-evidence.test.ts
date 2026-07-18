import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";
import evidenceData from "../lib/guideEvidence.generated.json";
import { launchGuides } from "../lib/launchGuides.ts";
import { metadataIsClean, scanImageMetadata } from "../lib/image/metadata.ts";

type Sample = { src: string; downloadHref: string; width: number; height: number; bytes: number; sha256: string };
type Evidence = { slug: string; result: string; method: string; before: Sample; after: Sample };
const evidence = evidenceData as Evidence[];
const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function publicFile(href: string) {
  return path.join(repoRoot, "public", href.replace(/^\//, "").replaceAll("/", path.sep));
}

function digest(file: string) {
  return createHash("sha256").update(readFileSync(file)).digest("hex");
}

async function metadata(file: string) {
  const bytes = readFileSync(file);
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  return scanImageMetadata(new Blob([buffer]));
}

test("every published guide has one distinct evidence record", () => {
  assert.equal(evidence.length, 16);
  assert.deepEqual(new Set(evidence.map((item) => item.slug)), new Set(launchGuides.map((guide) => guide.slug)));
});

test("guide evidence files, dimensions, byte counts and hashes are reproducible", () => {
  for (const item of evidence) {
    assert.ok(item.result.length > 20, `${item.slug} result is too vague`);
    assert.ok(item.method.length > 20, `${item.slug} method is too vague`);
    assert.notEqual(item.before.sha256, item.after.sha256, `${item.slug} before/after are identical`);
    for (const sample of [item.before, item.after]) {
      const file = publicFile(sample.src);
      const download = publicFile(sample.downloadHref);
      assert.ok(existsSync(file), `${sample.src} missing`);
      assert.ok(existsSync(download), `${sample.downloadHref} missing`);
      assert.equal(statSync(file).size, sample.bytes, `${sample.src} byte count drifted`);
      assert.equal(digest(file), sample.sha256, `${sample.src} hash drifted`);
      const identified = spawnSync("magick", ["identify", "-format", "%w %h", file], { encoding: "utf8" });
      assert.equal(identified.status, 0, `${sample.src} cannot be decoded`);
      assert.equal(identified.stdout.trim(), `${sample.width} ${sample.height}`, `${sample.src} dimensions drifted`);
    }
  }
});

test("published hard-cap samples stay under their advertised byte limits", () => {
  const under100 = evidence.find((item) => item.slug === "compress-image-under-100kb");
  const under200 = evidence.find((item) => item.slug === "compress-image-under-200kb");
  assert.ok(under100 && under100.after.bytes <= 100 * 1024);
  assert.ok(under200 && under200.after.bytes <= 200 * 1024);
});

test("published GPS evidence changes from detected to clean", async () => {
  for (const slug of ["does-wechat-remove-exif-test", "remove-gps-location-photo"]) {
    const item = evidence.find((entry) => entry.slug === slug);
    assert.ok(item);
    const before = await metadata(publicFile(item.before.src));
    const after = await metadata(publicFile(item.after.src));
    assert.equal(before.hasGps, true, `${slug} source lacks GPS evidence`);
    assert.equal(metadataIsClean(after), true, `${slug} output is not clean`);
  }
});

test("dimension-focused evidence actually reduces or trims dimensions", () => {
  const iphone = evidence.find((item) => item.slug === "reduce-image-size-iphone");
  const trim = evidence.find((item) => item.slug === "remove-transparent-padding");
  assert.ok(iphone && iphone.after.width <= 1920 && iphone.after.width < iphone.before.width);
  assert.ok(trim && trim.after.width < trim.before.width && trim.after.height < trim.before.height);
});
