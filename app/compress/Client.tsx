"use client";
import JSZip from "jszip";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type OutputFormat = "image/jpeg" | "image/webp" | "image/png";
type ResizeMode = "none" | "longest" | "exact";

const card: React.CSSProperties = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 };
const label: React.CSSProperties = { fontSize: 13, color: "#6b7280" };
const container: React.CSSProperties = { maxWidth: 960, margin: "0 auto", display: "grid", gap: 16 };
const btn: React.CSSProperties = { background: "#2563eb", color: "#fff", border: 0, padding: "12px 16px", borderRadius: 8, cursor: "pointer", fontWeight: 600 };

export default function CompressClient() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [results, setResults] = useState<{ name: string; url: string; size: number }[]>([]);
  const [quality, setQuality] = useState<number>(0.8);
  const [targetKb, setTargetKb] = useState<number | "">("");
  const [resizeMode, setResizeMode] = useState<ResizeMode>("none");
  const [resizeA, setResizeA] = useState<number | "">("");
  const [resizeB, setResizeB] = useState<number | "">("");
  const [busy, setBusy] = useState<boolean>(false);
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [prefix, setPrefix] = useState<string>("");
  const [suffix, setSuffix] = useState<string>("-compressed");
  const [keepExt, setKeepExt] = useState<boolean>(false);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const kb = searchParams.get("kb");
    if (kb && !Number.isNaN(Number(kb))) {
      const v = Math.max(1, Math.floor(Number(kb)));
      setTargetKb(v);
    }
  }, [searchParams]);

  function handleFiles(list: FileList) {
    const arr = Array.from(list).filter((f) => f.type.startsWith("image/"));
    setFiles(arr);
    setResults([]);
    setPreviews(arr.map((f) => URL.createObjectURL(f)));
  }

  async function compressOne(file: File): Promise<{ name: string; blob: Blob }> {
    const url = URL.createObjectURL(file);
    const img = await loadImage(url);
    let outW = img.width;
    let outH = img.height;
    if (resizeMode === "longest" && typeof resizeA === "number" && resizeA > 0) {
      const longest = Math.max(img.width, img.height);
      const ratio = resizeA / longest;
      outW = Math.max(1, Math.round(img.width * ratio));
      outH = Math.max(1, Math.round(img.height * ratio));
    } else if (resizeMode === "exact" && typeof resizeA === "number" && typeof resizeB === "number" && resizeA > 0 && resizeB > 0) {
      outW = Math.round(resizeA);
      outH = Math.round(resizeB);
    }
    const canvas = document.createElement("canvas");
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");
    ctx.drawImage(img, 0, 0, outW, outH);

    async function encode(q: number): Promise<Blob> {
      const mime = format;
      const qualitySupported = mime !== "image/png";
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, mime, qualitySupported ? q : undefined));
      if (!blob) throw new Error("Compression failed");
      return blob;
    }

    if (typeof targetKb === "number" && targetKb > 0) {
      let lo = 0.1, hi = 1.0, best: Blob | null = null;
      const targetBytes = targetKb * 1024;
      for (let i = 0; i < 8; i++) {
        const mid = (lo + hi) / 2;
        const b = await encode(mid);
        if (!best || Math.abs(b.size - targetBytes) < Math.abs(best.size - targetBytes)) best = b;
        if (b.size > targetBytes) {
          hi = mid;
        } else {
          lo = mid;
        }
      }
      if (!best) best = await encode(quality);
      return { name: renameByFormat(file.name, format), blob: best };
    }

    const b = await encode(quality);
    return { name: renameByFormat(file.name, format), blob: b };
  }

  async function compressAll() {
    if (!files.length) return;
    setBusy(true);
    try {
      const outputs: { name: string; blob: Blob }[] = [];
      for (const f of files) {
        const out = await compressOne(f);
        outputs.push(out);
      }
      setResults(
        outputs.map((o, idx) => {
          const finalName = buildName(files[idx]?.name ?? o.name, o.name);
          return { name: finalName, url: URL.createObjectURL(o.blob), size: o.blob.size };
        })
      );
    } finally {
      setBusy(false);
    }
  }

  async function downloadZip() {
    if (!results.length) return;
    const zip = new JSZip();
    for (const r of results) {
      const res = await fetch(r.url);
      const blob = await res.blob();
      zip.file(r.name, blob);
    }
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "compressed-images.zip";
    a.click();
    URL.revokeObjectURL(url);
  }

  function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  function renameByFormat(name: string, mime: string) {
    const dot = name.lastIndexOf('.');
    const base = dot > 0 ? name.slice(0, dot) : name;
    if (mime === 'image/webp') return `${base}.webp`;
    if (mime === 'image/png') return `${base}.png`;
    return `${base}.jpg`;
  }
  function buildName(original: string, computed: string) {
    const dot = original.lastIndexOf('.');
    const base = dot > 0 ? original.slice(0, dot) : original;
    const ext = dot > 0 ? original.slice(dot) : '';
    const target = keepExt ? base + ext : computed;
    const dot2 = target.lastIndexOf('.');
    const b2 = dot2 > 0 ? target.slice(0, dot2) : target;
    const e2 = dot2 > 0 ? target.slice(dot2) : '';
    return `${prefix}${b2}${suffix}${e2}`;
  }

  return (
    <div style={container}>
      <div style={{ ...card, background: "#eff6ff", borderColor: "#bfdbfe" }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Online JPEG & PNG Image Compressor</h1>
        <p style={{ color: "#1e3a8a" }}>Local processing · No upload · Target size · ZIP batch</p>
      </div>

      <div style={{ ...card }}>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <div style={label}>1. Upload Your Images (JPEG/PNG)</div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => { if (e.target.files) handleFiles(e.target.files); }}
              style={{ width: '100%', padding: 10, border: '1px solid #e5e7eb', borderRadius: 8 }}
            />
          </div>
          <div>
            <div style={label}>2. Adjust Quality</div>
            <input type="range" min={0.1} max={1} step={0.01} value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} style={{ width: '100%' }} />
            <div style={{ fontSize: 12, color: '#6b7280' }}>Quality: {quality.toFixed(2)}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginTop: 12 }}>
          <label style={label}>Format
            <select value={format} onChange={(e) => setFormat(e.target.value as OutputFormat)} style={{ marginLeft: 8, padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }}>
              <option value="image/jpeg">JPEG</option>
              <option value="image/webp">WebP</option>
              <option value="image/png">PNG</option>
            </select>
          </label>
          <label style={{ ...label, marginLeft: 12 }}>Resize
            <select value={resizeMode} onChange={(e) => setResizeMode(e.target.value as ResizeMode)} style={{ marginLeft: 8, padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }}>
              <option value="none">None</option>
              <option value="longest">Longest side</option>
              <option value="exact">Exact WxH</option>
            </select>
          </label>
          {resizeMode === 'longest' && (
            <input type="number" placeholder="1920" value={resizeA} onChange={(e) => setResizeA(e.target.value === '' ? '' : Math.max(1, Math.floor(Number(e.target.value))))} style={{ width: 120, padding: 8, border: '1px solid #e5e7eb', borderRadius: 8 }} />
          )}
          {resizeMode === 'exact' && (
            <>
              <input type="number" placeholder="Width" value={resizeA} onChange={(e) => setResizeA(e.target.value === '' ? '' : Math.max(1, Math.floor(Number(e.target.value))))} style={{ width: 120, padding: 8, border: '1px solid #e5e7eb', borderRadius: 8 }} />
              <input type="number" placeholder="Height" value={resizeB} onChange={(e) => setResizeB(e.target.value === '' ? '' : Math.max(1, Math.floor(Number(e.target.value))))} style={{ width: 120, padding: 8, border: '1px solid #e5e7eb', borderRadius: 8 }} />
            </>
          )}
          <label style={{ ...label, marginLeft: 12 }}>Target (KB)
            <input type="number" placeholder="200" value={targetKb} onChange={(e) => setTargetKb(e.target.value === '' ? '' : Math.max(1, Math.floor(Number(e.target.value))))} style={{ width: 120, marginLeft: 8, padding: 8, border: '1px solid #e5e7eb', borderRadius: 8 }} />
          </label>
          <button style={btn} onClick={compressAll} disabled={!files.length || busy}>{busy ? 'Compressing…' : `Compress ${files.length || ''}`}</button>
          <button style={{ ...btn, background: '#111' }} onClick={downloadZip} disabled={!results.length}>Download ZIP</button>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
        <div style={card}>
          <h3 style={{ marginBottom: 8 }}>Originals</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {previews.length ? (
              previews.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} alt={`original-${i}`} style={{ width: 160, height: 'auto', border: '1px solid #eee', borderRadius: 8 }} />
              ))
            ) : (
              <div style={{ border: '1px dashed #ccc', padding: 24, borderRadius: 8, color: '#6b7280' }}>Upload an image to see preview</div>
            )}
          </div>
        </div>
        <div style={card}>
          <h3 style={{ marginBottom: 8 }}>Compressed</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {results.length ? (
              results.map((r, i) => (
                <a key={i} href={r.url} download={r.name} style={{ display: 'inline-block' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.url} alt={`compressed-${i}`} style={{ width: 160, height: 'auto', border: '1px solid #eee', borderRadius: 8 }} />
                </a>
              ))
            ) : (
              <div style={{ border: '1px dashed #ccc', padding: 24, borderRadius: 8, color: '#6b7280' }}>Compressed image will appear here</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
