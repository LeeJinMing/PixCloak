import type { Metadata } from "next";
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Remove GPS Data from Photos (Strip EXIF) | PixCloak",
  description: "Strip GPS coordinates from photos by exporting locally—no uploads. Protect your address and privacy. Verify with the EXIF Checker tool (0 GPS fields after...",
  alternates: { canonical: "/guides/remove-gps-data-from-photos" },
};

export default function GuideRemoveGps() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Remove GPS Data from Photos (Strip EXIF)', url: '/guides/remove-gps-data-from-photos' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Remove GPS Data from Photos</h1>
        <ol>
          <li>Open <a href="/redact">/redact</a> or <a href="/compress">/compress</a>.</li>
          <li>Export the processed image; exports are stripped of EXIF/GPS metadata.</li>
          <li>Verify with <a href="/tools/exif-checker">EXIF Checker</a> (0 GPS fields).</li>
        </ol>
        <p className="text-muted">Screenshots may include metadata depending on apps—always verify before sharing.</p>
      </div>
      <div className="card">
        <h2>Related</h2>
        <ul>
          <li><a href="/guides/export-without-metadata">Export Without Metadata</a></li>
          <li><a href="/tools/exif-checker">EXIF Checker</a></li>
        </ul>
      </div>
      <FaqJsonLd
        items={[
          { question: "What is EXIF GPS?", answer: "EXIF may contain latitude/longitude. Our exports strip these fields." },
          { question: "How to verify?", answer: "Use the EXIF Checker tool to confirm 0 GPS fields after export." }
        ]}
      />
    </div>
    </>
  );
}


