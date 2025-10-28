"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import TrustSignal, { NetworkMonitor, ProcessingDemo } from "@/components/TrustSignal";

type OutputFormat = "image/jpeg" | "image/webp" | "image/png";
type ResizeMode = "none" | "longest" | "exact";

const label: React.CSSProperties = { fontSize: 13, color: "#6b7280" };

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
  const [progressCount, setProgressCount] = useState<number>(0);
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [prefix] = useState<string>("");
  const [suffix] = useState<string>("-compressed");
  const [keepExt] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [copyMsg, setCopyMsg] = useState<string>("");
  const [showAlphaWarning, setShowAlphaWarning] = useState<boolean>(false);
  const [showFaq, setShowFaq] = useState<boolean>(false);
  const searchParams = useSearchParams();


  useEffect(() => {
    const kb = searchParams.get("kb");
    if (kb && !Number.isNaN(Number(kb))) {
      const v = Math.max(1, Math.floor(Number(kb)));
      setTargetKb(v);
    }

    // Handle preset parameters
    const size = searchParams.get("size");
    if (size) {
      const [width, height] = size.split('x').map(Number);
      if (width && height) {
        setResizeMode("exact");
        setResizeA(width);
        setResizeB(height);
      }
    }

    const formatParam = searchParams.get("format");
    if (formatParam) {
      switch (formatParam.toLowerCase()) {
        case 'jpg':
        case 'jpeg':
          setFormat("image/jpeg");
          break;
        case 'png':
          setFormat("image/png");
          break;
        case 'webp':
          setFormat("image/webp");
          break;
      }
    }

    const preset = searchParams.get("preset");
    if (preset) {
      setSuccessMsg(`Preset "${decodeURIComponent(preset)}" applied successfully!`);
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  }, [searchParams]);

  // Defer non-critical FAQ to reduce initial JS
  useEffect(() => {
    const t = window.setTimeout(() => setShowFaq(true), 800);
    return () => window.clearTimeout(t);
  }, []);

  function handleFiles(list: FileList) {
    const arr = Array.from(list).filter((f) => f.type.startsWith("image/"));
    setFiles(arr);
    setResults([]);
    setPreviews(arr.map((f) => URL.createObjectURL(f)));
  }

  useEffect(() => {
    // Show transparency warning if exporting JPEG and any selected file likely supports alpha
    if (format === 'image/jpeg' && files.some((f) => f.type === 'image/png' || f.type === 'image/webp')) {
      setShowAlphaWarning(true);
    } else {
      setShowAlphaWarning(false);
    }
  }, [files, format]);

  async function compressOne(file: File): Promise<{ name: string; blob: Blob }> {
    // Load oriented bitmap (EXIF orientation respected); fallback to HTMLImageElement
    const bmp = await loadImageBitmapOrFallback(file);
    let outW = bmp.width;
    let outH = bmp.height;
    if (resizeMode === "longest" && typeof resizeA === "number" && resizeA > 0) {
      const longest = Math.max(bmp.width, bmp.height);
      const ratio = resizeA / longest;
      outW = Math.max(1, Math.round(bmp.width * ratio));
      outH = Math.max(1, Math.round(bmp.height * ratio));
    } else if (resizeMode === "exact" && typeof resizeA === "number" && typeof resizeB === "number" && resizeA > 0 && resizeB > 0) {
      outW = Math.round(resizeA);
      outH = Math.round(resizeB);
    }
    const canvas = document.createElement("canvas");
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");
    // For JPEG export, flatten transparent areas to white (avoid black/undefined background)
    if (format === 'image/jpeg') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, outW, outH);
    }
    ctx.drawImage(bmp, 0, 0, outW, outH);

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

  const compressAll = useCallback(async function compressAll() {
    if (!files.length) return;
    setBusy(true);
    setProgressCount(0);
    try {
      const outputs: { index: number; name: string; blob: Blob }[] = [];
      const concurrencyLimit = 3;
      let nextIndex = 0;
      async function worker() {
        while (true) {
          const current = nextIndex++;
          if (current >= files.length) break;
          const f = files[current];
          try {
            const out = await compressOne(f);
            outputs.push({ index: current, name: out.name, blob: out.blob });
          } catch {
            // one retry on failure
            try {
              const out = await compressOne(f);
              outputs.push({ index: current, name: out.name, blob: out.blob });
            } catch {
              // give up on this file but continue
              // create a tiny placeholder blob to keep order
              const placeholder = new Blob([""], { type: format });
              outputs.push({ index: current, name: renameByFormat(f.name, format), blob: placeholder });
            }
          } finally {
            setProgressCount((c) => c + 1);
          }
        }
      }
      const workers = Array.from({ length: Math.min(concurrencyLimit, files.length) }, () => worker());
      await Promise.all(workers);
      outputs.sort((a, b) => a.index - b.index);
      setResults(
        outputs.map((o, idx) => {
          const finalName = buildName(files[idx]?.name ?? o.name, o.name);
          return { name: finalName, url: URL.createObjectURL(o.blob), size: o.blob.size };
        })
      );
      setSuccessMsg(`Image${files.length > 1 ? 's' : ''} compressed successfully! Quality: ${quality.toFixed(2)}`);
    } finally {
      setBusy(false);
    }
  }, [files, format, keepExt, prefix, suffix, quality, resizeA, resizeB, resizeMode, targetKb, buildName, compressOne]);

  async function downloadZip() {
    if (!results.length) return;
    const { default: JSZip } = await import("jszip");
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

  function downloadFirst() {
    if (!results.length) return;
    const r = results[0];
    const a = document.createElement('a');
    a.href = r.url;
    a.download = r.name;
    a.click();
  }

  async function copyBlobToClipboard(blob: Blob): Promise<boolean> {
    const CI = (window as unknown as { ClipboardItem?: new (data: Record<string, Blob>) => ClipboardItem }).ClipboardItem;
    const clipboard = (navigator as unknown as { clipboard?: { write?: (items: ClipboardItem[]) => Promise<void> } }).clipboard;
    if (!CI || !clipboard?.write) return false;
    try {
      const item = new CI({ [blob.type || 'image/png']: blob });
      await clipboard.write([item]);
      return true;
    } catch {
      return false;
    }
  }

  function dataUrlFromBlob(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(String(fr.result));
      fr.onerror = reject;
      fr.readAsDataURL(blob);
    });
  }

  async function convertUrlToPngBlob(url: string): Promise<Blob | null> {
    try {
      const img = new Image();
      const loaded: HTMLImageElement = await new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      });
      const canvas = document.createElement('canvas');
      canvas.width = loaded.naturalWidth || loaded.width;
      canvas.height = loaded.naturalHeight || loaded.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      ctx.drawImage(loaded, 0, 0);
      const png: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      return png;
    } catch {
      return null;
    }
  }

  async function copyFirstToClipboard() {
    setCopyMsg("");
    if (!('clipboard' in navigator)) {
      setCopyMsg('Clipboard not available');
      return;
    }
    if (!results.length) return;
    try {
      const res = await fetch(results[0].url);
      const blob = await res.blob();
      // Try original blob first
      if (await copyBlobToClipboard(blob)) {
        setCopyMsg('Copied to clipboard');
        return;
      }
      // Fallback: convert to PNG and try again
      const png = await convertUrlToPngBlob(results[0].url);
      if (png && (await copyBlobToClipboard(png))) {
        setCopyMsg('Copied PNG to clipboard');
        return;
      }
      // Last resort: copy Data URL as text
      const dataUrl = await dataUrlFromBlob(blob);
      const clip = (navigator as unknown as { clipboard?: { writeText?: (s: string) => Promise<void> } }).clipboard;
      if (clip?.writeText) {
        await clip.writeText(dataUrl);
        setCopyMsg('Copied image as Data URL');
        return;
      }
      setCopyMsg('Copy failed');
    } catch {
      setCopyMsg('Copy failed');
    }
  }

  async function loadImageBitmapOrFallback(file: File): Promise<ImageBitmap | HTMLImageElement> {
    // Try ImageBitmap with EXIF orientation from image
    try {
      const opts: { imageOrientation?: 'from-image' } = { imageOrientation: 'from-image' };
      const bmp: ImageBitmap = await createImageBitmap(file as unknown as Blob, opts as unknown as ImageBitmapOptions);
      return bmp;
    } catch {
      // Fallback to HTMLImageElement
      return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      });
    }
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

  function formatBytes(n: number | undefined) {
    if (typeof n !== 'number' || Number.isNaN(n)) return '-';
    if (n >= 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(2)} MB`;
    if (n >= 1024) return `${(n / 1024).toFixed(2)} KB`;
    return `${n} B`;
  }
  function savingPercent(original: number | undefined, compressed: number | undefined) {
    if (typeof original !== 'number' || typeof compressed !== 'number' || original <= 0) return '';
    const saved = Math.max(0, 1 - compressed / original) * 100;
    return `, Saved: ${saved.toFixed(1)}%`;
  }

  const faqItems = [
    { q: 'Will PixCloak upload my images?', a: 'No. All compression runs locally in your browser and works offline (PWA). Nothing is uploaded to any server.' },
    { q: 'How to choose quality vs target size (KB)?', a: 'Prefer Target (KB). We search the best quality with binary search. Without a target, use the quality slider manually.' },
    { q: 'Are EXIF/GPS and metadata removed?', a: 'Yes. Re-encoding via Canvas removes EXIF/GPS metadata by default on export.' },
    { q: 'When to use JPEG / WebP / PNG?', a: 'WebP is often smaller and supports transparency; PNG fits icons/screenshots (lossless + alpha); JPEG is ideal for photos.' },
    { q: 'It feels slow or images are huge—what can I do?', a: 'Resize the longest side or set exact width/height before compressing to speed up and reduce size significantly.' },
    { q: 'How do I batch download?', a: 'After compression click Download ZIP. It works for single or multiple images.' },
  ];

  function FaqItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ marginBottom: 8 }}>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`faq-panel-${q}`}
          style={{
            width: '100%',
            textAlign: 'left',
            background: '#f3f4f6',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          <span>{q}</span>
          <span style={{ fontSize: 18, lineHeight: 1 }}>{open ? '−' : '+'}</span>
        </button>
        <div id={`faq-panel-${q}`} role="region" style={{ maxHeight: open ? 500 : 0, overflow: 'hidden', transition: 'max-height .25s ease' }}>
          {open && (
            <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, marginTop: 8, color: '#374151' }}>
              {a}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 16 }}>
      <div className="card" style={{ background: "#eff6ff", borderColor: "#bfdbfe" }}>
        <h2 style={{ fontSize: 28, marginBottom: 8 }}>Online JPEG & PNG Image Compressor</h2>
        <p className="text-muted" style={{ marginBottom: 10 }}>
          Compress images in your browser with no upload. Set a target size (KB), choose JPEG/WebP/PNG, and batch download as ZIP.
        </p>

        {/* Trust Signal */}
        <TrustSignal showDetails={true} />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link href="/privacy" className="pill">Privacy‑first</Link>
          <span className="pill-ghost">No upload</span>
          <Link href="/guides/compress-to-target-kb" className="pill">Target size guide</Link>
          <span className="pill-ghost">ZIP batch</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
          <Link className="pill" href="/?kb=200">200KB</Link>
          <Link className="pill" href="/?kb=500">500KB</Link>
          <Link className="pill" href="/?kb=1024">1MB</Link>
          <Link className="pill-ghost" href="/guides/resize-longest-side">1920px</Link>
          <Link className="pill-ghost" href="/guides/jpeg-vs-webp-size-quality">WebP vs JPEG</Link>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'PixCloak Image Compressor',
              applicationCategory: 'UtilitiesApplication',
              operatingSystem: 'Web',
              url: '/',
              description: 'Online JPEG & PNG image compressor. Local processing, target size (KB), batch ZIP download.',
              offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
              isAccessibleForFree: true,
              softwareVersion: '1.0.0',
              brand: { '@type': 'Brand', name: 'PixCloak' },
              publisher: { '@type': 'Organization', name: 'PixCloak' }
            })
          }}
        />
      </div>

      <div className="card">
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <label htmlFor="file-input" style={label}>1. Upload Your Images (JPEG/PNG)</label>
            <input id="file-input" ref={fileInputRef} type="file" accept="image/*" multiple onChange={(e) => { if (e.target.files) handleFiles(e.target.files); }} className="input" />
            <div className="text-muted" style={{ fontSize: 12, marginTop: 6 }}>{files.length ? `${files.length} file(s) selected` : 'No file chosen'}</div>
          </div>
          <div>
            <label htmlFor="quality-range" style={label}>2. Adjust Quality</label>
            <input id="quality-range" aria-valuemin={0.1} aria-valuemax={1} aria-valuenow={quality} type="range" min={0.1} max={1} step={0.01} value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} style={{ width: '100%' }} />
            <div className="text-muted" style={{ fontSize: 12 }}>Quality: {quality.toFixed(2)}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginTop: 12 }}>
          <label htmlFor="format-select" style={label}>Format</label>
          <select id="format-select" value={format} onChange={(e) => setFormat(e.target.value as OutputFormat)} className="select" style={{ marginLeft: 8 }}>
            <option value="image/jpeg">JPEG</option>
            <option value="image/webp">WebP</option>
            <option value="image/png">PNG</option>
          </select>
          {showAlphaWarning && (
            <span className="pill-ghost" title="PNG/WebP transparency will be flattened to white when exporting JPEG.">Transparency → white on JPEG</span>
          )}
          <label htmlFor="resize-select" style={{ ...label, marginLeft: 12 }}>Resize</label>
          <select id="resize-select" value={resizeMode} onChange={(e) => setResizeMode(e.target.value as ResizeMode)} className="select" style={{ marginLeft: 8 }}>
            <option value="none">None</option>
            <option value="longest">Longest side</option>
            <option value="exact">Exact WxH</option>
          </select>
          {resizeMode === 'longest' && (
            <input type="number" placeholder="1920" value={resizeA} onChange={(e) => setResizeA(e.target.value === '' ? '' : Math.max(1, Math.floor(Number(e.target.value))))} className="input" style={{ width: 120 }} />
          )}
          {resizeMode === 'exact' && (
            <>
              <input type="number" placeholder="Width" value={resizeA} onChange={(e) => setResizeA(e.target.value === '' ? '' : Math.max(1, Math.floor(Number(e.target.value))))} className="input" style={{ width: 120 }} />
              <input type="number" placeholder="Height" value={resizeB} onChange={(e) => setResizeB(e.target.value === '' ? '' : Math.max(1, Math.floor(Number(e.target.value))))} className="input" style={{ width: 120 }} />
            </>
          )}
          <label style={{ ...label, marginLeft: 12 }}>Target (KB)
            <input type="number" placeholder="200" value={targetKb} onChange={(e) => setTargetKb(e.target.value === '' ? '' : Math.max(1, Math.floor(Number(e.target.value))))} className="input" style={{ width: 120, marginLeft: 8 }} />
          </label>
          <button className="button" onClick={compressAll} disabled={!files.length || busy} aria-keyshortcuts="Enter">{busy ? 'Compressing…' : 'Compress'}</button>
        </div>
        <div className="text-muted" style={{ fontSize: 12, marginTop: 8 }}>
          Images are auto‑rotated based on EXIF orientation. Metadata (EXIF/GPS) is removed on export.
          {busy && files.length > 0 && (
            <span> &nbsp;Progress: {progressCount}/{files.length}</span>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
        <div className="card">
          <h2 style={{ marginBottom: 8 }}>Originals</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', background: '#f9fafb', border: '1px dashed #e5e7eb', padding: 12, borderRadius: 10 }}>
            {previews.length ? (
              previews.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} alt={`original-${i}`} loading="lazy" style={{ width: 160, height: 'auto', border: '1px solid #eee', borderRadius: 8, boxShadow: 'var(--shadow-sm)' }} />
              ))
            ) : (
              <div style={{ color: '#6b7280' }}>Upload an image to see preview</div>
            )}
          </div>
        </div>
        <div className="card">
          <h2 style={{ marginBottom: 8 }}>Compressed</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', background: '#f9fafb', border: '1px dashed #e5e7eb', padding: 12, borderRadius: 10 }}>
            {results.length ? (
              results.map((r, i) => (
                <div key={i} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
                  <a href={r.url} download={r.name} style={{ display: 'inline-block' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.url} alt={`compressed-${i}`} loading="lazy" style={{ width: 160, height: 'auto', border: '1px solid #eee', borderRadius: 8, boxShadow: 'var(--shadow-sm)' }} />
                  </a>
                  <div style={{ fontSize: 12, color: '#6b7280', marginTop: 6 }}>
                    Size: {formatBytes(r.size)} (Original: {formatBytes(files[i]?.size)}{savingPercent(files[i]?.size, r.size)})
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: '#6b7280' }}>Compressed image will appear here</div>
            )}
          </div>
        </div>
      </div>

      {results.length > 0 && (
        <div className="card">
          <div style={{ marginBottom: 12, fontWeight: 600 }}>3. Download Your Optimized Image</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="button button-success" onClick={downloadFirst}>{results.length === 1 ? 'Download Compressed Image' : 'Download First Image'}</button>
            <button className="button button-dark" onClick={downloadZip}>Download ZIP</button>
            <button className="button" onClick={copyFirstToClipboard} aria-label="Copy first image to clipboard">Copy to Clipboard</button>
          </div>
          {successMsg && (
            <div style={{ background: '#d1fae5', color: '#065f46', padding: 12, borderRadius: 'var(--radius)', marginTop: 12 }}>
              {successMsg}
            </div>
          )}
          {copyMsg && (
            <div style={{ background: '#eef2ff', color: '#3730a3', padding: 12, borderRadius: 'var(--radius)', marginTop: 8 }}>
              {copyMsg}
            </div>
          )}
        </div>
      )}

      {showFaq && (
        <div className="card">
          <h2 style={{ marginBottom: 8 }}>Frequently Asked Questions (FAQ)</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            {faqItems.map((item, idx) => (
              <FaqItem key={idx} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      )}

      {/* Processing Demo */}
      <div className="card">
        <ProcessingDemo />
      </div>

      {/* Network Monitor */}
      <NetworkMonitor />
    </div>
  );
}
