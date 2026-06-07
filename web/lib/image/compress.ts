import { runWithConcurrency } from "./batch";
import { canvasToBlob, drawSourceToCanvas, encodeToTargetKb } from "./encode";
import { renameByFormat } from "./format";
import { loadOrientedBitmap, getSourceSize } from "./load";
import { computeOutputDimensions } from "./resize";
import type { CompressOptions, OutputFormat } from "./types";
import { DEFAULT_CONCURRENCY } from "./batch";

export type CompressResult =
  | { ok: true; name: string; blob: Blob; originalSize: number }
  | { ok: false; name: string; error: string; originalSize: number };

export async function compressOneFile(file: File, options: CompressOptions): Promise<CompressResult> {
  const {
    format,
    quality = 0.8,
    targetKb,
    resizeMode = "none",
    resizeA,
    resizeB,
  } = options;
  try {
    const source = await loadOrientedBitmap(file);
    const { width, height } = getSourceSize(source);
    const { outW, outH } = computeOutputDimensions(width, height, resizeMode, resizeA, resizeB);
    const canvas = drawSourceToCanvas(source, outW, outH, format);
    if (source instanceof ImageBitmap) source.close();

    let blob: Blob;
    if (typeof targetKb === "number" && targetKb > 0 && format !== "image/png") {
      blob = await encodeToTargetKb(canvas, format, targetKb, quality);
    } else {
      blob = await canvasToBlob(canvas, format, format === "image/png" ? undefined : quality);
    }
    return { ok: true, name: renameByFormat(file.name, format), blob, originalSize: file.size };
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
