import type { Metadata } from "next";
import Link from "next/link";
import Client from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "EXIF & GPS Checker—Remove Metadata Locally",
  description: "Check JPEGs for EXIF and GPS location, then download a clean copy with metadata stripped. Runs in your browser—no upload. Useful before sharing (WeChat,...",
  alternates: {
    canonical: "/tools/exif-checker",
    languages: { "x-default": "/tools/exif-checker" },
  },
  openGraph: {
    title: "EXIF/GPS checker—strip metadata locally",
    description: "See if photos contain camera or location data; export without EXIF in one click. Works locally in your browser, no uploads.",
    url: "/tools/exif-checker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EXIF & GPS checker (no upload)",
    description: "Detect and remove photo metadata in your browser. Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          { name: "EXIF checker", url: "/tools/exif-checker" },
        ]}
      />
      <SoftwareAppJsonLd
        name="EXIF/GPS Metadata Checker"
        url="/tools/exif-checker"
        description="Detect EXIF and GPS in JPEG images and export stripped copies using local canvas re-encode—no server upload."
      />
      <Client />
      <div className="container" style={{ display: "grid", gap: 12 }}>
        <div className="card">
          <h2>Best for</h2>
          <p className="text-muted" style={{ marginTop: 0 }}>
            Checking iPhone photos, screenshots, document scans, and client images before public sharing. If metadata is present, export a clean copy or move to redaction.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/redact" className="pill">Redact visible details</Link>
            <Link href="/compress" className="pill">Compress clean copy</Link>
            <Link href="/tools/platform-checker" className="pill">Check upload limits</Link>
          </div>
        </div>
        <div className="card">
          <h2>Related tools</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/redact" className="pill">Photo redaction</Link>
            <Link href="/compress" className="pill">Compress</Link>
            <Link href="/guides/exif-gps-removal" className="pill">EXIF guide</Link>
            <Link href="/tools/platform-checker" className="pill">Platform checker</Link>
          </div>
        </div>
      </div>
      <FaqJsonLd
        items={[
          {
            question: "Does this upload my photos?",
            answer: "No. The file is read only inside your browser to analyze and re-encode.",
          },
          {
            question: "Can I remove GPS from a photo before sharing?",
            answer: "Yes. After the check, use Remove & Download to save a new JPEG without EXIF/GPS.",
          },
          {
            question: "WeChat or iPhone photos—will EXIF be removed?",
            answer: "Exported JPEGs from this tool are written without embedded EXIF, which reduces accidental location or camera leakage when you share the new file.",
          },
        ]}
      />
    </>
  );
}
