import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/guides/compress-to-200kb',
    languages: {
      es: '/guides/es-comprimir-a-200kb',
    },
  },
};
export default function GuideCompress200KB() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Compress images to 200KB</h1>
        <ol>
          <li>Open <a href="/compress?kb=200">/compress?kb=200</a></li>
          <li>Drag images in, click Compress</li>
          <li>Download single files or ZIP for batch</li>
        </ol>
        <p className="text-muted">Tip: Downscale longest side (e.g., 1920px) before targeting 200KB for best quality.</p>
      </div>
    </div>
  );
}


