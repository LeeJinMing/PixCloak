import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Compress Images to 800KB (High‑Quality) | PixCloak',
  description: 'Target 800KB for higher‑quality posts and submissions. Use WebP for smaller size or JPEG for compatibility; resize longest side if needed.',
  alternates: { canonical: '/guides/compress-to-800kb', languages: { 'x-default': '/guides/compress-to-800kb', en: '/guides/compress-to-800kb' } },
};

export default function GuideCompress800KB() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Compress Images to 800KB (High‑Quality)', url: '/guides/compress-to-800kb' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Compress images to 800KB</h1>
        <p style={{ marginBottom: 8 }}>
          <strong>Short answer:</strong> Use <a href="/compress?kb=800">/compress?kb=800</a>—WebP for smaller bytes, JPEG when you need broad compatibility; downscale first if the original is very large.
        </p>
        <p className="text-muted" style={{ fontSize: 14, marginBottom: 12 }}>Last reviewed: April 2026.</p>
        <ol>
          <li>Open <a href="/compress?kb=800">/compress?kb=800</a></li>
          <li>Use WebP for smaller size; JPEG for compatibility</li>
          <li>Resize longest side if files are huge</li>
        </ol>
        <p className="text-muted">Good for higher‑quality posts and submissions.</p>
      </div>
    </div>
    </>
  );
}


