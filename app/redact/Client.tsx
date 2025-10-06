"use client";
import { useEffect, useRef, useState } from "react";
import JSZip from "jszip";

type Box = { x: number; y: number; w: number; h: number };
type RelBox = { x: number; y: number; w: number; h: number };
type Preset = { key: string; name: string; boxes: RelBox[] };
const PRESETS: Preset[] = [
  { key: 'wechat', name: 'Chat Screenshot (avatar + name + time)', boxes: [{ x: 0.02, y: 0.01, w: 0.16, h: 0.09 }, { x: 0.20, y: 0.02, w: 0.35, h: 0.06 }] },
  { key: 'license-plate', name: 'License Plate (bottom center sample)', boxes: [{ x: 0.35, y: 0.75, w: 0.30, h: 0.12 }] },
  { key: 'id-card', name: 'ID Number (sample area)', boxes: [{ x: 0.20, y: 0.60, w: 0.60, h: 0.12 }] },
];

export default function RedactClient() {
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
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setBoxes([]);
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

  function draw(preview?: Box, sourceBoxes?: Box[]) {
    const canvas = canvasRef.current; if (!canvas || !imageUrl) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width; canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const base = sourceBoxes ?? boxes;
      const all = [...base, ...(preview ? [preview] : [])];
      for (const b of all) {
        if (mode === "solid") {
          ctx.fillStyle = "#000"; ctx.fillRect(b.x, b.y, b.w, b.h);
        } else {
          const scale = pixelStrength === 'extreme' ? 0.03 : pixelStrength === 'stronger' ? 0.06 : 0.10;
          const tmpW = Math.max(1, Math.floor(b.w * scale)); const tmpH = Math.max(1, Math.floor(b.h * scale));
          const tmp = document.createElement("canvas"); tmp.width = tmpW; tmp.height = tmpH;
          const tctx = tmp.getContext("2d"); if (!tctx) continue;
          tctx.drawImage(canvas, b.x, b.y, b.w, b.h, 0, 0, tmpW, tmpH);
          (ctx as CanvasRenderingContext2D).imageSmoothingEnabled = false;
          ctx.drawImage(tmp, 0, 0, tmpW, tmpH, b.x, b.y, b.w, b.h);
        }
      }
    };
    img.src = imageUrl;
  }

  function allPresets(): Preset[] { return [...PRESETS, ...userPresets]; }

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
    const zip = new JSZip();
    for (const f of fileList) {
      const img = await loadImage(URL.createObjectURL(f));
      const canvas = document.createElement('canvas'); canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext('2d'); if (!ctx) continue;
      ctx.drawImage(img, 0, 0);
      const rel = boxes.map(b => ({ x: b.x / (canvasRef.current?.width || img.width), y: b.y / (canvasRef.current?.height || img.height), w: b.w / (canvasRef.current?.width || img.width), h: b.h / (canvasRef.current?.height || img.height) }));
      for (const r of rel) {
        const bx = r.x * canvas.width, by = r.y * canvas.height, bw = r.w * canvas.width, bh = r.h * canvas.height;
        if (mode === 'solid') { ctx.fillStyle = '#000'; ctx.fillRect(bx, by, bw, bh); }
        else {
          const scale = pixelStrength === 'extreme' ? 0.03 : pixelStrength === 'stronger' ? 0.06 : 0.10;
          const tmpW = Math.max(1, Math.floor(bw * scale)); const tmpH = Math.max(1, Math.floor(bh * scale));
          const tmp = document.createElement('canvas'); tmp.width = tmpW; tmp.height = tmpH; const tctx = tmp.getContext('2d'); if (!tctx) continue;
          tctx.drawImage(canvas, bx, by, bw, bh, 0, 0, tmpW, tmpH); (ctx as CanvasRenderingContext2D).imageSmoothingEnabled = false; ctx.drawImage(tmp, 0, 0, tmpW, tmpH, bx, by, bw, bh);
        }
      }
      const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.92)); if (!blob) continue;
      zip.file(renameOut(f.name), blob);
    }
    const content = await zip.generateAsync({ type: 'blob' }); const url = URL.createObjectURL(content);
    const a = document.createElement('a'); a.href = url; a.download = 'redacted-images.zip'; a.click(); URL.revokeObjectURL(url);
  }

  function renameOut(name: string) { const dot = name.lastIndexOf('.'); const base = dot > 0 ? name.slice(0, dot) : name; return base + '-redacted.jpg'; }

  function loadImage(src: string): Promise<HTMLImageElement> { return new Promise((resolve, reject) => { const img = new Image(); img.onload = () => resolve(img); img.onerror = reject; img.src = src; }); }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code === 'Space') { e.preventDefault(); setMode((m) => (m === 'solid' ? 'pixelate' : 'solid')); }
      if (e.key === 'Delete' || e.key === 'Backspace') { setBoxes((prev) => { const last = undoStack.current.pop(); return last ?? prev.slice(0, -1); }); }
    }
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, []);

  const faqItems = [
    { q: 'Will my images be uploaded?', a: 'No. All redaction runs locally in your browser. Nothing is uploaded to any server.' },
    { q: 'Solid vs Pixelate – what\'s the difference?', a: 'Solid covers the area with a black block (irreversible). Pixelate creates mosaic blocks to hide details while preserving rough shapes.' },
    { q: 'How strong is pixelation and how to adjust it?', a: 'Use Strength: Strong, Stronger, or Extreme. Extreme applies the strongest pixelation for best privacy. For critical areas (eyes, ID), apply multiple boxes or switch to Solid.' },
    { q: 'Are EXIF/GPS and metadata removed?', a: 'Yes. Exporting re-encodes the image and removes EXIF/GPS metadata by default.' },
    { q: 'How do I import/export redaction presets?', a: 'Use Export JSON to save current boxes as relative coordinates. Use Import JSON to load and apply a preset on any image.' },
    { q: 'Are there keyboard shortcuts?', a: 'Space toggles Solid/Pixelate. Delete/Backspace undo the last action.' },
  ];

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
        <h2>Image Redaction (Local)</h2>
        <p>Draw boxes to mask sensitive regions. Processing is local and irreversible (solid/pixelate). EXIF/GPS will be removed on export.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
          <a href="/privacy" className="pill">Privacy‑first</a>
          <span className="pill-ghost">No upload</span>
          <span className="pill">Irreversible</span>
          <span className="pill-ghost">Remove EXIF/GPS</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', padding: '8px 0' }}>
          <strong>Shortcuts:</strong>
          <span>Space = toggle solid/pixelate</span>
          <span>Delete = undo</span>
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
              aria-label="Choose images to redact"
              onChange={(e) => { if (e.target.files) handleFiles(e.target.files); setTimeout(() => draw(), 0); }}
              className="input"
              style={{ display: 'none' }}
            />
            <button className="button-soft" onClick={() => fileInputRef.current?.click()} aria-controls="redact-file-input">
              Choose images
            </button>
            <span className="text-muted" style={{ fontSize: 12 }} aria-live="polite">
              {fileList.length ? `${fileList.length} file(s) selected` : 'No file chosen'}
            </span>
          </div>

          {/* Row 2: Mode + Strength */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <label htmlFor="mode-select">Mode</label>
            <select id="mode-select" value={mode} onChange={(e) => { setMode(e.target.value as ("solid" | "pixelate")); setTimeout(() => draw(), 0); }} className="select">
              <option value="solid">Solid block</option>
              <option value="pixelate">Strong pixelation</option>
            </select>
            {mode === 'pixelate' && (
              <>
                <label htmlFor="strength-select">Strength</label>
                <select id="strength-select" value={pixelStrength} onChange={(e) => { setPixelStrength(e.target.value as "strong" | "stronger" | "extreme"); setTimeout(() => draw(), 0); }} className="select">
                  <option value="strong">Strong</option>
                  <option value="stronger">Stronger</option>
                  <option value="extreme">Extreme</option>
                </select>
              </>
            )}
          </div>

          {/* Row 3: Preset */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <label htmlFor="preset-select">Preset</label>
            <select id="preset-select" value={presetKey} onChange={(e) => setPresetKey(e.target.value)} className="select">
              <option value="">None</option>
              {allPresets().map(p => <option key={p.key} value={p.key}>{p.name}</option>)}
            </select>
            <button onClick={applyPreset} disabled={!presetKey || !imageUrl} className="button">Apply preset</button>
            <button onClick={exportPresetJson} disabled={!boxes.length} className="button">Export JSON</button>
            <button onClick={triggerImport} className="button button-dark">Import JSON</button>
            <input ref={jsonInputRef} id="redact-preset-import" aria-label="Import redaction preset JSON" type="file" accept="application/json" onChange={onImportJson} style={{ display: 'none' }} />
          </div>

          {/* Row 4: Actions */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={clearBoxes} className="button button-dark" disabled={!boxes.length}>Clear</button>
            <button onClick={exportJpg} disabled={!imageUrl} className="button button-success">Export JPG</button>
            <button onClick={exportZipBatch} disabled={!fileList.length} className="button button-dark">Export ZIP (batch)</button>
          </div>
        </div>
      </div>
      <div className="card" style={{ maxWidth: '100%', overflow: 'auto' }}>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Redaction canvas preview"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          style={{ cursor: 'crosshair', maxWidth: '100%', touchAction: 'none' }}
        />
      </div>

      <div className="card">
        <h2 style={{ marginBottom: 8 }}>Frequently Asked Questions (FAQ)</h2>
        <div style={{ display: 'grid', gap: 8 }}>
          {faqItems.map((item, idx) => (
            <FaqItem key={idx} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </div>
  );
}


