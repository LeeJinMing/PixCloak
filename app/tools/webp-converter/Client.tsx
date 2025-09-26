"use client";
import JSZip from "jszip";
import { useRef, useState } from "react";

async function convertToWebp(file: File, quality = 0.92): Promise<Blob> {
  const img = await createImageBitmap(file);
  const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const ctx = c.getContext('2d'); if (!ctx) throw new Error('Canvas');
  ctx.drawImage(img, 0, 0);
  const b: Blob | null = await new Promise(res => c.toBlob(res, 'image/webp', quality));
  if (!b) throw new Error('toBlob');
  return b;
}

export default function Client() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(0.92);
  const [busy, setBusy] = useState(false);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) { setFiles(e.target.files ? Array.from(e.target.files) : []); }

  async function onConvertZip() {
    if (files.length === 0 || busy) return; setBusy(true);
    try {
      const zip = new JSZip(); for (const f of files) { const b = await convertToWebp(f, quality); const base = f.name.replace(/\.[^.]+$/, ''); zip.file(`${base}.webp`, b); }
      const content = await zip.generateAsync({ type: 'blob' }); const url = URL.createObjectURL(content); const a = document.createElement('a'); a.href = url; a.download = 'webp.zip'; a.click(); URL.revokeObjectURL(url);
    } finally { setBusy(false); }
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Batch WebP Converter</h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input ref={inputRef} type="file" accept="image/*" multiple onChange={onPick} className="input" />
          <label>Quality<input className="input" type="number" min={0.1} max={1} step={0.01} value={quality} onChange={(e) => setQuality(parseFloat(e.target.value) || 0.92)} style={{ width: 96, marginLeft: 8 }} /></label>
          <button className="button button-success" onClick={onConvertZip} disabled={files.length === 0 || busy}>{busy ? 'Converting…' : 'Convert & ZIP'}</button>
        </div>
        <div className="text-muted" style={{ marginTop: 6 }}>WebP 通常更小；如需目标 KB，请返回首页压缩。</div>
      </div>
      {files.length > 0 && (
        <div className="card">
          <h2 style={{ marginBottom: 8 }}>Selected</h2>
          <div className="text-muted">{files.length} files</div>
        </div>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Batch WebP Converter', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: '/tools/webp-converter' }) }} />
    </div>
  );
}


