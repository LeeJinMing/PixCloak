"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  formatBytes,
  metadataIsClean,
  scanImageMetadata,
  stripAndVerifyMetadata,
  type MetadataScan,
} from "@/lib/image";
import { durationBucket, emitProductEvent, fileSizeBucket } from "@/lib/productEvents";

type Result = {
  file: File;
  scan: MetadataScan;
  width?: number;
  height?: number;
};

function ScanBadges({ scan }: { scan: MetadataScan }) {
  const badges = [
    ["EXIF", scan.hasExif], ["GPS", scan.hasGps], ["XMP", scan.hasXmp], ["IPTC", scan.hasIptc],
  ] as const;
  return <div className="metadata-badges">{badges.map(([label, found]) => <span key={label} data-found={found}>{label}: {found ? "found" : "not found"}</span>)}</div>;
}

export default function Client() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const outputUrlRef = useRef<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [cleanScan, setCleanScan] = useState<MetadataScan | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    emitProductEvent("tool_view", { tool: "metadata_checker" });
    return () => { if (outputUrlRef.current) URL.revokeObjectURL(outputUrlRef.current); };
  }, []);

  async function onPick(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setError("");
    setOutUrl(null);
    setCleanScan(null);
    const scan = await scanImageMetadata(file);
    let width: number | undefined;
    let height: number | undefined;
    try {
      const bitmap = await createImageBitmap(file);
      width = bitmap.width; height = bitmap.height; bitmap.close();
    } catch { /* metadata can still be reported for an image the browser cannot decode */ }
    setResult({ file, scan, width, height });
  }

  async function onStrip() {
    if (!result) return;
    const startedAt = performance.now();
    setBusy(true); setError("");
    emitProductEvent("process_started", { tool: "metadata_checker", input_format: result.file.type || result.scan.format, file_size_bucket: fileSizeBucket(result.file.size) });
    try {
      const clean = await stripAndVerifyMetadata(result.file);
      if (outputUrlRef.current) URL.revokeObjectURL(outputUrlRef.current);
      const url = URL.createObjectURL(clean.blob);
      outputUrlRef.current = url;
      setOutUrl(url);
      setCleanScan(clean.scan);
      emitProductEvent("process_succeeded", { tool: "metadata_checker", output_format: clean.blob.type, duration_bucket: durationBucket(performance.now() - startedAt) });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Metadata cleanup failed.");
      emitProductEvent("process_failed", { tool: "metadata_checker", duration_bucket: durationBucket(performance.now() - startedAt), error_code: "metadata_cleanup_failed" });
    } finally { setBusy(false); }
  }

  function downloadClean() {
    if (!outUrl || !result) return;
    const dot = result.file.name.lastIndexOf(".");
    const base = dot > 0 ? result.file.name.slice(0, dot) : result.file.name;
    const extension = result.file.type === "image/png" ? "png" : result.file.type === "image/webp" ? "webp" : "jpg";
    const anchor = document.createElement("a");
    anchor.href = outUrl; anchor.download = `${base}-clean.${extension}`; anchor.click();
    emitProductEvent("download_completed", { tool: "metadata_checker", output_format: extension, batch_count_bucket: "1" });
  }

  return (
    <div className="metadata-tool">
      <div className="card">
        <label htmlFor="metadata-file"><strong>Choose a JPG, PNG, or WebP image</strong></label>
        <input id="metadata-file" ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,.heic,.heif" onChange={onPick} className="input" />
        <p className="text-muted">HEIC files can be identified, but full HEIC metadata inspection is not available in V1.0. Convert them before the final privacy review.</p>
      </div>

      {result && (
        <div className="card metadata-result">
          <h2>Inspection result</h2>
          <p>{result.scan.format.toUpperCase()} • {formatBytes(result.file.size)}{result.width ? ` • ${result.width}×${result.height}` : ""}</p>
          <ScanBadges scan={result.scan} />
          {result.scan.note && <p className="text-muted">{result.scan.note}</p>}
          <button className="button" onClick={onStrip} disabled={busy || !result.scan.supported}>{busy ? "Cleaning and verifying…" : "Remove metadata and verify"}</button>
          {!result.scan.supported && <Link className="button-outline" href="/tools/heic-converter">Convert HEIC first</Link>}
        </div>
      )}

      {cleanScan && (
        <div className="card verification-banner">
          <h2>Clean export verified</h2>
          <ScanBadges scan={cleanScan} />
          <p>{metadataIsClean(cleanScan) ? "The exported file was reopened and no supported metadata markers were detected." : "Metadata remains; do not share this result."}</p>
          <button className="button button-success" onClick={downloadClean}>Download clean image</button>
        </div>
      )}
      {error && <div className="card" role="alert" style={{ color: "#991b1b" }}>{error}</div>}
    </div>
  );
}
