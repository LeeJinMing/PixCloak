"use client";
import { useMemo, useState } from "react";

export default function Client() {
  const [pxW, setPxW] = useState(3000);
  const [pxH, setPxH] = useState(2000);
  const [dpi, setDpi] = useState(300);
  const [unit, setUnit] = useState<'inch' | 'cm'>('inch');

  const widthInch = useMemo(() => pxW / dpi, [pxW, dpi]);
  const heightInch = useMemo(() => pxH / dpi, [pxH, dpi]);
  const widthCm = useMemo(() => widthInch * 2.54, [widthInch]);
  const heightCm = useMemo(() => heightInch * 2.54, [heightInch]);

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>DPI/PPI Converter</h1>
        <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
          <label>Pixels width <input className="input" type="number" value={pxW} onChange={(e) => setPxW(parseInt(e.target.value) || 0)} /></label>
          <label>Pixels height <input className="input" type="number" value={pxH} onChange={(e) => setPxH(parseInt(e.target.value) || 0)} /></label>
          <label>DPI/PPI <input className="input" type="number" value={dpi} onChange={(e) => setDpi(parseInt(e.target.value) || 1)} /></label>
          <label>Unit
            <select className="select" value={unit} onChange={(e) => setUnit(e.target.value as 'inch' | 'cm')} style={{ marginLeft: 8 }}>
              <option value="inch">inch</option>
              <option value="cm">cm</option>
            </select>
          </label>
        </div>
      </div>
      <div className="card">
        <h2 style={{ marginBottom: 8 }}>Result</h2>
        {unit === 'inch' ? (
          <div>{widthInch.toFixed(2)} × {heightInch.toFixed(2)} inches @ {dpi} DPI</div>
        ) : (
          <div>{widthCm.toFixed(2)} × {heightCm.toFixed(2)} cm @ {dpi} DPI</div>
        )}
        <div className="text-muted" style={{ marginTop: 8 }}>
          Common presets: 72 (web), 150 (draft print), 300 (standard print)
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'DPI/PPI Converter', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: '/tools/dpi-converter' }) }} />
    </div>
  );
}


