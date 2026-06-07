/// <reference lib="webworker" />

type OutputFormat = "image/jpeg" | "image/webp" | "image/png";

type WorkerRequest = {
  id: number;
  bitmap: ImageBitmap;
  format: OutputFormat;
  quality?: number;
  targetKb?: number;
};

type WorkerResponse =
  | { id: number; ok: true; buffer: ArrayBuffer; mime: string }
  | { id: number; ok: false; error: string };

function canvasToBlob(
  canvas: OffscreenCanvas,
  mime: OutputFormat,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.convertToBlob({ type: mime, quality: mime === "image/png" ? undefined : quality }).then(
      (blob) => (blob ? resolve(blob) : reject(new Error("Encoding failed"))),
      reject
    );
  });
}

async function encodeToTargetKb(
  canvas: OffscreenCanvas,
  mime: OutputFormat,
  targetKb: number,
  fallbackQuality = 0.8
): Promise<Blob> {
  const targetBytes = targetKb * 1024;
  let lo = 0.1;
  let hi = 1.0;
  let best: Blob | null = null;
  for (let i = 0; i < 12; i++) {
    const mid = (lo + hi) / 2;
    const blob = await canvasToBlob(canvas, mime, mid);
    if (!best || Math.abs(blob.size - targetBytes) < Math.abs(best.size - targetBytes)) {
      best = blob;
    }
    if (blob.size > targetBytes) hi = mid;
    else lo = mid;
  }
  return best ?? canvasToBlob(canvas, mime, fallbackQuality);
}

self.onmessage = async (e: MessageEvent<WorkerRequest>) => {
  const { id, bitmap, format, quality = 0.8, targetKb } = e.data;
  try {
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");
    if (format === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, bitmap.width, bitmap.height);
    }
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();

    let blob: Blob;
    if (typeof targetKb === "number" && targetKb > 0 && format !== "image/png") {
      blob = await encodeToTargetKb(canvas, format, targetKb, quality);
    } else {
      blob = await canvasToBlob(canvas, format, format === "image/png" ? undefined : quality);
    }
    const buffer = await blob.arrayBuffer();
    const response: WorkerResponse = { id, ok: true, buffer, mime: blob.type };
    self.postMessage(response, [buffer]);
  } catch (err) {
    bitmap.close();
    const msg = err instanceof Error ? err.message : "Worker encode failed";
    self.postMessage({ id, ok: false, error: msg } satisfies WorkerResponse);
  }
};
