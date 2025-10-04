import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compress Images to 300KB (WebP/JPEG) | PixCloak',
  description: 'Hit 300KB quickly: choose WebP for smaller files (or JPEG for compatibility), resize longest side to 1920px, and export locally. Great balance for posts and forms.',
  alternates: { canonical: '/guides/compress-to-300kb', languages: { 'x-default': '/guides/compress-to-300kb', en: '/guides/compress-to-300kb' } },
};

export default function GuideCompress300KB() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Compress images to 300KB</h1>
        <ol>
          <li>Open <a href="/compress?kb=300">/compress?kb=300</a></li>
          <li>Set Format = WebP (try JPEG if needed)</li>
          <li>Resize longest side to 1920px for large photos</li>
        </ol>
        <p className="text-muted">300KB balances quality and speed for many posts and forms.</p>
      </div>
    </div>
  );
}


