"use client";

import { useEffect, useRef, useState } from "react";
import {
  downloadZipFromBlobs,
  encodeWithinTargetKb,
  formatBytes,
  getSourceSize,
  loadOrientedBitmap,
  verifyImageBlob,
  type DrawableSource,
  type OutputFormat,
} from "@/lib/image";
import { batchCountBucket, durationBucket, emitProductEvent, fileSizeBucket } from "@/lib/productEvents";

type Locale = "en" | "zh";
type FitMode = "contain" | "cover";
type SlotKey = "photo" | "signature";
type Spec = { width: number; height: number; minKb: number; maxKb: number; format: OutputFormat; fit: FitMode };
type Prepared = { blob: Blob; url: string; name: string; width: number; height: number; format: string; size: number; quality?: number };

const copy = {
  en: {
    title: "Prepare a photo and signature together",
    intro: "Enter the exact rules shown by your form. PixCloak creates each file locally and offers it only after dimensions, format, file size, and decoding pass.",
    photo: "Photo",
    signature: "Signature",
    choose: "Choose image",
    width: "Width (px)", height: "Height (px)", min: "Minimum KB", max: "Maximum KB", format: "Format", fit: "Fit",
    contain: "Fit inside + white padding", cover: "Fill canvas + center crop",
    prepare: "Prepare selected files", preparing: "Preparing and verifying…", download: "Download", zip: "Download both as ZIP",
    noFile: "No image selected", verified: "Verified for the entered requirements", replace: "Use the requirements published by the destination form; the defaults are examples, not portal rules.",
  },
  zh: {
    title: "照片和签名一次准备完成",
    intro: "按报名或政务表单显示的要求填写。皮克图在浏览器本地生成文件，并在尺寸、格式、体积和可解码性全部通过后才提供下载。",
    photo: "照片",
    signature: "签名",
    choose: "选择图片",
    width: "宽度（px）", height: "高度（px）", min: "最小 KB", max: "最大 KB", format: "格式", fit: "适配方式",
    contain: "完整保留＋白色留边", cover: "铺满画布＋居中裁切",
    prepare: "生成并验证所选文件", preparing: "正在生成并验证…", download: "下载", zip: "下载照片和签名 ZIP",
    noFile: "尚未选择图片", verified: "已通过当前填写的要求", replace: "请以目标表单公布的要求为准；默认值只是示例，不代表任何具体平台。",
  },
} as const;

function drawFitted(source: DrawableSource, spec: Spec) {
  const canvas = document.createElement("canvas");
  canvas.width = spec.width;
  canvas.height = spec.height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not available in this browser");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, spec.width, spec.height);
  const sourceSize = getSourceSize(source);
  const ratio = spec.fit === "cover"
    ? Math.max(spec.width / sourceSize.width, spec.height / sourceSize.height)
    : Math.min(spec.width / sourceSize.width, spec.height / sourceSize.height);
  const drawWidth = sourceSize.width * ratio;
  const drawHeight = sourceSize.height * ratio;
  context.drawImage(source, (spec.width - drawWidth) / 2, (spec.height - drawHeight) / 2, drawWidth, drawHeight);
  return canvas;
}

async function prepareFile(file: File, slot: SlotKey, spec: Spec): Promise<Prepared> {
  if (spec.width < 1 || spec.height < 1 || spec.width > 6000 || spec.height > 6000) throw new Error("Width and height must be between 1 and 6000 pixels.");
  if (spec.maxKb < 1 || spec.minKb < 0 || spec.minKb > spec.maxKb) throw new Error("Enter a valid minimum and maximum KB range.");
  const source = await loadOrientedBitmap(file);
  try {
    const canvas = drawFitted(source, spec);
    const encoded = await encodeWithinTargetKb(canvas, spec.format, spec.maxKb, 0.96, { allowDimensionReduction: false, minQuality: 0.2 });
    const verified = await verifyImageBlob(encoded.blob);
    if (verified.width !== spec.width || verified.height !== spec.height) throw new Error("Exported dimensions do not match the requested canvas.");
    if (encoded.blob.size > spec.maxKb * 1024) throw new Error(`Export is larger than ${spec.maxKb} KB.`);
    if (spec.minKb > 0 && encoded.blob.size < spec.minKb * 1024) throw new Error(`Export is below the required ${spec.minKb} KB minimum. Try PNG, larger dimensions, or a lower minimum.`);
    const extension = spec.format === "image/png" ? "png" : "jpg";
    return { blob: encoded.blob, url: URL.createObjectURL(encoded.blob), name: `${slot}-ready.${extension}`, width: verified.width, height: verified.height, format: spec.format, size: encoded.blob.size, quality: encoded.quality };
  } finally {
    if (source instanceof ImageBitmap) source.close();
  }
}

export default function UploadPackClient({ locale = "en" }: { locale?: Locale }) {
  const s = copy[locale];
  const [files, setFiles] = useState<Partial<Record<SlotKey, File>>>({});
  const [specs, setSpecs] = useState<Record<SlotKey, Spec>>({
    photo: { width: 600, height: 600, minKb: 10, maxKb: 200, format: "image/jpeg", fit: "contain" },
    signature: { width: 300, height: 100, minKb: 5, maxKb: 50, format: "image/jpeg", fit: "contain" },
  });
  const [outputs, setOutputs] = useState<Partial<Record<SlotKey, Prepared>>>({});
  const [errors, setErrors] = useState<Partial<Record<SlotKey, string>>>({});
  const [busy, setBusy] = useState(false);
  const urls = useRef(new Set<string>());

  useEffect(() => {
    emitProductEvent("tool_view", { tool: "upload_pack" });
    const current = urls.current;
    return () => { for (const url of current) URL.revokeObjectURL(url); };
  }, []);

  function updateSpec(slot: SlotKey, patch: Partial<Spec>) {
    const previous = outputs[slot];
    if (previous) { URL.revokeObjectURL(previous.url); urls.current.delete(previous.url); }
    setSpecs((current) => ({ ...current, [slot]: { ...current[slot], ...patch } }));
    setOutputs((current) => ({ ...current, [slot]: undefined }));
    setErrors((current) => ({ ...current, [slot]: undefined }));
  }

  function chooseFile(slot: SlotKey, file?: File) {
    const previous = outputs[slot];
    if (previous) { URL.revokeObjectURL(previous.url); urls.current.delete(previous.url); }
    setFiles((current) => ({ ...current, [slot]: file }));
    setOutputs((current) => ({ ...current, [slot]: undefined }));
    setErrors((current) => ({ ...current, [slot]: undefined }));
  }

  async function run() {
    const selected = (Object.keys(files) as SlotKey[]).filter((slot) => files[slot]);
    if (!selected.length) return;
    const startedAt = performance.now();
    setBusy(true);
    setErrors({});
    for (const slot of selected) {
      const previous = outputs[slot];
      if (previous) { URL.revokeObjectURL(previous.url); urls.current.delete(previous.url); }
    }
    setOutputs((current) => ({ ...current, ...Object.fromEntries(selected.map((slot) => [slot, undefined])) }));
    emitProductEvent(selected.length > 1 ? "batch_started" : "process_started", { tool: "upload_pack", input_format: selected.length > 1 ? "mixed" : files[selected[0]]!.type, batch_count_bucket: batchCountBucket(selected.length), file_size_bucket: selected.length === 1 ? fileSizeBucket(files[selected[0]]!.size) : undefined });
    let succeeded = 0;
    for (const slot of selected) {
      try {
        const prepared = await prepareFile(files[slot]!, slot, specs[slot]);
        urls.current.add(prepared.url);
        setOutputs((current) => ({ ...current, [slot]: prepared }));
        succeeded += 1;
      } catch (cause) {
        setErrors((current) => ({ ...current, [slot]: cause instanceof Error ? cause.message : "Preparation failed." }));
      }
    }
    emitProductEvent(succeeded ? "process_succeeded" : "process_failed", { tool: "upload_pack", output_format: selected.length > 1 ? "mixed" : specs[selected[0]].format, batch_count_bucket: batchCountBucket(selected.length), duration_bucket: durationBucket(performance.now() - startedAt), ...(succeeded ? {} : { error_code: "verification_failed" }) });
    setBusy(false);
  }

  function download(slot: SlotKey) {
    const output = outputs[slot];
    if (!output) return;
    const anchor = document.createElement("a"); anchor.href = output.url; anchor.download = output.name; anchor.click();
    emitProductEvent("download_completed", { tool: "upload_pack", output_format: output.format, batch_count_bucket: "1" });
  }

  async function downloadBoth() {
    const ready = (Object.keys(outputs) as SlotKey[]).filter((slot) => outputs[slot]).map((slot) => ({ name: outputs[slot]!.name, blob: outputs[slot]!.blob }));
    await downloadZipFromBlobs(ready, "pixcloak-upload-pack.zip");
    emitProductEvent("download_completed", { tool: "upload_pack", output_format: "mixed", batch_count_bucket: batchCountBucket(ready.length) });
  }

  return (
    <div className="upload-pack-tool">
      <div className="tool-heading"><div><span className="eyebrow">UPLOAD PACK</span><h2>{s.title}</h2><p>{s.intro}</p></div><span className="local-status">{locale === "zh" ? "本地处理" : "Local only"}</span></div>
      <p className="requirement-warning">{s.replace}</p>
      <div className="upload-pack-grid">
        {(["photo", "signature"] as SlotKey[]).map((slot) => {
          const spec = specs[slot]; const output = outputs[slot];
          return <section className="card upload-pack-slot" key={slot}>
            <div className="upload-pack-slot__title"><span>{slot === "photo" ? "01" : "02"}</span><h3>{s[slot]}</h3></div>
            <label className="file-picker">{s.choose}<input type="file" disabled={busy} accept="image/jpeg,image/png,image/webp,.heic,.heif" onChange={(event) => chooseFile(slot, event.target.files?.[0])} /></label>
            <small>{files[slot]?.name || s.noFile}</small>
            <div className="spec-grid">
              <label>{s.width}<input type="number" disabled={busy} min={1} max={6000} value={spec.width} onChange={(event) => updateSpec(slot, { width: Number(event.target.value) })} /></label>
              <label>{s.height}<input type="number" disabled={busy} min={1} max={6000} value={spec.height} onChange={(event) => updateSpec(slot, { height: Number(event.target.value) })} /></label>
              <label>{s.min}<input type="number" disabled={busy} min={0} value={spec.minKb} onChange={(event) => updateSpec(slot, { minKb: Number(event.target.value) })} /></label>
              <label>{s.max}<input type="number" disabled={busy} min={1} value={spec.maxKb} onChange={(event) => updateSpec(slot, { maxKb: Number(event.target.value) })} /></label>
              <label>{s.format}<select disabled={busy} value={spec.format} onChange={(event) => updateSpec(slot, { format: event.target.value as OutputFormat })}><option value="image/jpeg">JPEG</option><option value="image/png">PNG</option></select></label>
              <label>{s.fit}<select disabled={busy} value={spec.fit} onChange={(event) => updateSpec(slot, { fit: event.target.value as FitMode })}><option value="contain">{s.contain}</option><option value="cover">{s.cover}</option></select></label>
            </div>
            {errors[slot] && <p className="tool-error" role="alert">{errors[slot]}</p>}
            {output && <div className="upload-pack-result"><strong>✓ {s.verified}</strong><p>{output.width}×{output.height} • {output.format === "image/png" ? "PNG" : "JPEG"} • {formatBytes(output.size)}{typeof output.quality === "number" ? ` • ${Math.round(output.quality * 100)}%` : ""}</p><button className="button button-success" onClick={() => download(slot)}>{s.download} {s[slot]}</button></div>}
          </section>;
        })}
      </div>
      <div className="file-action-row"><button className="button" onClick={run} disabled={busy || !Object.keys(files).length}>{busy ? s.preparing : s.prepare}</button>{outputs.photo && outputs.signature && <button className="button button-dark" onClick={downloadBoth}>{s.zip}</button>}</div>
    </div>
  );
}
