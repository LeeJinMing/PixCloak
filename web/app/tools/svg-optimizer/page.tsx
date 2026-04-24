import type { Metadata } from "next";
import Link from "next/link";
import Client from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "SVG Optimizer—Minify & Clean Code (No Upload) | PixCloak",
  description:
    "Paste SVG markup and minify whitespace, comments, and bloat locally. Smaller files for faster pages. Nothing uploaded—copy the optimized SVG back out.",
  alternates: {
    canonical: "/tools/svg-optimizer",
    languages: { "x-default": "/tools/svg-optimizer", en: "/tools/svg-optimizer" },
  },
  openGraph: {
    title: "SVG minifier in the browser",
    description: "Reduce SVG size for web. Local processing only.",
    url: "/tools/svg-optimizer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SVG optimizer",
    description: "Minify SVG locally for production.",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          { name: "SVG optimizer", url: "/tools/svg-optimizer" },
        ]}
      />
      <SoftwareAppJsonLd
        name="SVG Optimizer"
        url="/tools/svg-optimizer"
        description="Minify and clean SVG source in the browser for smaller icons and illustrations."
      />
      <FaqJsonLd
        items={[
          {
            question: "Will this break my SVG?",
            answer: "It removes comments, extra whitespace, and some redundant attributes. Test icons in context after optimization; keep a backup of the original.",
          },
          {
            question: "Is data sent to a server?",
            answer: "No. Optimization runs entirely in your browser.",
          },
        ]}
      />
      <Client />
      <div className="container" style={{ display: "grid", gap: 12 }}>
        <div className="card">
          <h2>Related tools</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/tools/favicon-pack" className="pill">Favicon pack</Link>
            <Link href="/tools/dataurl-alt" className="pill">Data URL</Link>
            <Link href="/tools/sprite-sheet" className="pill">Sprite sheet</Link>
          </div>
        </div>
      </div>
    </>
  );
}
