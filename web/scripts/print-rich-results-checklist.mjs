#!/usr/bin/env node
/**
 * Prints URLs for manual Rich Results / structured-data checks after deploy.
 * Usage: npm run seo:rich-results
 */

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync, existsSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = join(__dirname, "..");
const envLocal = join(webRoot, ".env.local");
let base = process.env.NEXT_PUBLIC_SITE_URL || "https://pixcloak.com";
if (existsSync(envLocal)) {
  const raw = readFileSync(envLocal, "utf8");
  const m = raw.match(/^\s*NEXT_PUBLIC_SITE_URL\s*=\s*(\S+)/m);
  if (m) base = m[1].replace(/^["']|["']$/g, "");
}
base = base.replace(/\/$/, "");

const urls = [
  `${base}/`,
  `${base}/compress`,
  `${base}/tools`,
  `${base}/guides/compress-to-200kb`,
];

const richResultsBase = "https://search.google.com/test/rich-results";
const schemaValidator = "https://validator.schema.org/";

console.log("Rich Results (Google) — paste each URL or open:\n");
for (const u of urls) {
  console.log(`  ${richResultsBase}?url=${encodeURIComponent(u)}`);
}
console.log("\nSchema.org validator — paste JSON-LD from View Source, or use URL mode if available:\n");
console.log(`  ${schemaValidator}`);
console.log("\nSample URLs to validate in browser:\n");
urls.forEach((u) => console.log(`  ${u}`));
console.log("");
