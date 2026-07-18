import type { Metadata } from "next";
import Link from "next/link";
import RedactClient from "@/app/redact/Client";

export const metadata: Metadata = {
  title: "Safe Share — Redact and Remove Image Metadata",
  description:
    "Prepare a private image for sharing: apply permanent redaction, remove hidden metadata, and verify the exported file locally in your browser.",
  alternates: { canonical: "/safe-share" },
};

const steps = [
  "Choose images",
  "Review sensitive details",
  "Draw permanent redactions",
  "Export without metadata",
  "Verify the clean result",
];

export default function SafeSharePage() {
  return (
    <div className="workflow-page">
      <section className="workflow-hero">
        <div>
          <span className="eyebrow">SAFE SHARE</span>
          <h1>Prepare a private image before you share it</h1>
          <p>
            Cover faces, plates, IDs, or private text, then export a flattened JPEG. PixCloak reopens the result and checks that EXIF, GPS, XMP, and IPTC metadata are absent.
          </p>
        </div>
        <div className="workflow-trust" aria-label="Privacy summary">
          <strong>Local by design</strong>
          <span>Image bytes stay in this browser.</span>
          <Link href="/privacy">Read the privacy details</Link>
        </div>
      </section>

      <ol className="workflow-steps" aria-label="Safe Share steps">
        {steps.map((step, index) => (
          <li key={step}><span>{index + 1}</span>{step}</li>
        ))}
      </ol>

      <section aria-labelledby="safe-share-editor">
        <h2 id="safe-share-editor" className="sr-only">Safe Share editor</h2>
        <RedactClient surface="safe_share" />
      </section>

      <section className="card workflow-support">
        <h2>Supported in V1.0</h2>
        <div className="support-grid">
          <div><strong>Inputs</strong><span>Browser-decodable JPG, PNG, and WebP images.</span></div>
          <div><strong>Redaction</strong><span>Solid block, pixelation, and permanent blur.</span></div>
          <div><strong>Metadata verification</strong><span>JPEG EXIF/GPS/XMP/IPTC plus PNG and WebP metadata markers.</span></div>
          <div><strong>Known limit</strong><span>HEIC metadata is not fully inspected; convert HEIC before the final review.</span></div>
        </div>
        <div className="next-actions">
          <Link className="button" href="/upload-ready">Meet an upload limit next</Link>
          <Link className="button-outline" href="/tools/exif-checker">Inspect metadata only</Link>
        </div>
      </section>
    </div>
  );
}
