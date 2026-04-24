import type { Metadata } from "next";
import Link from "next/link";
import Client from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Sprite Sheet Generator + JSON Map (CSS Sprites) | PixCloak",
  description:
    "Pack icons into one PNG sprite sheet with a JSON coordinate map for CSS background-position. Batch locally—no upload. Fewer HTTP requests for UI assets.",
  alternates: {
    canonical: "/tools/sprite-sheet",
    languages: { "x-default": "/tools/sprite-sheet", en: "/tools/sprite-sheet" },
  },
  openGraph: {
    title: "CSS sprite sheet builder",
    description: "Combine icons into one image + mapping file.",
    url: "/tools/sprite-sheet",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sprite sheet generator",
    description: "Local sprite PNG + JSON layout.",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          { name: "Sprite sheet", url: "/tools/sprite-sheet" },
        ]}
      />
      <SoftwareAppJsonLd
        name="Sprite Sheet Generator"
        url="/tools/sprite-sheet"
        description="Merge multiple images into a single sprite sheet with JSON coordinates for web and game UI."
      />
      <FaqJsonLd
        items={[
          {
            question: "What is a sprite sheet?",
            answer: "One image file that contains many small graphics, with coordinates telling you how to show each piece.",
          },
          {
            question: "How do I use the JSON map?",
            answer: "Each frame has x, y, width, and height—use those with CSS background-position and background-size, or with your game engine.",
          },
          {
            question: "Are files uploaded?",
            answer: "No. Images are read locally and the sheet is built in your browser.",
          },
        ]}
      />
      <div className="container" style={{ display: "grid", gap: 12 }}>
        <div className="card">
          <h1>Sprite Sheet Generator (PNG + JSON, No Upload)</h1>
          <p className="text-muted" style={{ marginBottom: 0 }}>
            Reduce requests for icon sets and game tiles.             Export a ZIP with the atlas and mapping. See also{" "}
            <Link href="/guides/long-tail/sprite-sheet-generator">sprite sheet guide</Link>.
          </p>
        </div>
      </div>
      <Client />
    </>
  );
}
