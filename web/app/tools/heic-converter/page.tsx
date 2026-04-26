import type { Metadata } from 'next';
import Link from 'next/link';
import Client from './Client';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: 'HEIC to JPG & HEIC to WebP (No Upload)',
  description: 'Convert iPhone HEIC/HEIF to JPEG or WebP in your browser. Adjustable quality, batch ZIP. Nothing uploaded—decoder runs locally after you start conversion.',
  alternates: {
    canonical: '/tools/heic-converter',
    languages: { 'x-default': '/tools/heic-converter', en: '/tools/heic-converter' },
  },
  openGraph: {
    title: 'HEIC to JPG / WebP locally',
    description: 'iPhone photos to JPEG or WebP. Batch, private. Process images offline in your browser. 100% free, no uploads, privacy guaranteed.',
    url: '/tools/heic-converter',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HEIC converter',
    description: 'Local HEIC to JPG or WebP. Process images offline in your browser. 100% free, no uploads, privacy guaranteed.',
  },
};

export default function HeicConverterPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Tools', url: '/tools' },
          { name: 'HEIC converter', url: '/tools/heic-converter' },
        ]}
      />
      <SoftwareAppJsonLd
        name="HEIC to JPG / WebP"
        url="/tools/heic-converter"
        description="Convert HEIC and HEIF images from Apple devices to JPEG or WebP in the browser without uploading files to a server."
      />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1 className="page-hero-title">HEIC to JPG &amp; HEIC to WebP (No Upload)</h1>
          <p className="text-muted" style={{ marginBottom: 0 }}>
            Many forms and sites still want JPEG. Export HEIC from your iPhone or Mac, pick JPEG or WebP, then download—optionally as a ZIP for
            multiple photos. After conversion you can{' '}
            <Link href="/compress">compress to a target KB</Link> or <Link href="/tools/webp-converter">tune WebP</Link> from other sources.
          </p>
        </div>
        <Client />
        <div className="card">
          <h2>Related tools</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link href="/tools/png-jpg-converter" className="pill">
              PNG ↔ JPG
            </Link>
            <Link href="/tools/webp-converter" className="pill">
              WebP converter
            </Link>
            <Link href="/compress" className="pill">
              Compress
            </Link>
            <Link href="/tools/resize-image" className="pill">
              Resize
            </Link>
          </div>
        </div>
        <FaqJsonLd
          items={[
            {
              question: 'Is HEIC conversion done on your servers?',
              answer:
                'No. Files stay in your browser; the decoder library loads when you click Convert and runs locally.',
            },
            {
              question: 'Which browsers work?',
              answer:
                'Recent Chrome, Edge, and Firefox on desktop usually work best. If conversion fails, try another browser or update to the latest version.',
            },
            {
              question: 'Can I convert HEIC to WebP?',
              answer:
                'Yes. The tool decodes HEIC to an intermediate image, then encodes WebP in your browser when you choose WebP output.',
            },
            {
              question: 'Batch convert HEIC files?',
              answer:
                'Select multiple .heic or .heif files. Download a ZIP when you convert more than one file.',
            },
          ]}
        />
      </div>
    </>
  );
}
