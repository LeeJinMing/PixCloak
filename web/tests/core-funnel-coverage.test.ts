import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const clients = [
  "app/compress/Client.tsx",
  "app/redact/Client.tsx",
  "app/tools/exif-checker/Client.tsx",
  "app/tools/heic-converter/Client.tsx",
  "app/tools/resize-image/Client.tsx",
  "app/tools/png-jpg-converter/Client.tsx",
  "app/tools/pdf-to-image/Client.tsx",
  "app/tools/image-to-pdf/Client.tsx",
  "app/upload-pack/Client.tsx",
] as const;

const requiredEvents = [
  "tool_view",
  "process_started",
  "process_succeeded",
  "process_failed",
  "download_completed",
] as const;

test("every maintained core tool implements the anonymous product funnel", async () => {
  for (const path of clients) {
    const source = await readFile(new URL(`../${path}`, import.meta.url), "utf8");
    for (const event of requiredEvents) {
      assert.match(source, new RegExp(`[\"']${event}[\"']`), `${path} is missing ${event}`);
    }
  }
});

test("batch-capable core tools expose the separate batch event", async () => {
  for (const path of clients) {
    const source = await readFile(new URL(`../${path}`, import.meta.url), "utf8");
    assert.match(source, /[\"']batch_started[\"']/, `${path} is missing batch_started`);
  }
});

test("product event API does not expose identifying image properties", async () => {
  const source = await readFile(new URL("../lib/productEvents.ts", import.meta.url), "utf8");
  const safeProperties = source.match(/export type SafeProperties = \{([\s\S]*?)\n\};/)?.[1] || "";
  for (const forbidden of ["filename", "file_name", "image", "metadata", "exif", "gps", "width", "height", "text"]) {
    assert.doesNotMatch(safeProperties, new RegExp(`\\b${forbidden}\\b`, "i"), `SafeProperties exposes ${forbidden}`);
  }
});
