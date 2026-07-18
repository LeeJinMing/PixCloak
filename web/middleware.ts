import { NextRequest, NextResponse } from "next/server";

const INDEXABLE_TOOLS = new Set([
  "/tools/exif-checker",
  "/tools/heic-converter",
  "/tools/resize-image",
  "/tools/png-jpg-converter",
]);

const INDEXABLE_GUIDES = new Set([
  "/guides",
  "/guides/privacy-sharing",
  "/guides/upload-success",
  "/guides/web-images",
  "/guides/does-wechat-remove-exif-test",
  "/guides/remove-gps-location-photo",
  "/guides/blur-pixelate-solid-redaction",
  "/guides/redact-id-card-safely",
  "/guides/hide-faces-plates-private-text",
  "/guides/screenshot-privacy-checklist-v1",
  "/guides/compress-image-under-100kb",
  "/guides/compress-image-under-200kb",
  "/guides/why-upload-portal-rejects-image",
  "/guides/heic-upload-error-convert-locally",
  "/guides/reduce-image-size-iphone",
  "/guides/file-size-dimensions-format",
  "/guides/generate-complete-favicon-pack",
  "/guides/webp-vs-jpeg-downloadable-samples",
  "/guides/remove-transparent-padding",
  "/guides/prepare-images-core-web-vitals",
]);

const NON_INDEXED_PAGES = new Set([
  "/embed/compress",
  "/press",
  "/changelog",
]);

const LEGACY_REDIRECTS: Record<string, string> = {
  "/facts": "/about",
  "/gallery": "/guides/webp-vs-jpeg-downloadable-samples",
  "/scenarios": "/guides/upload-success",
  "/batch": "/upload-ready",
  "/embed": "/embed/compress",
  "/guides/anonymized-sharing": "/guides/privacy-sharing",
  "/guides/avatar-200kb": "/upload-ready?kb=200",
  "/guides/avoid-artifacts-webp-jpeg": "/guides/webp-vs-jpeg-downloadable-samples",
  "/guides/blur-number-plate-online": "/guides/hide-faces-plates-private-text",
  "/guides/complete-image-compression-guide": "/guides/file-size-dimensions-format",
  "/guides/compress-to-target-kb": "/upload-ready",
  "/guides/compress-to-target-kb-zh": "/upload-ready",
  "/guides/convert-jpeg-to-webp": "/tools/webp-converter",
  "/guides/convert-jpg-to-webp-online": "/tools/webp-converter",
  "/guides/embed-button": "/embed/compress",
  "/guides/exif-gps-removal": "/guides/remove-gps-location-photo",
  "/guides/export-without-metadata": "/safe-share",
  "/guides/export-without-metadata-zh": "/safe-share",
  "/guides/how-to-resize-images-for-instagram": "/tools/resize-image",
  "/guides/jpeg-vs-webp-for-linkedin": "/guides/webp-vs-jpeg-downloadable-samples",
  "/guides/jpeg-vs-webp-for-twitter": "/guides/webp-vs-jpeg-downloadable-samples",
  "/guides/mobile-upload-limits": "/guides/upload-success",
  "/guides/platform-image-limits": "/guides/upload-success",
  "/guides/platform-image-limits-zh": "/guides/upload-success",
  "/guides/post-500kb": "/upload-ready?kb=500",
  "/guides/prepare-images-for-forms": "/guides/upload-success",
  "/guides/prepare-images-for-job-application": "/guides/upload-success",
  "/guides/prepare-images-for-portfolio": "/guides/upload-success",
  "/guides/privacy-compliance": "/guides/privacy-sharing",
  "/guides/redact-screenshot-mac": "/guides/screenshot-privacy-checklist-v1",
  "/guides/remove-exif-iphone-zh": "/guides/remove-gps-location-photo",
  "/guides/remove-exif-wechat-zh": "/guides/does-wechat-remove-exif-test",
  "/guides/resize-longest-side-zh": "/tools/resize-image",
  "/guides/rename-rules": "/tools/batch-rename",
  "/guides/research-jpeg-vs-webp": "/guides/webp-vs-jpeg-downloadable-samples",
  "/guides/research-quality-size-curves": "/guides/file-size-dimensions-format",
  "/guides/screenshot-privacy-check": "/guides/screenshot-privacy-checklist-v1",
  "/guides/social-platform-kb": "/guides/upload-success",
  "/guides/long-tail": "/guides",
  "/guides/long-tail/github-readme-images": "/guides/web-images",
  "/guides/long-tail/crop-and-pad-ratios": "/tools/crop-templates",
  "/guides/long-tail/id-card-privacy-redaction": "/guides/redact-id-card-safely",
  "/guides/long-tail/lqip-placeholders": "/guides/web-images",
  "/guides/long-tail/passport-scan-redact": "/guides/redact-id-card-safely",
  "/guides/long-tail/presentation-slides-1920": "/tools/resize-image",
  "/guides/long-tail/remove-bg-lite-color": "/tools/remove-bg-lite",
  "/guides/long-tail/sprite-sheet-generator": "/tools/sprite-sheet",
  "/guides/long-tail/text-watermark-batch": "/tools/watermark",
  "/guides/long-tail/webp-converter-batch": "/tools/webp-converter",
  "/guides/long-tail/wechat-screenshot-exif": "/guides/does-wechat-remove-exif-test",
  "/guides/blur-face-in-photo": "/guides/blur-pixelate-solid-redaction",
  "/guides/compress-image-to-100kb": "/guides/compress-image-under-100kb",
  "/guides/compress-to-200kb": "/guides/compress-image-under-200kb",
  "/guides/compress-to-500kb": "/upload-ready?kb=500",
  "/guides/remove-exif-wechat": "/guides/does-wechat-remove-exif-test",
  "/guides/remove-exif-iphone": "/guides/remove-gps-location-photo",
  "/guides/license-plate-redaction": "/guides/hide-faces-plates-private-text",
  "/guides/how-to-compress-on-iphone": "/guides/reduce-image-size-iphone",
  "/guides/how-to-compress-image-without-losing-quality": "/guides/file-size-dimensions-format",
  "/guides/how-to-reduce-image-file-size": "/guides/why-upload-portal-rejects-image",
  "/guides/remove-gps-data-from-photos": "/guides/remove-gps-location-photo",
  "/guides/black-out-text-in-image": "/guides/hide-faces-plates-private-text",
  "/guides/redaction-checklist": "/guides/screenshot-privacy-checklist-v1",
  "/guides/jpeg-vs-webp-size-quality": "/guides/webp-vs-jpeg-downloadable-samples",
  "/guides/png-vs-jpg-when-to-use-each": "/guides/file-size-dimensions-format",
  "/guides/image-seo-optimization": "/guides/prepare-images-core-web-vitals",
  "/guides/resize-to-1920": "/upload-ready?longest=1920&preset=1920px",
  "/guides/resize-longest-side": "/tools/resize-image",
  "/guides/tinypng-alternative-free-no-upload": "/guides/compress-image-under-200kb",
  "/guides/zip-batch-download": "/upload-ready",
  "/compress-es": "/compress",
  "/compress-pt": "/compress",
  "/compress-id": "/compress",
  "/redact-es": "/redact",
  "/redact-pt": "/redact",
  "/redact-id": "/redact",
  "/guides/es-comprimir-a-200kb": "/upload-ready?kb=200",
  "/guides/es-comprimir-a-kb-objetivo": "/upload-ready",
  "/guides/es-exportar-sin-metadatos": "/safe-share",
  "/guides/es-limites-de-imagenes-plataformas": "/upload-ready",
  "/guides/es-redimensionar-lado-mas-largo": "/tools/resize-image",
  "/guides/pt-comprimir-para-500kb": "/upload-ready?kb=500",
  "/guides/pt-comprimir-para-kb-alvo": "/upload-ready",
  "/guides/pt-exportar-sem-metadados": "/safe-share",
  "/guides/pt-limites-de-imagens-plataformas": "/upload-ready",
  "/guides/pt-redimensionar-lado-mais-longo": "/tools/resize-image",
  "/guides/id-kompres-menjadi-1mb": "/upload-ready?kb=1024",
  "/guides/id-kompres-ke-kb-target": "/upload-ready",
  "/guides/id-ekspor-tanpa-metadata": "/safe-share",
  "/guides/id-batas-gambar-platform": "/upload-ready",
  "/guides/id-ubah-ukuran-sisi-terpanjang": "/tools/resize-image",
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, "") || "/";
  const legacyDestination = LEGACY_REDIRECTS[pathname];
  if (legacyDestination) return NextResponse.redirect(new URL(legacyDestination, request.url), 301);
  const numericTarget = pathname.match(/^\/guides\/(?:long-tail\/)?(?:compress(?:-image)?-to-|compress-to-)(\d+)(kb|mb)(?:-|$)/i);
  if (numericTarget) {
    const kb = Number(numericTarget[1]) * (numericTarget[2].toLowerCase() === "mb" ? 1024 : 1);
    return NextResponse.redirect(new URL(`/upload-ready?kb=${kb}`, request.url), 301);
  }
  const longTailSizeTarget = pathname.match(/^\/guides\/long-tail\/.*?(\d+)(kb|mb)(?:-|$)/i);
  if (longTailSizeTarget) {
    const kb = Number(longTailSizeTarget[1]) * (longTailSizeTarget[2].toLowerCase() === "mb" ? 1024 : 1);
    return NextResponse.redirect(new URL(`/upload-ready?kb=${kb}`, request.url), 301);
  }
  if (/^\/guides\/long-tail\/.*(?:\d{2,4}x\d{2,4}|\d{3,4}px)(?:-|$)/i.test(pathname)) {
    return NextResponse.redirect(new URL("/tools/resize-image", request.url), 301);
  }
  if (pathname.startsWith("/guides/long-tail/resize-")) return NextResponse.redirect(new URL("/tools/resize-image", request.url), 301);
  if (pathname.startsWith("/guides/long-tail/convert-")) return NextResponse.redirect(new URL("/tools/png-jpg-converter", request.url), 301);
  const isLab = pathname.startsWith("/tools/") && !INDEXABLE_TOOLS.has(pathname);
  const isLongTail = pathname === "/guides/long-tail" || pathname.startsWith("/guides/long-tail/");
  const isLanguageCopy = pathname === "/zh" || pathname.startsWith("/zh/");
  const isNonCuratedGuide = pathname.startsWith("/guides/") && pathname !== "/guides/sitemap.xml" && !INDEXABLE_GUIDES.has(pathname);
  const response = NextResponse.next();
  if (isLab || isLongTail || isLanguageCopy || isNonCuratedGuide || NON_INDEXED_PAGES.has(pathname)) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }
  return response;
}

export const config = {
  matcher: [
    "/tools/:path*",
    "/guides/:path*",
    "/embed/:path*",
    "/press",
    "/facts",
    "/gallery",
    "/scenarios",
    "/changelog",
    "/compress-es",
    "/compress-pt",
    "/compress-id",
    "/redact-es",
    "/redact-pt",
    "/redact-id",
    "/batch",
    "/zh/:path*",
  ],
};
