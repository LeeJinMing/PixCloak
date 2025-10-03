import type { Metadata } from "next";
import { FaqJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "How to Blur License Plates in Photos (Legal & Easy) | PixCloak",
  description: "Hide license plates in photos to protect privacy and comply with laws. Use solid blocks or pixelation—no reversible blur. Works for selling cars, accident reports, social sharing.",
  alternates: {
    canonical: "/guides/license-plate-redaction",
    languages: {
      'x-default': "/guides/license-plate-redaction",
      en: "/guides/license-plate-redaction",
    }
  },
  openGraph: {
    title: "How to Blur License Plates in Photos (Legal & Easy)",
    description: "Hide license plates to protect privacy. Use solid blocks or pixelation. Works for selling cars, accident reports, social sharing.",
    url: "/guides/license-plate-redaction",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Blur License Plates in Photos",
    description: "Protect privacy. Use solid blocks or pixelation. Legal and easy.",
  },
};

export default function GuidePlateRedaction() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Redact License Plates in Photos</h1>
        <ol>
          <li>Open <a href="/redact">/redact</a></li>
          <li>Select Preset = “License Plate” (or draw a box manually).</li>
          <li>Choose mode Solid or Pixelate; export JPG (EXIF/GPS removed).</li>
        </ol>
        <p className="text-muted">Keep margins around plates to avoid partial leaks; avoid blur that can be reversed.</p>
      </div>
      <FaqJsonLd
        items={[
          { question: "Why should I blur license plates in photos?", answer: "To protect privacy and prevent vehicle tracking. Many jurisdictions have privacy laws requiring license plate redaction when sharing photos publicly." },
          { question: "Should I use blur or pixelate for license plates?", answer: "Use solid blocks or strong pixelation. Soft blur can sometimes be reversed with image processing techniques." },
          { question: "When must I redact license plates?", answer: "When selling vehicles online, sharing accident photos with insurance, or posting street photography on social media. Check local privacy laws for specific requirements." },
        ]}
      />
    </div>
  );
}


