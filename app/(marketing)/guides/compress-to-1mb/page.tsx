import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/guides/compress-to-1mb',
    languages: {
      id: '/guides/id-kompres-menjadi-1mb',
    },
  },
};
export default function GuideCompress1MB() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Compress images to 1MB</h1>
        <ol>
          <li>Open <a href="/compress?kb=1024">/compress?kb=1024</a></li>
          <li>Set Format and Resize if needed, then Compress</li>
          <li>Download as ZIP for batches</li>
        </ol>
        <p className="text-muted">Use 1MB for portfolios or submissions with higher limits.</p>
      </div>
    </div>
  );
}


