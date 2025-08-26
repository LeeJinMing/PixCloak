"use client";
import { useEffect, useRef, useState } from "react";
import JSZip from "jszip";

type Box = { x: number; y: number; w: number; h: number };
type RelBox = { x: number; y: number; w: number; h: number }; // 0..1 relative
const PRESETS: { key: string; name: string; boxes: RelBox[] }[] = [
  { key: 'wechat', name: '微信聊天（头像+昵称+时间）', boxes: [ { x:0.02,y:0.01,w:0.16,h:0.09}, {x:0.20,y:0.02,w:0.35,h:0.06} ] },
  { key: 'license-plate', name: '车牌（底部中央区域示例）', boxes: [ { x:0.35,y:0.75,w:0.30,h:0.12} ] },
  { key: 'id-card', name: '证件号（示例区域）', boxes: [ { x:0.20,y:0.60,w:0.60,h:0.12} ] },
];

export default function RedactPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileList, setFileList] = useState<File[]>([]);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [drawing, setDrawing] = useState<boolean>(false);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [mode, setMode] = useState<"solid" | "pixelate">("solid");
  const undoStack = useRef<Box[][]>([]);
  const [presetKey, setPresetKey] = useState<string>("");

  async function handleFile(file: File) {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setBoxes([]);
  }
  function handleFiles(list: FileList) {
    const arr = Array.from(list).filter(f=> f.type.startsWith('image/'))
    setFileList(arr);
    if (arr[0]) handleFile(arr[0]);
  }

  function onCanvasDown(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setDrawing(true);
  }

  function onCanvasMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!drawing || !start) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const w = x - start.x;
    const h = y - start.y;
    const temp: Box = {
      x: Math.min(start.x, x),
      y: Math.min(start.y, y),
      w: Math.abs(w),
      h: Math.abs(h),
    };
    draw(temp);
  }

  function onCanvasUp(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!drawing || !start) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const box: Box = {
      x: Math.min(start.x, x),
      y: Math.min(start.y, y),
      w: Math.abs(x - start.x),
      h: Math.abs(y - start.y),
    };
    setBoxes((prev) => {
      undoStack.current.push(prev);
      return [...prev, box];
    });
    setDrawing(false);
    setStart(null);
  }

  function draw(preview?: Box) {
    const canvas = canvasRef.current;
    if (!canvas || !imageUrl) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const all = [...boxes, ...(preview ? [preview] : [])];
      for (const b of all) {
        if (mode === "solid") {
          ctx.fillStyle = "#000";
          ctx.fillRect(b.x, b.y, b.w, b.h);
        } else {
          // pixelate
          const scale = 0.07; // strong pixelation
          const tmpW = Math.max(1, Math.floor(b.w * scale));
          const tmpH = Math.max(1, Math.floor(b.h * scale));
          const tmp = document.createElement("canvas");
          tmp.width = tmpW; tmp.height = tmpH;
          const tctx = tmp.getContext("2d");
          if (!tctx) continue;
          tctx.drawImage(canvas, b.x, b.y, b.w, b.h, 0, 0, tmpW, tmpH);
          // upscale without smoothing
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(tmp, 0, 0, tmpW, tmpH, b.x, b.y, b.w, b.h);
        }
      }
    };
    img.src = imageUrl;
  }

  function applyPreset() {
    if (!canvasRef.current) return;
    const cw = canvasRef.current.width || 1;
    const ch = canvasRef.current.height || 1;
    const preset = PRESETS.find(p => p.key === presetKey);
    if (!preset) return;
    const abs: Box[] = preset.boxes.map(r => ({ x: r.x * cw, y: r.y * ch, w: r.w * cw, h: r.h * ch }));
    undoStack.current.push(boxes);
    setBoxes(abs);
    setTimeout(() => draw(), 0);
  }

  function exportJpg() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "redacted.jpg";
      a.click();
      URL.revokeObjectURL(url);
    }, "image/jpeg", 0.92);
  }

  async function exportZipBatch() {
    if (!fileList.length) return;
    const zip = new JSZip();
    for (const f of fileList) {
      const img = await loadImage(URL.createObjectURL(f));
      const canvas = document.createElement('canvas');
      canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) continue;
      ctx.drawImage(img, 0, 0);
      const rel = boxes.map(b => ({ x: b.x / (canvasRef.current?.width || img.width), y: b.y / (canvasRef.current?.height || img.height), w: b.w / (canvasRef.current?.width || img.width), h: b.h / (canvasRef.current?.height || img.height) }));
      for (const r of rel) {
        const bx = r.x * canvas.width, by = r.y * canvas.height, bw = r.w * canvas.width, bh = r.h * canvas.height;
        if (mode === 'solid') {
          ctx.fillStyle = '#000';
          ctx.fillRect(bx, by, bw, bh);
        } else {
          const scale = 0.07;
          const tmpW = Math.max(1, Math.floor(bw * scale));
          const tmpH = Math.max(1, Math.floor(bh * scale));
          const tmp = document.createElement('canvas');
          tmp.width = tmpW; tmp.height = tmpH;
          const tctx = tmp.getContext('2d');
          if (!tctx) continue;
          tctx.drawImage(canvas, bx, by, bw, bh, 0, 0, tmpW, tmpH);
          (ctx as CanvasRenderingContext2D).imageSmoothingEnabled = false;
          ctx.drawImage(tmp, 0, 0, tmpW, tmpH, bx, by, bw, bh);
        }
      }
      const blob: Blob | null = await new Promise((resolve)=> canvas.toBlob(resolve, 'image/jpeg', 0.92));
      if (!blob) continue;
      zip.file(renameOut(f.name), blob);
    }
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url; a.download = 'redacted-images.zip'; a.click();
    URL.revokeObjectURL(url);
  }

  function renameOut(name: string) {
    const dot = name.lastIndexOf('.');
    const base = dot > 0 ? name.slice(0, dot) : name;
    return base + '-redacted.jpg';
  }

  function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  // shortcuts: Space toggle mode, Delete undo
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code === 'Space') {
        e.preventDefault();
        setMode((m) => (m === 'solid' ? 'pixelate' : 'solid'));
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        setBoxes((prev) => {
          const last = undoStack.current.pop();
          return last ?? prev.slice(0, -1);
        });
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h1>Image Redaction (local)</h1>
      <p>Draw boxes to mask sensitive regions. Processing is local and irreversible (solid/pixelate). EXIF/GPS will be removed on export.</p>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', padding: '8px 0' }}>
        <strong>Shortcuts:</strong>
        <span>Space = toggle solid/pixelate</span>
        <span>Delete = undo</span>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
            setTimeout(() => draw(), 0);
          }}
        />
        <select value={mode} onChange={(e) => setMode(e.target.value as ("solid"|"pixelate"))}>
          <option value="solid">Solid block</option>
          <option value="pixelate">Strong pixelation</option>
        </select>
        <label>
          Preset:
          <select value={presetKey} onChange={(e)=> setPresetKey(e.target.value)} style={{ marginLeft: 6 }}>
            <option value="">None</option>
            {PRESETS.map(p => <option key={p.key} value={p.key}>{p.name}</option>)}
          </select>
        </label>
        <button onClick={applyPreset} disabled={!presetKey || !imageUrl}>Apply preset</button>
        <button onClick={() => setBoxes([])}>Clear</button>
        <button onClick={exportJpg} disabled={!imageUrl}>Export JPG</button>
        <button onClick={exportZipBatch} disabled={!fileList.length}>Export ZIP (batch)</button>
      </div>
      <div style={{ border: '1px solid #ddd', padding: 8, maxWidth: '100%', overflow: 'auto' }}>
        <canvas
          ref={canvasRef}
          onMouseDown={onCanvasDown}
          onMouseMove={onCanvasMove}
          onMouseUp={onCanvasUp}
          style={{ cursor: 'crosshair', maxWidth: '100%' }}
        />
      </div>
    </div>
  );
}


