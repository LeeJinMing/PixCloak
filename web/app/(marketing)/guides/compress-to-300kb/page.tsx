import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Compress Images to 300KB (WebP/JPEG)',
  description: 'Compress to 300KB for posts and forms. Choose WebP or JPEG, resize to 1920px if needed. Balances quality and size. Works offline, no uploads, under 1 minute.',
  alternates: { canonical: '/guides/compress-to-300kb', languages: { 'x-default': '/guides/compress-to-300kb', en: '/guides/compress-to-300kb' } },
};

export default function GuideCompress300KB() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Compress Images to 300KB (WebP/JPEG)', url: '/guides/compress-to-300kb' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>Compress images to 300KB</h1>
          <p style={{ marginBottom: 8 }}>
            <strong>Short answer:</strong> Open <a href="/compress?kb=300">/compress?kb=300</a>, pick WebP or JPEG, resize long side to 1920px if the source is huge, then export.
          </p>
          <p className="text-muted" style={{ fontSize: 14, marginBottom: 12 }}>Last reviewed: April 2026.</p>
          <ol>
            <li>Open <a href="/compress?kb=300">/compress?kb=300</a></li>
            <li>Set Format = WebP (try JPEG if needed)</li>
            <li>Resize longest side to 1920px for large photos</li>
          </ol>
          <p className="text-muted">300KB balances quality and speed for many posts and forms.</p>
        </div>
      </div>
    </>
  );
}


