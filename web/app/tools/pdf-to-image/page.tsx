import type { Metadata } from 'next';
import Link from 'next/link';
import Client from './Client';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';
import { ToolNextSteps } from '@/components/ToolNextSteps';

export const metadata: Metadata = {
  title: 'PDF to Image Online—Export Pages as PNG (No',
  description: 'Export a selected PDF page range as PNG, JPEG, or WebP in your browser. Download individual verified pages or one ZIP; nothing is uploaded.',
  alternates: {
    canonical: '/tools/pdf-to-image',
  },
  openGraph: {
    title: 'Export PDF pages to images locally',
    description: 'Rasterize up to 50 selected pages per run as PNG, JPEG, or WebP, then download individual files or one ZIP.',
    url: '/tools/pdf-to-image',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF to image',
    description: 'PNG per page in the browser. Process images offline in your browser. 100% free, no uploads, privacy guaranteed.',
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
            Need thumbnails or images from a deck? Export a selected range as PNG, JPEG, or WebP. For smaller file sizes afterward, use{' '}
            <Link href="/compress">image compression</Link> or <Link href="/tools/webp-converter">WebP conversion</Link> on the
            exported images.
          </p>
        </div>
        <Client />
        <div className="card"><strong>Need the reverse?</strong><p>Order several images and combine them into one local PDF.</p><Link className="button-outline" href="/tools/image-to-pdf">Open Images to PDF</Link></div>
        <ToolNextSteps tool="pdf-to-image" locale="en" />
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
