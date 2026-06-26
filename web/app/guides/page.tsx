import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import { CORE_GUIDE_HUB_LINKS } from "@/lib/seo/coreUrls";

export const metadata: Metadata = {
  title: "Image Guides: Compress, Redact, Remove EXIF",
  description: "Compress to 100KB–1MB, blur faces, redact license plates, remove WeChat EXIF/GPS. Local browser tools—no uploads.",
  alternates: { canonical: "/guides" },
};

const guideCategories = [
  {
    title: "Priority guides (high traffic)",
    description: "Start with these—matched to common search queries and form-upload limits.",
    guides: [
      { title: "Blur face online free", url: "/guides/blur-face-in-photo", description: "Pixelate or block faces before sharing. No upload; EXIF/GPS stripped." },
      { title: "Compress to 100KB", url: "/guides/compress-image-to-100kb", description: "Passport, visa, and government form limits. Exact KB target." },
      { title: "Compress to 200KB", url: "/guides/compress-to-200kb", description: "LinkedIn, resumes, and job applications." },
      { title: "WeChat EXIF & GPS", url: "/guides/remove-exif-wechat", description: "Does WeChat remove metadata? Safe workflow before sending." },
      { title: "TinyPNG alternative", url: "/guides/tinypng-alternative-free-no-upload", description: "Unlimited local compression—no upload, no monthly cap." },
      { title: "Redact vs blur license plate", url: "/guides/license-plate-redaction", description: "Why pixelate beats soft blur for plates." },
    ],
  },
  {
    title: "Compression Guides",
    description: "Learn how to compress images to specific file sizes Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
    guides: [
      { title: "Complete Image Compression Guide", url: "/guides/complete-image-compression-guide", description: "Master image compression with our comprehensive guide Process images offline in your browser. 100% free, no uploads, privacy guaranteed." },
      { title: "Compress to 200KB", url: "/guides/compress-to-200kb", description: "Perfect for LinkedIn profiles and social media Process images offline in your browser. 100% free, no uploads, privacy guaranteed." },
      { title: "Compress to 500KB", url: "/guides/compress-to-500kb", description: "Ideal for Instagram posts and web content Process images offline in your browser. 100% free, no uploads, privacy guaranteed." },
      { title: "Compress to 1MB", url: "/guides/compress-to-1mb", description: "High quality for portfolios and presentations Process images offline in your browser. 100% free, no uploads, privacy guaranteed." },
    ]
  },
  {
    title: "Format Conversion",
    description: "Convert between different image formats Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
    guides: [
      { title: "JPEG vs WebP", url: "/guides/jpeg-vs-webp-size-quality", description: "Choose the right format for your needs Process images offline in your browser. 100% free, no uploads, privacy guaranteed." },
      { title: "Convert JPEG to WebP", url: "/guides/convert-jpeg-to-webp", description: "Reduce file size with modern formats Process images offline in your browser. 100% free, no uploads, privacy guaranteed." },
      { title: "PNG vs JPG", url: "/guides/png-vs-jpg-when-to-use-each", description: "When to use PNG vs JPEG Process images offline in your browser. 100% free, no uploads, privacy guaranteed." },
    ]
  },
  {
    title: "Privacy & Security",
    description: "Remove metadata and protect your privacy Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
    guides: [
      { title: "Remove EXIF Data", url: "/guides/exif-gps-removal", description: "Strip location and camera data from photos Process images offline in your browser. 100% free, no uploads, privacy guaranteed." },
      { title: "Remove EXIF from iPhone", url: "/guides/remove-exif-iphone", description: "iPhone-specific EXIF removal guide Process images offline in your browser. 100% free, no uploads, privacy guaranteed." },
      { title: "Privacy Compliance", url: "/guides/privacy-compliance", description: "GDPR and privacy best practices Process images offline in your browser. 100% free, no uploads, privacy guaranteed." },
    ]
  },
  {
    title: "Platform Optimization",
    description: "Optimize images for specific platforms Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
    guides: [
      { title: "Instagram Image Sizes", url: "/guides/how-to-resize-images-for-instagram", description: "Perfect dimensions for Instagram posts Process images offline in your browser. 100% free, no uploads, privacy guaranteed." },
      { title: "LinkedIn Profile Photos", url: "/guides/compress-to-200kb", description: "Professional headshots for LinkedIn Process images offline in your browser. 100% free, no uploads, privacy guaranteed." },
      { title: "Platform Image Limits", url: "/guides/platform-image-limits", description: "File size limits across platforms Process images offline in your browser. 100% free, no uploads, privacy guaranteed." },
    ]
  },
  {
    title: "Advanced Techniques",
    description: "Professional image optimization techniques Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
    guides: [
      { title: "Batch Processing", url: "/guides/zip-batch-download", description: "Process multiple images at once Process images offline in your browser. 100% free, no uploads, privacy guaranteed." },
      { title: "Image SEO", url: "/guides/image-seo-optimization", description: "Optimize images for search engines Process images offline in your browser. 100% free, no uploads, privacy guaranteed." },
      { title: "Quality vs Size", url: "/guides/how-to-compress-image-without-losing-quality", description: "Balance quality and file size Process images offline in your browser. 100% free, no uploads, privacy guaranteed." },
    ]
  }
];

/** Long-tail index only—avoid diluting link equity from the main hub. */
const secondaryGuideLinks: { href: string; label: string }[] = [
  { href: "/guides/how-to-compress-image-without-losing-quality", label: "Compress without losing quality" },
  { href: "/guides/how-to-reduce-image-file-size", label: "Reduce image file size" },
  { href: "/guides/platform-image-limits", label: "Platform image limits" },
  { href: "/guides/export-without-metadata", label: "Export without metadata" },
  { href: "/guides/black-out-text-in-image", label: "Black out text in image" },
  { href: "/guides/blur-number-plate-online", label: "Blur number plate (UK)" },
  { href: "/guides/long-tail", label: "All long-tail guides" },
  { href: "/guides/languages", label: "Guides by language" },
];

export default function GuidesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' }
      ]} />

      <div style={{ display: 'grid', gap: 16 }}>
        <div className="card">
          <h1 className="page-hero-title">Image Processing Guides</h1>
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
              Complete compression guide
            </Link>
            <Link href="/guides/how-to-compress-image-without-losing-quality" className="pill">
              Quality vs size balance
            </Link>
            <Link href="/guides/platform-image-limits" className="pill">
              Platform requirements
            </Link>
          </div>
        </div>

        <div className="card">
          <h2>Core tools</h2>
          <p className="text-muted">Highest-value entry points—use these before browsing every guide.</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
            <Link href="/compress" className="pill">Image compressor</Link>
            <Link href="/redact" className="pill">Image redactor</Link>
            <Link href="/zh" className="pill">中文站 /zh</Link>
          </div>
        </div>

        <div className="card">
          <h2>Priority guides</h2>
          <p className="text-muted">
            Curated for common searches (blur face, 100KB/200KB forms, WeChat EXIF, TinyPNG alternative, plate redaction).
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 10,
              marginTop: 12,
            }}
          >
            {CORE_GUIDE_HUB_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="pill" style={{ justifyContent: "flex-start", textAlign: "left" }}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>More guides</h2>
          <p className="text-muted">
            Additional topics and multilingual pages. For the full long-tail list, see the dedicated index.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 10,
              marginTop: 12,
            }}
          >
            {secondaryGuideLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="pill" style={{ justifyContent: "flex-start", textAlign: "left" }}>
                {label}
              </Link>
            ))}
          </div>
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
