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
} from "@/lib/image";
import { downloadZipFromBlobs } from "@/lib/image/zip";
import { getRedactStrings, type RedactPreset } from "@/lib/i18n/redact";

type Box = RedactBox;
type RelBox = RelRedactBox;
type Preset = RedactPreset;

type RedactClientProps = { locale?: "en" | "zh" };

export default function RedactClient({ locale = "en" }: RedactClientProps) {
  const s = getRedactStrings(locale);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileList, setFileList] = useState<File[]>([]);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [drawing, setDrawing] = useState<boolean>(false);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [mode, setMode] = useState<"solid" | "pixelate">("solid");
  const [pixelStrength, setPixelStrength] = useState<"strong" | "stronger" | "extreme">("strong");
  const undoStack = useRef<Box[][]>([]);
  const baseSourceRef = useRef<DrawableSource | null>(null);
  const relBoxesRef = useRef<RelBox[]>([]);
  const objectUrlRef = useRef<string | null>(null);
  const [presetKey, setPresetKey] = useState<string>("");
  const [userPresets, setUserPresets] = useState<Preset[]>([]);
  const jsonInputRef = useRef<HTMLInputElement | null>(null);

  function clearBoxes() {
    undoStack.current = [];
    setDrawing(false);
    setStart(null);
    setBoxes([]);
    setTimeout(() => draw(undefined, []), 0);
  }

  async function handleFile(file: File) {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    if (baseSourceRef.current instanceof ImageBitmap) baseSourceRef.current.close();
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    const source = await loadOrientedBitmap(file);
    baseSourceRef.current = source;
    setImageUrl(url);
    setBoxes([]);
    relBoxesRef.current = [];
    setTimeout(() => draw(undefined, []), 0);
  }
  function handleFiles(list: FileList) {
    const arr = Array.from(list).filter(f => f.type.startsWith('image/'))
    setFileList(arr);
    if (arr[0]) handleFile(arr[0]);
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
      } else {
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

  function exportJpg() {
    const canvas = canvasRef.current; if (!canvas) return;
    canvas.toBlob((blob) => { if (!blob) return; const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "redacted.jpg"; a.click(); URL.revokeObjectURL(url); }, "image/jpeg", 0.92);
  }

  async function exportZipBatch() {
    if (!fileList.length) return;
    const cw = canvasRef.current?.width || 1;
    const ch = canvasRef.current?.height || 1;
    const rel =
      relBoxesRef.current.length > 0
        ? relBoxesRef.current
        : absToRel(boxes, cw, ch);
    const entries: { name: string; blob: Blob }[] = [];
    for (const f of fileList) {
      const source = await loadOrientedBitmap(f);
      const { width, height } = getSourceSize(source);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        if (source instanceof ImageBitmap) source.close();
        continue;
      }
      ctx.drawImage(source, 0, 0);
      if (source instanceof ImageBitmap) source.close();
      const abs = relToAbs(rel, width, height);
      applyBoxesToCanvas(ctx, canvas, abs);
      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", 0.92)
      );
      if (blob) entries.push({ name: renameOut(f.name), blob });
    }
    if (entries.length) await downloadZipFromBlobs(entries, "redacted-images.zip");
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
      if (e.code === 'Space') { e.preventDefault(); setMode((m) => (m === 'solid' ? 'pixelate' : 'solid')); }
      if (e.key === 'Delete' || e.key === 'Backspace') { setBoxes((prev) => { const last = undoStack.current.pop(); return last ?? prev.slice(0, -1); }); }
    }
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, []);

  const faqItems = s.faq;

  function FaqItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ marginBottom: 8 }}>
        <button onClick={() => setOpen(v => !v)} aria-expanded={open} aria-controls={`faq-panel-${q}`}
          style={{ width: '100%', textAlign: 'left', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 600 }}>
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
            <span className="text-muted" style={{ fontSize: 12 }} aria-live="polite">
              {fileList.length ? s.filesSelected(fileList.length) : s.noFiles}
            </span>
          </div>

          {/* Row 2: Mode + Strength */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <label htmlFor="mode-select">{s.mode}</label>
            <select id="mode-select" value={mode} onChange={(e) => { setMode(e.target.value as ("solid" | "pixelate")); setTimeout(() => draw(), 0); }} className="select">
              <option value="solid">{s.modeSolid}</option>
              <option value="pixelate">{s.modePixelate}</option>
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

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={clearBoxes} className="button button-dark" disabled={!boxes.length}>{s.clear}</button>
            <button onClick={exportJpg} disabled={!imageUrl} className="button button-success">{s.exportJpg}</button>
            <button onClick={exportZipBatch} disabled={!fileList.length} className="button button-dark">{s.exportZip}</button>
          </div>
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

      <div className="card">
        <h2 style={{ marginBottom: 8 }}>{s.faqTitle}</h2>
        <div style={{ display: 'grid', gap: 8 }}>
          {faqItems.map((item, idx) => (
            <FaqItem key={idx} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </div>
  );
}


