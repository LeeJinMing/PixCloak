import type { Metadata } from 'next';
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Social Media Image Size Limits (LinkedIn,... | PixCloak",
  description: "Exact image size requirements for LinkedIn (8MB), Twitter (5MB), Instagram (30MB), Facebook (10MB). Compress to exact KB targets.",
  alternates: {
    canonical: '/guides/social-platform-kb',
    languages: {
      'x-default': '/guides/social-platform-kb',
      en: '/guides/social-platform-kb',
    },
  },
  openGraph: {
    title: "Social Media Image Size Limits (LinkedIn, Twitter, Instagram)",
    description: "Exact image size requirements for all social platforms. Compress to exact KB targets.",
    url: "/guides/social-platform-kb",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Media Image Size Limits",
    description: "LinkedIn, Twitter, Instagram limits. Compress to exact sizes.",
  },
};

export default function GuideSocialKB() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Social Media Image Size Limits (LinkedIn, Twitter, Instagram)', url: '/guides/social-platform-kb' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Common KB Targets for Social/Forms</h1>
        <ul>
          <li>Profile/upload forms often require 200KB/500KB</li>
          <li>Start with 200KB for avatars, 500KB for posts</li>
          <li>Keep width ≤ 1920px for fast loading</li>
        </ul>
        <p>Try <a href="/compress?kb=200">/compress?kb=200</a> for quick avatars.</p>
      </div>
      <FaqJsonLd
        items={[
          { question: "What's LinkedIn's image size limit?", answer: "Profile photo: 8MB. Cover photo: 8MB. Post images: 10MB. Recommended: Compress to 200KB for profile, 500KB-1MB for posts." },
          { question: "What's Twitter's image size limit?", answer: "Profile photo: 2MB. Header: 5MB. Tweet images: 5MB per image, up to 4 images. Recommended: 200KB for profile, 500KB for tweets." },
          { question: "What about Instagram image sizes?", answer: "Posts: 30MB. Stories: 30MB. Profile: 2MB. Instagram compresses uploads aggressively. Pre-compress to 1MB for best quality control." },
        ]}
      />
    </div>
    </>
  );
}


