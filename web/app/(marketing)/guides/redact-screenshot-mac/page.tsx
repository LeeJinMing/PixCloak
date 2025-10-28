import type { Metadata } from "next";
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Redact a Screenshot on Mac (Blur/Pixelate) | PixCloak",
  description: "Censor sensitive parts of macOS screenshots by blurring or pixelating areas, then export without EXIF/GPS. Runs locally in your browser—no uploads or apps...",
  alternates: { canonical: "/guides/redact-screenshot-mac" },
};

export default function GuideRedactScreenshotMac() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Redact a Screenshot on Mac (Blur/Pixelate)', url: '/guides/redact-screenshot-mac' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Redact a Screenshot on Mac</h1>
        <ol>
          <li>Take a screenshot, then open <a href="/redact">/redact</a>.</li>
          <li>Draw regions over sensitive content; choose Solid, Blur, or Pixelate.</li>
          <li>Export; the file is processed locally and metadata is stripped.</li>
        </ol>
        <p className="text-muted">Prefer pixelate or solid for stronger protection vs reversible blur.</p>
      </div>
      <div className="card">
        <h2>Related</h2>
        <ul>
          <li><a href="/guides/black-out-text-in-image">Black Out Text</a></li>
          <li><a href="/guides/blur-face-in-photo">Blur Faces</a></li>
        </ul>
      </div>
      <FaqJsonLd
        items={[
          { question: "Is Gaussian blur safe?", answer: "Prefer Pixelate or Solid for stronger protection against reversal attempts." },
          { question: "Are files uploaded?", answer: "No. The app runs completely in your browser." }
        ]}
      />
    </div>
    </>
  );
}


