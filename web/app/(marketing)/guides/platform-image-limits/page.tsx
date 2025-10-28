import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Platform Image Limits (KB & Dimensions) | PixCloak',
  description: 'Common caps for avatars and posts: 200KB avatars, 500KB posts, 1920px longest side. Use quick presets to prepare images locally—no uploads, fast exports.',
  alternates: {
    canonical: '/guides/platform-image-limits',
    languages: {
      'x-default': '/guides/platform-image-limits',
      en: '/guides/platform-image-limits',
      zh: '/guides/platform-image-limits-zh',
      es: '/guides/es-limites-de-imagenes-plataformas',
      pt: '/guides/pt-limites-de-imagens-plataformas',
      id: '/guides/id-batas-gambar-platform',
    },
  },
};

export default function GuidePlatformLimits() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Platform Image Limits (KB & Dimensions)', url: '/guides/platform-image-limits' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Common platform image limits (size & dimensions)</h1>
        <p className="text-muted">Updated periodically. Use quick presets below to prepare images fast.</p>
        <ul>
          <li>Avatars: often ≤ 200KB; 512–1024px square</li>
          <li>Feed posts: often ≤ 500KB; longest side ≤ 1920px</li>
          <li>Banners: wide aspect; test JPEG vs WebP for gradients/text</li>
        </ul>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a className="pill" href="/compress?kb=200">200KB preset</a>
          <a className="pill" href="/compress?kb=500">500KB preset</a>
          <a className="pill-ghost" href="/guides/resize-longest-side">Resize 1920px</a>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/press/compress-200kb.gif" alt="200KB workflow demo" loading="lazy" style={{ maxWidth: '100%', borderRadius: 8, border: '1px solid #eee', marginTop: 10 }} />
      </div>
    </div>
    </>
  );
}


