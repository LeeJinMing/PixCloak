import type { CompressOptions } from "./types";
import { DEFAULT_CONCURRENCY } from "./batch";
import { drawSourceToCanvas } from "./encode";
import { loadOrientedBitmap, getSourceSize } from "./load";
import { computeOutputDimensions } from "./resize";
import { compressOneFile, type CompressResult } from "./compress";
import { verifyImageBlob } from "./verify";

let worker: Worker | null = null;
let nextId = 0;
const pending = new Map<number, { resolve: (b: Blob) => void; reject: (e: Error) => void }>();

function getWorker(): Worker | null {
  if (typeof window === "undefined" || typeof Worker === "undefined") return null;
  if (worker) return worker;
  try {
    worker = new Worker(new URL("./compress.worker.ts", import.meta.url));
    worker.onmessage = (e: MessageEvent) => {
      const data = e.data as { id: number; ok: boolean; buffer?: ArrayBuffer; mime?: string; error?: string };
      const p = pending.get(data.id);
      if (!p) return;
      pending.delete(data.id);
      if (data.ok && data.buffer && data.mime) {
        p.resolve(new Blob([data.buffer], { type: data.mime }));
      } else {
        p.reject(new Error(data.error ?? "Worker failed"));
      }
    };
    worker.onerror = () => {
      worker = null;
    };
    return worker;
  } catch {
    return null;
  }
}

function encodeInWorker(
  bitmap: ImageBitmap,
  format: CompressOptions["format"],
  quality?: number,
  targetKb?: number
): Promise<Blob> {
  const w = getWorker();
  if (!w) return Promise.reject(new Error("Worker unavailable"));
  const id = ++nextId;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    w.postMessage({ id, bitmap, format, quality, targetKb }, [bitmap]);
  });
}

/** Compress using Web Worker when available; falls back to main thread. */
export async function compressOneFileWithWorker(
  file: File,
  options: CompressOptions
): Promise<Awaited<ReturnType<typeof compressOneFile>>> {
  // Hard byte caps can require iterative dimension reduction; keep that path in
  // the shared main-thread encoder until the worker exposes the same contract.
  if (typeof options.targetKb === "number" && options.targetKb > 0) {
    return compressOneFile(file, options);
  }
  const w = getWorker();
  if (!w) return compressOneFile(file, options);

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

    let bitmap: ImageBitmap;
    try {
      bitmap = await createImageBitmap(canvas);
    } finally {
      if (source instanceof ImageBitmap) source.close();
    }

    const blob = await encodeInWorker(bitmap, format, quality, targetKb);
    const verified = await verifyImageBlob(blob);
    const { renameByFormat } = await import("./format");
    return {
      ok: true,
      name: renameByFormat(file.name, format),
      blob,
      originalSize: file.size,
      width: verified.width || outW,
      height: verified.height || outH,
      quality: format === "image/png" ? undefined : quality,
      verified: true,
    };
  } catch {
    return compressOneFile(file, options);
  }
}

export async function compressFilesWithWorker(
  files: File[],
  options: CompressOptions,
  concurrency = DEFAULT_CONCURRENCY,
  onProgress?: (done: number, total: number) => void,
  signal?: AbortSignal
): Promise<CompressResult[]> {
  let done = 0;
  const total = files.length;
  const outputs: CompressResult[] = new Array(files.length);
  let nextIndex = 0;
  async function runner() {
    while (true) {
      const index = nextIndex++;
      if (index >= files.length) return;
      const file = files[index];
      if (signal?.aborted) {
        outputs[index] = { ok: false, name: file.name, error: "Cancelled", originalSize: file.size };
      } else {
        outputs[index] = await compressOneFileWithWorker(file, options);
      }
      done++;
      onProgress?.(done, total);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, files.length) }, () => runner()));
  return outputs;
}
