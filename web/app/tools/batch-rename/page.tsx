import type { Metadata } from "next";
import Link from "next/link";
import Client from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Batch Rename Images & Download ZIP (Local)",
  description: "Rename many images at once with prefix, suffix, and zero-padded numbers; download a single ZIP. Runs locally—no upload. Great for galleries, exports, and docs.",
  alternates: { canonical: "/tools/batch-rename", languages: { "x-default": "/tools/batch-rename" } },
  openGraph: {
    title: "Batch rename images to ZIP",
    description: "Pattern-based renaming in the browser. Private, no upload. Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
    url: "/tools/batch-rename",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Batch rename images",
    description: "Numbered filenames and ZIP export, locally. Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          { name: "Batch rename", url: "/tools/batch-rename" },
        ]}
      />
      <SoftwareAppJsonLd
        name="Batch Image Rename"
        url="/tools/batch-rename"
        description="Apply naming patterns to multiple image files and download results as ZIP. All processing is local."
      />
      <FaqJsonLd
        items={[
          {
            question: "Are my files uploaded?",
            answer: "No. Files are read in the browser to build the ZIP; they are not sent to a server.",
          },
          {
            question: "How do numbering patterns work?",
            answer: "Use placeholders like {n2}, {n3}, or {n4} for zero-padded sequence numbers in each filename.",
          },
        ]}
      />
      <Client />
      <div className="container" style={{ display: "grid", gap: 12 }}>
        <div className="card">
          <h2>Related tools</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/tools/resize-image" className="pill">Resize</Link>
            <Link href="/compress" className="pill">Compress</Link>
            <Link href="/tools/watermark" className="pill">Watermark</Link>
          </div>
        </div>
      </div>
    </>
  );
}
