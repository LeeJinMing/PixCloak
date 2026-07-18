export type PdfToImageStrings = {
  title: string;
  intro: string;
  pageRange: string;
  startPage: string;
  endPage: string;
  scaleLabel: (s: number) => string;
  outputFormat: string;
  choosePdf: string;
  rendering: string;
  convert: string;
  rendered: (rendered: number, total: number, range: string) => string;
  downloadZip: (n: number, format: string) => string;
  downloadPage: (n: number) => string;
  startOver: string;
  choosePdfFirst: string;
  invalidPdf: string;
  invalidRange: string;
  encodeFail: string;
  errorGeneric: string;
};

export const pdfToImageEn: PdfToImageStrings = {
  title: "PDF pages to images",
  intro: "Choose a page range, image format, and resolution. At most {cap} pages are rendered per run, entirely in this browser.",
  pageRange: "Pages to export",
  startPage: "Start page",
  endPage: "End page",
  scaleLabel: (s) => `Resolution scale: ${s}x (higher = sharper and larger)`,
  outputFormat: "Output format",
  choosePdf: "Choose PDF",
  rendering: "Rendering and verifying…",
  convert: "Export page images",
  rendered: (rendered, total, range) => `Verified ${rendered} of ${total} PDF pages (${range}).`,
  downloadZip: (n, format) => `Download ZIP (${n} ${format} image${n === 1 ? "" : "s"})`,
  downloadPage: (n) => `Download page ${n}`,
  startOver: "Start over",
  choosePdfFirst: "Choose a PDF first.",
  invalidPdf: "Please select a PDF file.",
  invalidRange: "Enter a valid page range. A run can contain at most 50 pages.",
  encodeFail: "The browser could not encode this page image.",
  errorGeneric: "Could not read this PDF. It may be encrypted, corrupt, or unsupported by this browser.",
};

export const pdfToImageZh: PdfToImageStrings = {
  title: "PDF 批量导出图片",
  intro: "选择页码范围、图片格式和清晰度。每次最多导出 {cap} 页，全程在当前浏览器本地完成。",
  pageRange: "导出页码",
  startPage: "起始页",
  endPage: "结束页",
  scaleLabel: (s) => `清晰度倍数：${s}x（越大越清晰，文件也越大）`,
  outputFormat: "导出格式",
  choosePdf: "选择 PDF 文件",
  rendering: "正在转换并校验…",
  convert: "批量导出页面图片",
  rendered: (rendered, total, range) => `已验证 ${rendered} / ${total} 个 PDF 页面（${range}）。`,
  downloadZip: (n, format) => `下载 ZIP（${n} 张 ${format} 图片）`,
  downloadPage: (n) => `下载第 ${n} 页`,
  startOver: "重新开始",
  choosePdfFirst: "请先选择 PDF 文件。",
  invalidPdf: "请选择 PDF 文件。",
  invalidRange: "请输入有效页码范围，每次最多处理 50 页。",
  encodeFail: "浏览器无法编码该页面图片。",
  errorGeneric: "无法读取该 PDF，文件可能已加密、损坏或当前浏览器不支持。",
};

export function getPdfToImageStrings(locale: "en" | "zh" = "en") {
  return locale === "zh" ? pdfToImageZh : pdfToImageEn;
}
