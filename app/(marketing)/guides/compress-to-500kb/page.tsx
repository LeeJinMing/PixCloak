import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/guides/compress-to-500kb',
    languages: {
      pt: '/guides/pt-comprimir-para-500kb',
    },
  },
};
export default function GuideCompress500KB() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Compress images to 500KB</h1>
        <ol>
          <li>Open <a href="/compress?kb=500">/compress?kb=500</a></li>
          <li>Drag photos in and click Compress</li>
          <li>Use Download ZIP to save all at once</li>
        </ol>
        <p className="text-muted">500KB fits many mobile/web forms; prefer WebP when possible.</p>
      </div>
    </div>
  );
}


