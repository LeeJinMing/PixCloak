import type { Metadata } from 'next';
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Create 200KB Profile Picture (LinkedIn/Jobs) | PixCloak",
  description: "Compress profile photos to exactly 200KB for LinkedIn, job applications, government portals. Maintains quality. Works on any device—no app download.",
  alternates: {
    canonical: '/guides/avatar-200kb',
    languages: {
      'x-default': '/guides/avatar-200kb',
      en: '/guides/avatar-200kb',
    },
  },
  openGraph: {
    title: "Create Profile Picture at 200KB (LinkedIn, Job Sites)",
    description: "Compress profile photos to exactly 200KB. Maintains quality. Works on any device.",
    url: "/guides/avatar-200kb",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create 200KB Profile Picture",
    description: "Perfect for LinkedIn, job sites. Free tool, no app download.",
  },
};

export default function GuideAvatar200KB() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Create Profile Picture at 200KB (LinkedIn, Job Sites)', url: '/guides/avatar-200kb' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>Create 200KB avatars</h1>
          <ol>
            <li>Open <a href="/compress?kb=200">/compress?kb=200</a></li>
            <li>Resize to 512–1024px square, then Compress</li>
            <li>Export as WebP or JPEG</li>
          </ol>
          <p className="text-muted">Many profile forms cap images at 200KB.</p>
        </div>
        <FaqJsonLd
          items={[
            { question: "What size should a profile picture be?", answer: "200KB file size is the most common limit. Dimensions: 512x512px for most platforms, up to 1024x1024px for high-DPI displays. Square aspect ratio (1:1) works universally." },
            { question: "Why do job sites limit profile pictures to 200KB?", answer: "To ensure fast page loading across all devices and reduce server storage costs. 200KB is enough for excellent quality at profile picture dimensions." },
            { question: "Should I use JPEG or PNG for profile pictures?", answer: "JPEG for photos (smaller size), PNG only if you need transparency. For 200KB target, JPEG at 85-95% quality looks excellent." },
          ]}
        />
      </div>
    </>
  );
}


