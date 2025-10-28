import type { Metadata } from 'next';
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "How to Share Photos Anonymously (Remove All... | PixCloak",
  description: "Complete guide: blur faces, hide license plates, black out addresses, remove EXIF/GPS. Share safely on social media, forums, marketplace.",
  alternates: {
    canonical: '/guides/anonymized-sharing',
    languages: {
      'x-default': '/guides/anonymized-sharing',
      en: '/guides/anonymized-sharing',
    },
  },
  openGraph: {
    title: "How to Share Photos Anonymously (Remove All Identifying Info)",
    description: "Blur faces, hide plates, remove EXIF/GPS. Share safely on social media, forums. Prevent doxxing.",
    url: "/guides/anonymized-sharing",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Share Photos Anonymously",
    description: "Remove all identifying info. Prevent doxxing. Complete guide.",
  },
};

export default function GuideAnonymizedSharing() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'How to Share Photos Anonymously (Remove All Identifying Info)', url: '/guides/anonymized-sharing' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>Share Images Anonymously and Safely</h1>
          <ul>
            <li>Redact faces/plates/IDs/emails/QR codes with solid/pixelate</li>
            <li>Export removes EXIF/GPS metadata by default</li>
            <li>Check corners/mini‑maps/watermarks before publishing</li>
          </ul>
          <p>Use <a href="/redact">/redact</a> and apply presets for speed.</p>
        </div>
        <FaqJsonLd
          items={[
            { question: "What identifying information should I remove before sharing photos?", answer: "Faces (without consent), license plates, home addresses, street signs, QR codes, phone numbers, email addresses, usernames, signatures, credit cards. Also remove EXIF/GPS metadata." },
            { question: "Can people reverse blur to see hidden info?", answer: "Soft blur can sometimes be reversed. Use solid blocks or strong pixelation (20-50px blocks) for irreversible redaction." },
            { question: "Does anonymizing photos protect me legally?", answer: "It helps comply with GDPR, CCPA, and privacy laws. Always get consent when sharing photos of others. Anonymization is an extra layer of protection, not a legal substitute for consent." },
          ]}
        />
      </div>
    </>
  );
}


