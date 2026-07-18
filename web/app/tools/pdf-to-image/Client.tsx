"use client";

import { useEffect, useRef, useState } from "react";
import { downloadZipFromBlobs, verifyImageBlob } from "@/lib/image";
import { getPdfToImageStrings } from "@/lib/i18n/pdfToImage";
import { batchCountBucket, durationBucket, emitProductEvent, fileSizeBucket } from "@/lib/productEvents";

const HARD_MAX_PAGES = 50;
type Props = { locale?: "en" | "zh" };
type OutputFormat = "image/png" | "image/jpeg" | "image/webp";
type PageOutput = { page: number; name: string; blob: Blob; url: string; width: number; height: number };

const extensionFor = (format: OutputFormat) => format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
const labelFor = (format: OutputFormat) => format === "image/png" ? "PNG" : format === "image/webp" ? "WebP" : "JPEG";

export default function PdfToImageClient({ locale = "en" }: Props) {
  const s = getPdfToImageStrings(locale);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(20);
  const [scale, setScale] = useState(2);
  const [format, setFormat] = useState<OutputFormat>("image/png");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<PageOutput[]>([]);
  const [meta, setMeta] = useState<{ rendered: number; total: number; start: number; end: number } | null>(null);
  const [pickedName, setPickedName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const outputUrls = useRef(new Set<string>());

  useEffect(() => {
    emitProductEvent("tool_view", { tool: "/tools/pdf-to-image" });
    const urls = outputUrls.current;
    return () => { for (const url of urls) URL.revokeObjectURL(url); };
  }, []);

  function clearOutputs() {
    for (const url of outputUrls.current) URL.revokeObjectURL(url);
    outputUrls.current.clear();
    setDone([]);
    setMeta(null);
  }

  const run = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return setError(s.choosePdfFirst);
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) return setError(s.invalidPdf);
    if (startPage < 1 || endPage < startPage || endPage - startPage + 1 > HARD_MAX_PAGES) return setError(s.invalidRange);

    const startedAt = performance.now();
    setProcessing(true);
    setError("");
    clearOutputs();
    emitProductEvent("process_started", { tool: "/tools/pdf-to-image", input_format: "pdf", file_size_bucket: fileSizeBucket(file.size) });
    if (endPage > startPage) {
      emitProductEvent("batch_started", { tool: "/tools/pdf-to-image", input_format: "pdf", batch_count_bucket: batchCountBucket(endPage - startPage + 1) });
    }
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.mjs", import.meta.url).toString();
      const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
      const total = pdf.numPages;
      const actualStart = Math.min(startPage, total);
      const actualEnd = Math.min(endPage, total, actualStart + HARD_MAX_PAGES - 1);
      if (startPage > total) throw new Error(`This PDF has ${total} pages; page ${startPage} does not exist.`);
      const outputs: PageOutput[] = [];
      const extension = extensionFor(format);

      for (let pageNumber = actualStart; pageNumber <= actualEnd; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(viewport.width));
        canvas.height = Math.max(1, Math.round(viewport.height));
        await page.render({ canvas, viewport }).promise;
        const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(
          (value) => value ? resolve(value) : reject(new Error(s.encodeFail)),
          format,
          format === "image/png" ? undefined : 0.92,
        ));
        const verified = await verifyImageBlob(blob);
        const url = URL.createObjectURL(blob);
        outputUrls.current.add(url);
        outputs.push({ page: pageNumber, name: `page-${String(pageNumber).padStart(3, "0")}.${extension}`, blob, url, width: verified.width, height: verified.height });
      }
      setDone(outputs);
      setMeta({ rendered: outputs.length, total, start: actualStart, end: actualEnd });
      emitProductEvent("process_succeeded", { tool: "/tools/pdf-to-image", output_format: format, batch_count_bucket: batchCountBucket(outputs.length), duration_bucket: durationBucket(performance.now() - startedAt) });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : s.errorGeneric);
      emitProductEvent("process_failed", { tool: "/tools/pdf-to-image", duration_bucket: durationBucket(performance.now() - startedAt), error_code: "decode_failed" });
    } finally {
      setProcessing(false);
    }
  };

  async function downloadZip() {
    if (!done.length) return;
    await downloadZipFromBlobs(done.map(({ name, blob }) => ({ name, blob })), "pixcloak-pdf-pages.zip");
    emitProductEvent("download_completed", { tool: "/tools/pdf-to-image", output_format: format, batch_count_bucket: batchCountBucket(done.length) });
  }

  const intro = s.intro.replace("{cap}", String(HARD_MAX_PAGES));

  return (
    <div className="card pdf-export-tool">
      <div className="tool-heading"><div><span className="eyebrow">LOCAL PDF EXPORT</span><h2>{s.title}</h2><p>{intro}</p></div><span className="local-status">No upload</span></div>

      <div className="pdf-export-settings">
        <fieldset disabled={processing}><legend>{s.pageRange}</legend><label>{s.startPage}<input type="number" min={1} value={startPage} onChange={(event) => setStartPage(Math.max(1, Number(event.target.value) || 1))} /></label><label>{s.endPage}<input type="number" min={1} value={endPage} onChange={(event) => setEndPage(Math.max(1, Number(event.target.value) || 1))} /></label></fieldset>
        <label>{s.scaleLabel(scale)}<input type="range" disabled={processing} min={1} max={3} step={0.5} value={scale} onChange={(event) => setScale(Number(event.target.value))} /></label>
        <label>{s.outputFormat}<select disabled={processing} value={format} onChange={(event) => setFormat(event.target.value as OutputFormat)}><option value="image/png">PNG</option><option value="image/jpeg">JPEG</option><option value="image/webp">WebP</option></select></label>
      </div>

      <div className="file-action-row">
        <input ref={fileRef} type="file" disabled={processing} accept="application/pdf,.pdf" hidden onChange={(event) => { setPickedName(event.target.files?.[0]?.name || null); clearOutputs(); }} />
        <button type="button" className="button-outline" disabled={processing} onClick={() => fileRef.current?.click()}>{s.choosePdf}</button>
        {pickedName && <span>{pickedName}</span>}
        <button type="button" className="button" onClick={run} disabled={processing}>{processing ? s.rendering : s.convert}</button>
      </div>

      {error && <p className="tool-error" role="alert">{error}</p>}
      {meta && <p className="verification-copy">✓ {s.rendered(meta.rendered, meta.total, `${meta.start}–${meta.end}`)}</p>}
      {done.length > 0 && (
        <div className="pdf-export-results">
          <div className="file-action-row"><button className="button button-success" onClick={downloadZip}>{s.downloadZip(done.length, labelFor(format))}</button><button className="button-outline" onClick={clearOutputs}>{s.startOver}</button></div>
          <div className="pdf-page-grid">{done.map((output) => <a key={output.page} href={output.url} download={output.name} className="pdf-page-result"><span>Page {output.page}</span><strong>{output.width}×{output.height}</strong><small>{s.downloadPage(output.page)}</small></a>)}</div>
        </div>
      )}
    </div>
  );
}
