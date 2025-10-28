import type { Metadata } from 'next';
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Compress Images to 1MB (Free, Maximum Quality) | PixCloak",
  description: "Reduce image file size to 1MB for portfolios, university applications, and high-quality submissions. Preserves excellent detail.",
  alternates: {
    canonical: '/guides/compress-to-1mb',
    languages: {
      'x-default': '/guides/compress-to-1mb',
      en: '/guides/compress-to-1mb',
      id: '/guides/id-kompres-menjadi-1mb',
    },
  },
  openGraph: {
    title: "Compress Images to 1MB (Free, Maximum Quality)",
    description: "Reduce image file size to 1MB for portfolios, university applications, and high-quality submissions. Preserves excellent detail.",
    url: "/guides/compress-to-1mb",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress Images to 1MB",
    description: "Maximum quality at 1MB. Perfect for portfolios and submissions.",
  },
};
export default function GuideCompress1MB() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Compress to 1MB', url: '/guides/compress-to-1mb' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>Compress images to 1MB</h1>
          <ol>
            <li>Open <a href="/compress?kb=1024">/compress?kb=1024</a></li>
            <li>Set Format and Resize if needed, then Compress</li>
            <li>Download as ZIP for batches</li>
          </ol>
          <p className="text-muted">Use 1MB for portfolios or submissions with higher limits.</p>
        </div>
        <FaqJsonLd
          items={[
            { question: "When should I use 1MB instead of smaller sizes?", answer: "For photography portfolios, university applications, design submissions, and any case where image quality is critical. 1MB allows high resolution with minimal visible compression." },
            { question: "How many 1MB images can I upload at once?", answer: "Depends on the platform. Most allow 10-50MB per upload session, so 10-50 images. Use our batch ZIP download to organize multiple images." },
            { question: "Is 1MB too large for websites?", answer: "For hero images and portfolio showcases, 1MB is acceptable with lazy loading. For general content images, aim for 200-500KB instead." },
          ]}
        />
      </div>
    </>
  );
}


