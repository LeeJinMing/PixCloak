import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'JPEG vs WebP for LinkedIn: Feed vs Banners | PixCloak',
  description: 'Use WebP for feed images and JPEG for banners with gradients. Resize longest side to 1920px; start near 500KB. Convert locally and preview—no uploads required.',
  alternates: {
    canonical: '/guides/jpeg-vs-webp-for-linkedin',
    languages: { 'x-default': '/guides/jpeg-vs-webp-for-linkedin', en: '/guides/jpeg-vs-webp-for-linkedin' }
  },
};

export default function GuideJpegWebpLinkedIn() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'JPEG vs WebP for LinkedIn: Feed vs Banners', url: '/guides/jpeg-vs-webp-for-linkedin' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>JPEG vs WebP for LinkedIn</h1>
        <ul>
          <li>Prefer WebP for feed images; JPEG for banners with gradients</li>
          <li>Use 1920px longest side; start from 500KB</li>
          <li>Preview artifacts before posting</li>
        </ul>
        <p>Open <a href="/compress?kb=500">/compress?kb=500</a> and toggle format.</p>
      </div>
    </div>
    </>
  );
}


