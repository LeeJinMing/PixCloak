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
