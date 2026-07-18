import { runWithConcurrency } from "./batch";
import { canvasToBlob, drawSourceToCanvas, encodeWithinTargetKb } from "./encode";
import { renameByFormat } from "./format";
import { loadOrientedBitmap, getSourceSize } from "./load";
import { computeOutputDimensions } from "./resize";
import type { CompressOptions, OutputFormat } from "./types";
import { DEFAULT_CONCURRENCY } from "./batch";
import { verifyImageBlob } from "./verify";

export type CompressResult =
  | {
      ok: true;
      name: string;
      blob: Blob;
      originalSize: number;
      width: number;
      height: number;
      quality?: number;
      verified: true;
      targetBytes?: number;
    }
  | { ok: false; name: string; error: string; originalSize: number };

export async function compressOneFile(file: File, options: CompressOptions): Promise<CompressResult> {
  const {
    format,
    quality = 0.8,
    targetKb,
    resizeMode = "none",
    resizeA,
    resizeB,
    allowDimensionReduction = true,
    minQuality,
    minDimension,
  } = options;
  try {
    const source = await loadOrientedBitmap(file);
    const { width, height } = getSourceSize(source);
    const { outW, outH } = computeOutputDimensions(width, height, resizeMode, resizeA, resizeB);
    const canvas = drawSourceToCanvas(source, outW, outH, format);
    if (source instanceof ImageBitmap) source.close();

    let blob: Blob;
    let outputWidth = outW;
    let outputHeight = outH;
    let outputQuality: number | undefined = format === "image/png" ? undefined : quality;
    if (typeof targetKb === "number" && targetKb > 0) {
      const encoded = await encodeWithinTargetKb(canvas, format, targetKb, quality, {
        allowDimensionReduction,
        minQuality,
        minDimension,
      });
      blob = encoded.blob;
      outputWidth = encoded.width;
      outputHeight = encoded.height;
      outputQuality = encoded.quality;
    } else {
      blob = await canvasToBlob(canvas, format, format === "image/png" ? undefined : quality);
    }
    const verified = await verifyImageBlob(blob);
    if (typeof targetKb === "number" && targetKb > 0 && blob.size > targetKb * 1024) {
      throw new Error(`Export exceeded the ${targetKb} KB limit`);
    }
    return {
      ok: true,
      name: renameByFormat(file.name, format),
      blob,
      originalSize: file.size,
      width: verified.width || outputWidth,
      height: verified.height || outputHeight,
      quality: outputQuality,
      verified: true,
      targetBytes: typeof targetKb === "number" && targetKb > 0 ? targetKb * 1024 : undefined,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Compression failed";
    return { ok: false, name: file.name, error: msg, originalSize: file.size };
  }
}

export async function compressFiles(
  files: File[],
  options: CompressOptions,
  concurrency = DEFAULT_CONCURRENCY,
  onProgress?: (done: number, total: number) => void
): Promise<CompressResult[]> {
  let done = 0;
  const total = files.length;
  return runWithConcurrency(files, concurrency, async (file) => {
    const result = await compressOneFile(file, options);
    done++;
    onProgress?.(done, total);
    return result;
  });
}

export function formatFromMime(mime: OutputFormat): string {
  if (mime === "image/webp") return "webp";
  if (mime === "image/png") return "png";
  return "jpeg";
}
