import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'About PixCloak: Privacy‑First Image Toolkit',
  description: 'PixCloak prepares private images for safe sharing and upload with local redaction, metadata cleanup, conversion, and hard file-size limits.',
  alternates: { canonical: '/about', languages: { 'x-default': '/about' } },
  openGraph: {
    title: 'About PixCloak',
    description: 'Privacy-first local image preparation with explicit website analytics and advertising choices.',
    url: '/about',
    type: 'website',
  },
};

export default function AboutPage() {
  const year = new Date().getFullYear();
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <BreadcrumbJsonLd items={[{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }]} />
      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <h1>About PixCloak</h1>
        <p>
          PixCloak is a privacy‑first image toolkit. Our goal is to make everyday
          image preparation trustworthy and accessible directly in your browser. Image files stay on the device;
          optional website analytics and advertising are disclosed and consent-gated separately.
        </p>
        <p className="text-muted" style={{ fontSize: 14, marginBottom: 0 }}>
          <strong>Trust &amp; verification:</strong> Image processing uses your device&apos;s CPU/GPU (Canvas, workers). You can use DevTools → Network on tool pages to confirm no image payload is sent to our origin. Marketing pages may load analytics or ads; core tool UIs are designed to stay usable.
        </p>

        <h2>Source &amp; license</h2>
        <p>
          The core product is open‑source under <strong>AGPL‑3.0‑only</strong>. Inspect the code and self‑host if your policy requires it. Public repo:{' '}
          <a href="https://github.com/LeeJinMing/PixCloak" rel="noopener noreferrer" target="_blank">github.com/LeeJinMing/PixCloak</a>.
          Advanced or enterprise modules may use a separate commercial license—see <code>LICENSE</code> and <code>COMMERCIAL.md</code> in the repository.
        </p>

        <h2>What you can do</h2>
        <ul>
          <li>Compress photos under a hard target size, reducing dimensions when quality alone is not enough</li>
          <li>Choose output format: JPEG / WebP / PNG; resize by longest side or exact WxH</li>
          <li>Redact images with solid blocks, strong pixelation, or permanent blur; verify metadata cleanup on export</li>
          <li>Batch processing and ZIP download for productivity</li>
          <li>Process images locally in the browser without sending image bytes to PixCloak</li>
        </ul>

        <h2>Further reading</h2>
        <ul>
          <li><Link href="/privacy">Privacy policy</Link> — what we collect on the site</li>
          <li><Link href="/safe-share">Safe Share</Link> — remove visible and hidden private information</li>
          <li><Link href="/upload-ready">Upload Ready</Link> — meet file-size, format, and dimension requirements</li>
        </ul>

        <h2>Our principles</h2>
        <ul>
          <li><strong>Privacy by default</strong>: we avoid collecting personal data and do not upload your images.</li>
          <li><strong>Performance</strong>: Canvas-based local processing (with optional Web Worker encoding), minimal JavaScript, and responsive UI.</li>
          <li><strong>Clarity</strong>: clean UX, keyboard shortcuts, and helpful guides for common tasks.</li>
        </ul>

        <h2>Roadmap (high level)</h2>
        <ul>
          <li>V1.1: local face, plate, text, and QR detection with manual review</li>
          <li>V1.2: browser extension, desktop/CLI workflows, and a reproducible benchmark</li>
          <li>V2.0: team policies, reports, self-hosting, and enterprise support</li>
        </ul>

        <h2>Contact</h2>
        <p>
          Questions or suggestions? Email <a href="mailto:support@pixcloak.com">support@pixcloak.com</a> or open a discussion on GitHub.
        </p>
        <p className="text-muted" style={{ fontSize: 12 }}>© {year} PixCloak</p>
      </div>
    </div>
  );
}


