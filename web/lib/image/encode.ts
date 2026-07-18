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
  const sourceWidth = source instanceof HTMLImageElement
    ? source.naturalWidth || source.width
    : source.width;
  const sourceHeight = source instanceof HTMLImageElement
    ? source.naturalHeight || source.height
    : source.height;
  const scale = Math.min(outW / sourceWidth, outH / sourceHeight);
  const drawWidth = Math.max(1, Math.round(sourceWidth * scale));
  const drawHeight = Math.max(1, Math.round(sourceHeight * scale));
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, Math.round((outW - drawWidth) / 2), Math.round((outH - drawHeight) / 2), drawWidth, drawHeight);
  return canvas;
}

export type TargetEncodeResult = {
  blob: Blob;
  width: number;
  height: number;
  quality?: number;
};

async function bestEncodingUnderLimit(
  canvas: HTMLCanvasElement,
  mime: OutputFormat,
  targetBytes: number,
  maxQuality: number,
  minQuality: number,
  iterations: number
): Promise<TargetEncodeResult | null> {
  if (mime === "image/png") {
    const blob = await canvasToBlob(canvas, mime);
    return blob.size <= targetBytes
      ? { blob, width: canvas.width, height: canvas.height }
      : null;
  }

  let lo = minQuality;
  let hi = maxQuality;
  const smallest = await canvasToBlob(canvas, mime, lo);
  if (smallest.size > targetBytes) return null;

  let best: TargetEncodeResult = {
    blob: smallest,
    width: canvas.width,
    height: canvas.height,
    quality: lo,
  };
  for (let i = 0; i < iterations; i++) {
    const mid = (lo + hi) / 2;
    const blob = await canvasToBlob(canvas, mime, mid);
    if (blob.size <= targetBytes) {
      best = { blob, width: canvas.width, height: canvas.height, quality: mid };
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return best;
}

function scaledCanvas(
  source: HTMLCanvasElement,
  width: number,
  height: number,
  format: OutputFormat
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  if (format === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, 0, 0, width, height);
  return canvas;
}

/**
 * Encode an image without ever exceeding the requested byte cap.
 * If quality alone cannot satisfy the cap, dimensions are reduced and retried.
 */
export async function encodeWithinTargetKb(
  canvas: HTMLCanvasElement,
  mime: OutputFormat,
  targetKb: number,
  preferredQuality = 0.8,
  options: {
    iterations?: number;
    minQuality?: number;
    minDimension?: number;
    allowDimensionReduction?: boolean;
    maxResizeSteps?: number;
  } = {}
): Promise<TargetEncodeResult> {
  const targetBytes = targetKb * 1024;
  if (!Number.isFinite(targetBytes) || targetBytes <= 0) {
    throw new Error("Target size must be greater than zero");
  }

  const iterations = options.iterations ?? 12;
  const minQuality = Math.min(0.95, Math.max(0.05, options.minQuality ?? 0.1));
  const maxQuality = Math.min(1, Math.max(minQuality, preferredQuality));
  const minDimension = Math.max(16, Math.floor(options.minDimension ?? 64));
  const allowDimensionReduction = options.allowDimensionReduction ?? true;
  const maxResizeSteps = Math.max(0, options.maxResizeSteps ?? 12);

  const original = canvas;
  let current = canvas;
  for (let step = 0; step <= maxResizeSteps; step++) {
    const match = await bestEncodingUnderLimit(
      current,
      mime,
      targetBytes,
      maxQuality,
      minQuality,
      iterations
    );
    if (match) return match;
    if (!allowDimensionReduction) break;

    const probe = await canvasToBlob(
      current,
      mime,
      mime === "image/png" ? undefined : minQuality
    );
    const ratio = Math.sqrt(targetBytes / Math.max(1, probe.size));
    const scale = Math.min(0.9, Math.max(0.5, ratio * 0.94));
    const nextWidth = Math.floor(current.width * scale);
    const nextHeight = Math.floor(current.height * scale);
    if (
      nextWidth < minDimension ||
      nextHeight < minDimension ||
      (nextWidth === current.width && nextHeight === current.height)
    ) {
      break;
    }
    current = scaledCanvas(original, nextWidth, nextHeight, mime);
  }

  throw new Error(
    `Unable to produce an image under ${Math.round(targetKb)} KB without reducing it below ${minDimension}px`
  );
}

/** Backwards-compatible blob-only wrapper. */
export async function encodeToTargetKb(
  canvas: HTMLCanvasElement,
  mime: OutputFormat,
  targetKb: number,
  fallbackQuality = 0.8,
  iterations = 12
): Promise<Blob> {
  return (await encodeWithinTargetKb(canvas, mime, targetKb, fallbackQuality, { iterations })).blob;
}
