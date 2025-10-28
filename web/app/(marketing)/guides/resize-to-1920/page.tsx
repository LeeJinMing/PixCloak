import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Resize Longest Side to 1920px (Best for Web) | PixCloak',
  description: 'Downscale to 1920px before compressing to 200-800KB for fast web delivery. Reduces file size while keeping aspect ratio. Works locally, no uploads needed.',
  alternates: { canonical: '/guides/resize-to-1920', languages: { 'x-default': '/guides/resize-to-1920', en: '/guides/resize-to-1920' } },
};

export default function GuideResize1920() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Resize Longest Side to 1920px (Best for Web)', url: '/guides/resize-to-1920' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>Resize longest side to 1920px</h1>
          <ol>
            <li>Open <a href="/compress">/compress</a></li>
            <li>Set Resize = Longest side, value = 1920</li>
            <li>Compress to 200–800KB as needed</li>
          </ol>
          <p className="text-muted">Downscaling first saves time and improves compression quality.</p>
        </div>
      </div>
    </>
  );
}


