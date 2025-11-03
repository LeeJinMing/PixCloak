import type { Metadata } from 'next';
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "JPEG vs WebP: Smaller Files, Same Quality? | PixCloak",
  description: "Compare JPEG and WebP file sizes and quality. WebP is 30-50% smaller at same quality. See when to use each format for websites, social media, and email.",
  alternates: {
    canonical: '/guides/jpeg-vs-webp-size-quality',
    languages: {
      'x-default': '/guides/jpeg-vs-webp-size-quality',
      en: '/guides/jpeg-vs-webp-size-quality',
    },
  },
  openGraph: {
    title: "JPEG vs WebP: Which is Smaller and Better Quality?",
    description: "WebP is 30-50% smaller at same quality. See when to use each format. Free comparison tool.",
    url: "/guides/jpeg-vs-webp-size-quality",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "JPEG vs WebP Comparison",
    description: "Which is smaller? When to use each format? Complete guide.",
  },
};

export default function GuideJpegVsWebp() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'JPEG vs WebP: Which is Smaller and Better Quality?', url: '/guides/jpeg-vs-webp-size-quality' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>JPEG vs WebP: Size and Quality</h1>
        <ul>
          <li>WebP usually achieves smaller size at the same visual quality</li>
          <li>JPEG is broadly compatible and good for photos</li>
          <li>PNG fits UI/icons/line art with transparency</li>
        </ul>
        <p>Try both in <a href="/compress">/compress</a>: set Format to WebP/JPEG and compare sizes and Saved%.</p>
      </div>
      <FaqJsonLd
        items={[
          { question: "Is WebP better than JPEG?", answer: "For file size, yes. WebP produces 30-50% smaller files at equivalent quality. For compatibility, JPEG is still more universal, especially for older browsers and software." },
          { question: "When should I use JPEG instead of WebP?", answer: "For email attachments (Outlook preview issues), printing, or when targeting users with older devices (pre-2015). For web use, prefer WebP with JPEG fallback." },
          { question: "Does WebP support transparency?", answer: "Yes. WebP supports transparency like PNG, but with better compression. This makes it ideal for logos, graphics, and images with alpha channels." },
        ]}
      />
    </div>
    </>
  );
}


