"use client";
import { useState } from "react";

export default function Client() {
  const [base, setBase] = useState('/image.jpg');
  const [widths, setWidths] = useState('480,768,1024,1280,1920');
  const [sizes, setSizes] = useState('(max-width: 768px) 100vw, 768px');

  const ws = widths.split(',').map(s => parseInt(s.trim())).filter(n => !Number.isNaN(n)).sort((a, b) => a - b);
  const srcset = ws.map(w => `${base.replace(/\.(\w+)$/, `-${w}w.$1`)} ${w}w`).join(', ');

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Responsive img srcset Generator</h1>
        <div style={{ display: 'grid', gap: 8 }}>
          <label>Base URL <input className="input" value={base} onChange={(e) => setBase(e.target.value)} /></label>
          <label>Widths <input className="input" value={widths} onChange={(e) => setWidths(e.target.value)} /></label>
          <label>Sizes <input className="input" value={sizes} onChange={(e) => setSizes(e.target.value)} /></label>
        </div>
      </div>
      <div className="card">
        <h2 style={{ marginBottom: 8 }}>Code</h2>
        <pre><code>{`<img src="${base}" srcset="${srcset}" sizes="${sizes}" alt="" />`}</code></pre>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'srcset Generator', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: '/tools/srcset-generator' }) }} />
    </div>
  );
}


