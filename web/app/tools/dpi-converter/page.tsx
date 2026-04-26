import type { Metadata } from "next";
import Link from "next/link";
import Client from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "DPI Calculator—Pixels to Inches/cm for Print (300",
  description: "Convert image pixels to print size at 150, 300, or custom DPI/PPI. Plan posters, flyers, and photo prints. Local calculator—no upload.",
  alternates: { canonical: "/tools/dpi-converter", languages: { "x-default": "/tools/dpi-converter" } },
  openGraph: {
    title: "DPI / print size calculator",
    description: "Pixels ↔ inches for print workflows. Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
    url: "/tools/dpi-converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DPI converter",
    description: "Print dimensions from pixel size. Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          { name: "DPI converter", url: "/tools/dpi-converter" },
        ]}
      />
      <SoftwareAppJsonLd
        name="DPI/PPI Converter"
        url="/tools/dpi-converter"
        description="Convert between pixels and physical print dimensions using DPI/PPI calculations. Essential for print design and screen optimization."
      />
      <FaqJsonLd items={[
        { question: "What is DPI vs PPI?", answer: "DPI (Dots Per Inch) refers to printer resolution, while PPI (Pixels Per Inch) refers to screen resolution. Both affect how images appear in print vs digital." },
        { question: "What DPI should I use for printing?", answer: "300 DPI is standard for high-quality printing. 150 DPI for draft prints. Lower DPI results in pixelated images when printed." },
        { question: "How do I calculate print size from pixels?", answer: "Divide pixel dimensions by DPI. For example: 2400px ÷ 300 DPI = 8 inches. Use our converter for instant calculations." },
        { question: "What about screen displays?", answer: "Screens typically use 72-96 PPI. Modern retina displays use higher PPI (150-300), but CSS pixels remain consistent for web design." }
      ]} />
      <Client />
      <div className="container" style={{ display: "grid", gap: 12 }}>
        <div className="card">
          <h2>Related tools</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/tools/resize-image" className="pill">Resize</Link>
            <Link href="/compress" className="pill">Compress</Link>
            <Link href="/guides/resize-to-1920" className="pill">1920px guide</Link>
          </div>
        </div>
      </div>
    </>
  );
}


