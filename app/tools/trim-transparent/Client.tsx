"use client";
import { useRef, useState } from "react";

function findBoundingBox(img: ImageData, alphaThreshold = 1) {
  const { data, width, height } = img; let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) { for (let x = 0; x < width; x++) { const a = data[(y * width + x) * 4 + 3]; if (a >= alphaThreshold) { if (x < minX) minX = x; if (y < minY) minY = y; if (x > maxX) maxX = x; if (y > maxY) maxY = y; } } }
  if (maxX < 0 || maxY < 0) return { x: 0, y: 0, w: 0, h: 0 }; return { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
}

export default function Client() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [alpha, setAlpha] = useState(1);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) { const f = e.target.files?.[0]; if (!f) return; setPreview(URL.createObjectURL(f)); setOutUrl(null); }

  async function onTrim() {
    if (!preview) return; const img = new Image(); img.src = preview; await img.decode();
    const c1 = document.createElement('canvas'); c1.width = img.width; c1.height = img.height; const ctx1 = c1.getContext('2d'); if (!ctx1) return; ctx1.drawImage(img, 0, 0);
    const box = findBoundingBox(ctx1.getImageData(0, 0, c1.width, c1.height), Math.round(alpha * 255));
    const c2 = document.createElement('canvas'); c2.width = box.w; c2.height = box.h; const ctx2 = c2.getContext('2d'); if (!ctx2) return; ctx2.drawImage(c1, box.x, box.y, box.w, box.h, 0, 0, box.w, box.h);
    const b: Blob | null = await new Promise(res => c2.toBlob(res, 'image/png')); if (!b) return; const url = URL.createObjectURL(b); setOutUrl(url);
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Trim Transparent Edges</h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input ref={inputRef} type="file" accept="image/png,image/webp" onChange={onPick} className="input" />
          <label>Alpha threshold<input className="input" type="number" min={0} max={1} step={0.01} value={alpha} onChange={(e) => setAlpha(parseFloat(e.target.value) || 0)} style={{ width: 96, marginLeft: 8 }} /></label>
          <button className="button" onClick={onTrim} disabled={!preview}>Trim</button>
          {outUrl && <a className="button button-success" href={outUrl} download="trimmed.png">Download PNG</a>}
        </div>
      </div>
      {preview && (
        <div className="card" style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <div className="text-muted" style={{ marginBottom: 6 }}>Original</div>
            <img src={preview} alt="original" style={{ maxWidth: 240, background: 'repeating-conic-gradient(#e5e7eb 0% 25%, #ffffff 0% 50%) 50% / 20px 20px' }} />
          </div>
          {outUrl && (
            <div>
              <div className="text-muted" style={{ marginBottom: 6 }}>Trimmed</div>
              <img src={outUrl} alt="trimmed" style={{ maxWidth: 240, background: 'repeating-conic-gradient(#e5e7eb 0% 25%, #ffffff 0% 50%) 50% / 20px 20px' }} />
            </div>
          )}
        </div>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Trim Transparent Edges', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: '/tools/trim-transparent' }) }} />
    </div>
  );
}


