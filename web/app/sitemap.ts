import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixcloak.com";
  const updated = new Date("2026-07-18");
  const paths = [
    "/",
    "/safe-share",
    "/upload-ready",
    "/upload-pack",
    "/compress",
    "/redact",
    "/tools",
    "/tools/exif-checker",
    "/tools/heic-converter",
    "/tools/resize-image",
    "/tools/png-jpg-converter",
    "/tools/pdf-to-image",
    "/tools/image-to-pdf",
    "/about",
    "/privacy",
    "/terms",
    "/contact",
  ];
  return paths.map((path) => ({ url: `${base}${path}`, lastModified: updated }));
}
