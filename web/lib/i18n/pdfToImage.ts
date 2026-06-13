export type PdfToImageStrings = {
  title: string;
  intro: string;
  maxPagesLabel: (n: number, cap: number) => string;
  scaleLabel: (s: number) => string;
  choosePdf: string;
  rendering: string;
  convert: string;
  rendered: (rendered: number, total: number, more: string) => string;
  moreHint: string;
  downloadZip: (n: number) => string;
  startOver: string;
  choosePdfFirst: string;
  invalidPdf: string;
  encodeFail: string;
  errorGeneric: string;
};

export const pdfToImageEn: PdfToImageStrings = {
  title: "PDF → PNG (per page)",
  intro: "Large PDFs use a lot of memory. We render at most {cap} pages per run. Processing runs locally in your browser.",
  maxPagesLabel: (n, cap) => `Max pages to export: ${n} (capped at ${cap} and your PDF length)`,
  scaleLabel: (s) => `Resolution scale: ${s}x (higher = sharper, slower)`,
  choosePdf: "Choose PDF",
  rendering: "Rendering…",
  convert: "Convert to images",
  rendered: (r, t, more) => `Rendered ${r} of ${t} page${t === 1 ? "" : "s"}.${more}`,
  moreHint: " Increase “max pages” and run again for more (or split the PDF).",
  downloadZip: (n) => `Download ZIP (${n} PNG${n === 1 ? "" : "s"})`,
  startOver: "Start over",
  choosePdfFirst: "Choose a PDF first.",
  invalidPdf: "Please select a PDF file.",
  encodeFail: "Failed to encode PNG",
  errorGeneric: "Could not read PDF. It may be encrypted, corrupt, or blocked by the browser.",
};

export const pdfToImageZh: PdfToImageStrings = {
  title: "PDF 转图片（逐页 PNG）",
  intro: "大体积 PDF 占用内存较多。每次最多导出 {cap} 页。全程在浏览器本地处理，无需 WPS 会员、不上传文件。",
  maxPagesLabel: (n, cap) => `最多导出页数：${n}（上限 ${cap} 页或 PDF 总页数）`,
  scaleLabel: (s) => `清晰度倍数：${s}x（越大越清晰，越慢）`,
  choosePdf: "选择 PDF 文件",
  rendering: "转换中…",
  convert: "转换为图片",
  rendered: (r, t, more) => `已转换 ${r} / ${t} 页。${more}`,
  moreHint: " 可提高「最多导出页数」后再次运行，或拆分 PDF。",
  downloadZip: (n) => `下载 ZIP（${n} 张 PNG）`,
  startOver: "重新开始",
  choosePdfFirst: "请先选择 PDF 文件。",
  invalidPdf: "请选择 PDF 文件。",
  encodeFail: "PNG 编码失败",
  errorGeneric: "无法读取 PDF，可能已加密、损坏或被浏览器阻止。",
};

export function getPdfToImageStrings(locale: "en" | "zh" = "en") {
  return locale === "zh" ? pdfToImageZh : pdfToImageEn;
}
