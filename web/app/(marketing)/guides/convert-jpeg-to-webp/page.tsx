import type { Metadata } from 'next';
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Convert JPEG to WebP (Free, 30-50% Smaller) | PixCloak",
  description: "Change JPEG to WebP format and reduce file size by 30-50% with same quality. Free online converter works in browser—no upload, no limits.",
  alternates: {
    canonical: '/guides/convert-jpeg-to-webp',
    languages: {
      'x-default': '/guides/convert-jpeg-to-webp',
      en: '/guides/convert-jpeg-to-webp',
    },
  },
  openGraph: {
    title: "Convert JPEG to WebP (Free, 30-50% Smaller)",
    description: "Change JPEG to WebP and reduce file size by 30-50% with same quality. Free online converter, no upload needed.",
    url: "/guides/convert-jpeg-to-webp",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert JPEG to WebP",
    description: "30-50% smaller files. Same quality. Free converter, no upload.",
  },
};

export default function GuideJpegToWebp() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Convert JPEG to WebP (Free, 30-50% Smaller)', url: '/guides/convert-jpeg-to-webp' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Convert JPEG to WebP (smaller size, keeps quality)</h1>
        <ol>
          <li>Open <a href="/compress">/compress</a></li>
          <li>Set Format to <strong>WebP</strong>. Optionally set Target (KB).</li>
          <li>Click Compress, then Download or ZIP.</li>
        </ol>
        <p className="text-muted">WebP usually achieves smaller size than JPEG at the same visual quality.</p>
      </div>
      <FaqJsonLd
        items={[
          { question: "Why convert JPEG to WebP?", answer: "WebP produces 30-50% smaller file sizes than JPEG at equivalent visual quality. This means faster website loading, lower bandwidth costs, and better Core Web Vitals scores." },
          { question: "Do all browsers support WebP?", answer: "Yes. 95%+ of browsers support WebP (Chrome, Firefox, Edge, Safari 14+). For older browsers, provide JPEG fallbacks using <picture> tag." },
          { question: "Will WebP reduce image quality?", answer: "No. At equivalent quality settings, WebP and JPEG look the same. WebP simply compresses more efficiently." },
        ]}
      />
    </div>
    </>
  );
}


