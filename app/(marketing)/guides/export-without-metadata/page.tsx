import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/guides/export-without-metadata',
  },
};

export default function GuideExportNoMetadata() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Export images without metadata</h1>
        <ol>
          <li>Use <a href="/compress">/compress</a> or <a href="/redact">/redact</a></li>
          <li>Export as JPEG/WebP/PNG — EXIF/GPS is removed on re‑encode</li>
          <li>Optionally verify with an EXIF viewer</li>
        </ol>
        <p className="text-muted">All processing happens locally in your browser.</p>
      </div>
    </div>
  );
}


