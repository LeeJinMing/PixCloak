import type { Metadata } from "next";
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Blur License Plates in Photos — Legal & Easy | PixCloak",
  description: "Hide license plates to protect privacy. Use solid blocks or strong pixelation (not reversible). Ideal for selling cars, accident reports, and social sharing.",
  alternates: {
    canonical: "/guides/license-plate-redaction",
    languages: {
      'x-default': "/guides/license-plate-redaction",
      en: "/guides/license-plate-redaction",
    }
  },
  openGraph: {
    title: "Blur License Plates in Photos — Legal & Easy",
    description: "Hide plates to protect privacy. Use solid blocks or pixelation. For car sales, reports, social.",
    url: "/guides/license-plate-redaction",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blur License Plates in Photos",
    description: "Protect privacy with solid blocks or pixelation. Legal and easy.",
  },
};

export default function GuidePlateRedaction() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Blur License Plates in Photos — Legal & Easy', url: '/guides/license-plate-redaction' }
      ]} />
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
    </>
  );
}


