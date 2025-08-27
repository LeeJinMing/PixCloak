import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixcloak.com";
  const now = new Date();
  const urls = [
    "/guides",
    "/guides/compress-to-target-kb",
    "/guides/convert-jpeg-to-webp",
    "/guides/resize-longest-side",
    "/guides/rename-rules",
    "/guides/license-plate-redaction",
    "/guides/screenshot-privacy-check",
    "/guides/zip-batch-download",
    "/guides/jpeg-vs-webp-size-quality",
    "/guides/mobile-upload-limits",
    "/guides/social-platform-kb",
    "/guides/anonymized-sharing",
    "/guides/compress-to-200kb",
    "/guides/compress-to-500kb",
    "/guides/compress-to-1mb",
    "/guides/remove-exif-iphone",
    "/guides/remove-exif-wechat",
    "/guides/avatar-200kb",
    "/guides/post-500kb",
    "/guides/jpeg-vs-webp-for-twitter",
    "/guides/jpeg-vs-webp-for-linkedin",
    "/guides/export-without-metadata",
    "/guides/platform-image-limits",
    "/guides/embed-button",
    "/guides/compress-to-300kb",
    "/guides/compress-to-800kb",
    "/guides/resize-to-1920",
    "/guides/prepare-images-for-portfolio",
    "/guides/prepare-images-for-job-application",
    "/guides/prepare-images-for-forms",
    "/guides/avoid-artifacts-webp-jpeg",
    "/guides/research-jpeg-vs-webp",
    "/guides/research-500kb-quality-range",
    "/guides/es-comprimir-a-200kb",
    "/guides/pt-comprimir-para-500kb",
    "/guides/id-kompres-menjadi-1mb",
    "/guides/platform-image-limits-zh",
    "/guides/languages",
  ];
  return urls.map((u) => ({ url: `${base}${u}`, lastModified: now }));
}
