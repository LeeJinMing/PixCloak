import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixcloak.com";
  const updated = new Date("2026-07-17");
  const paths = [
    "/",
    "/safe-share",
    "/upload-ready",
    "/compress",
    "/redact",
    "/tools",
    "/tools/exif-checker",
    "/tools/heic-converter",
    "/tools/resize-image",
    "/tools/png-jpg-converter",
    "/about",
    "/privacy",
    "/terms",
    "/contact",
  ];
  return paths.map((path) => ({ url: `${base}${path}`, lastModified: updated }));
}
