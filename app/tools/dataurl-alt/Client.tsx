"use client";
import { useMemo, useRef, useState } from "react";

type Format = "image/png" | "image/jpeg" | "image/webp";

function sanitizeFilename(name: string): string { return name.replace(/\.[a-zA-Z0-9]+$/, "").replace(/[-_]+/g, " ").trim(); }
function suggestAlts(filename: string, w?: number, h?: number): string[] {
  const base = sanitizeFilename(filename); const dims = w && h ? `${w}×${h}` : undefined; const list = new Set<string>();
  if (base) list.add(base); if (base && dims) list.add(`${base} (${dims})`); if (dims) list.add(`Image ${dims}`); list.add("Illustrative image");
  return Array.from(list);
}

export default function Client() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<Format>("image/png");
  const [quality, setQuality] = useState(0.92);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const [busy, setBusy] = useState(false);

  const altCandidates = useMemo(() => suggestAlts(file?.name || "", dims?.w, dims?.h), [file?.name, dims?.w, dims?.h]);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return; setFile(f); setDataUrl(null); const bmp = await createImageBitmap(f); setDims({ w: bmp.width, h: bmp.height });
  }

  async function convert() {
    if (!file) return; setBusy(true);
    try { const img = await createImageBitmap(file); const canvas = document.createElement('canvas'); canvas.width = img.width; canvas.height = img.height; const ctx = canvas.getContext('2d'); if (!ctx) throw new Error('Canvas not supported'); ctx.drawImage(img, 0, 0); const url = canvas.toDataURL(format, format === 'image/jpeg' ? quality : undefined); setDataUrl(url); } finally { setBusy(false); }
  }

  function copy(text: string) { if (!text) return; if (navigator.clipboard?.writeText) { navigator.clipboard.writeText(text).catch(() => { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); }); } }

  const base64Only = useMemo(() => { if (!dataUrl) return ""; const i = dataUrl.indexOf(','); return i >= 0 ? dataUrl.slice(i + 1) : dataUrl; }, [dataUrl]);

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Data URL Converter & Alt Suggestions</h1>
        <p className="text-muted">Convert locally to data URL/Base64; re‑encoding strips EXIF. Suggest descriptive alt texts.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input ref={inputRef} type="file" accept="image/*" onChange={onPick} className="input" />
          <label>Format
            <select className="select" value={format} onChange={(e) => setFormat(e.target.value as Format)} style={{ marginLeft: 8 }}>
              <option value="image/png">PNG</option>
              <option value="image/jpeg">JPEG</option>
              <option value="image/webp">WEBP</option>
            </select>
          </label>
          {format === 'image/jpeg' && (
            <label>Quality<input className="input" type="number" min={0.1} max={1} step={0.01} value={quality} onChange={(e) => setQuality(parseFloat(e.target.value) || 0.92)} style={{ width: 96, marginLeft: 8 }} /></label>
          )}
          <button className="button" onClick={convert} disabled={!file || busy}>{busy ? 'Processing…' : 'Convert'}</button>
        </div>
        {dims && <div className="text-muted" style={{ marginTop: 8 }}>Source: {dims.w}×{dims.h} • {(file?.size ? (file.size / 1024).toFixed(1) : '-')} KB</div>}
      </div>

      {dataUrl && (
        <div className="card" style={{ display: 'grid', gap: 8 }}>
          <h2 style={{ marginBottom: 4 }}>Data URL</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="button" onClick={() => copy(dataUrl)}>Copy full</button>
            <button className="button" onClick={() => copy(base64Only)}>Copy Base64 only</button>
          </div>
          <textarea className="input" value={dataUrl} readOnly style={{ height: 160 }} />
          <div className="text-muted">Length: {dataUrl.length.toLocaleString()} chars</div>
        </div>
      )}

      <div className="card">
        <h2 style={{ marginBottom: 8 }}>Alt suggestions</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {altCandidates.map((a, i) => (
            <button key={i} className="pill" onClick={() => copy(a)} title="Copy alt">{a}</button>
          ))}
        </div>
        {dataUrl && (
          <div style={{ marginTop: 12 }}>
            <div className="text-muted" style={{ marginBottom: 6 }}>Example</div>
            <pre><code>{`<img src="${dataUrl.slice(0, 64)}..." alt="${altCandidates[0] || ''}" />`}</code></pre>
          </div>
        )}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Data URL Converter & Alt Suggestions', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: '/tools/dataurl-alt' }) }} />
    </div>
  );
}


