"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import JSZip from "jszip";

type OutputFormat = "image/jpeg" | "image/webp" | "image/png";
type ResizeMode = "none" | "longest" | "exact";

export default function CompressPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [results, setResults] = useState<{ name: string; url: string; size: number }[]>([]);
  const [quality, setQuality] = useState<number>(0.8);
  const [targetKb, setTargetKb] = useState<number | "">("");
  const [resizeMode, setResizeMode] = useState<ResizeMode>("none");
  const [resizeA, setResizeA] = useState<number | "">(""); // longest side or width
  const [resizeB, setResizeB] = useState<number | "">(""); // height (only for exact)
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

    // If target size set, perform a simple binary search for quality
    if (typeof targetKb === "number" && targetKb > 0) {
      let lo = 0.1, hi = 1.0, best: Blob | null = null;
      const targetBytes = targetKb * 1024;
      for (let i = 0; i < 8; i++) { // 8 iterations is enough for UI
        const mid = (lo + hi) / 2;
        const b = await encode(mid);
        if (!best || Math.abs(b.size - targetBytes) < Math.abs(best.size - targetBytes)) best = b;
        if (b.size > targetBytes) {
          // too big → reduce quality
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
    // if keepExt: preserve original extension
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
    <div style={{ display: 'grid', gap: 12 }}>
      <h1>Image Compressor</h1>
      <p>All processing happens locally in your browser. Images are not uploaded.</p>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files);
        }}
      />
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer?.files?.length) {
            handleFiles(e.dataTransfer.files);
          }
        }}
        style={{
          border: '2px dashed ' + (dragOver ? '#555' : '#ccc'),
          padding: 24,
          borderRadius: 8,
          textAlign: 'center'
        }}
      >
        Drag & drop images here
      </div>
      <label>
        Quality: {quality.toFixed(2)}
        <input
          type="range"
          min={0.1}
          max={1}
          step={0.01}
          value={quality}
          onChange={(e) => setQuality(parseFloat(e.target.value))}
        />
      </label>
      <label>
        Format:
        <select value={format} onChange={(e) => setFormat(e.target.value as OutputFormat)} style={{ marginLeft: 6 }}>
          <option value="image/jpeg">JPEG</option>
          <option value="image/webp">WebP</option>
          <option value="image/png">PNG</option>
        </select>
      </label>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <label>
          Resize:
          <select value={resizeMode} onChange={(e) => setResizeMode(e.target.value as ResizeMode)} style={{ marginLeft: 6 }}>
            <option value="none">None</option>
            <option value="longest">Longest side</option>
            <option value="exact">Exact WxH</option>
          </select>
        </label>
        {resizeMode === 'longest' && (
          <input type="number" placeholder="e.g. 1920" value={resizeA} onChange={(e) => setResizeA(e.target.value === '' ? '' : Math.max(1, Math.floor(Number(e.target.value))))} style={{ width: 120 }} />
        )}
        {resizeMode === 'exact' && (
          <>
            <input type="number" placeholder="Width" value={resizeA} onChange={(e) => setResizeA(e.target.value === '' ? '' : Math.max(1, Math.floor(Number(e.target.value))))} style={{ width: 100 }} />
            <span>×</span>
            <input type="number" placeholder="Height" value={resizeB} onChange={(e) => setResizeB(e.target.value === '' ? '' : Math.max(1, Math.floor(Number(e.target.value))))} style={{ width: 100 }} />
          </>
        )}
      </div>
      <label>
        Target size (KB):
        <input
          type="number"
          placeholder="e.g. 200"
          value={targetKb}
          onChange={(e) => {
            const v = e.target.value;
            setTargetKb(v === "" ? "" : Math.max(1, Math.floor(Number(v))));
          }}
          style={{ marginLeft: 8, width: 120 }}
        />
      </label>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={compressAll} disabled={!files.length || busy}>
          {busy ? "Compressing…" : `Compress ${files.length || ""}`}
        </button>
        <button onClick={downloadZip} disabled={!results.length}>Download ZIP</button>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <label>Prefix <input type="text" value={prefix} onChange={(e) => setPrefix(e.target.value)} style={{ width: 140 }} /></label>
        <label>Suffix <input type="text" value={suffix} onChange={(e) => setSuffix(e.target.value)} style={{ width: 140 }} /></label>
        <label style={{ display: 'flex', gap: 6, alignItems: 'center' }}><input type="checkbox" checked={keepExt} onChange={(e) => setKeepExt(e.target.checked)} />Keep original extension</label>
      </div>

      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <h3>Originals</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {previews.length ? (
              previews.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} alt={`original-${i}`} style={{ width: 160, height: 'auto', border: '1px solid #eee' }} />
              ))
            ) : (
              <div style={{ border: '1px dashed #ccc', padding: 24 }}>Select images…</div>
            )}
          </div>
        </div>
        <div>
          <h3>Compressed</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {results.length ? (
              results.map((r, i) => (
                <a key={i} href={r.url} download={r.name} style={{ display: 'inline-block' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.url} alt={`compressed-${i}`} style={{ width: 160, height: 'auto', border: '1px solid #eee' }} />
                </a>
              ))
            ) : (
              <div style={{ border: '1px dashed #ccc', padding: 24 }}>—</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


