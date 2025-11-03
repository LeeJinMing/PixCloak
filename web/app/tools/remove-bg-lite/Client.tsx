"use client";
import { useRef, useState } from "react";

function dist2(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number) { const dr = r1 - r2, dg = g1 - g2, db = b1 - b2; return dr * dr + dg * dg + db * db; }

export default function Client() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [pick, setPick] = useState<[number, number, number] | null>(null);
  const [tol, setTol] = useState(900);
  const [outUrl, setOutUrl] = useState<string | null>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) { const f = e.target.files?.[0]; if (!f) return; const url = URL.createObjectURL(f); setPreview(url); setOutUrl(null); }

  async function onCanvasClick(e: React.MouseEvent<HTMLImageElement>) {
    if (!preview) return; const imgEl = e.currentTarget; const rect = imgEl.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (imgEl.naturalWidth / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (imgEl.naturalHeight / rect.height));
    const c = document.createElement('canvas'); c.width = imgEl.naturalWidth; c.height = imgEl.naturalHeight; const ctx = c.getContext('2d'); if (!ctx) return; const img = new Image(); img.src = preview; await img.decode(); ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(x, y, 1, 1).data; setPick([d[0], d[1], d[2]]);
  }

  async function onRemove() {
    if (!preview || !pick) return; const img = new Image(); img.src = preview; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const ctx = c.getContext('2d'); if (!ctx) return; ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, c.width, c.height); const arr = data.data;
    for (let i = 0; i < arr.length; i += 4) { const r = arr[i], g = arr[i + 1], b = arr[i + 2]; if (dist2(r, g, b, pick[0], pick[1], pick[2]) <= tol) { arr[i + 3] = 0; } }
    ctx.putImageData(data, 0, 0);
    const b: Blob | null = await new Promise(res => c.toBlob(res, 'image/png'));
    if (!b) return; const url = URL.createObjectURL(b); setOutUrl(url);
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h2>Remove BG (Lite)</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input ref={inputRef} type="file" accept="image/*" onChange={onPick} className="input" />
          <label>Tolerance<input className="input" type="number" min={50} max={4000} step={50} value={tol} onChange={(e) => setTol(parseInt(e.target.value) || 900)} style={{ width: 120, marginLeft: 8 }} /></label>
          <button className="button" onClick={onRemove} disabled={!preview || !pick}>Remove</button>
          {outUrl && <a className="button button-success" href={outUrl} download="no-bg.png">Download PNG</a>}
        </div>
      </div>
      {preview && (
        <div className="card" style={{ display: 'grid', gap: 8 }}>
          <div className="text-muted">Click the background color to sample</div>
          <img src={preview} alt="preview" style={{ maxWidth: 420, background: 'repeating-conic-gradient(#e5e7eb 0% 25%, #ffffff 0% 50%) 50% / 20px 20px' }} onClick={onCanvasClick} />
          {pick && <div className="pill-ghost">Picked RGB: {pick[0]}, {pick[1]}, {pick[2]}</div>}
          {outUrl && <img src={outUrl} alt="out" style={{ maxWidth: 420, background: 'repeating-conic-gradient(#e5e7eb 0% 25%, #ffffff 0% 50%) 50% / 20px 20px' }} />}
        </div>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Remove BG (Lite)', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: '/tools/remove-bg-lite' }) }} />
    </div>
  );
}


