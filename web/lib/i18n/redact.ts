export type RedactPreset = { key: string; name: string; boxes: { x: number; y: number; w: number; h: number }[] };

export type RedactStrings = {
  presets: RedactPreset[];
  title: string;
  intro: string;
  privacyPill: string;
  noUpload: string;
  irreversible: string;
  removeExif: string;
  shortcutsLabel: string;
  shortcutSpace: string;
  shortcutDelete: string;
  chooseImages: string;
  noFiles: string;
  filesSelected: (n: number) => string;
  mode: string;
  modeSolid: string;
  modePixelate: string;
  strength: string;
  strengthStrong: string;
  strengthStronger: string;
  strengthExtreme: string;
  preset: string;
  presetNone: string;
  applyPreset: string;
  exportJson: string;
  importJson: string;
  clear: string;
  exportJpg: string;
  exportZip: string;
  canvasLabel: string;
  fileInputLabel: string;
  importJsonLabel: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
};

const presetBoxes = {
  wechat: [
    { x: 0.02, y: 0.01, w: 0.16, h: 0.09 },
    { x: 0.2, y: 0.02, w: 0.35, h: 0.06 },
  ],
  plate: [{ x: 0.35, y: 0.75, w: 0.3, h: 0.12 }],
  id: [{ x: 0.2, y: 0.6, w: 0.6, h: 0.12 }],
};

export const redactEn: RedactStrings = {
  presets: [
    { key: "wechat", name: "Chat Screenshot (avatar + name + time)", boxes: presetBoxes.wechat },
    { key: "license-plate", name: "License Plate (bottom center sample)", boxes: presetBoxes.plate },
    { key: "id-card", name: "ID Number (sample area)", boxes: presetBoxes.id },
  ],
  title: "Image Redaction (Local)",
  intro: "Draw boxes with a solid block, pixelation, or permanent blur. Export runs locally, reopens the JPEG, and verifies that EXIF, GPS, XMP, and IPTC are absent.",
  privacyPill: "Privacy‑first",
  noUpload: "No upload",
  irreversible: "Irreversible",
  removeExif: "Remove EXIF/GPS/XMP/IPTC",
  shortcutsLabel: "Shortcuts:",
  shortcutSpace: "Space = cycle solid/pixelate/blur",
  shortcutDelete: "Delete = undo",
  chooseImages: "Choose images",
  noFiles: "No file chosen",
  filesSelected: (n) => `${n} file(s) selected`,
  mode: "Mode",
  modeSolid: "Solid block",
  modePixelate: "Strong pixelation",
  strength: "Strength",
  strengthStrong: "Strong",
  strengthStronger: "Stronger",
  strengthExtreme: "Extreme",
  preset: "Preset",
  presetNone: "None",
  applyPreset: "Apply preset",
  exportJson: "Export JSON",
  importJson: "Import JSON",
  clear: "Clear",
  exportJpg: "Export JPG",
  exportZip: "Export ZIP (batch)",
  canvasLabel: "Redaction canvas preview",
  fileInputLabel: "Choose images to redact",
  importJsonLabel: "Import redaction preset JSON",
  faqTitle: "Frequently Asked Questions (FAQ)",
  faq: [
    { q: "Will my images be uploaded?", a: "No. All redaction runs locally in your browser. Nothing is uploaded to any server." },
    { q: "Solid, pixelate, or blur – which should I use?", a: "Solid removes the most visual information. Pixelation preserves rough shapes as mosaic blocks. Permanent blur softens detail but can retain recognizable structure, so use solid for highly sensitive text or IDs." },
    { q: "How strong is pixelation and how to adjust it?", a: "Use Strength: Strong, Stronger, or Extreme. Extreme applies the strongest pixelation for best privacy. For critical areas (eyes, ID), apply multiple boxes or switch to Solid." },
    { q: "Are EXIF, GPS, XMP, and IPTC removed?", a: "Yes for the supported JPEG export flow. PixCloak re-encodes the image, reopens the result, and verifies that EXIF, GPS, XMP, and IPTC markers are absent before download." },
    { q: "How do I import/export redaction presets?", a: "Use Export JSON to save current boxes as relative coordinates. Use Import JSON to load and apply a preset on any image." },
    { q: "Are there keyboard shortcuts?", a: "Space cycles Solid, Pixelate, and Blur. Delete/Backspace undoes the last action." },
  ],
};

export const redactZh: RedactStrings = {
  presets: [
    { key: "wechat", name: "微信聊天截图（头像+昵称+时间）", boxes: presetBoxes.wechat },
    { key: "license-plate", name: "车牌（底部居中示例）", boxes: presetBoxes.plate },
    { key: "id-card", name: "证件号码区域（示例）", boxes: presetBoxes.id },
  ],
  title: "图片打码（本地处理）",
  intro: "在图片上框选需要遮挡的区域，支持纯色、马赛克和永久模糊。导出在浏览器本地完成，并重新打开 JPEG，确认未检出 EXIF、GPS、XMP 和 IPTC。",
  privacyPill: "隐私优先",
  noUpload: "不上传",
  irreversible: "不可逆",
  removeExif: "去除 EXIF/GPS/XMP/IPTC",
  shortcutsLabel: "快捷键：",
  shortcutSpace: "空格 = 循环纯色/马赛克/模糊",
  shortcutDelete: "Delete = 撤销",
  chooseImages: "选择图片",
  noFiles: "未选择文件",
  filesSelected: (n) => `已选择 ${n} 个文件`,
  mode: "模式",
  modeSolid: "纯色遮挡",
  modePixelate: "强力马赛克",
  strength: "强度",
  strengthStrong: "强",
  strengthStronger: "更强",
  strengthExtreme: "极强",
  preset: "预设",
  presetNone: "无",
  applyPreset: "应用预设",
  exportJson: "导出 JSON",
  importJson: "导入 JSON",
  clear: "清除",
  exportJpg: "导出 JPG",
  exportZip: "批量导出 ZIP",
  canvasLabel: "打码预览画布",
  fileInputLabel: "选择要打码的图片",
  importJsonLabel: "导入打码预设 JSON",
  faqTitle: "常见问题",
  faq: [
    { q: "图片会上传到服务器吗？", a: "不会。所有打码在浏览器本地完成，不会上传到任何服务器。" },
    { q: "纯色、马赛克和模糊该怎么选？", a: "纯色删除的视觉信息最多；马赛克保留方块化轮廓；永久模糊会弱化细节但仍可能保留可辨认结构。证件号、文字等高敏感内容优先使用纯色。" },
    { q: "马赛克强度怎么调？", a: "可选强、更强、极强。隐私敏感区域（人脸、证件号）建议用纯色或多框叠加。" },
    { q: "会去掉 EXIF、GPS、XMP 和 IPTC 吗？", a: "在受支持的 JPEG 导出流程中会。PixCloak 重新编码并重新打开结果，确认未检出这些元数据标记后才允许下载。" },
    { q: "如何导入/导出打码预设？", a: "导出 JSON 可保存当前框的相对坐标；导入 JSON 可在其他图片上复用。" },
    { q: "有键盘快捷键吗？", a: "空格循环切换纯色、马赛克和模糊；Delete/Backspace 撤销上一步。" },
  ],
};

export function getRedactStrings(locale: "en" | "zh" = "en") {
  return locale === "zh" ? redactZh : redactEn;
}
