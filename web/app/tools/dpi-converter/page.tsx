import type { Metadata } from "next";
import Client from "./Client";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "DPI/PPI Converter – Print size vs pixels | PixCloak",
  description: "Convert between pixels and physical print size using DPI/PPI. Plan exports for print and screens accurately. Runs locally in your browser—no uploads.",
  alternates: { canonical: "/tools/dpi-converter", languages: { "x-default": "/tools/dpi-converter" } },
};

export default function Page() {
  return (
    <>
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
    </>
  );
}


