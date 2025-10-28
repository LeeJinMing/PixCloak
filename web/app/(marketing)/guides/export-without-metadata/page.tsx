import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Export Images Without Metadata (Remove EXIF/GPS) | PixCloak',
  description: 'Remove EXIF/GPS in your browser: open /compress or /redact and export as JPEG/WebP/PNG to clear metadata. 100% local processing, optional batch + ZIP.',
  alternates: {
    canonical: '/guides/export-without-metadata',
    languages: {
      'x-default': '/guides/export-without-metadata',
      en: '/guides/export-without-metadata',
      zh: '/guides/export-without-metadata-zh',
      es: '/guides/es-exportar-sin-metadatos',
      pt: '/guides/pt-exportar-sem-metadados',
      id: '/guides/id-ekspor-tanpa-metadata',
    },
  },
};

export default function GuideExportNoMetadata() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Export Images Without Metadata (Remove EXIF/GPS)', url: '/guides/export-without-metadata' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Export images without metadata</h1>
        <ol>
          <li>Use <a href="/compress">/compress</a> or <a href="/redact">/redact</a></li>
          <li>Export as JPEG/WebP/PNG — EXIF/GPS is removed on re‑encode</li>
          <li>Optionally verify with an EXIF viewer</li>
        </ol>
        <p className="text-muted">All processing happens locally in your browser.</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/press/plate-demo.gif" alt="metadata removal demo" loading="lazy" style={{ maxWidth: '100%', borderRadius: 8, border: '1px solid #eee' }} />
        <p className="text-muted">Tip: Some viewers cache old metadata; reopen the exported file to confirm it shows &quot;no EXIF&quot;.</p>
      </div>
    </div>
    </>
  );
}


