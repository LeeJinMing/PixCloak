import { type MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/compress`, lastModified: now },
    { url: `${base}/redact`, lastModified: now },
    { url: `${base}/templates`, lastModified: now },
    { url: `${base}/tools`, lastModified: now },
    { url: `${base}/guides`, lastModified: now },
    { url: `${base}/guides/compress-to-target-kb`, lastModified: now },
    { url: `${base}/guides/redaction-checklist`, lastModified: now },
    { url: `${base}/guides/exif-gps-removal`, lastModified: now },
    { url: `${base}/privacy`, lastModified: now },
    { url: `${base}/terms`, lastModified: now },
  ];
}
