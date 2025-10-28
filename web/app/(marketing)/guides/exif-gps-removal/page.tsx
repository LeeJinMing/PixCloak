import type { Metadata } from 'next';
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Remove GPS & EXIF Data from Photos (Free, 2... | PixCloak",
  description: "Strip location, camera info, and metadata from photos before sharing. Protects your privacy—prevents stalking and address leaks.",
  alternates: {
    canonical: '/guides/exif-gps-removal',
    languages: {
      'x-default': '/guides/exif-gps-removal',
      en: '/guides/exif-gps-removal',
    },
  },
  openGraph: {
    title: "Remove GPS & EXIF Data from Photos (Free, 2 Minutes)",
    description: "Strip location, camera info, and metadata from photos. Protects privacy—prevents stalking and address leaks.",
    url: "/guides/exif-gps-removal",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remove GPS & EXIF Data from Photos",
    description: "Protect privacy. Strip location data. Works in browser, no upload.",
  },
};

export default function GuideExifGpsRemoval() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Remove GPS & EXIF Data from Photos (Free, 2 Minutes)', url: '/guides/exif-gps-removal' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>How to Remove EXIF/GPS from Images</h1>
        <p>Re‑encoding on export removes most EXIF/GPS metadata. Our tools clear them by default.</p>
        <ol>
          <li>Open <a href="/redact">/redact</a> or <a href="/compress">/compress</a></li>
          <li>Export as JPG – EXIF/GPS will be removed automatically.</li>
        </ol>
        <p>We may add an optional toggle to keep non‑sensitive fields later.</p>
      </div>
      <FaqJsonLd
        items={[
          { question: "What is EXIF data in photos?", answer: "EXIF (Exchangeable Image File Format) includes metadata like GPS coordinates, camera model, date/time, software used, and sometimes your name. It's embedded in JPEG, PNG, and other image files." },
          { question: "Why should I remove GPS from photos?", answer: "GPS coordinates reveal exactly where the photo was taken—often your home address. Removing GPS prevents stalking, doxxing, and privacy breaches when sharing photos online." },
          { question: "Do social media platforms remove EXIF automatically?", answer: "Some do (Facebook, Instagram), but many don't (Twitter, forums, job portals). Always remove EXIF yourself before uploading to be safe." },
        ]}
      />
    </div>
    </>
  );
}


