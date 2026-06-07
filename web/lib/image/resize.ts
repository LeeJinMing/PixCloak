import type { ResizeMode } from "./types";

export function computeOutputDimensions(
  width: number,
  height: number,
  resizeMode: ResizeMode,
  resizeA?: number,
  resizeB?: number
): { outW: number; outH: number } {
  let outW = width;
  let outH = height;
  if (resizeMode === "longest" && typeof resizeA === "number" && resizeA > 0) {
    const longest = Math.max(width, height);
    const ratio = resizeA / longest;
    outW = Math.max(1, Math.round(width * ratio));
    outH = Math.max(1, Math.round(height * ratio));
  } else if (
    resizeMode === "exact" &&
    typeof resizeA === "number" &&
    typeof resizeB === "number" &&
    resizeA > 0 &&
    resizeB > 0
  ) {
    outW = Math.round(resizeA);
    outH = Math.round(resizeB);
  }
  return { outW, outH };
}
