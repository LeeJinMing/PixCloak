"use client";
import Link from "next/link";
import { useRef, useState } from "react";

type ExifResult = {
  hasExif: boolean;
  hasGps: boolean;
  bytes: number;
  width?: number;
  height?: number;
};

async function readArrayBuffer(file: File): Promise<ArrayBuffer> { return await file.arrayBuffer(); }
function getUint16(view: DataView, offset: number, little: boolean) { return little ? view.getUint16(offset, true) : view.getUint16(offset, false); }
function getUint32(view: DataView, offset: number, little: boolean) { return little ? view.getUint32(offset, true) : view.getUint32(offset, false); }

function detectExifGps(buf: ArrayBuffer): { hasExif: boolean; hasGps: boolean } {
  const bytes = new Uint8Array(buf);
  if (!(bytes[0] === 0xff && bytes[1] === 0xd8)) return { hasExif: false, hasGps: false };
  let i = 2;
  while (i + 4 < bytes.length) {
    if (bytes[i] !== 0xff) break;
    const marker = bytes[i + 1];
    const size = (bytes[i + 2] << 8) + bytes[i + 3];
    if (marker === 0xe1 && i + 4 + size <= bytes.length) {
      const header = new TextDecoder().decode(bytes.slice(i + 4, i + 10));
      if (header.startsWith("Exif\x00\x00")) {
        const view = new DataView(buf, i + 10, size - 6);
        const byteOrder = view.getUint16(0, false);
        const little = byteOrder === 0x4949;
        if (byteOrder === 0x4d4d || byteOrder === 0x4949) {
          const fortyTwo = getUint16(view, 2, little);
          if (fortyTwo === 0x2a) {
            const ifdOffset = getUint32(view, 4, little);
            if (ifdOffset + 2 <= view.byteLength) {
              const numTags = getUint16(view, ifdOffset, little);
              let hasGps = false;
              for (let t = 0; t < numTags; t++) {
                const base = ifdOffset + 2 + t * 12;
                const tag = getUint16(view, base, little);
                if (tag === 0x8825) { hasGps = true; break; }
              }
              return { hasExif: true, hasGps };
            }
          }
        }
        return { hasExif: true, hasGps: false };
      }
    }
    if (marker === 0xda) break;
    i += 2 + size;
  }
  return { hasExif: false, hasGps: false };
}

async function removeMetadata(file: File): Promise<Blob> {
  const img = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.width; canvas.height = img.height; const ctx = canvas.getContext("2d"); if (!ctx) throw new Error("Canvas not supported");
  ctx.drawImage(img, 0, 0);
  const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
  if (!blob) throw new Error("Export failed");
  return blob;
}

export default function Client() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [result, setResult] = useState<ExifResult | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    const buf = await readArrayBuffer(f);
    const det = detectExifGps(buf);
    const bmp = await createImageBitmap(f);
    setResult({ hasExif: det.hasExif, hasGps: det.hasGps, bytes: f.size, width: bmp.width, height: bmp.height });
    setOutUrl(null);
  }

  async function onStrip() {
    if (!inputRef.current?.files?.[0]) return; setBusy(true);
    try { const clean = await removeMetadata(inputRef.current.files[0]); const url = URL.createObjectURL(clean); setOutUrl(url); }
    finally { setBusy(false); }
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>EXIF/GPS Metadata Checker</h1>
        <p className="text-muted">Check if your image contains EXIF/GPS; remove metadata locally and download a clean copy.</p>
        <input ref={inputRef} type="file" accept="image/*" onChange={onPick} className="input" />
        {result && (
          <div style={{ marginTop: 8 }}>
            <div className="text-muted">Dimensions: {result.width}×{result.height} • Size: {(result.bytes / 1024).toFixed(1)} KB</div>
            <div style={{ marginTop: 6 }}>
              <span className="pill-ghost">EXIF: {result.hasExif ? 'Yes' : 'No'}</span>
              <span className="pill-ghost" style={{ marginLeft: 8 }}>GPS: {result.hasGps ? 'Yes' : 'No'}</span>
            </div>
            <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="button" onClick={onStrip} disabled={busy}>{busy ? 'Processing…' : 'Remove & Download'}</button>
              <Link href="/?kb=200" className="pill">Compress to 200KB</Link>
              <Link href="/guides/exif-gps-removal" className="pill">EXIF removal guide</Link>
            </div>
            {outUrl && (
              <div style={{ marginTop: 8 }}>
                <a href={outUrl} download="clean.jpg" className="button button-success">Download clean JPG</a>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="card">
        <h2 style={{ marginBottom: 8 }}>FAQ</h2>
        <ul style={{ paddingLeft: 18 }}>
          <li>Exporting via Canvas removes EXIF/GPS metadata.</li>
          <li>Processing is 100% local—images are not uploaded.</li>
        </ul>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org', '@type': 'HowTo', name: 'Remove EXIF/GPS metadata', step: [
              { '@type': 'HowToStep', name: 'Choose image' },
              { '@type': 'HowToStep', name: 'Click Remove & Download' },
              { '@type': 'HowToStep', name: 'Use Compress to hit target KB if needed' }
            ]
          })
        }} />
      </div>
    </div>
  );
}


