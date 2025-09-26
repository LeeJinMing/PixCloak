"use client";
import { useRef, useState } from "react";

type Preset = { label: string; w: number; h: number };
const PRESETS: Preset[] = [
  { label: 'Square 1024', w: 1024, h: 1024 },
  { label: 'YouTube 1280×720', w: 1280, h: 720 },
  { label: 'OG 1200×630', w: 1200, h: 630 },
  { label: 'Wide 1920×1080', w: 1920, h: 1080 },
];

export default function Client() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [text, setText] = useState('Placeholder');
  const [sub, setSub] = useState('pixcloak.com');
  const [bg, setBg] = useState('#0f172a');
  const [fg, setFg] = useState('#ffffff');
  const [preset, setPreset] = useState(0);

  function draw() {
    const p = PRESETS[preset]; const c = canvasRef.current; if (!c) return; c.width = p.w; c.height = p.h; const ctx = c.getContext('2d'); if (!ctx) return;
    ctx.fillStyle = bg; ctx.fillRect(0, 0, p.w, p.h);
    const grad = ctx.createLinearGradient(0, 0, p.w, 0); grad.addColorStop(0, '#2563eb'); grad.addColorStop(1, '#10b981');
    ctx.fillStyle = grad; ctx.fillRect(0, p.h - 6, p.w, 6);
    ctx.fillStyle = fg;
    const titleSize = Math.max(32, Math.round(p.w * 0.06));
    ctx.font = `700 ${titleSize}px system-ui,Segoe UI,Arial`; ctx.textBaseline = 'middle';
    ctx.fillText(text, 48, Math.round(p.h / 2 - titleSize * 0.5));
    ctx.font = `400 ${Math.round(titleSize * 0.5)}px system-ui,Segoe UI,Arial`; ctx.fillStyle = '#cbd5e1';
    ctx.fillText(sub, 48, Math.round(p.h / 2 + titleSize * 0.7));
  }

  function onDownload() {
    draw(); const c = canvasRef.current; if (!c) return; c.toBlob((b) => { if (!b) return; const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = 'placeholder.jpg'; a.click(); URL.revokeObjectURL(u); }, 'image/jpeg', 0.92);
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Text Placeholder</h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <label>Preset
            <select className="select" value={preset} onChange={(e) => setPreset(parseInt(e.target.value))} style={{ marginLeft: 8 }}>
              {PRESETS.map((p, i) => (<option key={i} value={i}>{p.label}</option>))}
            </select>
          </label>
          <input className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Title" />
          <input className="input" value={sub} onChange={(e) => setSub(e.target.value)} placeholder="Subtitle/brand" />
          <label>BG<input className="input" value={bg} onChange={(e) => setBg(e.target.value)} style={{ width: 120, marginLeft: 8 }} /></label>
          <label>FG<input className="input" value={fg} onChange={(e) => setFg(e.target.value)} style={{ width: 120, marginLeft: 8 }} /></label>
          <button className="button" onClick={draw}>Preview</button>
          <button className="button button-success" onClick={onDownload}>Download JPG</button>
        </div>
      </div>
      <div className="card" style={{ overflow: 'auto' }}>
        <canvas ref={canvasRef} style={{ maxWidth: '100%', background: '#0f172a' }} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Text Placeholder', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: '/tools/text-placeholder' }) }} />
    </div>
  );
}


