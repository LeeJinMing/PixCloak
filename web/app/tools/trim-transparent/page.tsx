import type { Metadata } from "next";
import Link from "next/link";
import Client from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Trim Transparent PNG Edges—Crop Empty Borders",
  description: "Auto-remove fully transparent margins from PNG and WebP with alpha. Smaller files, tighter sprites. Trim PNG transparent padding locally—no upload.",
  alternates: {
    canonical: "/tools/trim-transparent",
    languages: { "x-default": "/tools/trim-transparent", en: "/tools/trim-transparent" },
  },
  openGraph: {
    title: "Trim transparent PNG borders",
    description: "Crop away empty alpha around icons and screenshots. Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
    url: "/tools/trim-transparent",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trim transparent edges",
    description: "Local PNG/WebP crop to content bounds. Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          { name: "Trim transparent", url: "/tools/trim-transparent" },
        ]}
      />
      <SoftwareAppJsonLd
        name="Trim Transparent Edges"
        url="/tools/trim-transparent"
        description="Strip fully transparent borders from PNG images for cleaner assets and smaller dimensions."
      />
      <FaqJsonLd
        items={[
          {
            question: "What does trim transparent do?",
            answer: "It crops the image to the smallest rectangle that still contains every non-transparent pixel.",
          },
          {
            question: "Does it upload my PNG?",
            answer: "No. Processing happens only in your browser.",
          },
          {
            question: "When should I use this?",
            answer: "After removing a solid background, for UI sprites, icons, and screenshots with large empty alpha regions.",
          },
        ]}
      />
      <div className="container" style={{ display: "grid", gap: 12 }}>
        <div className="card">
          <h1 className="page-hero-title">Trim Transparent PNG &amp; Alpha Edges (No Upload)</h1>
          <p className="text-muted" style={{ marginBottom: 0 }}>
            Remove empty transparent margins so assets pack tighter and file sizes drop. Pairs well with{" "}
            <Link href="/tools/remove-bg-lite">background removal</Link> and sprite workflows.
          </p>
        </div>
      </div>
      <Client />
      <div className="container" style={{ display: "grid", gap: 12 }}>
        <div className="card">
          <h2>Related tools</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/tools/remove-bg-lite" className="pill">Remove background</Link>
            <Link href="/tools/sprite-sheet" className="pill">Sprite sheet</Link>
            <Link href="/compress" className="pill">Compress</Link>
          </div>
        </div>
      </div>
    </>
  );
}
