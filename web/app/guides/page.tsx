import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Image Guides: Compress, Convert, Remove EXIF | PixCloak",
  description: "Compress to 100KB-1MB, convert JPG/WebP, resize to 1920px, remove EXIF/GPS. Works offline in your browser—no uploads. For web, email, social media, and forms.",
  alternates: { canonical: "/guides" },
};

const guideCategories = [
  {
    title: "Compression Guides",
    description: "Learn how to compress images to specific file sizes",
    guides: [
      { title: "Complete Image Compression Guide", url: "/guides/complete-image-compression-guide", description: "Master image compression with our comprehensive guide" },
      { title: "Compress to 200KB", url: "/guides/compress-to-200kb", description: "Perfect for LinkedIn profiles and social media" },
      { title: "Compress to 500KB", url: "/guides/compress-to-500kb", description: "Ideal for Instagram posts and web content" },
      { title: "Compress to 1MB", url: "/guides/compress-to-1mb", description: "High quality for portfolios and presentations" },
    ]
  },
  {
    title: "Format Conversion",
    description: "Convert between different image formats",
    guides: [
      { title: "JPEG vs WebP", url: "/guides/jpeg-vs-webp-size-quality", description: "Choose the right format for your needs" },
      { title: "Convert JPEG to WebP", url: "/guides/convert-jpeg-to-webp", description: "Reduce file size with modern formats" },
      { title: "PNG vs JPG", url: "/guides/png-vs-jpg-when-to-use-each", description: "When to use PNG vs JPEG" },
    ]
  },
  {
    title: "Privacy & Security",
    description: "Remove metadata and protect your privacy",
    guides: [
      { title: "Remove EXIF Data", url: "/guides/exif-gps-removal", description: "Strip location and camera data from photos" },
      { title: "Remove EXIF from iPhone", url: "/guides/remove-exif-iphone", description: "iPhone-specific EXIF removal guide" },
      { title: "Privacy Compliance", url: "/guides/privacy-compliance", description: "GDPR and privacy best practices" },
    ]
  },
  {
    title: "Platform Optimization",
    description: "Optimize images for specific platforms",
    guides: [
      { title: "Instagram Image Sizes", url: "/guides/how-to-resize-images-for-instagram", description: "Perfect dimensions for Instagram posts" },
      { title: "LinkedIn Profile Photos", url: "/guides/compress-to-200kb", description: "Professional headshots for LinkedIn" },
      { title: "Platform Image Limits", url: "/guides/platform-image-limits", description: "File size limits across platforms" },
    ]
  },
  {
    title: "Advanced Techniques",
    description: "Professional image optimization techniques",
    guides: [
      { title: "Batch Processing", url: "/guides/zip-batch-download", description: "Process multiple images at once" },
      { title: "Image SEO", url: "/guides/image-seo-optimization", description: "Optimize images for search engines" },
      { title: "Quality vs Size", url: "/guides/how-to-compress-image-without-losing-quality", description: "Balance quality and file size" },
    ]
  }
];

/** Hub links for guide URLs that appeared under “Crawled – currently not indexed” in GSC (Apr 2026 export). Improves internal discovery. */
const gscRecrawlHubLinks: { href: string; label: string }[] = [
  { href: "/guides/how-to-compress-image-without-losing-quality", label: "Compress without losing quality" },
  { href: "/guides/pt-redimensionar-lado-mais-longo", label: "PT: redimensionar lado mais longo" },
  { href: "/guides/compress-to-target-kb-zh", label: "ZH: 按目标 KB 压缩" },
  { href: "/guides/jpeg-vs-webp-for-linkedin", label: "JPEG vs WebP for LinkedIn" },
  { href: "/guides/gsc-operations", label: "Google Search Console checklist" },
  { href: "/guides/convert-jpg-to-webp-online", label: "Convert JPG to WebP online" },
  { href: "/guides/blur-number-plate-online", label: "Blur number plate online" },
  { href: "/guides/convert-jpeg-to-webp", label: "Convert JPEG to WebP" },
  { href: "/guides/complete-image-compression-guide", label: "Complete compression guide" },
  { href: "/guides/research-quality-size-curves", label: "Research: quality vs size curves" },
  { href: "/guides/avoid-artifacts-webp-jpeg", label: "Avoid WebP/JPEG artifacts" },
  { href: "/guides/research-jpeg-vs-webp", label: "Research: JPEG vs WebP" },
  { href: "/guides/how-to-resize-images-for-instagram", label: "Resize images for Instagram" },
  { href: "/guides/languages", label: "Guides by language" },
  { href: "/guides/long-tail/compress-to-100kb-for-email", label: "Long-tail: compress to 100KB for email" },
  { href: "/guides/compress-to-500kb", label: "Compress to 500KB" },
  { href: "/guides/remove-exif-iphone", label: "Remove EXIF on iPhone" },
  { href: "/guides/post-500kb", label: "Social post ~500KB" },
  { href: "/guides/prepare-images-for-forms", label: "Prepare images for forms" },
  { href: "/guides/redact-screenshot-mac", label: "Redact screenshots on Mac" },
  { href: "/guides/anonymized-sharing", label: "Anonymized sharing" },
  { href: "/guides/long-tail/compress-to-500kb-for-instagram", label: "Long-tail: 500KB for Instagram" },
  { href: "/guides/es-comprimir-a-kb-objetivo", label: "ES: comprimir a KB objetivo" },
  { href: "/guides/id-kompres-ke-kb-target", label: "ID: kompres ke KB target" },
  { href: "/guides/pt-comprimir-para-kb-alvo", label: "PT: comprimir para KB alvo" },
  { href: "/guides/rename-rules", label: "Rename rules for batches" },
  { href: "/guides/resize-longest-side", label: "Resize longest side" },
  { href: "/guides/black-out-text-in-image", label: "Black out text in an image" },
  { href: "/guides/mobile-upload-limits", label: "Mobile upload limits" },
  { href: "/guides/image-seo-optimization", label: "Image SEO" },
  { href: "/guides/remove-gps-data-from-photos", label: "Remove GPS / EXIF from photos" },
  { href: "/guides/privacy-compliance", label: "Privacy & compliance" },
  { href: "/guides/research-500kb-quality-range", label: "Research: ~500KB quality range" },
  { href: "/guides/long-tail/compress-to-200kb-for-linkedin", label: "Long-tail: 200KB for LinkedIn" },
  { href: "/guides/redaction-checklist", label: "Redaction checklist" },
  { href: "/guides/compress-to-1mb", label: "Compress to 1MB" },
  { href: "/guides/jpeg-vs-webp-for-twitter", label: "JPEG vs WebP for Twitter" },
  { href: "/guides/tinypng-alternative-free-no-upload", label: "TinyPNG alternative (local, no upload)" },
  { href: "/guides/compress-image-to-100kb", label: "Compress images to 100KB" },
  { href: "/guides/how-to-reduce-image-file-size", label: "Reduce image file size" },
  { href: "/guides/how-to-compress-on-iphone", label: "Compress images on iPhone" },
  { href: "/guides/blur-face-in-photo", label: "Blur faces in photos" },
  { href: "/research", label: "Research hub (algorithms & privacy)" },
  { href: "/research/docs/compression-algorithm", label: "Docs: compression algorithm" },
  { href: "/research/docs/privacy-architecture", label: "Docs: privacy architecture" },
];

export default function GuidesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' }
      ]} />

      <div className="container" style={{ display: 'grid', gap: 16 }}>
        <div className="card">
          <h1>Image Processing Guides</h1>
          <p className="text-muted">
            Master image compression, conversion, and optimization with our comprehensive guides.
            All tools work offline in your browser—no uploads required.
          </p>
          <p className="text-muted" style={{ fontSize: 14, marginTop: 8, marginBottom: 0 }}>
            Last reviewed: April 2026.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
            <Link href="/compress" className="pill">Try Compressor</Link>
            <Link href="/redact" className="pill">Try Redactor</Link>
            <span className="pill-ghost">No upload</span>
            <span className="pill-ghost">Works offline</span>
          </div>
        </div>

        {guideCategories.map((category, index) => (
          <div key={index} className="card">
            <h2>{category.title}</h2>
            <p className="text-muted">{category.description}</p>

            <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
              {category.guides.map((guide, guideIndex) => (
                <Link
                  key={guideIndex}
                  href={guide.url}
                  style={{
                    display: 'block',
                    padding: '16px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: '#374151',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                    {guide.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                    {guide.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="card">
          <h2>Quick Start</h2>
          <p>New to image optimization? Start with these essential guides:</p>
          <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
            <Link href="/guides/complete-image-compression-guide" className="pill">
              📚 Complete Compression Guide
            </Link>
            <Link href="/guides/how-to-compress-image-without-losing-quality" className="pill">
              🎯 Quality vs Size Balance
            </Link>
            <Link href="/guides/platform-image-limits" className="pill">
              📱 Platform Requirements
            </Link>
          </div>
        </div>

        <div className="card">
          <h2>More guides (full index)</h2>
          <p className="text-muted">
            Direct links to popular and multilingual guides—including pages you may have seen under
            “Crawled – currently not indexed” in Search Console. Same URLs, stronger internal links from this hub.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 10,
              marginTop: 12,
            }}
          >
            {gscRecrawlHubLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="pill" style={{ justifyContent: "flex-start", textAlign: "left" }}>
                {label}
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 12 }}>
            <Link href="/guides/long-tail" className="pill">
              All long-tail guides (full list)
            </Link>
          </p>
        </div>

        <div className="card">
          <h2>Tools</h2>
          <p>Ready to optimize your images? Try our free tools:</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
            <Link href="/compress" className="pill">Image Compressor</Link>
            <Link href="/redact" className="pill">Privacy Redactor</Link>
            <Link href="/tools" className="pill">All Tools</Link>
          </div>
        </div>
      </div>
    </>
  );
}
