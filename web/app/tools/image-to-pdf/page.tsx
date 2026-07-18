import type { Metadata } from "next";
import Link from "next/link";
import Client from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd, SoftwareAppJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Images to PDF—Combine JPG and PNG Locally",
  description: "Combine and reorder up to 50 JPG, PNG, WebP, or HEIC images into one A4, Letter, or image-sized PDF. Local browser processing, no upload.",
  alternates: { canonical: "/tools/image-to-pdf" },
};
const faq = [
  { question: "Are the images uploaded?", answer: "No. Image decoding, page layout, PDF creation, and download happen in the current browser." },
  { question: "Why are images normalized before embedding?", answer: "Normalization applies orientation, uses a white page-safe background, and avoids copying source image metadata into the PDF." },
  { question: "Can I reorder pages?", answer: "Yes. Use the up and down controls before creating the PDF. The displayed order becomes the page order." },
];
export default function ImageToPdfPage() { return <><BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Tools", url: "/tools" }, { name: "Images to PDF", url: "/tools/image-to-pdf" }]} /><SoftwareAppJsonLd name="Images to PDF" url="/tools/image-to-pdf" description="Combine ordered images into a locally generated PDF." /><div className="workflow-page"><section className="workflow-hero"><div><span className="eyebrow">LOCAL PDF CREATION</span><h1>Combine images into a PDF without uploading them</h1><p>Choose the page order, A4 or Letter layout, margins, and image quality. PixCloak creates a fresh PDF locally and does not copy source filenames into it.</p></div><div className="workflow-trust"><strong>One complete PDF loop</strong><Link href="/tools/pdf-to-image">Need the reverse? Export PDF pages to images.</Link></div></section><Client /><section className="card workflow-support"><h2>Useful next steps</h2><div className="next-actions"><Link className="button-outline" href="/tools/pdf-to-image">PDF pages to images</Link><Link className="button-outline" href="/tools/exif-checker">Clean image metadata first</Link><Link className="button-outline" href="/upload-ready">Meet an image upload limit</Link></div></section>{faq.map((item) => <details className="card compact-faq" key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}<FaqJsonLd items={faq} /></div></>; }
