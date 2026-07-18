import assert from "node:assert/strict";
import test from "node:test";
import { computeOutputDimensions } from "../lib/image/resize.ts";

const dimensions = [
  [4000, 3000], [3000, 4000], [1920, 1080], [1080, 1920], [1200, 1200],
  [800, 600], [600, 800], [640, 360], [360, 640], [256, 256],
] as const;
const longestSides = [64, 100, 200, 500, 1080, 1920, 2048] as const;

for (const [sourceWidth, sourceHeight] of dimensions) {
  for (const target of longestSides) {
    test(`longest side ${sourceWidth}x${sourceHeight} -> ${target}`, () => {
      const { outW, outH } = computeOutputDimensions(sourceWidth, sourceHeight, "longest", target);
      assert.equal(Math.max(outW, outH), target);
      assert.ok(outW >= 1 && outH >= 1);
      assert.ok(Math.abs(outW / outH - sourceWidth / sourceHeight) < 0.02);
    });
  }
}

test("none preserves original dimensions", () => {
  assert.deepEqual(computeOutputDimensions(4032, 3024, "none"), { outW: 4032, outH: 3024 });
});

test("exact produces the requested canvas", () => {
  assert.deepEqual(computeOutputDimensions(4032, 3024, "exact", 1080, 1350), { outW: 1080, outH: 1350 });
});
