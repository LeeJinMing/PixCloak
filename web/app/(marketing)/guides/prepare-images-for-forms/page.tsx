import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Prepare Images for Forms (200KB/500KB Presets)',
  description: 'Meet form limits fast: 200KB avatars, 500KB attachments. Use ready presets, resize to 1920px for phone photos, and export locally—no uploads needed.',
  alternates: { canonical: '/guides/prepare-images-for-forms' },
};

export default function GuideForms() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Prepare Images for Forms (200KB/500KB Presets)', url: '/guides/prepare-images-for-forms' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Prepare images for web forms</h1>
        <p style={{ marginBottom: 8 }}>
          <strong>Short answer:</strong> Most forms want ~200KB avatars and ~500KB attachments—use those presets, shrink phone shots to ~1920px first, then compress.
        </p>
        <p className="text-muted" style={{ fontSize: 14, marginBottom: 12 }}>Last reviewed: April 2026.</p>
        <ul>
          <li>Typical limits: 200KB (avatar), 500KB (attachments)</li>
          <li>Use presets: <a href="/compress?kb=200">200KB</a> / <a href="/compress?kb=500">500KB</a></li>
          <li>Resize longest side to 1920px for phone photos</li>
        </ul>
      </div>
    </div>
    </>
  );
}


