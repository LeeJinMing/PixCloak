"use client";

import { useEffect, useRef, useState } from "react";
import { canvasToBlob, formatBytes, getSourceSize, loadOrientedBitmap } from "@/lib/image";
import { batchCountBucket, durationBucket, emitProductEvent } from "@/lib/productEvents";

type Locale = "en" | "zh";
type PageSize = "a4" | "letter" | "image";
type Item = { id: string; file: File; preview: string };

const copy = {
  en: {
    title: "Combine images into one PDF", intro: "Reorder up to 50 images, choose a page size and margin, then create the PDF locally without uploading the sources.",
    choose: "Choose images", empty: "Choose JPG, PNG, WebP, or HEIC images.", pageSize: "Page size", margin: "Margin (mm)", quality: "Image quality", create: "Create and verify PDF", creating: "Creating PDF…", download: "Download PDF", remove: "Remove", up: "Move up", down: "Move down", verified: "PDF header, page count, and final bytes verified", a4: "A4 (auto portrait/landscape)", letter: "US Letter (auto portrait/landscape)", image: "Fit each page to its image",
  },
  zh: {
    title: "多张图片合并为一个 PDF", intro: "最多选择 50 张图片，按所需顺序排列并设置页面与边距，然后在浏览器本地生成 PDF，原图无需上传。",
    choose: "选择多张图片", empty: "请选择 JPG、PNG、WebP 或 HEIC 图片。", pageSize: "页面大小", margin: "页边距（毫米）", quality: "图片质量", create: "生成并验证 PDF", creating: "正在生成 PDF…", download: "下载 PDF", remove: "删除", up: "上移", down: "下移", verified: "PDF 文件头、页数和最终字节已验证", a4: "A4（自动横竖版）", letter: "美式 Letter（自动横竖版）", image: "每页适应原图比例",
  },
} as const;

const MM_TO_PT = 72 / 25.4;
const sizes = { a4: [595.28, 841.89], letter: [612, 792] } as const;

export default function ImageToPdfClient({ locale = "en" }: { locale?: Locale }) {
  const s = copy[locale];
  const [items, setItems] = useState<Item[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [marginMm, setMarginMm] = useState(10);
  const [quality, setQuality] = useState(0.9);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ blob: Blob; url: string; pages: number } | null>(null);
  const previewUrls = useRef(new Set<string>());

  useEffect(() => {
    emitProductEvent("tool_view", { tool: "/tools/image-to-pdf" });
    const urls = previewUrls.current;
    return () => { for (const url of urls) URL.revokeObjectURL(url); };
  }, []);

  function clearResult() {
    if (result) { URL.revokeObjectURL(result.url); previewUrls.current.delete(result.url); }
    setResult(null);
  }

  function addFiles(files: FileList | null) {
    if (!files) return;
    clearResult();
    setError("");
    setItems((current) => {
      const room = Math.max(0, 50 - current.length);
      const additions = Array.from(files).slice(0, room).map((file, index) => {
        const preview = URL.createObjectURL(file); previewUrls.current.add(preview);
        return { id: `${file.lastModified}-${file.size}-${current.length + index}`, file, preview };
      });
      return [...current, ...additions];
    });
  }

  function move(index: number, direction: -1 | 1) {
    setItems((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current]; [next[index], next[target]] = [next[target], next[index]]; return next;
    });
    clearResult();
  }

  function remove(index: number) {
    setItems((current) => {
      const item = current[index]; if (item) { URL.revokeObjectURL(item.preview); previewUrls.current.delete(item.preview); }
      return current.filter((_, itemIndex) => itemIndex !== index);
    });
    clearResult();
  }

  async function createPdf() {
    if (!items.length) return;
    const startedAt = performance.now();
    setBusy(true); setError(""); setProgress(0); clearResult();
    emitProductEvent(items.length > 1 ? "batch_started" : "process_started", { tool: "/tools/image-to-pdf", input_format: items.length > 1 ? "mixed" : items[0].file.type, batch_count_bucket: batchCountBucket(items.length) });
    try {
      const { PDFDocument } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.create();
      pdfDoc.setTitle("PixCloak image export");
      pdfDoc.setCreator("PixCloak local browser tool");
      pdfDoc.setProducer("PixCloak");
      const margin = Math.max(0, Math.min(50, marginMm)) * MM_TO_PT;

      for (let index = 0; index < items.length; index++) {
        const source = await loadOrientedBitmap(items[index].file);
        try {
          const { width, height } = getSourceSize(source);
          const renderCanvas = window.document.createElement("canvas");
          renderCanvas.width = width; renderCanvas.height = height;
          const context = renderCanvas.getContext("2d");
          if (!context) throw new Error("Canvas is not available in this browser.");
          context.fillStyle = "#ffffff"; context.fillRect(0, 0, width, height); context.drawImage(source, 0, 0, width, height);
          const jpeg = await canvasToBlob(renderCanvas, "image/jpeg", quality);
          const image = await pdfDoc.embedJpg(await jpeg.arrayBuffer());
          let pageWidth: number; let pageHeight: number;
          if (pageSize === "image") {
            pageWidth = Math.max(72, width * 0.75 + margin * 2); pageHeight = Math.max(72, height * 0.75 + margin * 2);
          } else {
            const base = sizes[pageSize]; const landscape = width > height;
            pageWidth = landscape ? base[1] : base[0]; pageHeight = landscape ? base[0] : base[1];
          }
          const availableWidth = Math.max(1, pageWidth - margin * 2); const availableHeight = Math.max(1, pageHeight - margin * 2);
          const ratio = Math.min(availableWidth / width, availableHeight / height);
          const drawWidth = width * ratio; const drawHeight = height * ratio;
          const page = pdfDoc.addPage([pageWidth, pageHeight]);
          page.drawImage(image, { x: (pageWidth - drawWidth) / 2, y: (pageHeight - drawHeight) / 2, width: drawWidth, height: drawHeight });
        } finally {
          if (source instanceof ImageBitmap) source.close();
        }
        setProgress(index + 1);
      }

      const bytes = await pdfDoc.save({ useObjectStreams: true });
      if (new TextDecoder("latin1").decode(bytes.subarray(0, 5)) !== "%PDF-") throw new Error("Generated file is not a valid PDF.");
      const stableBytes = new Uint8Array(bytes);
      const blob = new Blob([stableBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob); previewUrls.current.add(url);
      setResult({ blob, url, pages: pdfDoc.getPageCount() });
      emitProductEvent("process_succeeded", { tool: "/tools/image-to-pdf", input_format: items.length > 1 ? "mixed" : items[0].file.type, output_format: "pdf", batch_count_bucket: batchCountBucket(items.length), duration_bucket: durationBucket(performance.now() - startedAt) });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not create the PDF.");
      emitProductEvent("process_failed", { tool: "/tools/image-to-pdf", duration_bucket: durationBucket(performance.now() - startedAt), error_code: "verification_failed" });
    } finally { setBusy(false); }
  }

  function download() {
    if (!result) return;
    const anchor = document.createElement("a"); anchor.href = result.url; anchor.download = "pixcloak-images.pdf"; anchor.click();
    emitProductEvent("download_completed", { tool: "/tools/image-to-pdf", output_format: "pdf", batch_count_bucket: batchCountBucket(result.pages) });
  }

  return <div className="card image-pdf-tool">
    <div className="tool-heading"><div><span className="eyebrow">IMAGES → PDF</span><h2>{s.title}</h2><p>{s.intro}</p></div><span className="local-status">{locale === "zh" ? "本地生成" : "Local only"}</span></div>
    <div className="image-pdf-settings"><label>{s.pageSize}<select disabled={busy} value={pageSize} onChange={(event) => { setPageSize(event.target.value as PageSize); clearResult(); }}><option value="a4">{s.a4}</option><option value="letter">{s.letter}</option><option value="image">{s.image}</option></select></label><label>{s.margin}<input type="number" disabled={busy} min={0} max={50} value={marginMm} onChange={(event) => { setMarginMm(Number(event.target.value)); clearResult(); }} /></label><label>{s.quality} {Math.round(quality * 100)}%<input type="range" disabled={busy} min={0.5} max={1} step={0.05} value={quality} onChange={(event) => { setQuality(Number(event.target.value)); clearResult(); }} /></label></div>
    <label className="file-picker">{s.choose}<input type="file" disabled={busy} multiple accept="image/jpeg,image/png,image/webp,.heic,.heif" onChange={(event) => addFiles(event.target.files)} /></label>
    {!items.length && <p className="text-muted">{s.empty}</p>}
    <ol className="image-pdf-list">{items.map((item, index) => <li key={item.id}><img src={item.preview} alt="" /><div><strong>{index + 1}. {item.file.name}</strong><small>{formatBytes(item.file.size)}</small></div><div className="row-controls"><button onClick={() => move(index, -1)} disabled={busy || index === 0} aria-label={s.up}>↑</button><button onClick={() => move(index, 1)} disabled={busy || index === items.length - 1} aria-label={s.down}>↓</button><button onClick={() => remove(index)} disabled={busy} aria-label={s.remove}>×</button></div></li>)}</ol>
    <div className="file-action-row"><button className="button" onClick={createPdf} disabled={busy || !items.length}>{busy ? `${s.creating} ${progress}/${items.length}` : s.create}</button>{result && <button className="button button-success" onClick={download}>{s.download} · {result.pages} pages · {formatBytes(result.blob.size)}</button>}</div>
    {result && <p className="verification-copy">✓ {s.verified}</p>}{error && <p className="tool-error" role="alert">{error}</p>}
  </div>;
}
