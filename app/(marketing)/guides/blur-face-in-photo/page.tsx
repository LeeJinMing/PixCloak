import type { Metadata } from "next";
import { FaqJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "How to Blur Faces in Photos (Free, No App Needed) | PixCloak",
  description: "Protect privacy by blurring faces in photos before sharing. Works on iPhone, Android, and desktop—no app download. Choose blur, pixelate, or solid block. EXIF removed automatically.",
  alternates: {
    canonical: "/guides/blur-face-in-photo",
    languages: {
      'x-default': "/guides/blur-face-in-photo",
      en: "/guides/blur-face-in-photo",
    }
  },
  openGraph: {
    title: "How to Blur Faces in Photos (Free, No App Needed)",
    description: "Protect privacy by blurring faces in photos before sharing. Works on iPhone, Android, and desktop—no app download.",
    url: "/guides/blur-face-in-photo",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Blur Faces in Photos",
    description: "Protect privacy. Works on iPhone, Android, desktop. No app download needed.",
  },
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


