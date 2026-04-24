import type { Metadata } from 'next';
import Link from 'next/link';
import Client from './Client';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: 'PDF to Image Online—Export Pages as PNG (No Upload) | PixCloak',
  description:
    'Turn PDF pages into PNG images in your browser. Set max pages and scale, download a ZIP. Runs locally—nothing uploaded. For slides, scans, and quick previews.',
  alternates: {
    canonical: '/tools/pdf-to-image',
    languages: { 'x-default': '/tools/pdf-to-image', en: '/tools/pdf-to-image' },
  },
  openGraph: {
    title: 'PDF pages to PNG locally',
    description: 'Rasterize up to 50 pages per run. ZIP download.',
    url: '/tools/pdf-to-image',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF to image',
    description: 'PNG per page in the browser.',
  },
};

export default function PdfToImagePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Tools', url: '/tools' },
          { name: 'PDF to image', url: '/tools/pdf-to-image' },
        ]}
      />
      <SoftwareAppJsonLd
        name="PDF to Image"
        url="/tools/pdf-to-image"
        description="Rasterize PDF pages to PNG images locally in the browser with adjustable scale and a ZIP download."
      />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1 className="page-hero-title">PDF to Image—Pages as PNG (No Upload)</h1>
          <p className="text-muted" style={{ marginBottom: 0 }}>
            Need thumbnails or images from a deck? Each page becomes a PNG. For smaller file sizes afterward, use{' '}
            <Link href="/compress">image compression</Link> or <Link href="/tools/webp-converter">WebP conversion</Link> on the
            exported images.
          </p>
        </div>
        <Client />
        <div className="card">
          <h2>Related tools</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link href="/compress" className="pill">
              Compress images
            </Link>
            <Link href="/tools/resize-image" className="pill">
              Resize
            </Link>
            <Link href="/tools/rotate-flip" className="pill">
              Rotate &amp; flip
            </Link>
            <Link href="/tools/webp-converter" className="pill">
              WebP
            </Link>
          </div>
        </div>
        <FaqJsonLd
          items={[
            {
              question: 'Are PDFs uploaded to your server?',
              answer:
                'No. The file stays in your tab; PDF.js renders pages with a worker loaded from a public CDN.',
            },
            {
              question: 'Why is there a max page limit?',
              answer:
                'Each page is drawn to a full-resolution canvas. Capping pages avoids freezing the browser on huge documents.',
            },
            {
              question: 'Password-protected PDFs?',
              answer:
                'Encrypted PDFs usually fail until decrypted. Use an unlocked copy in your viewer, then export again.',
            },
            {
              question: 'Output format?',
              answer: 'PNG for lossless page captures. Convert to JPEG or WebP separately if you need smaller files.',
            },
          ]}
        />
      </div>
    </>
  );
}
