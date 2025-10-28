"use client";
import { useEffect, useRef, useState } from "react";

type Pos = 'tl' | 'tr' | 'bl' | 'br' | 'center';

export default function Client() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [text, setText] = useState('PixCloak');
  const [opacity, setOpacity] = useState(0.3);
  const [size, setSize] = useState(48);
  const [pos, setPos] = useState<Pos>('br');
  const [font] = useState('600 48px system-ui, Segoe UI, Arial');

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) { const f = e.target.files?.[0]; if (!f) return; setPreviewUrl(URL.createObjectURL(f)); }

  function drawOnCanvas(canvas: HTMLCanvasElement, img: CanvasImageSource, w: number, h: number) {
    const ctx = canvas.getContext('2d'); if (!ctx) return; canvas.width = w; canvas.height = h; ctx.drawImage(img, 0, 0, w, h);
    ctx.globalAlpha = opacity; ctx.fillStyle = '#000';
    const f = font.replace(/\d+px/, `${size}px`); ctx.font = f; ctx.textBaseline = 'bottom';
    const metrics = ctx.measureText(text); const pad = Math.round(Math.max(12, size * 0.4));
    let x = pad, y = h - pad;
    if (pos === 'tr') { x = w - pad - metrics.width; y = h - pad; }
    if (pos === 'tl') { x = pad; y = h - pad; }
    if (pos === 'bl') { x = pad; y = h - pad; }
    if (pos === 'br') { x = w - pad - metrics.width; y = h - pad; }
    if (pos === 'center') { x = (w - metrics.width) / 2; y = h / 2; }
    ctx.fillText(text, x, y);
    ctx.globalAlpha = 1;
  }

  async function onDownload() {
    const f = inputRef.current?.files?.[0]; if (!f) return; const img = new Image(); img.src = URL.createObjectURL(f); await img.decode();
    const c = document.createElement('canvas'); drawOnCanvas(c, img, img.width, img.height);
    c.toBlob((b) => { if (!b) return; const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = 'watermark.jpg'; a.click(); URL.revokeObjectURL(u); }, 'image/jpeg', 0.92);
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Text Watermark</h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input ref={inputRef} type="file" accept="image/*" onChange={onPick} className="input" />
          <input className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Watermark text" />
          <label>Opacity<input className="input" type="number" min={0.05} max={1} step={0.05} value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value) || 0.3)} style={{ width: 96, marginLeft: 8 }} /></label>
          <label>Font size<input className="input" type="number" min={12} max={200} step={2} value={size} onChange={(e) => setSize(parseInt(e.target.value) || 48)} style={{ width: 96, marginLeft: 8 }} /></label>
          <label>Position
            <select className="select" value={pos} onChange={(e) => setPos(e.target.value as Pos)} style={{ marginLeft: 8 }}>
              <option value="br">Bottom‑right</option>
              <option value="bl">Bottom‑left</option>
              <option value="tr">Top‑right</option>
              <option value="tl">Top‑left</option>
              <option value="center">Center</option>
            </select>
          </label>
          <button className="button button-success" onClick={onDownload} disabled={!previewUrl}>Download</button>
        </div>
      </div>
      {previewUrl && (
        <div className="card" style={{ overflow: 'auto' }}>
          <Preview url={previewUrl} draw={drawOnCanvas} size={size} text={text} pos={pos} opacity={opacity} font={font} />
        </div>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Text Watermark', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: '/tools/watermark' }) }} />
    </div>
  );
}

function Preview({ url, draw, size, text, pos, opacity, font }: { url: string; draw: (c: HTMLCanvasElement, img: CanvasImageSource, w: number, h: number) => void; size: number; text: string; pos: Pos; opacity: number; font: string; }) {
  const [imgW, setImgW] = useState<number | null>(null);
  const [imgH, setImgH] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Decode image and compute intrinsic size without using <img> element
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.src = url;
    img.decode().then(() => {
      if (cancelled) return;
      setImgW(img.naturalWidth);
      setImgH(img.naturalHeight);
      setReady(true);
    }).catch(() => { });
    return () => { cancelled = true; };
  }, [url]);
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <canvas ref={canvasRef} style={{ maxWidth: '100%' }} />
      {ready && imgW && imgH && (
        <Render draw={draw} canvasRef={canvasRef} url={url} imgW={imgW} imgH={imgH} size={size} text={text} pos={pos} opacity={opacity} font={font} />
      )}
    </div>
  );
}

function Render({ draw, canvasRef, url, imgW, imgH, size, text, pos, opacity, font }: { draw: (c: HTMLCanvasElement, img: CanvasImageSource, w: number, h: number) => void; canvasRef: React.MutableRefObject<HTMLCanvasElement | null>; url: string; imgW: number; imgH: number; size: number; text: string; pos: Pos; opacity: number; font: string; }) {
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.src = url;
    img.decode().then(() => {
      if (cancelled) return;
      if (canvasRef.current) { draw(canvasRef.current, img, imgW, imgH); }
    }).catch(() => { });
    return () => { cancelled = true; };
  }, [draw, canvasRef, url, imgW, imgH, size, text, pos, opacity, font]);
  return null;
}


