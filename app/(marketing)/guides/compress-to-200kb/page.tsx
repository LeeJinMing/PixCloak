import type { Metadata } from 'next';
import { FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Compress Images to 200KB (Free, No Quality Loss) | PixCloak",
  description: "Reduce image file size to exactly 200KB for avatars, forms, and uploads. Works for JPEG, PNG, WebP—no app download. Perfect for LinkedIn, job applications, and social media profiles.",
  alternates: {
    canonical: '/guides/compress-to-200kb',
    languages: {
      'x-default': '/guides/compress-to-200kb',
      en: '/guides/compress-to-200kb',
      es: '/guides/es-comprimir-a-200kb',
    },
  },
  openGraph: {
    title: "Compress Images to 200KB (Free, No Quality Loss)",
    description: "Reduce image file size to exactly 200KB for avatars, forms, and uploads. Perfect for LinkedIn, job applications, and social media.",
    url: "/guides/compress-to-200kb",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress Images to 200KB",
    description: "Free tool. Exact 200KB target. No app download needed.",
  },
};
export default function GuideCompress200KB() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Compress images to 200KB</h1>
        <ol>
          <li>Open <a href="/compress?kb=200">/compress?kb=200</a></li>
          <li>Drag images in, click Compress</li>
          <li>Download single files or ZIP for batch</li>
        </ol>
        <p className="text-muted">Tip: Downscale longest side (e.g., 1920px) before targeting 200KB for best quality.</p>
      </div>
      <FaqJsonLd
        items={[
          { question: "Why compress images to 200KB?", answer: "Many platforms have 200KB upload limits for profile pictures, avatars, and form attachments. LinkedIn, job application portals, and government websites commonly use this limit." },
          { question: "Will 200KB reduce image quality?", answer: "Slightly, but for most uses (avatars, web thumbnails) the difference is imperceptible. Resize to 1920px or lower first to maintain better quality at 200KB." },
          { question: "What's the best format for 200KB images?", answer: "WebP offers smallest file size. JPEG is second-best and more compatible. PNG only for screenshots with text." },
        ]}
      />
    </div>
  );
}


