import type { Metadata } from "next";
import Client from "./Client";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Sprite Sheet Generator | PixCloak",
  description: "Combine images into a sprite sheet with JSON mapping and download as ZIP. Configure grid, spacing, and order. All processing is local—no uploads.",
  alternates: { canonical: "/tools/sprite-sheet", languages: { "x-default": "/tools/sprite-sheet", en: "/tools/sprite-sheet" } },
};

export default function Page() {
  return (
    <>
      <SoftwareAppJsonLd
        name="Sprite Sheet Generator"
        url="/tools/sprite-sheet"
        description="Combine multiple images into a single sprite sheet with JSON mapping. Configure grid layout, spacing, and export as ZIP."
      />
      <FaqJsonLd items={[
        { question: "What is a sprite sheet?", answer: "A sprite sheet combines multiple images into one file to reduce HTTP requests and improve loading performance. Commonly used for icons, UI elements, and game graphics." },
        { question: "How do I use the generated sprite sheet?", answer: "Download the sprite sheet image and JSON mapping file. Use CSS background-position with the coordinates from JSON to display individual images." },
        { question: "Can I customize the grid layout?", answer: "Yes. Set columns, spacing, and padding. The tool automatically arranges images in rows and columns with your specified spacing." },
        { question: "What image formats are supported?", answer: "Supports PNG, JPG, WebP, and other common formats. Output is always PNG for transparency support." }
      ]} />
      <Client />
    </>
  );
}


