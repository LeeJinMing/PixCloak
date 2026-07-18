import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { metadataIsClean, scanImageMetadata, stripImageMetadataBytes } from "../lib/image/metadata.ts";

const fixtureRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures", "coverage");

async function fixture(name: string) {
  const source = await readFile(path.join(fixtureRoot, name));
  return new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
}

async function scan(bytes: Uint8Array, type: string) {
  const copy = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  return scanImageMetadata(new Blob([copy], { type }));
}

function jpegImagePayload(bytes: Uint8Array) {
  for (let index = 2; index + 1 < bytes.length; index++) {
    if (bytes[index] === 0xff && bytes[index + 1] === 0xda) return bytes.subarray(index);
  }
  throw new Error("JPEG scan payload not found");
}

function pngImagePayload(bytes: Uint8Array) {
  const parts: Uint8Array[] = [];
  let offset = 8;
  while (offset + 12 <= bytes.length) {
    const size = new DataView(bytes.buffer, bytes.byteOffset + offset, 4).getUint32(0, false);
    const type = new TextDecoder("latin1").decode(bytes.subarray(offset + 4, offset + 8));
    if (type === "IDAT") parts.push(bytes.subarray(offset + 8, offset + 8 + size));
    offset += 12 + size;
  }
  return Buffer.concat(parts.map((part) => Buffer.from(part)));
}

function webpImagePayload(bytes: Uint8Array) {
  const parts: Uint8Array[] = [];
  let offset = 12;
  while (offset + 8 <= bytes.length) {
    const type = new TextDecoder("latin1").decode(bytes.subarray(offset, offset + 4));
    const size = new DataView(bytes.buffer, bytes.byteOffset + offset + 4, 4).getUint32(0, true);
    if (["VP8 ", "VP8L", "ALPH", "ANMF"].includes(type)) parts.push(bytes.subarray(offset, offset + 8 + size + (size % 2)));
    offset += 8 + size + (size % 2);
  }
  return Buffer.concat(parts.map((part) => Buffer.from(part)));
}

test("lossless JPEG cleanup removes EXIF, GPS, XMP and IPTC without touching scan data", async () => {
  for (const name of ["gps-location.jpg", "xmp-document.jpg", "iptc-photoshop.jpg"]) {
    const before = await fixture(name);
    const after = stripImageMetadataBytes(before, "jpeg");
    assert.ok(after.length < before.length, `${name} did not shrink`);
    assert.equal(metadataIsClean(await scan(after, "image/jpeg")), true, `${name} still contains metadata`);
    assert.deepEqual(jpegImagePayload(after), jpegImagePayload(before), `${name} scan data changed`);
  }
});

test("lossless PNG cleanup removes metadata chunks without touching IDAT pixels", async () => {
  for (const name of ["png-exif.png", "png-xmp.png", "png-iptc.png"]) {
    const before = await fixture(name);
    const after = stripImageMetadataBytes(before, "png");
    assert.ok(after.length < before.length, `${name} did not shrink`);
    assert.equal(metadataIsClean(await scan(after, "image/png")), true, `${name} still contains metadata`);
    assert.deepEqual(pngImagePayload(after), pngImagePayload(before), `${name} compressed pixels changed`);
  }
});

test("lossless WebP cleanup removes EXIF and XMP without touching image chunks", async () => {
  for (const name of ["webp-exif.webp", "webp-gps.webp", "webp-xmp.webp"]) {
    const before = await fixture(name);
    const after = stripImageMetadataBytes(before, "webp");
    assert.ok(after.length < before.length, `${name} did not shrink`);
    assert.equal(metadataIsClean(await scan(after, "image/webp")), true, `${name} still contains metadata`);
    assert.deepEqual(webpImagePayload(after), webpImagePayload(before), `${name} image chunks changed`);
  }
});
