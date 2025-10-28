import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research: Quality vs Size Curves (JPEG/WebP)",
  description: "Methodology to generate quality-size curves at target KBs and resolutions. Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
  alternates: { canonical: "/guides/research-quality-size-curves", languages: { "x-default": "/guides/research-quality-size-curves", en: "/guides/research-quality-size-curves" } },
};

type Point = { kb: number; jpegQ: number; webpQ: number };
const samplePhotos: Point[] = [
  { kb: 200, jpegQ: 0.62, webpQ: 0.55 },
  { kb: 300, jpegQ: 0.73, webpQ: 0.64 },
  { kb: 500, jpegQ: 0.84, webpQ: 0.75 },
  { kb: 800, jpegQ: 0.92, webpQ: 0.86 },
];
const sampleUI: Point[] = [
  { kb: 200, jpegQ: 0.70, webpQ: 0.62 },
  { kb: 300, jpegQ: 0.80, webpQ: 0.72 },
  { kb: 500, jpegQ: 0.90, webpQ: 0.84 },
  { kb: 800, jpegQ: 0.96, webpQ: 0.92 },
];

function toCsv(rows: Point[]): string {
  const head = "target_kb,jpeg_quality,webp_quality";
  const body = rows.map(r => `${r.kb},${r.jpegQ},${r.webpQ}`).join("\n");
  return head + "\n" + body;
}

export default function Page() {
  const csv = toCsv(samplePhotos);
  const dataUrl = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
  const W = 520, H = 240, P = 32;
  const kbMin = 200, kbMax = 800;
  const x = (kb: number) => P + ((kb - kbMin) / (kbMax - kbMin)) * (W - 2 * P);
  const y = (q: number) => H - P - (q - 0.5) * (H - 2 * P); // quality in [0.5,1.0]

  const jpegPathPhotos = samplePhotos.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(p.kb)} ${y(p.jpegQ)}`).join(' ');
  const webpPathPhotos = samplePhotos.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(p.kb)} ${y(p.webpQ)}`).join(' ');
  const jpegPathUI = sampleUI.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(p.kb)} ${y(p.jpegQ)}`).join(' ');
  const webpPathUI = sampleUI.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(p.kb)} ${y(p.webpQ)}`).join(' ');

  return (
    <div className="container" style={{ display: 'grid', gap: 16 }}>
      <div className="card">
        <h1>Research: Quality vs Size Curves</h1>
        <p className="text-muted">Reproducible method to benchmark JPEG/WebP at 1920px longest side and target KBs.</p>
        <ol style={{ paddingLeft: 18 }}>
          <li>Choose a CC0 dataset covering photos, UI, and screenshots.</li>
          <li>Normalize images to 1920px longest side.</li>
          <li>For each image and codec, sweep quality via binary search to hit 200/300/500/800KB.</li>
          <li>Record SSIM/PSNR and visual notes; export CSV.</li>
        </ol>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: 8 }}>Sample dataset (CSV)</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a className="pill" href={dataUrl} download="quality-size-sample.csv">Download CSV (inline)</a>
          <a className="pill" href="/research/quality-size-sample.csv" download>Download CSV (static)</a>
          <a className="pill" href="/research/quality-size-photos.csv" download>Photos CSV</a>
          <a className="pill" href="/research/quality-size-ui.csv" download>UI CSV</a>
        </div>
        <pre style={{ marginTop: 12, background: '#f9fafb', padding: 12, borderRadius: 8 }}><code>{csv}</code></pre>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: 8 }}>Preview chart</h2>
        <svg width={W} height={H} role="img" aria-label="Quality vs target KB">
          <rect x={0} y={0} width={W} height={H} fill="#fff" stroke="#e5e7eb" />
          {/* axes */}
          <line x1={P} y1={H - P} x2={W - P} y2={H - P} stroke="#9ca3af" />
          <line x1={P} y1={P} x2={P} y2={H - P} stroke="#9ca3af" />
          {/* labels */}
          <text x={W / 2} y={H - 6} textAnchor="middle" fontSize={12} fill="#6b7280">Target size (KB)</text>
          <text x={14} y={P - 8} fontSize={12} fill="#6b7280">Quality</text>
          {/* curves */}
          <path d={jpegPathPhotos} fill="none" stroke="#ef4444" strokeWidth={2} />
          <path d={webpPathPhotos} fill="none" stroke="#3b82f6" strokeWidth={2} />
          <path d={jpegPathUI} fill="none" stroke="#f59e0b" strokeDasharray="4 2" strokeWidth={2} />
          <path d={webpPathUI} fill="none" stroke="#10b981" strokeDasharray="4 2" strokeWidth={2} />
          {/* legend */}
          <circle cx={W - 200} cy={P} r={4} fill="#ef4444" /><text x={W - 190} y={P + 4} fontSize={12}>JPEG (photos)</text>
          <circle cx={W - 120} cy={P} r={4} fill="#3b82f6" /><text x={W - 110} y={P + 4} fontSize={12}>WebP (photos)</text>
          <rect x={W - 60} y={P - 4} width={8} height={8} fill="none" stroke="#f59e0b" strokeWidth={2} />
          <text x={W - 48} y={P + 4} fontSize={12}>JPEG (UI)</text>
          <rect x={W - 10} y={P - 4} width={8} height={8} fill="none" stroke="#10b981" strokeWidth={2} />
          <text x={W} y={P + 4} fontSize={12} textAnchor="start">WebP (UI)</text>
        </svg>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: 8 }}>Share</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a className="pill" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Quality vs Size curves for JPEG/WebP (local benchmark)')}&url=${encodeURIComponent('https://pixcloak.com/guides/research-quality-size-curves')}`} target="_blank" rel="noopener noreferrer">Share on Twitter</a>
          <a className="pill" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://pixcloak.com/guides/research-quality-size-curves')}`} target="_blank" rel="noopener noreferrer">Share on Facebook</a>
          <a className="pill" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://pixcloak.com/guides/research-quality-size-curves')}`} target="_blank" rel="noopener noreferrer">Share on LinkedIn</a>
        </div>
      </div>
    </div>
  );
}


