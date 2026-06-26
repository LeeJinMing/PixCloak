/** Priority URLs for IndexNow, internal linking, and sitemap weight (GSC Jun 2026). */
export const CORE_TOOL_PATHS = ["/", "/compress", "/redact"] as const;

export const CORE_ZH_PATHS = ["/zh", "/zh/compress", "/zh/redact"] as const;

export const CORE_GUIDE_PATHS = [
  "/guides/blur-face-in-photo",
  "/guides/compress-image-to-100kb",
  "/guides/compress-to-200kb",
  "/guides/remove-exif-wechat",
  "/guides/tinypng-alternative-free-no-upload",
  "/guides/license-plate-redaction",
] as const;

export const CORE_SEO_PATHS = [
  ...CORE_TOOL_PATHS,
  ...CORE_GUIDE_PATHS,
  ...CORE_ZH_PATHS,
] as const;

export const CORE_GUIDE_HUB_LINKS: { href: string; label: string }[] = [
  { href: "/guides/blur-face-in-photo", label: "Blur face online (free, no upload)" },
  { href: "/guides/compress-image-to-100kb", label: "Compress image to 100KB" },
  { href: "/guides/compress-to-200kb", label: "Compress to 200KB" },
  { href: "/guides/remove-exif-wechat", label: "WeChat EXIF & GPS guide" },
  { href: "/guides/tinypng-alternative-free-no-upload", label: "TinyPNG alternative (local)" },
  { href: "/guides/license-plate-redaction", label: "Redact vs blur license plate" },
];
