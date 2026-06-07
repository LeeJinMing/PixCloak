export type OutputFormat = "image/jpeg" | "image/webp" | "image/png";
export type ResizeMode = "none" | "longest" | "exact";

export type DrawableSource = ImageBitmap | HTMLImageElement | HTMLCanvasElement;

export type RedactBox = { x: number; y: number; w: number; h: number };
export type RelRedactBox = { x: number; y: number; w: number; h: number };

export type CompressOptions = {
  format: OutputFormat;
  quality?: number;
  targetKb?: number;
  resizeMode?: ResizeMode;
  resizeA?: number;
  resizeB?: number;
};

export const LARGE_FILE_WARNING_BYTES = 20 * 1024 * 1024;
