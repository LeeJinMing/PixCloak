"use client";
import JSZip from "jszip";
import { useRef, useState } from "react";

async function drawIcon(src: HTMLImageElement, size: number): Promise<Blob> {
  const canvas = document.createElement('canvas'); canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d'); if (!ctx) throw new Error('Canvas');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, size, size);
  ctx.drawImage(src, 0, 0, size, size);
  const b: Blob | null = await new Promise(res => canvas.toBlob(res, 'image/png'));
  if (!b) throw new Error('toBlob');
  return b;
}

export default function Client() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return; setPreview(URL.createObjectURL(f));
  }

  async function onGenerate() {
    const f = inputRef.current?.files?.[0]; if (!f) return;
    const img = new Image(); img.src = URL.createObjectURL(f); await img.decode();
    const sizes = [16, 32, 48, 64, 128, 192, 256, 512];
    const zip = new JSZip();
    for (const s of sizes) { const b = await drawIcon(img, s); zip.file(`icon-${s}.png`, b); }
    const manifest = { icons: sizes.map(s => ({ src: `/icon-${s}.png`, sizes: `${s}x${s}`, type: 'image/png' })) };
    zip.file('manifest.json', JSON.stringify(manifest, null, 2));
    const content = await zip.generateAsync({ type: 'blob' }); const url = URL.createObjectURL(content);
    const a = document.createElement('a'); a.href = url; a.download = 'favicon-pack.zip'; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h2>Favicon Pack Generator</h2>
        <p className="text-muted">Upload a square image, generate multiple favicon/manifest icons and download ZIP.</p>
        <input ref={inputRef} type="file" accept="image/*" onChange={onPick} className="input" />
        <button className="button" onClick={onGenerate} disabled={!preview}>Generate ZIP</button>
      </div>
      {preview && (
        <div className="card" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <img src={preview} alt="preview" style={{ width: 128, height: 128, border: '1px solid #e5e7eb', borderRadius: 8 }} />
          <div className="text-muted">Preview • Ensure the source is square for best quality</div>
        </div>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Favicon Pack Generator', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: '/tools/favicon-pack' }) }} />
    </div>
  );
}


