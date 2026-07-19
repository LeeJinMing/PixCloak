"use client";

import { track } from "@vercel/analytics";

export type ProductEventName =
  | "tool_view"
  | "process_started"
  | "process_succeeded"
  | "process_failed"
  | "download_completed"
  | "batch_started"
  | "related_tool_clicked"
  | "pwa_install_requested"
  | "pwa_install_accepted"
  | "pwa_installed"
  | "pwa_standalone_launch"
  | "ad_viewable";

export type SafeProperties = {
  tool?: string;
  input_format?: string;
  output_format?: string;
  file_size_bucket?: string;
  batch_count_bucket?: string;
  duration_bucket?: string;
  error_code?: string;
};

export function productEventsEnabled(consent: string | null, analyticsState: string | undefined) {
  return consent === "all" && analyticsState === "on";
}

const allowedKeys = new Set<keyof SafeProperties>([
  "tool",
  "input_format",
  "output_format",
  "file_size_bucket",
  "batch_count_bucket",
  "duration_bucket",
  "error_code",
]);

const allowedTools = new Set([
  "compress", "upload_ready", "upload_pack", "redact", "safe_share", "metadata_checker", "content_ad", "pwa",
  "/safe-share", "/upload-ready", "/compress", "/redact", "/tools/exif-checker",
  "/tools/heic-converter", "/tools/resize-image", "/tools/png-jpg-converter",
  "/tools/pdf-to-image", "/tools/image-to-pdf",
  "/tools/favicon-pack", "/tools/trim-transparent",
]);
const formatAliases: Record<string, string> = {
  "image/jpeg": "jpeg", jpg: "jpeg", jpeg: "jpeg",
  "image/png": "png", png: "png",
  "image/webp": "webp", webp: "webp",
  "image/heic": "heic", "image/heif": "heic", heic: "heic", heif: "heic",
  "application/pdf": "pdf", pdf: "pdf",
  mixed: "mixed", unknown: "unknown",
};
const allowedFileBuckets = new Set(["under_100kb", "100_500kb", "500kb_2mb", "2_10mb", "over_10mb"]);
const allowedBatchBuckets = new Set(["1", "2_5", "6_20", "over_20"]);
const allowedDurationBuckets = new Set(["under_500ms", "500ms_2s", "2_10s", "over_10s"]);
const allowedErrors = new Set(["all_outputs_failed", "verification_failed", "batch_failed", "metadata_cleanup_failed", "decode_failed", "unsupported_format", "cancelled"]);

export function sanitizeProductProperties(properties: SafeProperties): Record<string, string> {
  const safe: Record<string, string> = {};
  for (const [key, value] of Object.entries(properties)) {
    if (!allowedKeys.has(key as keyof SafeProperties) || typeof value !== "string") continue;
    const normalizedTool = value.split("?", 1)[0];
    if (key === "tool" && allowedTools.has(normalizedTool)) safe.tool = normalizedTool;
    else if ((key === "input_format" || key === "output_format") && formatAliases[value.toLowerCase()]) safe[key] = formatAliases[value.toLowerCase()];
    else if (key === "file_size_bucket" && allowedFileBuckets.has(value)) safe.file_size_bucket = value;
    else if (key === "batch_count_bucket" && allowedBatchBuckets.has(value)) safe.batch_count_bucket = value;
    else if (key === "duration_bucket" && allowedDurationBuckets.has(value)) safe.duration_bucket = value;
    else if (key === "error_code" && allowedErrors.has(value)) safe.error_code = value;
  }
  return safe;
}

export function emitProductEvent(name: ProductEventName, properties: SafeProperties = {}) {
  if (typeof window === "undefined") return;
  if (name === "download_completed") {
    window.localStorage.setItem("pixcloak-pwa-ready-v1", "downloaded");
    window.dispatchEvent(new Event("pixcloak:pwa-ready"));
  }
  if (!productEventsEnabled(
    window.localStorage.getItem("pixcloak-consent-v1"),
    document.body?.dataset.analytics,
  )) return;
  const safe = sanitizeProductProperties(properties);
  track(name, safe);
}

export function fileSizeBucket(bytes: number): string {
  if (bytes < 100 * 1024) return "under_100kb";
  if (bytes < 500 * 1024) return "100_500kb";
  if (bytes < 2 * 1024 * 1024) return "500kb_2mb";
  if (bytes < 10 * 1024 * 1024) return "2_10mb";
  return "over_10mb";
}

export function batchCountBucket(count: number): string {
  if (count <= 1) return "1";
  if (count <= 5) return "2_5";
  if (count <= 20) return "6_20";
  return "over_20";
}

export function durationBucket(milliseconds: number): string {
  if (milliseconds < 500) return "under_500ms";
  if (milliseconds < 2000) return "500ms_2s";
  if (milliseconds < 10000) return "2_10s";
  return "over_10s";
}
