import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Local Image Tools",
  description: "Maintained local image and PDF workflows plus experimental Labs utilities.",
  alternates: { canonical: "/tools" },
};

const core = [
  ["/compress", "Image compressor", "Fit JPEG, PNG, or WebP under a hard size limit."],
  ["/redact", "Image redactor", "Apply permanent solid, pixelated, or blurred redaction."],
  ["/tools/exif-checker", "Metadata checker", "Inspect and remove supported EXIF, GPS, XMP, and IPTC metadata."],
  ["/tools/heic-converter", "HEIC converter", "Convert iPhone HEIC images to JPG or WebP."],
  ["/tools/resize-image", "Image resizer", "Resize by dimensions or longest side."],
  ["/tools/png-jpg-converter", "PNG / JPG converter", "Convert formats and review the result before download."],
  ["/tools/pdf-to-image", "PDF pages to images", "Export a selected PDF page range as verified PNG, JPEG, or WebP files."],
  ["/tools/image-to-pdf", "Images to PDF", "Reorder images and combine them into one A4, Letter, or image-sized PDF."],
] as const;

const labs = [
  ["/tools/favicon-pack", "Favicon pack"], ["/tools/watermark", "Watermark"],
  ["/tools/remove-bg-lite", "Solid background remover"], ["/tools/trim-transparent", "Trim transparency"],
  ["/tools/aspect-pad", "Aspect padding"], ["/tools/crop-templates", "Crop templates"],
  ["/tools/svg-optimizer", "SVG optimizer"], ["/tools/lqip", "LQIP"],
  ["/tools/srcset-generator", "Srcset generator"], ["/tools/sprite-sheet", "Sprite sheet"],
  ["/tools/dataurl-alt", "Data URL"], ["/tools/dpi-converter", "DPI converter"],
  ["/tools/image-diff", "Image diff"],
] as const;

export default function ToolsPage() {
  return (
    <div className="workflow-page">
      <section className="workflow-hero">
        <div><span className="eyebrow">TOOLS</span><h1>Maintained local image tools</h1><p>Choose a complete workflow when the outcome matters, or open one focused tool for a single task.</p></div>
        <div className="workflow-trust"><strong>Need several steps?</strong><Link href="/safe-share">Safe Share</Link><Link href="/upload-ready">Upload Ready</Link><Link href="/upload-pack">Photo + signature pack</Link></div>
      </section>
      <section className="quick-tool-grid" aria-label="Core tools">
        {core.map(([href, title, text]) => <Link key={href} href={href} className="quick-tool-card"><strong>{title}</strong><span>{text}</span></Link>)}
      </section>
      <details className="labs-panel">
        <summary>Labs — experimental utilities</summary>
        <p>Labs are available for testing but are not part of the V1.0 reliability promise or search index.</p>
        <div className="labs-grid">{labs.map(([href, title]) => <Link key={href} href={href}>{title}</Link>)}</div>
      </details>
    </div>
  );
}
