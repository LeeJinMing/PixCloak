import type { Metadata } from "next";
import Link from "next/link";
import Client from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Upload Readiness Checker—KB, Pixels, EXIF",
  description: "Check image KB and dimensions before forms, social posts, and web uploads. Jump to compress, resize, or EXIF/GPS cleanup. Local-only, no upload.",
  alternates: { canonical: "/tools/platform-checker", languages: { "x-default": "/tools/platform-checker" } },
  openGraph: {
    title: "Platform image limit checker",
    description: "Validate KB and dimensions before you upload. Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
    url: "/tools/platform-checker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image compliance checker",
    description: "KB and dimension checks in browser. Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          { name: "Platform checker", url: "/tools/platform-checker" },
        ]}
      />
      <SoftwareAppJsonLd
        name="Upload Readiness Checker"
        url="/tools/platform-checker"
        description="Validate images against practical upload requirements for file size and dimensions. Jump to compression, resizing, or EXIF cleanup."
      />
      <Client />
      <div className="container" style={{ display: "grid", gap: 12 }}>
        <div className="card">
          <h2>Related tools</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/compress" className="pill">Compress</Link>
            <Link href="/tools/resize-image" className="pill">Resize</Link>
            <Link href="/tools/exif-checker" className="pill">EXIF checker</Link>
            <Link href="/guides/resize-to-1920" className="pill">1920px guide</Link>
          </div>
        </div>
      </div>
      <FaqJsonLd items={[
        {
          question: "What presets are included?",
            answer: "WeChat-style 200KB, general job/forms 500KB, web hero with 1920px width and 800KB, and YouTube thumbnail 1280×720 with 200KB. Each preset is a practical target with short notes—not an exhaustive list of every site.",
        },
        {
          question: "What does the checker validate?",
          answer: "For the preset you pick, it compares the file size in KB and, when defined, maximum width and height in pixels against your image. You get pass/fail and quick links to compress or resize.",
        },
        {
          question: "How do I fix a failing image?",
          answer: "Use the pills under the result to open compress or resize flows, or follow the CTAs on the rule (e.g. 200KB, 500KB).",
        },
        {
          question: "Are these limits official or guaranteed?",
          answer: "No. They are common heuristics and notes for real-world uploads. Requirements change by product and region—always confirm on the destination uploader.",
        },
      ]} />
    </>
  );
}
