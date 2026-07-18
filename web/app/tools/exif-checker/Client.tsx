"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  downloadZipFromBlobs,
  formatBytes,
  metadataIsClean,
  runWithConcurrency,
  scanImageMetadata,
  stripAndVerifyMetadata,
  type MetadataCleanupMethod,
  type MetadataScan,
} from "@/lib/image";
import { batchCountBucket, durationBucket, emitProductEvent } from "@/lib/productEvents";

type Entry = {
  id: string;
  file: File;
  scan: MetadataScan;
  width?: number;
  height?: number;
  status: "ready" | "cleaning" | "done" | "failed";
  error?: string;
  output?: { blob: Blob; url: string; scan: MetadataScan; method: MetadataCleanupMethod };
};

function ScanBadges({ scan }: { scan: MetadataScan }) {
  const badges = [
    ["EXIF", scan.hasExif], ["GPS", scan.hasGps], ["XMP", scan.hasXmp], ["IPTC", scan.hasIptc],
  ] as const;
  return <div className="metadata-badges">{badges.map(([label, found]) => <span key={label} data-found={found}>{label}: {found ? "found" : "not found"}</span>)}</div>;
}

function cleanName(file: File) {
  const dot = file.name.lastIndexOf(".");
  const base = dot > 0 ? file.name.slice(0, dot) : file.name;
  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  return `${base}-clean.${extension}`;
}

export default function Client() {
  const outputUrls = useRef(new Set<string>());
  const fileRef = useRef<HTMLInputElement>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  useEffect(() => {
    emitProductEvent("tool_view", { tool: "metadata_checker" });
    const urls = outputUrls.current;
    return () => { for (const url of urls) URL.revokeObjectURL(url); };
  }, []);

  async function onPick(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []).slice(0, 50);
    for (const url of outputUrls.current) URL.revokeObjectURL(url);
    outputUrls.current.clear();
    setProgress({ done: 0, total: 0 });
    const inspected = await Promise.all(files.map(async (file, index): Promise<Entry> => {
      const scan = await scanImageMetadata(file);
      let width: number | undefined;
      let height: number | undefined;
      try {
        const bitmap = await createImageBitmap(file);
        width = bitmap.width;
        height = bitmap.height;
        bitmap.close();
      } catch { /* byte inspection can still be useful when browser decode fails */ }
      return { id: `${file.lastModified}-${file.size}-${index}`, file, scan, width, height, status: "ready" };
    }));
    setEntries(inspected);
  }

  async function cleanAll() {
    const cleanable = entries.filter((entry) => entry.scan.supported);
    if (!cleanable.length) return;
    const startedAt = performance.now();
    setBusy(true);
    setProgress({ done: 0, total: cleanable.length });
    setEntries((current) => current.map((entry) => entry.scan.supported ? { ...entry, status: "cleaning", error: undefined } : entry));
    emitProductEvent(cleanable.length > 1 ? "batch_started" : "process_started", {
      tool: "metadata_checker",
      input_format: cleanable.length > 1 ? "mixed" : cleanable[0].scan.format,
      batch_count_bucket: batchCountBucket(cleanable.length),
    });

    let completed = 0;
    const results = await runWithConcurrency(cleanable, 3, async (entry) => {
      try {
        const clean = await stripAndVerifyMetadata(entry.file);
        const url = URL.createObjectURL(clean.blob);
        outputUrls.current.add(url);
        return { id: entry.id, output: { blob: clean.blob, url, scan: clean.scan, method: clean.method } };
      } catch (cause) {
        return { id: entry.id, error: cause instanceof Error ? cause.message : "Metadata cleanup failed." };
      } finally {
        completed += 1;
        setProgress({ done: completed, total: cleanable.length });
      }
    });

    const byId = new Map(results.map((result) => [result.id, result]));
    setEntries((current) => current.map((entry) => {
      const result = byId.get(entry.id);
      if (!result) return entry;
      return result.output
        ? { ...entry, status: "done", output: result.output, error: undefined }
        : { ...entry, status: "failed", error: result.error || "Metadata cleanup failed." };
    }));
    const successCount = results.filter((result) => result.output).length;
    emitProductEvent(successCount ? "process_succeeded" : "process_failed", {
      tool: "metadata_checker",
      output_format: cleanable.length > 1 ? "mixed" : cleanable[0].scan.format,
      batch_count_bucket: batchCountBucket(cleanable.length),
      duration_bucket: durationBucket(performance.now() - startedAt),
      ...(successCount ? {} : { error_code: "metadata_cleanup_failed" }),
    });
    setBusy(false);
  }

  function downloadOne(entry: Entry) {
    if (!entry.output) return;
    const anchor = document.createElement("a");
    anchor.href = entry.output.url;
    anchor.download = cleanName(entry.file);
    anchor.click();
    emitProductEvent("download_completed", { tool: "metadata_checker", output_format: entry.scan.format, batch_count_bucket: "1" });
  }

  async function downloadAll() {
    const outputs = entries.filter((entry) => entry.output).map((entry) => ({ name: cleanName(entry.file), blob: entry.output!.blob }));
    if (!outputs.length) return;
    await downloadZipFromBlobs(outputs, "pixcloak-clean-images.zip");
    emitProductEvent("download_completed", { tool: "metadata_checker", output_format: "mixed", batch_count_bucket: batchCountBucket(outputs.length) });
  }

  const complete = entries.filter((entry) => entry.output);

  return (
    <div className="metadata-tool">
      <div className="card metadata-picker">
        <strong>Choose up to 50 JPG, PNG, or WebP images</strong>
        <input ref={fileRef} id="metadata-file" type="file" disabled={busy} multiple accept="image/jpeg,image/png,image/webp,.heic,.heif" onChange={onPick} hidden />
        <div className="file-action-row">
          <button type="button" className="button-outline" disabled={busy} onClick={() => fileRef.current?.click()}>Choose images</button>
          <span>{entries.length ? `${entries.length} image${entries.length === 1 ? "" : "s"} inspected` : "No images selected"}</span>
        </div>
        <p className="text-muted">JPEG, PNG, and WebP are cleaned without re-encoding when safe. JPEGs that depend on EXIF orientation are re-encoded so the visible rotation is preserved.</p>
      </div>

      {entries.length > 0 && (
        <div className="metadata-batch-actions">
          <button className="button" onClick={cleanAll} disabled={busy || !entries.some((entry) => entry.scan.supported)}>
            {busy ? `Cleaning and verifying ${progress.done}/${progress.total}…` : `Clean and verify ${entries.filter((entry) => entry.scan.supported).length} image${entries.length === 1 ? "" : "s"}`}
          </button>
          {complete.length > 1 && <button className="button button-dark" onClick={downloadAll}>Download verified ZIP ({complete.length})</button>}
        </div>
      )}

      <div className="metadata-result-list">
        {entries.map((entry) => (
          <article className="card metadata-result" key={entry.id}>
            <div className="metadata-result__head">
              <div><h2>{entry.file.name}</h2><p>{entry.scan.format.toUpperCase()} • {formatBytes(entry.file.size)}{entry.width ? ` • ${entry.width}×${entry.height}` : ""}</p></div>
              <span className={`result-status result-status--${entry.status}`}>{entry.status === "done" ? "verified" : entry.status}</span>
            </div>
            <ScanBadges scan={entry.scan} />
            {entry.scan.note && <p className="text-muted">{entry.scan.note}</p>}
            {!entry.scan.supported && <Link className="button-outline" href="/tools/heic-converter">Convert HEIC first</Link>}
            {entry.output && (
              <div className="metadata-clean-result">
                <strong>Clean export verified · {entry.output.method === "lossless" ? "pixels preserved without re-encoding" : "orientation-safe re-encode"}</strong>
                <ScanBadges scan={entry.output.scan} />
                <p>{metadataIsClean(entry.output.scan) ? "The downloaded copy was reopened and no supported metadata markers were detected." : "Metadata remains; do not share this result."}</p>
                <button className="button button-success" onClick={() => downloadOne(entry)}>Download clean image</button>
              </div>
            )}
            {entry.error && <p role="alert" className="tool-error">{entry.error}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}
