"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  absToRel,
  relToAbs,
  loadOrientedBitmap,
  getSourceSize,
  type DrawableSource,
  type RedactBox,
  type RelRedactBox,
  scanImageMetadata,
  metadataIsClean,
  verifyImageBlob,
  formatBytes,
  type MetadataScan,
} from "@/lib/image";
import { downloadZipFromBlobs } from "@/lib/image/zip";
import { getRedactStrings, type RedactPreset } from "@/lib/i18n/redact";
import { batchCountBucket, durationBucket, emitProductEvent, fileSizeBucket } from "@/lib/productEvents";

type Box = RedactBox;
type RelBox = RelRedactBox;
type Preset = RedactPreset;

type RedactClientProps = { locale?: "en" | "zh"; surface?: "redact" | "safe_share" };

export default function RedactClient({ locale = "en", surface = "redact" }: RedactClientProps) {
  const s = getRedactStrings(locale);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileList, setFileList] = useState<File[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewedIndices, setReviewedIndices] = useState<Set<number>>(new Set());
  const [currentInfo, setCurrentInfo] = useState<{ width: number; height: number; size: number; type: string; scan: MetadataScan } | null>(null);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [drawing, setDrawing] = useState<boolean>(false);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [mode, setMode] = useState<"solid" | "pixelate" | "blur">("solid");
  const [pixelStrength, setPixelStrength] = useState<"strong" | "stronger" | "extreme">("strong");
  const undoStack = useRef<Box[][]>([]);
  const baseSourceRef = useRef<DrawableSource | null>(null);
  const relBoxesRef = useRef<RelBox[]>([]);
  const boxesByFileRef = useRef<Record<number, RelBox[]>>({});
  const objectUrlRef = useRef<string | null>(null);
  const [presetKey, setPresetKey] = useState<string>("");
  const [userPresets, setUserPresets] = useState<Preset[]>([]);
  const jsonInputRef = useRef<HTMLInputElement | null>(null);
  const [verification, setVerification] = useState<string>("");
  const [batchBusy, setBatchBusy] = useState(false);
  const [batchFailures, setBatchFailures] = useState<string[]>([]);
  const cancelBatchRef = useRef(false);

  useEffect(() => {
    emitProductEvent("tool_view", { tool: surface });
  }, [surface]);

  function clearBoxes() {
    undoStack.current = [];
    setDrawing(false);
    setStart(null);
    setBoxes([]);
    boxesByFileRef.current[currentIndex] = [];
    setTimeout(() => draw(undefined, []), 0);
  }

  function saveCurrentBoxes() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rel = absToRel(boxes, canvas.width || 1, canvas.height || 1);
    relBoxesRef.current = rel;
    boxesByFileRef.current[currentIndex] = rel;
  }

  async function handleFile(file: File, index: number, preserveCurrent = true) {
    if (preserveCurrent) saveCurrentBoxes();
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    if (baseSourceRef.current instanceof ImageBitmap) baseSourceRef.current.close();
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    const source = await loadOrientedBitmap(file);
    baseSourceRef.current = source;
    setImageUrl(url);
    const { width, height } = getSourceSize(source);
    const scan = await scanImageMetadata(file);
    const saved = boxesByFileRef.current[index] ?? [];
    const restored = relToAbs(saved, width, height);
    setCurrentIndex(index);
    setReviewedIndices((previous) => new Set(previous).add(index));
    setBoxes(restored);
    relBoxesRef.current = saved;
    setCurrentInfo({ width, height, size: file.size, type: file.type || scan.format, scan });
    setTimeout(() => draw(undefined, restored), 0);
  }
  function handleFiles(list: FileList | File[]) {
    const arr = Array.from(list).filter(f => f.type.startsWith('image/') || /\.(heic|heif)$/i.test(f.name));
    setFileList(arr);
    boxesByFileRef.current = {};
    setReviewedIndices(new Set());
    setCurrentIndex(0);
    if (arr[0]) handleFile(arr[0], 0, false);
  }

  async function pasteFromClipboard() {
    setVerification("");
    try {
      const items = await navigator.clipboard.read();
      const pasted: File[] = [];
      for (const item of items) {
        const imageType = item.types.find((type) => type.startsWith("image/"));
        if (!imageType) continue;
        const blob = await item.getType(imageType);
        const extension = imageType.split("/")[1]?.replace("jpeg", "jpg") || "png";
        pasted.push(new File([blob], `clipboard-${pasted.length + 1}.${extension}`, { type: imageType }));
      }
      if (!pasted.length) throw new Error(locale === "zh" ? "剪贴板中没有图片。" : "No image was found in the clipboard.");
      handleFiles(pasted);
    } catch (error) {
      setVerification(error instanceof Error ? error.message : (locale === "zh" ? "无法读取剪贴板。" : "Clipboard access failed."));
    }
  }

  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    // Ensure touch devices don't scroll while drawing
    e.preventDefault();
    const canvas = e.currentTarget;
    try { canvas.setPointerCapture(e.pointerId); } catch { }
    const rect = canvas.getBoundingClientRect();
    const scaleX = (canvas.width || rect.width) / rect.width;
    const scaleY = (canvas.height || rect.height) / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    setStart({ x, y });
    setDrawing(true);
  }

  function onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing || !start) return;
    e.preventDefault();
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const scaleX = (canvas.width || rect.width) / rect.width;
    const scaleY = (canvas.height || rect.height) / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const w = x - start.x;
    const h = y - start.y;
    const temp: Box = { x: Math.min(start.x, x), y: Math.min(start.y, y), w: Math.abs(w), h: Math.abs(h) };
    draw(temp);
  }

  function onPointerUp(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing || !start) return;
    e.preventDefault();
    const canvas = e.currentTarget;
    try { canvas.releasePointerCapture(e.pointerId); } catch { }
    const rect = canvas.getBoundingClientRect();
    const scaleX = (canvas.width || rect.width) / rect.width;
    const scaleY = (canvas.height || rect.height) / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const box: Box = { x: Math.min(start.x, x), y: Math.min(start.y, y), w: Math.abs(x - start.x), h: Math.abs(y - start.y) };
    setBoxes((prev) => { undoStack.current.push(prev); return [...prev, box]; });
    setDrawing(false); setStart(null);
  }

  function onPointerCancel() {
    if (!drawing) return;
    setDrawing(false); setStart(null);
  }

  function applyBoxesToCanvas(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    all: Box[]
  ) {
    for (const b of all) {
      if (mode === "solid") {
        ctx.fillStyle = "#000";
        ctx.fillRect(b.x, b.y, b.w, b.h);
      } else if (mode === "pixelate") {
        const scale = pixelStrength === "extreme" ? 0.03 : pixelStrength === "stronger" ? 0.06 : 0.10;
        const tmpW = Math.max(1, Math.floor(b.w * scale));
        const tmpH = Math.max(1, Math.floor(b.h * scale));
        const tmp = document.createElement("canvas");
        tmp.width = tmpW;
        tmp.height = tmpH;
        const tctx = tmp.getContext("2d");
        if (!tctx) continue;
        tctx.drawImage(canvas, b.x, b.y, b.w, b.h, 0, 0, tmpW, tmpH);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(tmp, 0, 0, tmpW, tmpH, b.x, b.y, b.w, b.h);
        ctx.imageSmoothingEnabled = true;
      } else {
        const tmp = document.createElement("canvas");
        tmp.width = Math.max(1, Math.ceil(b.w));
        tmp.height = Math.max(1, Math.ceil(b.h));
        const tctx = tmp.getContext("2d");
        if (!tctx) continue;
        tctx.drawImage(canvas, b.x, b.y, b.w, b.h, 0, 0, tmp.width, tmp.height);
        ctx.save();
        ctx.filter = `blur(${Math.max(8, Math.round(Math.min(b.w, b.h) * 0.08))}px)`;
        ctx.drawImage(tmp, 0, 0, tmp.width, tmp.height, b.x, b.y, b.w, b.h);
        ctx.restore();
      }
    }
  }

  function draw(preview?: Box, sourceBoxes?: Box[]) {
    const canvas = canvasRef.current;
    const source = baseSourceRef.current;
    if (!canvas || !source) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = getSourceSize(source);
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(source, 0, 0);
    const base = sourceBoxes ?? boxes;
    const all = [...base, ...(preview ? [preview] : [])];
    applyBoxesToCanvas(ctx, canvas, all);
    relBoxesRef.current = absToRel(base, width, height);
    if (!preview) boxesByFileRef.current[currentIndex] = relBoxesRef.current;
  }

  function allPresets(): Preset[] { return [...s.presets, ...userPresets]; }

  function applyPreset() {
    if (!canvasRef.current) return;
    const cw = canvasRef.current.width || 1; const ch = canvasRef.current.height || 1;
    const preset = allPresets().find(p => p.key === presetKey); if (!preset) return;
    const abs: Box[] = preset.boxes.map(r => ({ x: r.x * cw, y: r.y * ch, w: r.w * cw, h: r.h * ch }));
    undoStack.current.push(boxes); setBoxes(abs); setTimeout(() => draw(undefined, abs), 0);
  }

  function exportPresetJson() {
    const cw = canvasRef.current?.width || 1; const ch = canvasRef.current?.height || 1;
    if (!boxes.length || cw === 0 || ch === 0) return;
    const rel: RelBox[] = boxes.map(b => ({ x: b.x / cw, y: b.y / ch, w: b.w / cw, h: b.h / ch }));
    const payload = { name: 'Custom preset', boxes: rel, version: 1 };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a');
    a.href = url; a.download = 'redact-preset.json'; a.click(); URL.revokeObjectURL(url);
  }

  function triggerImport() { jsonInputRef.current?.click(); }

  async function onImportJson(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    try {
      const text = await file.text();
      const obj = JSON.parse(text);
      if (!obj || !Array.isArray(obj.boxes)) throw new Error('Invalid preset');
      const boxes: RelBox[] = obj.boxes;
      for (const r of boxes) {
        if (typeof r.x !== 'number' || typeof r.y !== 'number' || typeof r.w !== 'number' || typeof r.h !== 'number') throw new Error('Invalid box');
      }
      const key = `custom-${Date.now()}`;
      const name = typeof obj.name === 'string' && obj.name.trim() ? obj.name.trim() : 'Imported preset';
      const preset: Preset = { key, name, boxes };
      setUserPresets((prev) => [...prev, preset]);
      setPresetKey(key);
      setTimeout(() => applyPreset(), 0);
    } catch {
    } finally {
      if (jsonInputRef.current) jsonInputRef.current.value = '';
    }
  }

  async function exportJpg() {
    const canvas = canvasRef.current; if (!canvas) return;
    const startedAt = performance.now();
    emitProductEvent("process_started", {
      tool: surface,
      input_format: fileList[0]?.type || "unknown",
      output_format: "image/jpeg",
      file_size_bucket: fileList[0] ? fileSizeBucket(fileList[0].size) : undefined,
      batch_count_bucket: "1",
    });
    setVerification(locale === "zh" ? "正在验证导出文件…" : "Verifying export…");
    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
    if (!blob) {
      setVerification(locale === "zh" ? "导出失败。" : "Export failed.");
      return;
    }
    try {
      const decoded = await verifyImageBlob(blob);
      const scan = await scanImageMetadata(blob);
      if (!metadataIsClean(scan)) throw new Error("Metadata remained in export");
      setVerification(
        locale === "zh"
          ? `已验证：${decoded.width}×${decoded.height}，EXIF/GPS/XMP/IPTC 均未检出。`
          : `Verified: ${decoded.width}×${decoded.height}; no EXIF, GPS, XMP, or IPTC detected.`
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "redacted.jpg";
      a.click();
      URL.revokeObjectURL(url);
      emitProductEvent("process_succeeded", { tool: surface, output_format: "image/jpeg", duration_bucket: durationBucket(performance.now() - startedAt) });
      emitProductEvent("download_completed", { tool: surface, output_format: "image/jpeg", batch_count_bucket: "1" });
    } catch (error) {
      setVerification(error instanceof Error ? error.message : "Export verification failed.");
      emitProductEvent("process_failed", { tool: surface, output_format: "image/jpeg", duration_bucket: durationBucket(performance.now() - startedAt), error_code: "verification_failed" });
    }
  }

  async function exportZipBatch() {
    if (!fileList.length) return;
    const startedAt = performance.now();
    cancelBatchRef.current = false;
    setBatchBusy(true);
    setBatchFailures([]);
    emitProductEvent("batch_started", { tool: surface, input_format: "mixed", output_format: "image/jpeg", batch_count_bucket: batchCountBucket(fileList.length), file_size_bucket: fileSizeBucket(fileList.reduce((total, file) => total + file.size, 0)) });
    saveCurrentBoxes();
    const entries: { name: string; blob: Blob }[] = [];
    const failures: string[] = [];
    try {
      for (const [fileIndex, f] of fileList.entries()) {
        if (cancelBatchRef.current) break;
        if (!reviewedIndices.has(fileIndex)) {
          failures.push(`${f.name} (not reviewed)`);
          continue;
        }
        try {
          const source = await loadOrientedBitmap(f);
          const { width, height } = getSourceSize(source);
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            if (source instanceof ImageBitmap) source.close();
            throw new Error("Canvas not supported");
          }
          ctx.drawImage(source, 0, 0);
          if (source instanceof ImageBitmap) source.close();
          const abs = relToAbs(boxesByFileRef.current[fileIndex] ?? [], width, height);
          applyBoxesToCanvas(ctx, canvas, abs);
          const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
          if (!blob) throw new Error("Export failed");
          await verifyImageBlob(blob);
          const scan = await scanImageMetadata(blob);
          if (!metadataIsClean(scan)) throw new Error("Metadata verification failed");
          entries.push({ name: renameOut(f.name), blob });
        } catch {
          failures.push(f.name);
        }
      }
      setBatchFailures(failures);
      if (cancelBatchRef.current) {
        setVerification(locale === "zh" ? "批量任务已取消。" : "Batch cancelled.");
        return;
      }
      if (entries.length) {
        await downloadZipFromBlobs(entries, "redacted-images.zip");
        setVerification(
          locale === "zh"
            ? `已验证 ${entries.length} 个文件；${failures.length} 个失败，可重试。`
            : `Verified ${entries.length} files; ${failures.length} failed and can be retried.`
        );
        emitProductEvent("process_succeeded", { tool: surface, output_format: "image/jpeg", batch_count_bucket: batchCountBucket(entries.length), duration_bucket: durationBucket(performance.now() - startedAt) });
        emitProductEvent("download_completed", { tool: surface, output_format: "image/jpeg", batch_count_bucket: batchCountBucket(entries.length) });
      } else {
        emitProductEvent("process_failed", { tool: surface, output_format: "image/jpeg", batch_count_bucket: batchCountBucket(fileList.length), duration_bucket: durationBucket(performance.now() - startedAt), error_code: "batch_failed" });
      }
    } finally {
      setBatchBusy(false);
    }
  }

  function renameOut(name: string) {
    const dot = name.lastIndexOf(".");
    const base = dot > 0 ? name.slice(0, dot) : name;
    return base + "-redacted.jpg";
  }

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      if (baseSourceRef.current instanceof ImageBitmap) baseSourceRef.current.close();
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code === 'Space') {
        e.preventDefault();
        setMode((m) => (m === 'solid' ? 'pixelate' : m === 'pixelate' ? 'blur' : 'solid'));
      }
      if (e.key === 'Delete' || e.key === 'Backspace') { setBoxes((prev) => { const last = undoStack.current.pop(); return last ?? prev.slice(0, -1); }); }
    }
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h2>{s.title}</h2>
        <p>{s.intro}</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
          <Link href="/privacy" className="pill">{s.privacyPill}</Link>
          <span className="pill-ghost">{s.noUpload}</span>
          <span className="pill">{s.irreversible}</span>
          <span className="pill-ghost">{s.removeExif}</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', padding: '8px 0' }}>
          <strong>{s.shortcutsLabel}</strong>
          <span>{s.shortcutSpace}</span>
          <span>{s.shortcutDelete}</span>
        </div>
        <div style={{ display: 'grid', gap: 10 }}>
          {/* Row 1: Upload */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              id="redact-file-input"
              aria-label={s.fileInputLabel}
              onChange={(e) => { if (e.target.files) handleFiles(e.target.files); setTimeout(() => draw(), 0); }}
              className="input"
              style={{ display: 'none' }}
            />
            <button className="button-soft" onClick={() => fileInputRef.current?.click()} aria-controls="redact-file-input">
              {s.chooseImages}
            </button>
            {surface === "safe_share" && (
              <button className="button-outline" type="button" onClick={pasteFromClipboard}>
                {locale === "zh" ? "从剪贴板粘贴" : "Paste image"}
              </button>
            )}
            <span className="text-muted" style={{ fontSize: 12 }} aria-live="polite">
              {fileList.length ? s.filesSelected(fileList.length) : s.noFiles}
            </span>
          </div>
          {fileList.length > 1 && (
            <div className="file-queue" aria-label={locale === "zh" ? "文件队列" : "File review queue"}>
              {fileList.map((file, index) => (
                <button
                  key={`${file.name}-${index}`}
                  type="button"
                  data-current={index === currentIndex}
                  data-reviewed={reviewedIndices.has(index)}
                  onClick={() => handleFile(file, index)}
                >
                  <span>{index + 1}</span>
                  <span>{file.name}</span>
                  <small>{reviewedIndices.has(index) ? (locale === "zh" ? "已检查" : "Reviewed") : (locale === "zh" ? "待检查" : "Needs review")}</small>
                </button>
              ))}
            </div>
          )}
          {currentInfo && (
            <div className="privacy-scan" aria-live="polite">
              <div><strong>{currentInfo.type || "image"}</strong><span>{currentInfo.width}×{currentInfo.height} • {formatBytes(currentInfo.size)}</span></div>
              <div className="metadata-badges">
                <span data-found={currentInfo.scan.hasExif}>EXIF: {currentInfo.scan.hasExif ? "found" : "not found"}</span>
                <span data-found={currentInfo.scan.hasGps}>GPS: {currentInfo.scan.hasGps ? "found" : "not found"}</span>
                <span data-found={currentInfo.scan.hasXmp}>XMP: {currentInfo.scan.hasXmp ? "found" : "not found"}</span>
                <span data-found={currentInfo.scan.hasIptc}>IPTC: {currentInfo.scan.hasIptc ? "found" : "not found"}</span>
              </div>
              {currentInfo.scan.note && <small>{currentInfo.scan.note}</small>}
            </div>
          )}

          {/* Row 2: Mode + Strength */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <label htmlFor="mode-select">{s.mode}</label>
            <select id="mode-select" value={mode} onChange={(e) => { setMode(e.target.value as ("solid" | "pixelate" | "blur")); setTimeout(() => draw(), 0); }} className="select">
              <option value="solid">{s.modeSolid}</option>
              <option value="pixelate">{s.modePixelate}</option>
              <option value="blur">{locale === "zh" ? "模糊" : "Blur"}</option>
            </select>
            {mode === 'pixelate' && (
              <>
                <label htmlFor="strength-select">{s.strength}</label>
                <select id="strength-select" value={pixelStrength} onChange={(e) => { setPixelStrength(e.target.value as "strong" | "stronger" | "extreme"); setTimeout(() => draw(), 0); }} className="select">
                  <option value="strong">{s.strengthStrong}</option>
                  <option value="stronger">{s.strengthStronger}</option>
                  <option value="extreme">{s.strengthExtreme}</option>
                </select>
              </>
            )}
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <label htmlFor="preset-select">{s.preset}</label>
            <select id="preset-select" value={presetKey} onChange={(e) => setPresetKey(e.target.value)} className="select">
              <option value="">{s.presetNone}</option>
              {allPresets().map(p => <option key={p.key} value={p.key}>{p.name}</option>)}
            </select>
            <button onClick={applyPreset} disabled={!presetKey || !imageUrl} className="button">{s.applyPreset}</button>
            <button onClick={exportPresetJson} disabled={!boxes.length} className="button">{s.exportJson}</button>
            <button onClick={triggerImport} className="button button-dark">{s.importJson}</button>
            <input ref={jsonInputRef} id="redact-preset-import" aria-label={s.importJsonLabel} type="file" accept="application/json" onChange={onImportJson} style={{ display: 'none' }} />
          </div>
          {verification && (
            <div className="verification-banner" role="status" aria-live="polite">{verification}</div>
          )}

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={clearBoxes} className="button button-dark" disabled={!boxes.length}>{s.clear}</button>
            <button onClick={exportJpg} disabled={!imageUrl} className="button button-success">{s.exportJpg}</button>
            <button onClick={exportZipBatch} disabled={!fileList.length || batchBusy} className="button button-dark">{batchBusy ? (locale === "zh" ? "处理中…" : "Processing…") : s.exportZip}</button>
            {batchBusy && <button onClick={() => { cancelBatchRef.current = true; }} className="button-outline">{locale === "zh" ? "取消" : "Cancel"}</button>}
            {!batchBusy && batchFailures.length > 0 && <button onClick={exportZipBatch} className="button-outline">{locale === "zh" ? "重试批量任务" : "Retry batch"}</button>}
          </div>
          {batchFailures.length > 0 && <div className="text-muted" style={{ fontSize: 12 }}>{locale === "zh" ? "失败：" : "Failed: "}{batchFailures.join(", ")}</div>}
        </div>
      </div>
      <div className="card" style={{ maxWidth: '100%', overflow: 'auto' }}>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={s.canvasLabel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          style={{ cursor: 'crosshair', maxWidth: '100%', touchAction: 'none' }}
        />
      </div>
    </div>
  );
}


