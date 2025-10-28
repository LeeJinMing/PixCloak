import type { Metadata } from "next";
import Client from "./Client";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Trim Transparent Edges (PNG) | PixCloak",
  description: "Auto-trim fully transparent borders from PNGs and export a clean result. Fast, local processing—no uploads. Ideal for sprites, icons, and UI assets.",
  alternates: { canonical: "/tools/trim-transparent", languages: { "x-default": "/tools/trim-transparent", en: "/tools/trim-transparent" } },
};

export default function Page() {
  return (
    <>
      <SoftwareAppJsonLd
        name="Trim Transparent Edges"
        url="/tools/trim-transparent"
        description="Automatically remove transparent borders from PNG images. Perfect for cleaning up sprites, icons, and UI assets."
      />
      <FaqJsonLd items={[
        { question: "What does trim transparent edges do?", answer: "Removes fully transparent pixels from the edges of PNG images, reducing file size and creating cleaner assets for web and game development." },
        { question: "Which image formats are supported?", answer: "Currently supports PNG files with transparency. The tool detects and removes transparent borders while preserving the visible content." },
        { question: "How does it work?", answer: "Scans from all edges inward, removing rows and columns that are completely transparent until it finds pixels with content or partial transparency." },
        { question: "Is the original image modified?", answer: "No. The tool creates a new trimmed version while preserving your original file. Download the cleaned result separately." }
      ]} />
      <Client />
    </>
  );
}


