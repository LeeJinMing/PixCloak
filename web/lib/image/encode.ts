import type { DrawableSource, OutputFormat } from "./types";

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  mime: OutputFormat,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const q = mime === "image/png" ? undefined : quality;
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Encoding failed"))),
      mime,
      q
    );
  });
}

export function drawSourceToCanvas(
  source: DrawableSource,
  outW: number,
  outH: number,
  format: OutputFormat
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  if (format === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, outW, outH);
  }
  ctx.drawImage(source, 0, 0, outW, outH);
  return canvas;
}

/** Binary-search quality to approach target KB (JPEG/WebP only). */
export async function encodeToTargetKb(
  canvas: HTMLCanvasElement,
  mime: OutputFormat,
  targetKb: number,
  fallbackQuality = 0.8,
  iterations = 12
): Promise<Blob> {
  if (mime === "image/png") {
    return canvasToBlob(canvas, mime);
  }
  const targetBytes = targetKb * 1024;
  let lo = 0.1;
  let hi = 1.0;
  let best: Blob | null = null;
  for (let i = 0; i < iterations; i++) {
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
