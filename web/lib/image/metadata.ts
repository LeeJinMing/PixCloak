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
}> {
  const source = await loadOrientedBitmap(file);
  try {
    const { width, height } = getSourceSize(source);
    const format = cleanOutputFormat(file);
    const canvas = drawSourceToCanvas(source, width, height, format);
    const blob = await canvasToBlob(canvas, format, format === "image/png" ? undefined : 0.92);
    const decoded = await verifyImageBlob(blob);
    const scan = await scanImageMetadata(blob);
    if (!metadataIsClean(scan)) throw new Error("Metadata verification failed");
    return { blob, scan, width: decoded.width, height: decoded.height };
  } finally {
    if (source instanceof ImageBitmap) source.close();
  }
}
