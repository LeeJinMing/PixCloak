import type { Metadata } from "next";
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Black Out Text in Images (Censor/Redact) | PixCloak",
  description: "Black out or pixelate sensitive text in screenshots and photos, then export without EXIF/GPS. Works entirely in your browser—no uploads.",
  alternates: { canonical: "/guides/black-out-text-in-image" },
};

export default function GuideBlackOutText() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Black Out Text in Images (Censor/Redact)', url: '/guides/black-out-text-in-image' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>Black Out Text in Images</h1>
          <ol>
            <li>Open <a href="/redact">/redact</a>.</li>
            <li>Draw a region over the text; choose Solid (black) or Pixelate.</li>
            <li>Export; metadata is stripped and nothing is uploaded.</li>
          </ol>
          <p className="text-muted">Avoid Gaussian blur for sensitive text—prefer solid or pixelate to prevent recovery.</p>
        </div>
        <div className="card">
          <h2>Related</h2>
          <ul>
            <li><a href="/guides/blur-face-in-photo">Blur Faces</a></li>
            <li><a href="/guides/license-plate-redaction">License Plate Redaction</a></li>
          </ul>
        </div>
        <FaqJsonLd
          items={[
            { question: "Is blacking out text reversible?", answer: "Solid blocks and pixelation are safer; avoid soft blur for sensitive content." },
            { question: "Does metadata remain?", answer: "Exports strip EXIF/GPS automatically." }
          ]}
        />
      </div>
    </>
  );
}


