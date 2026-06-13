export type CompressStrings = {
  heroTitle: string;
  heroDesc: string;
  privacyPill: string;
  noUpload: string;
  targetGuide: string;
  zipBatch: string;
  uploadLabel: string;
  noFiles: string;
  filesSelected: (n: number) => string;
  qualityLabel: string;
  qualityValue: (q: number) => string;
  format: string;
  alphaWarning: string;
  resize: string;
  resizeNone: string;
  resizeLongest: string;
  resizeExact: string;
  widthPh: string;
  heightPh: string;
  targetKb: string;
  compressing: string;
  compress: string;
  exifNote: string;
  progress: (done: number, total: number) => string;
  originals: string;
  compressed: string;
  uploadPreview: string;
  compressedPreview: string;
  sizeLine: (size: string, orig: string, saved: string) => string;
  savedPct: (pct: number) => string;
  downloadSection: string;
  downloadOne: string;
  downloadFirst: string;
  downloadZip: string;
  copyClipboard: string;
  copyOk: string;
  copyPngOk: string;
  copyDataUrl: string;
  copyFail: string;
  clipboardUnavailable: string;
  failedPrefix: string;
  successMsg: (ok: number, failed: number, quality: number) => string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  presetApplied: (name: string) => string;
  largeFilePrefix: string;
};

export const compressEn: CompressStrings = {
  heroTitle: "Online JPEG & PNG Image Compressor",
  heroDesc: "Compress images in your browser with no upload. Set a target size (KB), choose JPEG/WebP/PNG, and batch download as ZIP.",
  privacyPill: "Privacy‑first",
  noUpload: "No upload",
  targetGuide: "Target size guide",
  zipBatch: "ZIP batch",
  uploadLabel: "1. Upload Your Images (JPEG/PNG)",
  noFiles: "No file chosen",
  filesSelected: (n) => `${n} file(s) selected`,
  qualityLabel: "2. Adjust Quality",
  qualityValue: (q) => `Quality: ${q.toFixed(2)}`,
  format: "Format",
  alphaWarning: "Transparency → white on JPEG",
  resize: "Resize",
  resizeNone: "None",
  resizeLongest: "Longest side",
  resizeExact: "Exact WxH",
  widthPh: "Width",
  heightPh: "Height",
  targetKb: "Target (KB)",
  compressing: "Compressing…",
  compress: "Compress",
  exifNote: "Images are auto‑rotated based on EXIF orientation. Metadata (EXIF/GPS) is removed on export.",
  progress: (done, total) => `Progress: ${done}/${total}`,
  originals: "Originals",
  compressed: "Compressed",
  uploadPreview: "Upload an image to see preview",
  compressedPreview: "Compressed image will appear here",
  sizeLine: (size, orig, saved) => `Size: ${size} (Original: ${orig}${saved})`,
  savedPct: (pct) => `, Saved: ${pct.toFixed(1)}%`,
  downloadSection: "3. Download Your Optimized Image",
  downloadOne: "Download Compressed Image",
  downloadFirst: "Download First Image",
  downloadZip: "Download ZIP",
  copyClipboard: "Copy to Clipboard",
  copyOk: "Copied to clipboard",
  copyPngOk: "Copied PNG to clipboard",
  copyDataUrl: "Copied image as Data URL",
  copyFail: "Copy failed",
  clipboardUnavailable: "Clipboard not available",
  failedPrefix: "Failed:",
  successMsg: (ok, failed, quality) =>
    `${ok} image${ok > 1 ? "s" : ""} compressed${failed ? ` (${failed} failed)` : ""}. Quality: ${quality.toFixed(2)}`,
  faqTitle: "Frequently Asked Questions (FAQ)",
  faq: [
    { q: "Will PixCloak upload my images?", a: "No. All compression runs locally in your browser and works offline (PWA). Nothing is uploaded to any server." },
    { q: "How to choose quality vs target size (KB)?", a: "Prefer Target (KB). We search the best quality with binary search. Without a target, use the quality slider manually." },
    { q: "Are EXIF/GPS and metadata removed?", a: "Yes. Re-encoding via Canvas removes EXIF/GPS metadata by default on export." },
    { q: "When to use JPEG / WebP / PNG?", a: "WebP is often smaller and supports transparency; PNG fits icons/screenshots (lossless + alpha); JPEG is ideal for photos." },
    { q: "It feels slow or images are huge—what can I do?", a: "Resize the longest side or set exact width/height before compressing to speed up and reduce size significantly." },
    { q: "How do I batch download?", a: "After compression click Download ZIP. It works for single or multiple images." },
  ],
  presetApplied: (name) => `Preset "${name}" applied successfully!`,
  largeFilePrefix: "Large file(s) may be slow to process:",
};

export const compressZh: CompressStrings = {
  heroTitle: "在线图片压缩工具（JPEG/PNG/WebP）",
  heroDesc: "在浏览器本地压缩图片，无需上传。可设置目标大小（KB），支持批量导出 ZIP。",
  privacyPill: "隐私优先",
  noUpload: "不上传",
  targetGuide: "目标大小说明",
  zipBatch: "批量 ZIP",
  uploadLabel: "1. 上传图片（JPEG/PNG/WebP）",
  noFiles: "未选择文件",
  filesSelected: (n) => `已选择 ${n} 个文件`,
  qualityLabel: "2. 调整画质",
  qualityValue: (q) => `画质：${q.toFixed(2)}`,
  format: "格式",
  alphaWarning: "导出 JPEG 时透明区域将变为白色",
  resize: "缩放",
  resizeNone: "不缩放",
  resizeLongest: "最长边",
  resizeExact: "指定宽高",
  widthPh: "宽度",
  heightPh: "高度",
  targetKb: "目标 (KB)",
  compressing: "压缩中…",
  compress: "开始压缩",
  exifNote: "已根据 EXIF 自动旋转；导出时将移除 EXIF/GPS 等元数据。",
  progress: (done, total) => `进度：${done}/${total}`,
  originals: "原图",
  compressed: "压缩后",
  uploadPreview: "上传图片后在此预览",
  compressedPreview: "压缩结果将显示在这里",
  sizeLine: (size, orig, saved) => `大小：${size}（原图：${orig}${saved}）`,
  savedPct: (pct) => `，节省 ${pct.toFixed(1)}%`,
  downloadSection: "3. 下载压缩后的图片",
  downloadOne: "下载压缩图片",
  downloadFirst: "下载第一张",
  downloadZip: "下载 ZIP",
  copyClipboard: "复制到剪贴板",
  copyOk: "已复制到剪贴板",
  copyPngOk: "已复制 PNG 到剪贴板",
  copyDataUrl: "已复制为 Data URL",
  copyFail: "复制失败",
  clipboardUnavailable: "剪贴板不可用",
  failedPrefix: "失败：",
  successMsg: (ok, failed, quality) =>
    `已成功压缩 ${ok} 张${failed ? `（${failed} 张失败）` : ""}，画质 ${quality.toFixed(2)}`,
  faqTitle: "常见问题",
  faq: [
    { q: "图片会上传到服务器吗？", a: "不会。所有压缩在浏览器本地完成，可离线使用（PWA），文件不会离开您的设备。" },
    { q: "画质和目标 KB 怎么选？", a: "建议填写目标 KB，系统会用二分法自动寻找合适画质；不填目标时可手动拖动画质滑块。" },
    { q: "会去掉 EXIF/GPS 吗？", a: "会。通过 Canvas 重新编码导出时，默认移除 EXIF/GPS 等元数据。" },
    { q: "JPEG / WebP / PNG 怎么选？", a: "WebP 体积通常更小且支持透明；PNG 适合图标和截图；JPEG 适合照片。" },
    { q: "很慢或文件仍然很大怎么办？", a: "可先按最长边或指定宽高缩小尺寸，再压缩，速度和体积都会明显改善。" },
    { q: "如何批量下载？", a: "压缩完成后点击「下载 ZIP」，单张或多张均可。" },
  ],
  presetApplied: (name) => `已应用预设「${name}」`,
  largeFilePrefix: "以下大文件可能处理较慢：",
};

export function getCompressStrings(locale: "en" | "zh" = "en") {
  return locale === "zh" ? compressZh : compressEn;
}
