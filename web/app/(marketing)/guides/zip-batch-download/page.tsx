import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Batch Image Compressor: ZIP Download (No Upload) | PixCloak',
  description: 'Compress multiple images in your browser, set target KB, format, and 1920px resize, then download all as a single ZIP. Works offline, no uploads.',
  alternates: {
    canonical: '/guides/zip-batch-download',
    languages: { 'x-default': '/guides/zip-batch-download', en: '/guides/zip-batch-download' }
  },
};

export default function GuideZipBatch() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Batch Image Compressor: Download ZIP (Free, No Upload)', url: '/guides/zip-batch-download' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>Batch Compress and Download as ZIP</h1>
          <ol>
            <li>Open <a href="/compress">/compress</a></li>
            <li>Drag multiple images into the upload area</li>
            <li>Set Format/Resize/Target (KB) as needed and click Compress</li>
            <li>Click <strong>Download ZIP</strong> to save all results at once</li>
          </ol>
          <p className="text-muted">Tip: Set a prefix/suffix to keep exported files organized.</p>
        </div>
      </div>
    </>
  );
}


