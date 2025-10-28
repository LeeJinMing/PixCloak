import type { Metadata } from "next";
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Blur Number Plates in Photos (UK) | PixCloak",
  description: "Pixelate or censor number plates (UK) with local processing—no uploads. Prefer pixelation for stronger privacy. Export JPG/WebP with EXIF/GPS removed.",
  alternates: { canonical: "/guides/blur-number-plate-online" },
};

export default function GuideBlurNumberPlate() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Blur Number Plates in Photos (UK)', url: '/guides/blur-number-plate-online' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>Blur Number Plates in Photos (UK)</h1>
          <ol>
            <li>Open <a href="/redact">/redact</a>.</li>
            <li>Mark the plate area; choose Pixelate for stronger privacy.</li>
            <li>Export; EXIF/GPS are removed automatically.</li>
          </ol>
          <p className="text-muted">Prefer pixelate over soft blur; keep a small margin around plates.</p>
        </div>
        <div className="card">
          <h2>Related</h2>
          <ul>
            <li><a href="/guides/license-plate-redaction">US: License Plate Redaction</a></li>
            <li><a href="/guides/blur-face-in-photo">Blur Faces</a></li>
          </ul>
        </div>
        <FaqJsonLd
          items={[
            { question: "Is pixelation better than blur?", answer: "Pixelation is generally stronger for plates (number plates)." },
            { question: "Are images uploaded?", answer: "No. Everything runs locally in your browser." }
          ]}
        />
      </div>
    </>
  );
}


