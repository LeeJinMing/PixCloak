import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Prepare Portfolio Images (1920px, 800KB–1MB) | PixCloak',
  description: 'Resize longest side to 1920px and compress to 800KB–1MB for high‑quality portfolios. Use WebP/JPEG, preview, and export locally without uploads.',
  alternates: { canonical: '/guides/prepare-images-for-portfolio', languages: { 'x-default': '/guides/prepare-images-for-portfolio', en: '/guides/prepare-images-for-portfolio' } },
};

export default function GuidePortfolio() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Prepare Portfolio Images (1920px, 800KB–1MB)', url: '/guides/prepare-images-for-portfolio' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Prepare images for portfolio websites</h1>
        <ul>
          <li>Resize longest side to 1920px</li>
          <li>Start from 800KB–1MB for fewer artifacts</li>
          <li>Use WebP where supported; JPEG for universal compatibility</li>
        </ul>
        <p>Try <a href="/compress?kb=800">/compress?kb=800</a> or <a href="/compress?kb=1024">/compress?kb=1024</a>.</p>
      </div>
    </div>
    </>
  );
}


