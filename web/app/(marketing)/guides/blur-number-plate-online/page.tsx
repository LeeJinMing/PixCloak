import type { Metadata } from "next";
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Blur Number Plate Online (UK)—Pixelate, Not Soft Blur",
  description:
    "Blur number plate online free. Use pixelate or solid cover—not soft blur. Local browser tool for UK plates; EXIF/GPS removed on export.",
  alternates: { canonical: "/guides/blur-number-plate-online" },
  openGraph: {
    title: "Blur number plate online (UK)",
    description: "Pixelate UK number plates locally—no upload. Stronger than soft blur.",
    url: "/guides/blur-number-plate-online",
    type: "article",
  },
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
          <p style={{ marginBottom: 8 }}>
            <strong>Short answer:</strong> Use pixelate or a solid cover with margin on the plate, then export and check at full size—soft blur alone is often too weak.
          </p>
          <p className="text-muted" style={{ fontSize: 14, marginBottom: 12 }}>Last reviewed: June 2026.</p>
          <p style={{ marginBottom: 12 }}>
            See also: <a href="/guides/license-plate-redaction">redact vs blur license plate</a> (US/international).
          </p>
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


