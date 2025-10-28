import type { Metadata } from 'next';
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import AnswerCard, { CommonAnswerCards } from '@/components/AnswerCard';

export const metadata: Metadata = {
  title: "Remove EXIF from iPhone Photos — No App Needed | PixCloak",
  description: "Remove EXIF/GPS from iPhone photos before sharing. Protects privacy and home address. Works in browser, no app needed. Export cleans metadata in seconds.",
  alternates: {
    canonical: '/guides/remove-exif-iphone',
    languages: {
      'x-default': '/guides/remove-exif-iphone',
      en: '/guides/remove-exif-iphone',
      zh: '/guides/remove-exif-iphone-zh',
    },
  },
  openGraph: {
    title: "Remove EXIF from iPhone Photos — No App Needed",
    description: "Remove EXIF and GPS from iPhone photos before sharing. Works in your browser, no app needed.",
    url: "/guides/remove-exif-iphone",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remove EXIF from iPhone Photos",
    description: "Remove GPS location before sharing. Works in browser, no app needed.",
  },
};

export default function GuideRemoveExifIphone() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides/complete-image-compression-guide' },
        { name: 'Remove EXIF from iPhone Photos — No App Needed', url: '/guides/remove-exif-iphone' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        {/* Featured Snippet Answer Card */}
        <AnswerCard {...CommonAnswerCards.removeEXIF} />

        <div className="card">
          <h1>Remove EXIF/GPS from iPhone photos</h1>
          <ol>
            <li>Open <a href="/compress">/compress</a> or <a href="/redact">/redact</a></li>
            <li>Export as JPEG/WebP — EXIF/GPS is removed by re‑encoding</li>
            <li>Verify with any EXIF viewer (should show none)</li>
          </ol>
          <p className="text-muted">Removal happens locally in your browser; no upload.</p>
        </div>
        <FaqJsonLd
          items={[
            { question: "Why should I remove EXIF data from iPhone photos?", answer: "EXIF data includes GPS coordinates, device info, and timestamps. Removing it prevents stalking, protects your home address, and enhances privacy when sharing photos online." },
            { question: "Do I need to install an app to remove EXIF?", answer: "No. Use our browser-based tool—works on iPhone Safari, Chrome, any device. No app download, no permissions needed." },
            { question: "Will removing EXIF affect photo quality?", answer: "No. Re-encoding at high quality preserves visual fidelity. Only hidden metadata is stripped." },
          ]}
        />
      </div>
    </>
  );
}


