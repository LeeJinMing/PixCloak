import { canvasToBlob, drawSourceToCanvas } from "./encode";
import { getSourceSize, loadOrientedBitmap } from "./load";
import type { OutputFormat } from "./types";
import { verifyImageBlob } from "./verify";

export type MetadataScan = {
  format: "jpeg" | "png" | "webp" | "heic" | "unknown";
  hasExif: boolean;
  hasGps: boolean;
  hasXmp: boolean;
  hasIptc: boolean;
  supported: boolean;
  note?: string;
};

function ascii(bytes: Uint8Array, start = 0, end = bytes.length): string {
  return new TextDecoder("latin1").decode(bytes.subarray(start, Math.min(end, bytes.length)));
}

function tiffHasGps(bytes: Uint8Array, tiffStart: number, tiffLength: number): boolean {
  if (tiffStart < 0 || tiffStart + 8 > bytes.length || tiffLength < 8) return false;
  const view = new DataView(bytes.buffer, bytes.byteOffset + tiffStart, Math.min(tiffLength, bytes.length - tiffStart));
  const order = view.getUint16(0, false);
  const little = order === 0x4949;
  if (!little && order !== 0x4d4d) return false;
  if (view.getUint16(2, little) !== 0x2a) return false;
  const ifdOffset = view.getUint32(4, little);
  if (ifdOffset + 2 > view.byteLength) return false;
  const count = view.getUint16(ifdOffset, little);
  for (let index = 0; index < count; index++) {
    const offset = ifdOffset + 2 + index * 12;
    if (offset + 12 > view.byteLength) break;
    if (view.getUint16(offset, little) === 0x8825) return true;
  }
  return false;
}

function scanJpeg(bytes: Uint8Array): MetadataScan {
  let hasExif = false;
  let hasGps = false;
  let hasXmp = false;
  let hasIptc = false;
  let offset = 2;
  while (offset + 4 <= bytes.length && bytes[offset] === 0xff) {
    const marker = bytes[offset + 1];
    if (marker === 0xda || marker === 0xd9) break;
    const length = (bytes[offset + 2] << 8) | bytes[offset + 3];
    if (length < 2 || offset + 2 + length > bytes.length) break;
    const payloadStart = offset + 4;
    const payloadEnd = offset + 2 + length;
    const header = ascii(bytes, payloadStart, Math.min(payloadStart + 80, payloadEnd));
    if (marker === 0xe1 && header.startsWith("Exif\u0000\u0000")) {
      hasExif = true;
      hasGps = tiffHasGps(bytes, payloadStart + 6, payloadEnd - payloadStart - 6);
    }
    if (marker === 0xe1 && /xmp|http:\/\/ns\.adobe\.com/i.test(header)) hasXmp = true;
    if (marker === 0xed && /Photoshop 3\.0|8BIM/i.test(header)) hasIptc = true;
    offset += 2 + length;
  }
  return { format: "jpeg", hasExif, hasGps, hasXmp, hasIptc, supported: true };
}

function scanPng(bytes: Uint8Array): MetadataScan {
  let hasExif = false;
  let hasXmp = false;
  let hasIptc = false;
  let offset = 8;
  while (offset + 12 <= bytes.length) {
    const length = new DataView(bytes.buffer, bytes.byteOffset + offset, 4).getUint32(0, false);
    const type = ascii(bytes, offset + 4, offset + 8);
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    if (dataEnd + 4 > bytes.length) break;
    if (type === "eXIf") hasExif = true;
    if ((type === "iTXt" || type === "tEXt" || type === "zTXt") && length < 1024 * 1024) {
      const text = ascii(bytes, dataStart, dataEnd);
      if (/XML:com\.adobe\.xmp|xmpmeta|ns\.adobe\.com/i.test(text)) hasXmp = true;
      if (/Raw profile type iptc|IPTC/i.test(text)) hasIptc = true;
    }
    offset = dataEnd + 4;
    if (type === "IEND") break;
  }
  return {
    format: "png",
    hasExif,
    hasGps: false,
    hasXmp,
    hasIptc,
    supported: true,
    note: hasExif ? "PNG EXIF detected; GPS detail is not decoded separately." : undefined,
  };
}

function scanWebp(bytes: Uint8Array): MetadataScan {
  let hasExif = false;
  let hasGps = false;
  let hasXmp = false;
  let offset = 12;
  while (offset + 8 <= bytes.length) {
    const type = ascii(bytes, offset, offset + 4);
    const size = new DataView(bytes.buffer, bytes.byteOffset + offset + 4, 4).getUint32(0, true);
    const dataStart = offset + 8;
    if (dataStart + size > bytes.length) break;
    if (type === "EXIF") {
      hasExif = true;
      const exifPrefix = ascii(bytes, dataStart, Math.min(dataStart + 6, dataStart + size));
      const tiffStart = exifPrefix.startsWith("Exif\u0000\u0000") ? dataStart + 6 : dataStart;
      hasGps = tiffHasGps(bytes, tiffStart, dataStart + size - tiffStart);
    }
    if (type === "XMP ") hasXmp = true;
    offset = dataStart + size + (size % 2);
  }
  return { format: "webp", hasExif, hasGps, hasXmp, hasIptc: false, supported: true };
}

export async function scanImageMetadata(input: Blob): Promise<MetadataScan> {
  const bytes = new Uint8Array(await input.arrayBuffer());
  if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xd8) return scanJpeg(bytes);
  if (bytes.length >= 8 && ascii(bytes, 1, 4) === "PNG") return scanPng(bytes);
  if (bytes.length >= 12 && ascii(bytes, 0, 4) === "RIFF" && ascii(bytes, 8, 12) === "WEBP") return scanWebp(bytes);
  const header = ascii(bytes, 0, Math.min(bytes.length, 64));
  if (/ftyp(?:heic|heix|mif1|msf1)/i.test(header)) {
    return {
      format: "heic",
      hasExif: false,
      hasGps: false,
      hasXmp: false,
      hasIptc: false,
      supported: false,
      note: "HEIC can be converted and cleaned, but embedded metadata is not fully inspected in this browser build.",
    };
  }
  return {
    format: "unknown",
    hasExif: false,
    hasGps: false,
    hasXmp: false,
    hasIptc: false,
    supported: false,
    note: "Metadata inspection is available for JPEG, PNG, and WebP.",
  };
}

export function metadataIsClean(scan: MetadataScan): boolean {
  return !scan.hasExif && !scan.hasGps && !scan.hasXmp && !scan.hasIptc;
}

export type MetadataCleanupMethod = "lossless" | "reencoded";

function concatBytes(parts: Uint8Array[]): Uint8Array {
  const length = parts.reduce((sum, part) => sum + part.length, 0);
  const output = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) {
    output.set(part, offset);
    offset += part.length;
  }
  return output;
}

function jpegExifOrientation(bytes: Uint8Array): number {
  let offset = 2;
  while (offset + 4 <= bytes.length && bytes[offset] === 0xff) {
    const marker = bytes[offset + 1];
    if (marker === 0xda || marker === 0xd9) break;
    const length = (bytes[offset + 2] << 8) | bytes[offset + 3];
    if (length < 2 || offset + 2 + length > bytes.length) break;
    const payloadStart = offset + 4;
    const payloadEnd = offset + 2 + length;
    if (marker === 0xe1 && ascii(bytes, payloadStart, Math.min(payloadStart + 6, payloadEnd)) === "Exif\u0000\u0000") {
      const tiffStart = payloadStart + 6;
      if (tiffStart + 8 > payloadEnd) return 1;
      const view = new DataView(bytes.buffer, bytes.byteOffset + tiffStart, payloadEnd - tiffStart);
      const order = view.getUint16(0, false);
      const little = order === 0x4949;
      if (!little && order !== 0x4d4d) return 1;
      const ifdOffset = view.getUint32(4, little);
      if (ifdOffset + 2 > view.byteLength) return 1;
      const count = view.getUint16(ifdOffset, little);
      for (let index = 0; index < count; index++) {
        const entry = ifdOffset + 2 + index * 12;
        if (entry + 12 > view.byteLength) break;
        if (view.getUint16(entry, little) === 0x0112) return view.getUint16(entry + 8, little) || 1;
      }
      return 1;
    }
    offset += 2 + length;
  }
  return 1;
}

function stripJpegMetadata(bytes: Uint8Array): Uint8Array {
  const parts: Uint8Array[] = [bytes.subarray(0, 2)];
  let offset = 2;
  while (offset + 4 <= bytes.length && bytes[offset] === 0xff) {
    const marker = bytes[offset + 1];
    if (marker === 0xda || marker === 0xd9) {
      parts.push(bytes.subarray(offset));
      return concatBytes(parts);
    }
    const length = (bytes[offset + 2] << 8) | bytes[offset + 3];
    if (length < 2 || offset + 2 + length > bytes.length) break;
    const segmentEnd = offset + 2 + length;
    const payloadStart = offset + 4;
    const header = ascii(bytes, payloadStart, Math.min(payloadStart + 96, segmentEnd));
    const isPrivateSegment =
      (marker === 0xe1 && (header.startsWith("Exif\u0000\u0000") || /xmp|ns\.adobe\.com/i.test(header))) ||
      (marker === 0xed && /Photoshop 3\.0|8BIM|IPTC/i.test(header));
    if (!isPrivateSegment) parts.push(bytes.subarray(offset, segmentEnd));
    offset = segmentEnd;
  }
  if (offset < bytes.length) parts.push(bytes.subarray(offset));
  return concatBytes(parts);
}

function stripPngMetadata(bytes: Uint8Array): Uint8Array {
  const parts: Uint8Array[] = [bytes.subarray(0, 8)];
  const removable = new Set(["eXIf", "iTXt", "tEXt", "zTXt", "tIME"]);
  let offset = 8;
  while (offset + 12 <= bytes.length) {
    const length = new DataView(bytes.buffer, bytes.byteOffset + offset, 4).getUint32(0, false);
    const type = ascii(bytes, offset + 4, offset + 8);
    const chunkEnd = offset + 12 + length;
    if (chunkEnd > bytes.length) throw new Error("Invalid PNG chunk length");
    if (!removable.has(type)) parts.push(bytes.subarray(offset, chunkEnd));
    offset = chunkEnd;
    if (type === "IEND") break;
  }
  return concatBytes(parts);
}

function stripWebpMetadata(bytes: Uint8Array): Uint8Array {
  const parts: Uint8Array[] = [bytes.subarray(0, 12)];
  let offset = 12;
  while (offset + 8 <= bytes.length) {
    const type = ascii(bytes, offset, offset + 4);
    const size = new DataView(bytes.buffer, bytes.byteOffset + offset + 4, 4).getUint32(0, true);
    const chunkEnd = offset + 8 + size + (size % 2);
    if (chunkEnd > bytes.length) throw new Error("Invalid WebP chunk length");
    if (type !== "EXIF" && type !== "XMP ") {
      const chunk = bytes.slice(offset, chunkEnd);
      if (type === "VP8X" && size >= 1) chunk[8] &= ~0x0c;
      parts.push(chunk);
    }
    offset = chunkEnd;
  }
  const output = concatBytes(parts);
  new DataView(output.buffer).setUint32(4, output.length - 8, true);
  return output;
}

export function stripImageMetadataBytes(bytes: Uint8Array, format: "jpeg" | "png" | "webp"): Uint8Array {
  if (format === "jpeg") return stripJpegMetadata(bytes);
  if (format === "png") return stripPngMetadata(bytes);
  return stripWebpMetadata(bytes);
}

function cleanOutputFormat(file: File): OutputFormat {
  if (file.type === "image/png") return "image/png";
  if (file.type === "image/webp") return "image/webp";
  return "image/jpeg";
}

export async function stripAndVerifyMetadata(file: File): Promise<{
  blob: Blob;
  scan: MetadataScan;
  width: number;
  height: number;
  method: MetadataCleanupMethod;
}> {
  const originalBytes = new Uint8Array(await file.arrayBuffer());
  const originalScan = await scanImageMetadata(file);
  if (!originalScan.supported) throw new Error(originalScan.note || "Unsupported image format");

  const canStripLosslessly = originalScan.format !== "jpeg" || jpegExifOrientation(originalBytes) === 1;
  if (canStripLosslessly) {
    const cleanBytes = stripImageMetadataBytes(originalBytes, originalScan.format as "jpeg" | "png" | "webp");
    const cleanBuffer = new ArrayBuffer(cleanBytes.byteLength);
    new Uint8Array(cleanBuffer).set(cleanBytes);
    const blob = new Blob([cleanBuffer], { type: file.type || `image/${originalScan.format}` });
    const decoded = await verifyImageBlob(blob);
    const scan = await scanImageMetadata(blob);
    if (!metadataIsClean(scan)) throw new Error("Metadata verification failed");
    return { blob, scan, width: decoded.width, height: decoded.height, method: "lossless" };
  }

  const source = await loadOrientedBitmap(file);
  try {
    const { width, height } = getSourceSize(source);
    const format = cleanOutputFormat(file);
    const canvas = drawSourceToCanvas(source, width, height, format);
    const blob = await canvasToBlob(canvas, format, format === "image/png" ? undefined : 0.92);
    const decoded = await verifyImageBlob(blob);
    const scan = await scanImageMetadata(blob);
    if (!metadataIsClean(scan)) throw new Error("Metadata verification failed");
    return { blob, scan, width: decoded.width, height: decoded.height, method: "reencoded" };
  } finally {
    if (source instanceof ImageBitmap) source.close();
  }
}
