import type { MetadataRoute } from "next";
const INDEXABLE_GUIDES = [
  "privacy-sharing",
  "upload-success",
  "web-images",
  "does-wechat-remove-exif-test",
  "remove-gps-location-photo",
  "blur-pixelate-solid-redaction",
  "redact-id-card-safely",
  "hide-faces-plates-private-text",
  "screenshot-privacy-checklist-v1",
  "compress-image-under-100kb",
  "compress-image-under-200kb",
  "why-upload-portal-rejects-image",
  "heic-upload-error-convert-locally",
  "reduce-image-size-iphone",
  "file-size-dimensions-format",
  "generate-complete-favicon-pack",
  "webp-vs-jpeg-downloadable-samples",
  "remove-transparent-padding",
  "prepare-images-core-web-vitals",
] as const;

/** Sole sitemap for /guides and /guides/* (see robots.ts + root app/sitemap.ts). */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixcloak.com"
  ).replace(/\/$/, "");
  const updated = new Date("2026-07-17");
  return [
    { url: `${base}/guides`, lastModified: updated },
    ...INDEXABLE_GUIDES.map((slug) => ({ url: `${base}/guides/${slug}`, lastModified: updated })),
  ];
}
