"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import TrustSignal, { NetworkMonitor, ProcessingDemo } from "@/components/TrustSignal";
import {
  compressFilesWithWorker,
  downloadZipFromBlobs,
  formatBytes,
  getLargeFileNames,
  LARGE_FILE_WARNING_BYTES,
  revokePreviewUrls,
  type OutputFormat,
  type ResizeMode,
} from "@/lib/image";
import { getCompressStrings } from "@/lib/i18n/compress";

const label: React.CSSProperties = { fontSize: 13, color: "#6b7280" };

type CompressClientProps = { embedded?: boolean; locale?: "en" | "zh" };

export default function CompressClient({ embedded = false, locale = "en" }: CompressClientProps) {
  const s = getCompressStrings(locale);
  const compressBase = locale === "zh" ? "/zh/compress" : "/compress";
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [results, setResults] = useState<{ name: string; url: string; size: number; fileIndex: number }[]>([]);
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
  const [failures, setFailures] = useState<string[]>([]);
  const [largeFileWarning, setLargeFileWarning] = useState<string>("");
  const previewUrlsRef = useRef<string[]>([]);
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
      setSuccessMsg(s.presetApplied(decodeURIComponent(preset)));
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  }, [searchParams]);

  function handleFiles(list: FileList) {
    const arr = Array.from(list).filter((f) => f.type.startsWith("image/"));
    revokePreviewUrls(previewUrlsRef.current);
    previewUrlsRef.current = arr.map((f) => URL.createObjectURL(f));
    setFiles(arr);
    setResults([]);
    setFailures([]);
    setPreviews([...previewUrlsRef.current]);
    const large = getLargeFileNames(arr, LARGE_FILE_WARNING_BYTES);
    setLargeFileWarning(
      large.length
        ? `${s.largeFilePrefix} ${large.slice(0, 3).join(", ")}${large.length > 3 ? "…" : ""}`
        : ""
    );
  }

  useEffect(() => {
    return () => revokePreviewUrls(previewUrlsRef.current);
  }, []);

  useEffect(() => {
    // Show transparency warning if exporting JPEG and any selected file likely supports alpha
    if (format === 'image/jpeg' && files.some((f) => f.type === 'image/png' || f.type === 'image/webp')) {
      setShowAlphaWarning(true);
    } else {
      setShowAlphaWarning(false);
    }
  }, [files, format]);

  const buildName = useCallback((original: string, computed: string) => {
    const dot = original.lastIndexOf('.');
    const base = dot > 0 ? original.slice(0, dot) : original;
    const ext = dot > 0 ? original.slice(dot) : '';
    const target = keepExt ? base + ext : computed;
    const dot2 = target.lastIndexOf('.');
    const b2 = dot2 > 0 ? target.slice(0, dot2) : target;
    const e2 = dot2 > 0 ? target.slice(dot2) : '';
    return `${prefix}${b2}${suffix}${e2}`;
  }, [keepExt, prefix, suffix]);

  const compressAll = useCallback(async function compressAll() {
    if (!files.length) return;
    setBusy(true);
    setProgressCount(0);
    setFailures([]);
    try {
      const resizeAVal = typeof resizeA === "number" ? resizeA : undefined;
      const resizeBVal = typeof resizeB === "number" ? resizeB : undefined;
      const targetKbVal = typeof targetKb === "number" ? targetKb : undefined;
      const outputs = await compressFilesWithWorker(
        files,
        {
          format,
          quality,
          targetKb: targetKbVal,
          resizeMode,
          resizeA: resizeAVal,
          resizeB: resizeBVal,
        },
        3,
        (done) => setProgressCount(done)
      );
      const failed = outputs.filter((o) => !o.ok);
      const succeeded = outputs.filter((o) => o.ok);
      if (failed.length) {
        setFailures(failed.map((f) => `${f.name}: ${"error" in f ? f.error : "failed"}`));
      }
      setResults(
        outputs
          .map((o, idx) => ({ o, idx }))
          .filter((x): x is { o: Extract<typeof x.o, { ok: true }>; idx: number } => x.o.ok)
          .map(({ o, idx }) => ({
            name: buildName(files[idx]?.name ?? o.name, o.name),
            url: URL.createObjectURL(o.blob),
            size: o.blob.size,
            fileIndex: idx,
          }))
      );
      const okCount = succeeded.length;
      if (okCount > 0) {
        setSuccessMsg(s.successMsg(okCount, failed.length, quality));
      } else {
        setSuccessMsg("");
      }
    } finally {
      setBusy(false);
    }
  }, [files, format, quality, resizeA, resizeB, resizeMode, targetKb, buildName, s]);

  async function downloadZip() {
    if (!results.length) return;
    const entries = await Promise.all(
      results.map(async (r) => {
        const res = await fetch(r.url);
        return { name: r.name, blob: await res.blob() };
      })
    );
    await downloadZipFromBlobs(entries, "compressed-images.zip");
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
      setCopyMsg(s.clipboardUnavailable);
      return;
    }
    if (!results.length) return;
    try {
      const res = await fetch(results[0].url);
      const blob = await res.blob();
      // Try original blob first
      if (await copyBlobToClipboard(blob)) {
        setCopyMsg(s.copyOk);
        return;
      }
      const png = await convertUrlToPngBlob(results[0].url);
      if (png && (await copyBlobToClipboard(png))) {
        setCopyMsg(s.copyPngOk);
        return;
      }
      const dataUrl = await dataUrlFromBlob(blob);
      const clip = (navigator as unknown as { clipboard?: { writeText?: (s: string) => Promise<void> } }).clipboard;
      if (clip?.writeText) {
        await clip.writeText(dataUrl);
        setCopyMsg(s.copyDataUrl);
        return;
      }
      setCopyMsg(s.copyFail);
    } catch {
      setCopyMsg(s.copyFail);
    }
  }

  function savingPercent(original: number | undefined, compressed: number | undefined) {
    if (typeof original !== 'number' || typeof compressed !== 'number' || original <= 0) return '';
    const saved = Math.max(0, 1 - compressed / original) * 100;
    return s.savedPct(saved);
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 16 }}>
      {!embedded && (
        <div className="card" style={{ background: "#eff6ff", borderColor: "#bfdbfe" }}>
          <h2 style={{ fontSize: 28, marginBottom: 8 }}>{s.heroTitle}</h2>
          <p className="text-muted" style={{ marginBottom: 10 }}>{s.heroDesc}</p>

          {locale === "en" && <TrustSignal showDetails={true} />}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link href="/privacy" className="pill">{s.privacyPill}</Link>
            <span className="pill-ghost">{s.noUpload}</span>
            <Link href={locale === "zh" ? "/guides/compress-to-target-kb-zh" : "/guides/compress-to-target-kb"} className="pill">{s.targetGuide}</Link>
            <span className="pill-ghost">{s.zipBatch}</span>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
            <Link className="pill" href={`${compressBase}?kb=200`}>200KB</Link>
            <Link className="pill" href={`${compressBase}?kb=500`}>500KB</Link>
            <Link className="pill" href={`${compressBase}?kb=1024`}>1MB</Link>
            {locale === "en" && (
              <>
                <Link className="pill-ghost" href="/guides/resize-longest-side">1920px</Link>
                <Link className="pill-ghost" href="/guides/jpeg-vs-webp-size-quality">WebP vs JPEG</Link>
              </>
            )}
          </div>
        </div>
      )}

      <div className="card">
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <label htmlFor="file-input" style={label}>{s.uploadLabel}</label>
            <input id="file-input" ref={fileInputRef} type="file" accept="image/*" multiple onChange={(e) => { if (e.target.files) handleFiles(e.target.files); }} className="input" />
            <div className="text-muted" style={{ fontSize: 12, marginTop: 6 }}>{files.length ? s.filesSelected(files.length) : s.noFiles}</div>
            {largeFileWarning && (
              <div style={{ fontSize: 12, color: '#b45309', marginTop: 6 }}>{largeFileWarning}</div>
            )}
          </div>
          <div>
            <label htmlFor="quality-range" style={label}>{s.qualityLabel}</label>
            <input id="quality-range" aria-valuemin={0.1} aria-valuemax={1} aria-valuenow={quality} type="range" min={0.1} max={1} step={0.01} value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} style={{ width: '100%' }} />
            <div className="text-muted" style={{ fontSize: 12 }}>{s.qualityValue(quality)}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginTop: 12 }}>
          <label htmlFor="format-select" style={label}>{s.format}</label>
          <select id="format-select" value={format} onChange={(e) => setFormat(e.target.value as OutputFormat)} className="select" style={{ marginLeft: 8 }}>
            <option value="image/jpeg">JPEG</option>
            <option value="image/webp">WebP</option>
            <option value="image/png">PNG</option>
          </select>
          {showAlphaWarning && (
            <span className="pill-ghost" title={s.alphaWarning}>{s.alphaWarning}</span>
          )}
          <label htmlFor="resize-select" style={{ ...label, marginLeft: 12 }}>{s.resize}</label>
          <select id="resize-select" value={resizeMode} onChange={(e) => setResizeMode(e.target.value as ResizeMode)} className="select" style={{ marginLeft: 8 }}>
            <option value="none">{s.resizeNone}</option>
            <option value="longest">{s.resizeLongest}</option>
            <option value="exact">{s.resizeExact}</option>
          </select>
          {resizeMode === 'longest' && (
            <input type="number" placeholder="1920" value={resizeA} onChange={(e) => setResizeA(e.target.value === '' ? '' : Math.max(1, Math.floor(Number(e.target.value))))} className="input" style={{ width: 120 }} />
          )}
          {resizeMode === 'exact' && (
            <>
              <input type="number" placeholder={s.widthPh} value={resizeA} onChange={(e) => setResizeA(e.target.value === '' ? '' : Math.max(1, Math.floor(Number(e.target.value))))} className="input" style={{ width: 120 }} />
              <input type="number" placeholder={s.heightPh} value={resizeB} onChange={(e) => setResizeB(e.target.value === '' ? '' : Math.max(1, Math.floor(Number(e.target.value))))} className="input" style={{ width: 120 }} />
            </>
          )}
          <label style={{ ...label, marginLeft: 12 }}>{s.targetKb}
            <input type="number" placeholder="200" value={targetKb} onChange={(e) => setTargetKb(e.target.value === '' ? '' : Math.max(1, Math.floor(Number(e.target.value))))} className="input" style={{ width: 120, marginLeft: 8 }} />
          </label>
          <button className="button" onClick={compressAll} disabled={!files.length || busy} aria-keyshortcuts="Enter">{busy ? s.compressing : s.compress}</button>
        </div>
        <div className="text-muted" style={{ fontSize: 12, marginTop: 8 }}>
          {s.exifNote}
          {busy && files.length > 0 && (
            <span> &nbsp;{s.progress(progressCount, files.length)}</span>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
        <div className="card">
          <h2 style={{ marginBottom: 8 }}>{s.originals}</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', background: '#f9fafb', border: '1px dashed #e5e7eb', padding: 12, borderRadius: 10 }}>
            {previews.length ? (
              previews.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} alt={`original-${i}`} loading="lazy" style={{ width: 160, height: 'auto', border: '1px solid #eee', borderRadius: 8, boxShadow: 'var(--shadow-sm)' }} />
              ))
            ) : (
              <div style={{ color: '#6b7280' }}>{s.uploadPreview}</div>
            )}
          </div>
        </div>
        <div className="card">
          <h2 style={{ marginBottom: 8 }}>{s.compressed}</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', background: '#f9fafb', border: '1px dashed #e5e7eb', padding: 12, borderRadius: 10 }}>
            {results.length ? (
              results.map((r, i) => (
                <div key={i} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
                  <a href={r.url} download={r.name} style={{ display: 'inline-block' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.url} alt={`compressed-${i}`} loading="lazy" style={{ width: 160, height: 'auto', border: '1px solid #eee', borderRadius: 8, boxShadow: 'var(--shadow-sm)' }} />
                  </a>
                  <div style={{ fontSize: 12, color: '#6b7280', marginTop: 6 }}>
                    {s.sizeLine(formatBytes(r.size), formatBytes(files[r.fileIndex]?.size), savingPercent(files[r.fileIndex]?.size, r.size))}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: '#6b7280' }}>{s.compressedPreview}</div>
            )}
          </div>
        </div>
      </div>

      {results.length > 0 && (
        <div className="card">
          <div style={{ marginBottom: 12, fontWeight: 600 }}>{s.downloadSection}</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="button button-success" onClick={downloadFirst}>{results.length === 1 ? s.downloadOne : s.downloadFirst}</button>
            <button className="button button-dark" onClick={downloadZip}>{s.downloadZip}</button>
            <button className="button" onClick={copyFirstToClipboard} aria-label={s.copyClipboard}>{s.copyClipboard}</button>
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
          {failures.length > 0 && (
            <div style={{ background: '#fef2f2', color: '#991b1b', padding: 12, borderRadius: 'var(--radius)', marginTop: 8 }}>
              {s.failedPrefix} {failures.join("; ")}
            </div>
          )}
        </div>
      )}

      {!embedded && locale === "en" && (
        <>
          <div className="card">
            <ProcessingDemo />
          </div>
          <NetworkMonitor />
        </>
      )}
    </div>
  );
}
