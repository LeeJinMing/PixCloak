import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/guides/remove-exif-iphone',
    languages: {
      zh: '/guides/remove-exif-iphone-zh',
    },
  },
};

export default function GuideRemoveExifIphone() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Remove EXIF/GPS from iPhone photos</h1>
        <ol>
          <li>Open <a href="/compress">/compress</a> or <a href="/redact">/redact</a></li>
          <li>Export as JPEG/WebP — EXIF/GPS is removed by re‑encoding</li>
          <li>Verify with any EXIF viewer (should show none)</li>
        </ol>
        <p className="text-muted">Removal happens locally in your browser; no upload.</p>
      </div>
    </div>
  );
}


