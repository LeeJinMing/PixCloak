import type { Metadata } from 'next';
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Image Upload Limits for iPhone & Android... | PixCloak",
  description: "Comprehensive list of mobile upload limits for forms, job applications, government portals. Reduce images to 200KB, 500KB, or 1MB for iPhone/Android.",
  alternates: {
    canonical: '/guides/mobile-upload-limits',
    languages: {
      'x-default': '/guides/mobile-upload-limits',
      en: '/guides/mobile-upload-limits',
    },
  },
  openGraph: {
    title: "Image Upload Limits for iPhone & Android (200KB-5MB Guide)",
    description: "Reduce images to 200KB, 500KB, or 1MB for mobile uploads. Works on iPhone, Android. No app download.",
    url: "/guides/mobile-upload-limits",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Upload Limits Guide",
    description: "Hit exact KB targets. Works on iPhone, Android. Free tool.",
  },
};

export default function GuideMobileLimits() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Image Upload Limits for iPhone & Android (200KB-5MB Guide)', url: '/guides/mobile-upload-limits' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Mobile Upload Limits: Prepare Images Fast</h1>
        <ul>
          <li>Common limits: 2–5MB or 200–500KB in some forms</li>
          <li>Use Target (KB) to hit exact limits: try 200KB/500KB presets</li>
          <li>Downscale longest side (e.g., 1920px) for huge camera photos</li>
        </ul>
        <p>Open <a href="/compress?kb=500">/compress?kb=500</a> to start with 500KB.</p>
      </div>
      <FaqJsonLd
        items={[
          { question: "What are common mobile upload limits?", answer: "Job applications: 100-200KB. Government portals: 200-500KB. Social media profiles: 200KB-2MB. Email attachments: 5-25MB total. Insurance/bank portals: 500KB-1MB per file." },
          { question: "Why do mobile uploads fail?", answer: "iPhone and DSLR cameras produce 3-10MB photos. Most forms limit uploads to 200KB-1MB. Compress before uploading to avoid errors." },
          { question: "How do I compress images on iPhone without an app?", answer: "Use our browser-based tool at pixcloak.com/compress. Works in Safari, Chrome. No app download or permissions needed." },
        ]}
      />
    </div>
    </>
  );
}


