import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { deflateSync } from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "tests", "fixtures", "png");
const specialOutput = path.join(root, "tests", "fixtures", "coverage");

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const name = Buffer.from(type, "ascii");
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([length, name, data, crc]);
}

function png(width, height, rgba) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const row = Buffer.alloc(1 + width * 4);
  for (let x = 0; x < width; x++) row.set(rgba, 1 + x * 4);
  const pixels = Buffer.concat(Array.from({ length: height }, () => row));
  return Buffer.concat([signature, chunk("IHDR", ihdr), chunk("IDAT", deflateSync(pixels)), chunk("IEND", Buffer.alloc(0))]);
}

function patternPng(width, height) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4); ihdr[8] = 8; ihdr[9] = 6;
  const pixels = Buffer.alloc((width * 4 + 1) * height);
  let seed = 0x12345678;
  for (let y = 0; y < height; y++) {
    const row = y * (width * 4 + 1);
    for (let x = 0; x < width; x++) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      const offset = row + 1 + x * 4;
      pixels[offset] = (x + (seed & 255)) & 255;
      pixels[offset + 1] = (y + ((seed >>> 8) & 255)) & 255;
      pixels[offset + 2] = ((x ^ y) + ((seed >>> 16) & 255)) & 255;
      pixels[offset + 3] = 255;
    }
  }
  return Buffer.concat([signature, chunk("IHDR", ihdr), chunk("IDAT", deflateSync(pixels)), chunk("IEND", Buffer.alloc(0))]);
}

function jpegSegment(marker, payload) {
  const length = Buffer.alloc(2);
  length.writeUInt16BE(payload.length + 2);
  return Buffer.concat([Buffer.from([0xff, marker]), length, payload]);
}

function withJpegSegment(jpeg, marker, payload) {
  if (jpeg[0] !== 0xff || jpeg[1] !== 0xd8) throw new Error("Expected JPEG input");
  return Buffer.concat([jpeg.subarray(0, 2), jpegSegment(marker, payload), jpeg.subarray(2)]);
}

function orientationExif(value) {
  const tiff = Buffer.alloc(26);
  tiff.write("II", 0, "ascii"); tiff.writeUInt16LE(42, 2); tiff.writeUInt32LE(8, 4);
  tiff.writeUInt16LE(1, 8); tiff.writeUInt16LE(0x0112, 10); tiff.writeUInt16LE(3, 12);
  tiff.writeUInt32LE(1, 14); tiff.writeUInt16LE(value, 18); tiff.writeUInt32LE(0, 22);
  return Buffer.concat([Buffer.from("Exif\0\0", "binary"), tiff]);
}

function gpsExif() {
  const tiff = Buffer.alloc(44);
  tiff.write("II", 0, "ascii"); tiff.writeUInt16LE(42, 2); tiff.writeUInt32LE(8, 4);
  tiff.writeUInt16LE(1, 8); tiff.writeUInt16LE(0x8825, 10); tiff.writeUInt16LE(4, 12);
  tiff.writeUInt32LE(1, 14); tiff.writeUInt32LE(26, 18); tiff.writeUInt32LE(0, 22);
  tiff.writeUInt16LE(1, 26); tiff.writeUInt16LE(1, 28); tiff.writeUInt16LE(2, 30);
  tiff.writeUInt32LE(2, 32); tiff.write("N\0", 36, "binary"); tiff.writeUInt32LE(0, 40);
  return Buffer.concat([Buffer.from("Exif\0\0", "binary"), tiff]);
}

function insertPngChunk(input, type, data) {
  const iend = input.lastIndexOf(Buffer.from("IEND", "ascii")) - 4;
  if (iend < 8) throw new Error("PNG IEND not found");
  return Buffer.concat([input.subarray(0, iend), chunk(type, data), input.subarray(iend)]);
}

function addWebpChunk(input, type, data) {
  const pad = data.length % 2 ? Buffer.from([0]) : Buffer.alloc(0);
  const size = Buffer.alloc(4); size.writeUInt32LE(data.length);
  const result = Buffer.concat([input, Buffer.from(type, "ascii"), size, data, pad]);
  result.writeUInt32LE(result.length - 8, 4);
  return result;
}

function convert(source, destination) {
  const result = spawnSync("magick", [source, "-strip", destination], { encoding: "utf8" });
  if (result.status !== 0) throw new Error(result.stderr || `ImageMagick failed for ${destination}`);
}

const dimensions = [[16, 16], [32, 24], [48, 64], [96, 54], [120, 120], [160, 90], [200, 300], [256, 256]];
const colors = [
  [0, 0, 0, 255], [255, 255, 255, 255], [239, 68, 68, 255], [34, 197, 94, 255],
  [37, 99, 235, 255], [124, 58, 237, 255], [245, 158, 11, 255], [15, 23, 42, 128],
];

await rm(path.join(root, "tests", "fixtures"), { recursive: true, force: true });
await mkdir(output, { recursive: true });
await mkdir(specialOutput, { recursive: true });
const cases = [];
for (const [dimensionIndex, [width, height]] of dimensions.entries()) {
  for (const [colorIndex, rgba] of colors.entries()) {
    const id = String(cases.length + 1).padStart(2, "0");
    const name = `fixture-${id}-${width}x${height}.png`;
    await writeFile(path.join(output, name), png(width, height, rgba));
    cases.push({ path: `png/${name}`, format: "png", width, height, tags: [rgba[3] < 255 ? "transparent" : "opaque", "valid"], dimensionIndex, colorIndex });
  }
}

const basePng = path.join(output, "fixture-17-48x64.png");
for (let index = 1; index <= 10; index++) {
  const jpgName = `coverage/valid-${String(index).padStart(2, "0")}.jpg`;
  const webpName = `coverage/valid-${String(index).padStart(2, "0")}.webp`;
  convert(basePng, path.join(root, "tests", "fixtures", jpgName));
  convert(basePng, path.join(root, "tests", "fixtures", webpName));
  cases.push({ path: jpgName, format: "jpeg", tags: ["valid", "batch"] });
  cases.push({ path: webpName, format: "webp", tags: ["valid", "batch"] });
}

const baseJpeg = await readFile(path.join(specialOutput, "valid-01.jpg"));
for (const orientation of [2, 3, 4, 5, 6, 7, 8]) {
  const name = `coverage/exif-orientation-${orientation}.jpg`;
  await writeFile(path.join(root, "tests", "fixtures", name), withJpegSegment(baseJpeg, 0xe1, orientationExif(orientation)));
  cases.push({ path: name, format: "jpeg", tags: ["valid", "exif", "orientation"] });
}

const gpsName = "coverage/gps-location.jpg";
await writeFile(path.join(root, "tests", "fixtures", gpsName), withJpegSegment(baseJpeg, 0xe1, gpsExif()));
cases.push({ path: gpsName, format: "jpeg", tags: ["valid", "exif", "gps"] });

const xmpName = "coverage/xmp-document.jpg";
const xmp = Buffer.from("http://ns.adobe.com/xap/1.0/\0<x:xmpmeta xmlns:x='adobe:ns:meta/'></x:xmpmeta>", "utf8");
await writeFile(path.join(root, "tests", "fixtures", xmpName), withJpegSegment(baseJpeg, 0xe1, xmp));
cases.push({ path: xmpName, format: "jpeg", tags: ["valid", "xmp"] });

const iptcName = "coverage/iptc-photoshop.jpg";
await writeFile(path.join(root, "tests", "fixtures", iptcName), withJpegSegment(baseJpeg, 0xed, Buffer.from("Photoshop 3.0\x008BIM\x04\x04", "binary")));
cases.push({ path: iptcName, format: "jpeg", tags: ["valid", "iptc"] });

const basePngBytes = await readFile(basePng);
for (const [name, type, data, tags] of [
  ["png-exif.png", "eXIf", orientationExif(6).subarray(6), ["valid", "exif"]],
  ["png-xmp.png", "iTXt", Buffer.from("XML:com.adobe.xmp\0\0\0\0\0<x:xmpmeta></x:xmpmeta>"), ["valid", "xmp"]],
  ["png-iptc.png", "tEXt", Buffer.from("Raw profile type iptc\0test"), ["valid", "iptc"]],
]) {
  const fixturePath = `coverage/${name}`;
  await writeFile(path.join(root, "tests", "fixtures", fixturePath), insertPngChunk(basePngBytes, type, data));
  cases.push({ path: fixturePath, format: "png", tags });
}

const baseWebp = await readFile(path.join(specialOutput, "valid-01.webp"));
for (const [name, type, data, tags] of [
  ["webp-exif.webp", "EXIF", orientationExif(6), ["valid", "exif"]],
  ["webp-gps.webp", "EXIF", gpsExif(), ["valid", "exif", "gps"]],
  ["webp-xmp.webp", "XMP ", xmp, ["valid", "xmp"]],
]) {
  const fixturePath = `coverage/${name}`;
  await writeFile(path.join(root, "tests", "fixtures", fixturePath), addWebpChunk(baseWebp, type, data));
  cases.push({ path: fixturePath, format: "webp", tags });
}

const largeName = "coverage/large-8192x8192.png";
await writeFile(path.join(root, "tests", "fixtures", largeName), png(8192, 8192, [30, 64, 175, 255]));
cases.push({ path: largeName, format: "png", width: 8192, height: 8192, tags: ["valid", "large"] });

const noisyPngName = "coverage/noisy-1024x768.png";
await writeFile(path.join(root, "tests", "fixtures", noisyPngName), patternPng(1024, 768));
cases.push({ path: noisyPngName, format: "png", width: 1024, height: 768, tags: ["valid", "high-entropy", "kb-target"] });
const noisyJpegPath = path.join(specialOutput, "noisy-1024x768.jpg");
convert(path.join(root, "tests", "fixtures", noisyPngName), noisyJpegPath);
const noisyJpeg = await readFile(noisyJpegPath);
const gpsLargeName = "coverage/gps-large-1024x768.jpg";
await writeFile(path.join(root, "tests", "fixtures", gpsLargeName), withJpegSegment(noisyJpeg, 0xe1, gpsExif()));
cases.push({ path: gpsLargeName, format: "jpeg", width: 1024, height: 768, tags: ["valid", "high-entropy", "gps", "redaction"] });

for (const [name, bytes, format, tags] of [
  ["corrupt-truncated.jpg", baseJpeg.subarray(0, 40), "jpeg", ["corrupt", "truncated"]],
  ["corrupt-random.png", Buffer.from("not an image"), "unknown", ["corrupt", "random"]],
  ["spoofed-jpeg.png", baseJpeg, "jpeg", ["valid-bytes", "spoofed-extension"]],
]) {
  const fixturePath = `coverage/${name}`;
  await writeFile(path.join(root, "tests", "fixtures", fixturePath), bytes);
  cases.push({ path: fixturePath, format, tags });
}

for (const name of ["中文 文件名.jpg", "special-#%&+ name.jpg", `${"very-long-name-".repeat(12)}.jpg`]) {
  const fixturePath = `coverage/${name}`;
  await writeFile(path.join(root, "tests", "fixtures", fixturePath), baseJpeg);
  cases.push({ path: fixturePath, format: "jpeg", tags: ["valid", "filename-edge-case"] });
}

const heicUrl = "https://github.com/tigranbs/test-heic-images/raw/master/image4.heic";
const heicResponse = await fetch(heicUrl);
if (!heicResponse.ok) throw new Error(`HEIC fixture download failed: ${heicResponse.status}`);
const heicName = "coverage/sample-iphone.heic";
await writeFile(path.join(root, "tests", "fixtures", heicName), Buffer.from(await heicResponse.arrayBuffer()));
cases.push({ path: heicName, format: "heic", tags: ["valid", "heic", "external-fixture"], source: heicUrl });

await writeFile(path.join(root, "tests", "fixtures", "SOURCES.md"), "# Fixture sources\n\n`coverage/sample-iphone.heic` is fetched from the public [tigranbs/test-heic-images](https://github.com/tigranbs/test-heic-images) compatibility corpus. All other fixtures are generated locally by `npm run fixtures:generate`.\n");
await writeFile(path.join(root, "tests", "fixtures", "manifest.json"), `${JSON.stringify({ count: cases.length, batchGroups: [[0, 1, 2], [64, 65, 66, 67, 68]], cases }, null, 2)}\n`);
console.log(`Generated ${cases.length} fixtures covering PNG, JPEG, WebP, HEIC, metadata, large, corrupt, and filename edge cases.`);
