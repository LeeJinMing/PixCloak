"use client";
import { useRef, useState } from "react";

export default function Client() {
  const [title, setTitle] = useState("PixCloak");
  const [subtitle, setSubtitle] = useState("Privacy‑first image toolkit");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  function draw() {
    const canvas = canvasRef.current; if (!canvas) return;
    const W = 1200, H = 630; canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, W, H);
    const grad = ctx.createLinearGradient(0, 0, W, 0); grad.addColorStop(0, '#2563eb'); grad.addColorStop(1, '#10b981');
    ctx.fillStyle = grad; ctx.fillRect(0, H - 6, W, 6);
    ctx.fillStyle = '#fff';
    ctx.font = '700 64px system-ui,Segoe UI,Arial'; ctx.fillText(title, 60, 260);
    ctx.font = '400 36px system-ui,Segoe UI,Arial'; ctx.fillStyle = '#cbd5e1'; ctx.fillText(subtitle, 60, 330);
    ctx.font = '600 28px system-ui,Segoe UI,Arial'; ctx.fillStyle = '#93c5fd'; ctx.fillText('pixcloak.com', 60, 410);
  }

  function onDownload(type: 'image/png' | 'image/jpeg') {
    draw(); const canvas = canvasRef.current; if (!canvas) return;
    canvas.toBlob((b) => { if (!b) return; const url = URL.createObjectURL(b); const a = document.createElement('a'); a.href = url; a.download = type === 'image/png' ? 'og.png' : 'og.jpg'; a.click(); URL.revokeObjectURL(url); }, type, type === 'image/jpeg' ? 0.92 : undefined);
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>OG/Twitter Card Generator</h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" style={{ width: 320 }} />
          <input className="input" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Subtitle" style={{ width: 420 }} />
          <button className="button" onClick={() => draw()}>Preview</button>
          <button className="button button-success" onClick={() => onDownload('image/png')}>Download PNG</button>
          <button className="button button-dark" onClick={() => onDownload('image/jpeg')}>Download JPG</button>
        </div>
      </div>
      <div className="card" style={{ overflow: 'auto' }}>
        <canvas ref={canvasRef} width={1200} height={630} style={{ maxWidth: '100%', background: '#0f172a' }} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'OG/Twitter Card Generator', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: '/tools/og-card' }) }} />
    </div>
  );
}


