"use client";
import JSZip from "jszip";
import { useRef, useState } from "react";

type Item = { name: string; img: HTMLImageElement; w: number; h: number };

export default function Client() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [gap, setGap] = useState(2);
  const [cols, setCols] = useState(4);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const arr: Item[] = [];
    for (const f of files) { const img = new Image(); img.src = URL.createObjectURL(f); await img.decode(); arr.push({ name: f.name.replace(/\.[^.]+$/, ''), img, w: img.width, h: img.height }); }
    setItems(arr);
  }

  async function onGenerate() {
    if (items.length === 0) return;
    const colCount = Math.max(1, cols);
    const rows = Math.ceil(items.length / colCount);
    const cellW = Math.max(...items.map(i => i.w));
    const cellH = Math.max(...items.map(i => i.h));
    const W = colCount * cellW + (colCount - 1) * gap;
    const H = rows * cellH + (rows - 1) * gap;
    const c = document.createElement('canvas'); c.width = W; c.height = H; const ctx = c.getContext('2d'); if (!ctx) return;
    const mapping: Record<string, { x: number; y: number; w: number; h: number }> = {};
    items.forEach((it, idx) => { const r = Math.floor(idx / colCount); const cidx = idx % colCount; const x = cidx * (cellW + gap); const y = r * (cellH + gap); ctx.drawImage(it.img, x, y); mapping[it.name] = { x, y, w: it.w, h: it.h }; });
    const png: Blob | null = await new Promise(res => c.toBlob(res, 'image/png'));
    if (!png) return; const zip = new JSZip(); zip.file('sprite.png', png); zip.file('sprite.json', JSON.stringify({ cell: { w: cellW, h: cellH, gap }, mapping }, null, 2));
    const content = await zip.generateAsync({ type: 'blob' }); const url = URL.createObjectURL(content); const a = document.createElement('a'); a.href = url; a.download = 'sprite-sheet.zip'; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Sprite Sheet Generator</h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input ref={inputRef} type="file" accept="image/*" multiple onChange={onPick} className="input" />
          <label>Gap<input className="input" type="number" min={0} max={32} step={1} value={gap} onChange={(e) => setGap(parseInt(e.target.value) || 0)} style={{ width: 96, marginLeft: 8 }} /></label>
          <label>Columns<input className="input" type="number" min={1} max={12} step={1} value={cols} onChange={(e) => setCols(parseInt(e.target.value) || 1)} style={{ width: 96, marginLeft: 8 }} /></label>
          <button className="button button-success" onClick={onGenerate} disabled={items.length === 0}>Generate ZIP</button>
        </div>
      </div>
      {items.length > 0 && (
        <div className="card">
          <h2 style={{ marginBottom: 8 }}>Preview (first 6)</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {items.slice(0, 6).map((it, i) => <img key={i} src={it.img.src} alt={it.name} style={{ width: 96, height: 96, objectFit: 'contain', background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: 6 }} />)}
          </div>
        </div>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Sprite Sheet Generator', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: '/tools/sprite-sheet' }) }} />
    </div>
  );
}


