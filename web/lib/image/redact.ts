import type { RedactBox, RelRedactBox } from "./types";

export function absToRel(boxes: RedactBox[], width: number, height: number): RelRedactBox[] {
  if (width <= 0 || height <= 0) return [];
  return boxes.map((b) => ({
    x: b.x / width,
    y: b.y / height,
    w: b.w / width,
    h: b.h / height,
  }));
}

export function relToAbs(boxes: RelRedactBox[], width: number, height: number): RedactBox[] {
  return boxes.map((b) => ({
    x: Math.round(b.x * width),
    y: Math.round(b.y * height),
    w: Math.round(b.w * width),
    h: Math.round(b.h * height),
  }));
}

export function drawRedactionBoxes(
  ctx: CanvasRenderingContext2D,
  boxes: RedactBox[],
  color = "#000000"
) {
  ctx.fillStyle = color;
  for (const b of boxes) {
    ctx.fillRect(b.x, b.y, b.w, b.h);
  }
}
