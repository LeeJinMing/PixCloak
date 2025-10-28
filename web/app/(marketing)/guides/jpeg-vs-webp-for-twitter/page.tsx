import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'JPEG vs WebP for X/Twitter: Best Settings | PixCloak',
  description: 'Choose WebP for smaller files or JPEG for compatibility. Keep width ≤1920px and target ~500KB for fast loads. Convert and preview locally—no uploads needed.',
  alternates: {
    canonical: '/guides/jpeg-vs-webp-for-twitter',
    languages: { 'x-default': '/guides/jpeg-vs-webp-for-twitter', en: '/guides/jpeg-vs-webp-for-twitter' }
  },
};

export default function GuideJpegWebpTwitter() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'JPEG vs WebP for X/Twitter: Best Settings', url: '/guides/jpeg-vs-webp-for-twitter' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>JPEG vs WebP for X/Twitter</h1>
        <ul>
          <li>WebP is smaller but may be re‑encoded by the platform</li>
          <li>Try WebP first; fall back to high‑quality JPEG if artifacts</li>
          <li>Keep width ≤ 1920px; target 500KB for fast load</li>
        </ul>
        <p>Test quickly in <a href="/compress?kb=500">/compress?kb=500</a> with Format WebP/JPEG.</p>
      </div>
    </div>
    </>
  );
}


