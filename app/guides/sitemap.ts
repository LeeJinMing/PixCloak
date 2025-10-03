import type { MetadataRoute } from "next";
import { scenarios } from "@/lib/seo-scenarios";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixcloak.com";

  // 长尾场景页
  const scenarioUrls = scenarios.map((s) => ({
    url: `${base}/guides/long-tail/${s.slug}`,
    lastModified: new Date("2025-10-01"),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // 主要guides页面
  const mainGuides = [
    "compress-to-target-kb",
    "compress-image-to-100kb",
    "compress-to-200kb",
    "compress-to-500kb",
    "compress-to-1mb",
    "compress-to-300kb",
    "compress-to-800kb",
    "convert-jpg-to-webp-online",
    "convert-jpeg-to-webp",
    "resize-longest-side",
    "resize-to-1920",
    "blur-face-in-photo",
    "blur-number-plate-online",
    "license-plate-redaction",
    "black-out-text-in-image",
    "redaction-checklist",
    "redact-screenshot-mac",
    "exif-gps-removal",
    "remove-exif-iphone",
    "remove-exif-wechat",
    "remove-gps-data-from-photos",
    "export-without-metadata",
    "anonymized-sharing",
    "screenshot-privacy-check",
    "jpeg-vs-webp-size-quality",
    "jpeg-vs-webp-for-twitter",
    "jpeg-vs-webp-for-linkedin",
    "platform-image-limits",
    "mobile-upload-limits",
    "social-platform-kb",
    "avatar-200kb",
    "post-500kb",
    "zip-batch-download",
    "rename-rules",
    "avoid-artifacts-webp-jpeg",
    "prepare-images-for-portfolio",
    "prepare-images-for-job-application",
    "prepare-images-for-forms",
    "embed-button",
    "privacy-compliance",
    "gsc-operations",
    "research-jpeg-vs-webp",
    "research-quality-size-curves",
    "research-500kb-quality-range",
    // 多语言版本
    "compress-to-target-kb-zh",
    "resize-longest-side-zh",
    "export-without-metadata-zh",
    "platform-image-limits-zh",
    "remove-exif-iphone-zh",
    "remove-exif-wechat-zh",
    "es-comprimir-a-kb-objetivo",
    "es-comprimir-a-200kb",
    "es-redimensionar-lado-mas-largo",
    "es-exportar-sin-metadatos",
    "es-limites-de-imagenes-plataformas",
    "pt-comprimir-para-kb-alvo",
    "pt-comprimir-para-500kb",
    "pt-redimensionar-lado-mais-longo",
    "pt-exportar-sem-metadados",
    "pt-limites-de-imagens-plataformas",
    "id-kompres-ke-kb-target",
    "id-kompres-menjadi-1mb",
    "id-ubah-ukuran-sisi-terpanjang",
    "id-ekspor-tanpa-metadata",
    "id-batas-gambar-platform",
  ].map((slug) => ({
    url: `${base}/guides/${slug}`,
    lastModified: new Date("2025-10-01"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...mainGuides, ...scenarioUrls];
}
