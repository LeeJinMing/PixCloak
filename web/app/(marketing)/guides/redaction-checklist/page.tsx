import type { Metadata } from 'next';
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Photo Privacy Checklist Before Sharing Online | PixCloak",
  description: "Essential checklist: blur faces, hide license plates, remove EXIF/GPS, black out text. Prevent doxxing and identity theft. Use irreversible redaction...",
  alternates: {
    canonical: '/guides/redaction-checklist',
    languages: {
      'x-default': '/guides/redaction-checklist',
      en: '/guides/redaction-checklist',
    },
  },
  openGraph: {
    title: "Photo Privacy Checklist Before Sharing Online",
    description: "Essential checklist: blur faces, hide license plates, remove EXIF/GPS, black out text. Prevent doxxing and identity theft.",
    url: "/guides/redaction-checklist",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Privacy Checklist Before Sharing",
    description: "Protect privacy before posting. Essential redaction checklist.",
  },
};

export default function GuideRedactionChecklist() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Photo Privacy Checklist Before Sharing Online', url: '/guides/redaction-checklist' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Pre‑publish Privacy Checklist (Images)</h1>
        <ul>
          <li>Mask faces, license plates, phone numbers, emails, addresses, QR codes?</li>
          <li>Remove EXIF/GPS?</li>
          <li>Keep sufficient safety margins around masked areas?</li>
          <li>Use irreversible methods (solid blocks or strong pixelation)?</li>
        </ul>
        <p>
          Go to <a href="/redact">/redact</a> to redact locally before publishing.
        </p>
      </div>
      <FaqJsonLd
        items={[
          { question: "What should I always redact before sharing photos?", answer: "Faces (without consent), license plates, phone numbers, email addresses, home addresses, QR codes, barcodes, signatures, and credit card info. Also remove EXIF/GPS metadata." },
          { question: "Is blur enough for redaction?", answer: "Soft blur can sometimes be reversed. Use solid blocks or strong pixelation (20-50px blocks) for irreversible redaction." },
          { question: "What's the biggest privacy mistake people make?", answer: "Forgetting to remove EXIF/GPS data. Even with faces blurred, GPS coordinates can reveal your home address." },
        ]}
      />
    </div>
    </>
  );
}


