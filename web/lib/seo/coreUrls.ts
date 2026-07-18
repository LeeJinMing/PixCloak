/** Priority URLs for IndexNow, internal linking, and sitemap weight (GSC Jul 2026). */
export const CORE_TOOL_PATHS = [
  "/",
  "/safe-share",
  "/upload-ready",
  "/compress",
  "/redact",
  "/tools/exif-checker",
  "/tools/heic-converter",
  "/tools/resize-image",
  "/tools/png-jpg-converter",
] as const;

export const CORE_ZH_PATHS = ["/zh", "/zh/compress", "/zh/redact"] as const;

export const CORE_GUIDE_PATHS = [
  "/guides/does-wechat-remove-exif-test",
  "/guides/remove-gps-location-photo",
  "/guides/redact-id-card-safely",
  "/guides/compress-image-under-100kb",
  "/guides/compress-image-under-200kb",
  "/guides/heic-upload-error-convert-locally",
  "/guides/webp-vs-jpeg-downloadable-samples",
  "/guides/prepare-images-core-web-vitals",
] as const;

export const CORE_SEO_PATHS = [
  ...CORE_TOOL_PATHS,
  ...CORE_GUIDE_PATHS,
  ...CORE_ZH_PATHS,
] as const;

export const CORE_GUIDE_HUB_LINKS: { href: string; label: string }[] = [
  { href: "/guides/does-wechat-remove-exif-test", label: "Does WeChat remove EXIF?" },
  { href: "/guides/remove-gps-location-photo", label: "Remove photo GPS data" },
  { href: "/guides/compress-image-under-100kb", label: "Compress under 100KB" },
  { href: "/guides/compress-image-under-200kb", label: "Compress under 200KB" },
  { href: "/guides/heic-upload-error-convert-locally", label: "Fix HEIC upload errors" },
  { href: "/guides/webp-vs-jpeg-downloadable-samples", label: "WebP vs JPEG samples" },
  { href: "/guides/redact-id-card-safely", label: "Redact an ID card safely" },
];
