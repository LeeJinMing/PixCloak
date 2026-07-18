import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import CompressClient from "@/app/compress/Client";

export const metadata: Metadata = {
  title: "Upload Ready — Compress Images Under a File-Size Limit",
  description:
    "Convert, resize, and compress images under a hard KB limit. Every output is decoded and verified before download, entirely in your browser.",
  alternates: { canonical: "/upload-ready" },
};

const presets = [
  { label: "Under 100KB", href: "/upload-ready?kb=100" },
  { label: "Under 200KB", href: "/upload-ready?kb=200" },
  { label: "Under 500KB", href: "/upload-ready?kb=500" },
  { label: "Under 1MB", href: "/upload-ready?kb=1024" },
  { label: "Longest side 1080px", href: "/upload-ready?longest=1080&preset=1080px" },
  { label: "Longest side 1920px", href: "/upload-ready?longest=1920&preset=1920px" },
  { label: "Longest side 2048px", href: "/upload-ready?longest=2048&preset=2048px" },
];

export default function UploadReadyPage() {
  return (
    <div className="workflow-page">
      <section className="workflow-hero">
        <div>
          <span className="eyebrow">UPLOAD READY</span>
          <h1>Make an image fit the upload requirement</h1>
          <p>
            Choose a hard file-size cap, output format, or dimensions. If quality reduction is not enough, PixCloak reduces dimensions and never offers an over-limit result as successful.
          </p>
        </div>
        <div className="workflow-trust" aria-label="Result guarantee">
          <strong>Verified before download</strong>
          <span>Size cap, dimensions, format, and decodability are checked after export.</span>
        </div>
      </section>

      <section className="preset-strip" aria-label="Upload presets">
        {presets.map((preset) => <Link key={preset.href} href={preset.href}>{preset.label}</Link>)}
      </section>

      <Suspense fallback={<div className="card">Loading the local image editor…</div>}>
        <CompressClient embedded surface="upload_ready" />
      </Suspense>

      <section className="card workflow-support">
        <h2>How the hard limit works</h2>
        <div className="support-grid">
          <div><strong>1. Convert</strong><span>Export to JPEG, PNG, or WebP.</span></div>
          <div><strong>2. Fit quality</strong><span>Use the highest quality that stays under the selected cap.</span></div>
          <div><strong>3. Reduce dimensions</strong><span>Only when quality alone cannot meet the cap.</span></div>
          <div><strong>4. Verify</strong><span>Reopen the image and reject any result that exceeds the cap.</span></div>
        </div>
        <div className="next-actions">
          <Link className="button" href="/upload-pack">Prepare a photo + signature pair</Link>
          <Link className="button" href="/safe-share">Remove private details first</Link>
          <Link className="button-outline" href="/tools/heic-converter">Convert HEIC first</Link>
        </div>
      </section>
    </div>
  );
}
