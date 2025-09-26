"use client";
import { useRef, useState } from "react";

type Ratio = { label: string; w: number; h: number };
const RATIOS: Ratio[] = [
  { label: '1:1', w: 1, h: 1 },
  { label: '4:3', w: 4, h: 3 },
  { label: '16:9', w: 16, h: 9 },
  { label: '3:2', w: 3, h: 2 },
];

export default function Client() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [bg, setBg] = useState('#ffffff');
  const [ratioIdx, setRatioIdx] = useState(0);
  const [outUrl, setOutUrl] = useState<string | null>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return; setPreview(URL.createObjectURL(f)); setOutUrl(null);
  }

  async function onPad() {
    if (!preview) return; const img = new Image(); img.src = preview; await img.decode();
    const r = RATIOS[ratioIdx]; const tgt = r.w / r.h; const src = img.width / img.height;
    let W = img.width, H = img.height; let cW = img.width, cH = img.height; let x = 0, y = 0;
    if (src > tgt) { H = Math.round(img.width / tgt); y = Math.round((H - img.height) / 2); cW = img.width; cH = img.height; }
    else if (src < tgt) { W = Math.round(img.height * tgt); x = Math.round((W - img.width) / 2); cW = img.width; cH = img.height; }
    const c = document.createElement('canvas'); c.width = W; c.height = H; const ctx = c.getContext('2d'); if (!ctx) return;
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H); ctx.drawImage(img, x, y, cW, cH);
    const b: Blob | null = await new Promise(res => c.toBlob(res, 'image/png'));
    if (!b) return; const url = URL.createObjectURL(b); setOutUrl(url);
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Aspect Ratio Padder</h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input ref={inputRef} type="file" accept="image/*" onChange={onPick} className="input" />
          <label>
            Ratio
            <select className="select" value={ratioIdx} onChange={(e) => setRatioIdx(parseInt(e.target.value))} style={{ marginLeft: 8 }}>
              {RATIOS.map((r, i) => (<option key={i} value={i}>{r.label}</option>))}
            </select>
          </label>
          <label>Background<input className="input" value={bg} onChange={(e) => setBg(e.target.value)} style={{ width: 140, marginLeft: 8 }} /></label>
          <button className="button" onClick={onPad} disabled={!preview}>Pad</button>
          {outUrl && <a className="button button-success" href={outUrl} download="padded.png">Download PNG</a>}
        </div>
      </div>
      {preview && (
        <div className="card" style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <div className="text-muted" style={{ marginBottom: 6 }}>Original</div>
            <img src={preview} alt="original" style={{ maxWidth: 240 }} />
          </div>
          {outUrl && (
            <div>
              <div className="text-muted" style={{ marginBottom: 6 }}>Padded</div>
              <img src={outUrl} alt="padded" style={{ maxWidth: 240 }} />
            </div>
          )}
        </div>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Aspect Ratio Padder', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: '/tools/aspect-pad' }) }} />
    </div>
  );
}


