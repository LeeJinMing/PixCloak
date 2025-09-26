"use client";
import { useMemo, useState } from "react";

function optimizeSvg(input: string): { out: string; saved: number } {
  const before = input.length;
  let out = input
    .replace(/<!--([\s\S]*?)-->/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/>\s+</g, "><")
    .replace(/<\?xml[^>]*>/g, "")
    .replace(/<!DOCTYPE[^>]*>/g, "")
    .replace(/\s+xmlns(:[a-zA-Z0-9-]+)?="[^"]*"/g, (m) => m)
    .replace(/\s+xmlns:xlink="http:\/\/www\.w3\.org\/1999\/xlink"/g, "")
    .replace(/\s+data-[a-zA-Z0-9-]+="[^"]*"/g, "")
    .replace(/\s+id="[^"]*"/g, "")
    .trim();
  out = out.replace(/([\s:=\(,])([0-9]+\.[0-9]{3,})(?=[\s\),])/g, (_, p1, num) => p1 + parseFloat(num).toFixed(2));
  const after = out.length;
  return { out, saved: Math.max(0, before - after) };
}

export default function Client() {
  const [src, setSrc] = useState('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120"><rect width="200" height="120" fill="#0ea5e9"/><text x="16" y="68" font-size="24" fill="#fff">PixCloak</text></svg>');
  const { out, saved } = useMemo(() => optimizeSvg(src), [src]);

  function download() {
    const blob = new Blob([out], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'optimized.svg'; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>SVG Optimizer</h1>
        <div className="text-muted" style={{ marginBottom: 8 }}>Minify comments/whitespace, trim floats, remove IDs/data attrs. 100% local。</div>
        <textarea className="input" value={src} onChange={(e) => setSrc(e.target.value)} style={{ height: 200 }} />
      </div>
      <div className="card">
        <h2 style={{ marginBottom: 8 }}>Optimized ({saved.toLocaleString()} bytes saved)</h2>
        <textarea className="input" value={out} readOnly style={{ height: 200 }} />
        <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="button button-success" onClick={download}>Download SVG</button>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'SVG Optimizer', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: '/tools/svg-optimizer' }) }} />
    </div>
  );
}


