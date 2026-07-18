import assert from "node:assert/strict";
import test from "node:test";
import { productEventsEnabled, sanitizeProductProperties } from "../lib/productEvents.ts";

test("product event properties normalize formats and retain only coarse allowlisted values", () => {
  assert.deepEqual(sanitizeProductProperties({
    tool: "/upload-ready?kb=100",
    input_format: "image/jpeg",
    output_format: "image/webp",
    file_size_bucket: "100_500kb",
    batch_count_bucket: "2_5",
    duration_bucket: "500ms_2s",
    error_code: "decode_failed",
  }), {
    tool: "/upload-ready",
    input_format: "jpeg",
    output_format: "webp",
    file_size_bucket: "100_500kb",
    batch_count_bucket: "2_5",
    duration_bucket: "500ms_2s",
    error_code: "decode_failed",
  });
});

test("product event sanitizer drops identifying or unrecognized values", () => {
  assert.deepEqual(sanitizeProductProperties({
    tool: "private-file-name.jpg",
    input_format: "image/jpeg;name=secret",
    output_format: "passport_scan",
    file_size_bucket: "1234567",
    batch_count_bucket: "37",
    duration_bucket: "1847ms",
    error_code: "C:\\Users\\person\\secret.jpg",
    // Runtime callers cannot pass this through the TypeScript API; verify defense in depth.
    ...({ filename: "secret.jpg", width: "4032" } as Record<string, string>),
  }), {});
});

test("product events require both consent and deployment-level analytics", () => {
  assert.equal(productEventsEnabled("all", "on"), true);
  assert.equal(productEventsEnabled("all", "off"), false);
  assert.equal(productEventsEnabled("essential", "on"), false);
  assert.equal(productEventsEnabled(null, "on"), false);
});
