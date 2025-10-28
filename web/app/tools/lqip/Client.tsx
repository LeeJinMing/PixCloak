"use client";
import { useRef, useState } from "react";

export default function Client() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [lqip, setLqip] = useState<string | null>(null);
  const [width, setWidth] = useState(24);
  const [blur, setBlur] = useState(12);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return; setPreview(URL.createObjectURL(f));
    const img = new Image(); img.src = URL.createObjectURL(f); await img.decode();
    const ratio = img.height / img.width; const w = Math.max(8, Math.min(64, width)); const h = Math.round(w * ratio);
    const c = document.createElement('canvas'); c.width = w; c.height = h; const ctx = c.getContext('2d'); if (!ctx) return;
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'; ctx.drawImage(img, 0, 0, w, h);
    setLqip(c.toDataURL('image/jpeg', 0.5));
  }

  async function regen() {
    if (!preview) return; const img = new Image(); img.src = preview; await img.decode();
    const ratio = img.height / img.width; const w = Math.max(8, Math.min(64, width)); const h = Math.round(w * ratio);
    const c = document.createElement('canvas'); c.width = w; c.height = h; const ctx = c.getContext('2d'); if (!ctx) return;
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'; ctx.drawImage(img, 0, 0, w, h);
    setLqip(c.toDataURL('image/jpeg', 0.5));
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>LQIP Placeholder Generator</h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input ref={inputRef} type="file" accept="image/*" onChange={onPick} className="input" />
          <label>Width<input className="input" type="number" min={8} max={64} step={1} value={width} onChange={(e) => setWidth(parseInt(e.target.value) || 24)} style={{ width: 96, marginLeft: 8 }} /></label>
          <label>CSS Blur<input className="input" type="number" min={0} max={20} step={1} value={blur} onChange={(e) => setBlur(parseInt(e.target.value) || 12)} style={{ width: 96, marginLeft: 8 }} /></label>
          <button className="button" onClick={regen} disabled={!preview}>Regenerate</button>
        </div>
      </div>
      {preview && (
        <div className="card" style={{ display: 'grid', gap: 8 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <img src={preview} alt="preview" style={{ maxWidth: 240, height: 'auto', borderRadius: 8 }} />
            {lqip && (
              <div>
                <div className="text-muted" style={{ marginBottom: 6 }}>LQIP</div>
                <img src={lqip} alt="lqip" style={{ filter: `blur(${blur}px)`, borderRadius: 8 }} />
              </div>
            )}
          </div>
          {lqip && (
            <div>
              <h2 style={{ marginBottom: 8 }}>Data URL</h2>
              <textarea className="input" value={lqip} readOnly style={{ height: 120 }} />
              <div className="text-muted" style={{ marginTop: 6 }}>Use with CSS blur to create a pleasant placeholder.</div>
              <pre><code>{`<img src="${lqip.slice(0, 64)}..." style="filter: blur(${blur}px)" />`}</code></pre>
            </div>
          )}
        </div>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'LQIP Placeholder Generator', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: '/tools/lqip' }) }} />
    </div>
  );
}


