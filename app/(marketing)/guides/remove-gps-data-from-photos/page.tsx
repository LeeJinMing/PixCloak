import type { Metadata } from "next";
import { FaqJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Remove GPS Data from Photos (Strip EXIF) | PixCloak",
  description: "Remove EXIF GPS coordinates locally when exporting images—privacy first.",
  alternates: { canonical: "/guides/remove-gps-data-from-photos" },
};

export default function GuideRemoveGps() {
  return (
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
  );
}


