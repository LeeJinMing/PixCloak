"use client";
import { useRef, useState } from "react";

export default function Client() {
  const aRef = useRef<HTMLInputElement | null>(null);
  const bRef = useRef<HTMLInputElement | null>(null);
  const [aUrl, setAUrl] = useState<string | null>(null);
  const [bUrl, setBUrl] = useState<string | null>(null);
  const [split, setSplit] = useState(50);
  const diffCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [busy, setBusy] = useState(false);

  async function onPickA(e: React.ChangeEvent<HTMLInputElement>) { const f = e.target.files?.[0]; if (!f) return; setAUrl(URL.createObjectURL(f)); }
  async function onPickB(e: React.ChangeEvent<HTMLInputElement>) { const f = e.target.files?.[0]; if (!f) return; setBUrl(URL.createObjectURL(f)); }

  async function computeDiff() {
    if (!aUrl || !bUrl) return; setBusy(true);
    try {
      const imgA = new Image(); imgA.src = aUrl; const imgB = new Image(); imgB.src = bUrl; await Promise.all([imgA.decode(), imgB.decode()]);
      const W = Math.min(imgA.width, imgB.width); const H = Math.min(imgA.height, imgB.height);
      const ca = document.createElement('canvas'); ca.width = W; ca.height = H; const cta = ca.getContext('2d'); if (!cta) return; cta.drawImage(imgA, 0, 0, W, H);
      const cb = document.createElement('canvas'); cb.width = W; cb.height = H; const ctb = cb.getContext('2d'); if (!ctb) return; ctb.drawImage(imgB, 0, 0, W, H);
      const da = cta.getImageData(0, 0, W, H); const db = ctb.getImageData(0, 0, W, H);
      const out = cta.createImageData(W, H); const a = da.data, b = db.data, o = out.data;
      for (let i = 0; i < a.length; i += 4) {
        const dr = Math.abs(a[i] - b[i]); const dg = Math.abs(a[i + 1] - b[i + 1]); const dbv = Math.abs(a[i + 2] - b[i + 2]);
        const d = Math.max(dr, dg, dbv);
        o[i] = 255; o[i + 1] = 0; o[i + 2] = 0; o[i + 3] = d;
      }
      const c = diffCanvasRef.current; if (!c) return; c.width = W; c.height = H; const ctx = c.getContext('2d'); if (!ctx) return; ctx.putImageData(out, 0, 0);
    } finally { setBusy(false); }
  }

  function downloadDiff() {
    const c = diffCanvasRef.current; if (!c) return; c.toBlob((b) => { if (!b) return; const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = 'diff.png'; a.click(); URL.revokeObjectURL(u); }, 'image/png');
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Image Diff</h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input ref={aRef} type="file" accept="image/*" onChange={onPickA} className="input" />
          <input ref={bRef} type="file" accept="image/*" onChange={onPickB} className="input" />
          <label>Slider<input className="input" type="range" min={0} max={100} value={split} onChange={(e) => setSplit(parseInt(e.target.value))} style={{ width: 200, marginLeft: 8 }} /></label>
          <button className="button" onClick={computeDiff} disabled={!aUrl || !bUrl || busy}>{busy ? 'Computing…' : 'Compute pixel diff'}</button>
          <button className="button button-success" onClick={downloadDiff} disabled={busy}>Download diff</button>
        </div>
      </div>
      {(aUrl && bUrl) && (
        <div className="card" style={{ display: 'grid', gap: 8 }}>
          <h2 style={{ marginBottom: 4 }}>Slider compare</h2>
          <div style={{ position: 'relative', width: 'min(100%, 640px)' }}>
            <img src={bUrl} alt="B" style={{ display: 'block', width: '100%' }} />
            <img src={aUrl} alt="A" style={{ position: 'absolute', inset: 0, width: '100%', clipPath: `inset(0 ${100 - split}% 0 0)` }} />
          </div>
        </div>
      )}
      <div className="card" style={{ overflow: 'auto' }}>
        <h2 style={{ marginBottom: 4 }}>Pixel diff</h2>
        <canvas ref={diffCanvasRef} style={{ maxWidth: '100%', background: 'repeating-conic-gradient(#e5e7eb 0% 25%, #ffffff 0% 50%) 50% / 20px 20px' }} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Image Diff', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: '/tools/image-diff' }) }} />
    </div>
  );
}


