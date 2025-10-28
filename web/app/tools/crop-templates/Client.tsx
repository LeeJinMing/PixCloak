"use client";
import { useRef, useState } from "react";

type Ratio = { label: string; w: number; h: number };
const RATIOS: Ratio[] = [
  { label: '1:1', w: 1, h: 1 },
  { label: '4:3', w: 4, h: 3 },
  { label: '16:9', w: 16, h: 9 },
  { label: '2:3', w: 2, h: 3 },
];

export default function Client() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [ratio, setRatio] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return; setSrcUrl(URL.createObjectURL(f));
  }

  async function draw() {
    if (!srcUrl) return; const img = new Image(); img.src = srcUrl; await img.decode();
    const r = RATIOS[ratio];
    const srcR = img.width / img.height; const tgtR = r.w / r.h;
    let cw, ch; if (srcR > tgtR) { ch = img.height; cw = Math.round(ch * tgtR); } else { cw = img.width; ch = Math.round(cw / tgtR); }
    const cx = Math.round((img.width - cw) / 2), cy = Math.round((img.height - ch) / 2);
    const canvas = canvasRef.current!; canvas.width = cw; canvas.height = ch; const ctx = canvas.getContext('2d')!; ctx.drawImage(img, cx, cy, cw, ch, 0, 0, cw, ch);
  }

  function onDownload() {
    draw(); const c = canvasRef.current; if (!c) return; c.toBlob((b) => { if (!b) return; const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = 'crop.png'; a.click(); URL.revokeObjectURL(u); }, 'image/png');
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Crop Templates</h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input ref={inputRef} type="file" accept="image/*" onChange={onPick} className="input" />
          <label>Ratio
            <select className="select" value={ratio} onChange={(e) => setRatio(parseInt(e.target.value))} style={{ marginLeft: 8 }}>
              {RATIOS.map((r, i) => (<option key={i} value={i}>{r.label}</option>))}
            </select>
          </label>
          <button className="button" onClick={draw} disabled={!srcUrl}>Preview</button>
          <button className="button button-success" onClick={onDownload} disabled={!srcUrl}>Download</button>
        </div>
      </div>
      <div className="card" style={{ overflow: 'auto' }}>
        <canvas ref={canvasRef} style={{ maxWidth: '100%' }} />
      </div>
    </div>
  );
}


