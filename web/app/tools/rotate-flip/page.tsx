import type { Metadata } from 'next';
import Link from 'next/link';
import Client from './Client';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: 'Rotate & Flip Images Online—90°, 180°, Mirror (No Upload) | PixCloak',
  description:
    'Rotate JPG/PNG/WebP 90° or 180°, flip horizontally or vertically. Batch + ZIP. Fixes wrong EXIF orientation for uploads. 100% local in your browser—no upload.',
  alternates: {
    canonical: '/tools/rotate-flip',
    languages: { 'x-default': '/tools/rotate-flip', en: '/tools/rotate-flip' },
  },
  openGraph: {
    title: 'Rotate & flip images locally',
    description: 'Quarter turns, mirror, batch ZIP. No server upload.',
    url: '/tools/rotate-flip',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rotate & flip images',
    description: 'Browser-only. Batch download.',
  },
};

export default function RotateFlipPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Tools', url: '/tools' },
          { name: 'Rotate & flip', url: '/tools/rotate-flip' },
        ]}
      />
      <SoftwareAppJsonLd
        name="Rotate & Flip Images"
        url="/tools/rotate-flip"
        description="Rotate images 90° or 180° and flip horizontally or vertically. Batch processing in the browser with no uploads."
      />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1 className="page-hero-title">Rotate &amp; Flip Images Online (No Upload)</h1>
          <p className="text-muted" style={{ marginBottom: 0 }}>
            Straighten photos that were shot sideways, mirror for layouts, or fix orientation before{' '}
            <Link href="/compress">compressing</Link> or <Link href="/tools/resize-image">resizing</Link>. Same transforms apply to
            every file in your batch; download individually or as a ZIP.
          </p>
        </div>

        <div className="card">
          <h2>Quick start</h2>
          <ol>
            <li>
              <strong>Pick rotation:</strong> left/right 90°, or 180°.
            </li>
            <li>
              <strong>Optional:</strong> horizontal or vertical flip (mirror).
            </li>
            <li>
              <strong>Choose images</strong> (JPG, PNG, WebP—one or many).
            </li>
            <li>
              <strong>Apply &amp; preview</strong>, then download or ZIP.
            </li>
          </ol>
          <p>
            <strong>Runs locally.</strong> No account, no watermarks.
          </p>
        </div>

        <Client />

        <div className="card">
          <h2>When to rotate or flip</h2>
          <ul>
            <li>
              <strong>Phone sideways shots:</strong> export a correctly upright JPG before forms or CMS uploads that ignore EXIF
              orientation.
            </li>
            <li>
              <strong>Scanning &amp; documents:</strong> quick 90° fixes without an editor.
            </li>
            <li>
              <strong>Mirror:</strong> reverse text in mockups or match print layout (horizontal flip).
            </li>
          </ul>
        </div>

        <div className="card">
          <h2>Related tools</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link href="/tools/resize-image" className="pill">
              Resize image
            </Link>
            <Link href="/compress" className="pill">
              Compress
            </Link>
            <Link href="/tools/crop-templates" className="pill">
              Crop
            </Link>
            <Link href="/tools/png-jpg-converter" className="pill">
              PNG ↔ JPG
            </Link>
            <Link href="/tools/webp-converter" className="pill">
              WebP
            </Link>
          </div>
        </div>

        <FaqJsonLd
          items={[
            {
              question: 'How do I rotate an image 90 degrees online for free?',
              answer:
                'Choose left or right 90°, add your files, click Apply, then download. Processing stays in your browser; nothing is uploaded.',
            },
            {
              question: 'Does this fix iPhone photo orientation?',
              answer:
                'It exports a new image with pixels rotated as shown in the preview. Some sites ignore EXIF orientation; exporting a rotated file avoids sideways uploads.',
            },
            {
              question: 'Can I flip an image horizontally or vertically?',
              answer:
                'Yes. Use the horizontal (mirror) or vertical checkboxes, then apply. You can combine flip with rotation.',
            },
            {
              question: 'Batch rotate multiple photos?',
              answer:
                'Select many images at once. The same rotation and flip settings apply to all. Download a single ZIP when you process more than one file.',
            },
            {
              question: 'PNG transparency?',
              answer:
                'PNG files stay as PNG with alpha preserved when possible. Non-PNG images export as JPEG.',
            },
            {
              question: 'Are files uploaded to a server?',
              answer:
                'No. All transforms run locally in your browser using Canvas.',
            },
          ]}
        />
      </div>
    </>
  );
}
