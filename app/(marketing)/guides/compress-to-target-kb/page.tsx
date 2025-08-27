import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/guides/compress-to-target-kb',
    languages: {
      'x-default': '/guides/compress-to-target-kb',
      en: '/guides/compress-to-target-kb',
      zh: '/guides/compress-to-target-kb-zh',
      es: '/guides/es-comprimir-a-kb-objetivo',
      pt: '/guides/pt-comprimir-para-kb-alvo',
      id: '/guides/id-kompres-ke-kb-target',
    },
  },
};

export default function GuideTargetKB() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Compress Images to a Target Size (200KB/500KB)</h1>
        <p>This guide shows how to use the Target (KB) mode to meet common upload limits like 200KB/500KB.</p>
        <ol>
          <li>Open <a href="/compress?kb=200">/compress?kb=200</a> or <a href="/compress?kb=500">/compress?kb=500</a></li>
          <li>Drag multiple images into the area, then click Compress.</li>
          <li>Download the results with ZIP.</li>
        </ol>
        <h2>Notes</h2>
        <ul>
          <li>The target size is an approximation. The frontend uses binary search and is usually within a few KB.</li>
          <li>For even smaller sizes, lower quality or reduce resolution first.</li>
        </ul>
        <p>All processing happens locally in your browser; nothing is uploaded.</p>
      </div>
    </div>
  );
}


