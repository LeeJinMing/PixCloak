import type { Metadata } from 'next';
import { FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Remove EXIF Data from iPhone Photos (No App, 2 Min) | PixCloak",
  description: "Strip location (GPS) and metadata from iPhone photos before sharing. Prevents stalking and privacy leaks. Works in browser—no app install. Export cleans EXIF automatically.",
  alternates: {
    canonical: '/guides/remove-exif-iphone',
    languages: {
      'x-default': '/guides/remove-exif-iphone',
      en: '/guides/remove-exif-iphone',
      zh: '/guides/remove-exif-iphone-zh',
    },
  },
  openGraph: {
    title: "Remove EXIF Data from iPhone Photos (No App, 2 Min)",
    description: "Strip location (GPS) and metadata from iPhone photos before sharing. Prevents stalking and privacy leaks.",
    url: "/guides/remove-exif-iphone",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remove EXIF Data from iPhone Photos",
    description: "Strip GPS location before sharing. Works in browser, no app needed.",
  },
};

export default function GuideRemoveExifIphone() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
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
  );
}


