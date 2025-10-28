import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Remove EXIF from WeChat images (local) | PixCloak',
  description: 'Strip EXIF/GPS from WeChat images by exporting locally as JPEG/WebP—no uploads. Use original files when possible to avoid platform recompression.',
  alternates: {
    canonical: '/guides/remove-exif-wechat',
    languages: {
      zh: '/guides/remove-exif-wechat-zh',
      en: '/guides/remove-exif-wechat'
    },
  },
};

export default function GuideRemoveExifWeChat() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Remove EXIF from WeChat images (local)', url: '/guides/remove-exif-wechat' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Remove EXIF from WeChat images</h1>
        <ol>
          <li>Open <a href="/compress">/compress</a></li>
          <li>Drop images and export as JPEG/WebP</li>
          <li>EXIF/GPS will be stripped automatically</li>
        </ol>
        <p className="text-muted">WeChat may recompress images; use original files when possible.</p>
      </div>
    </div>
    </>
  );
}


