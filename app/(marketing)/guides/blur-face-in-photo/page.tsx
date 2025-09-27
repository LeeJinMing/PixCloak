import type { Metadata } from "next";
import { FaqJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Blur Faces in Photos (Online, Local) | PixCloak",
  description: "Hide identities by blurring or pixelating faces locally, no uploads.",
  alternates: { canonical: "/guides/blur-face-in-photo" },
};

export default function GuideBlurFace() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Blur Faces in Photos</h1>
        <ol>
          <li>Open <a href="/redact">/redact</a>.</li>
          <li>Draw a region over faces or use a preset; choose Blur or Pixelate.</li>
          <li>Export to JPEG/WebP; EXIF/GPS are removed automatically.</li>
        </ol>
        <p className="text-muted">Use slightly larger regions to avoid partial leaks; prefer pixelate for stronger privacy.</p>
      </div>
      <div className="card">
        <h2>Related</h2>
        <ul>
          <li><a href="/guides/license-plate-redaction">Blur License Plates</a></li>
          <li><a href="/guides/black-out-text-in-image">Black Out Text in Images</a></li>
        </ul>
      </div>
      <FaqJsonLd
        items={[
          { question: "Is face blurring done locally?", answer: "Yes, all processing is in‑browser with no uploads." },
          { question: "Blur vs Pixelate?", answer: "Pixelate generally provides stronger privacy than soft blur." }
        ]}
      />
    </div>
  );
}


