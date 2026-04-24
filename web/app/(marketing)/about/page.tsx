import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'About PixCloak: Privacy‑First Image Toolkit',
  description:
    'Who we are: a browser-based image toolkit—compress to exact KB, redact, strip EXIF. AGPL core, no image uploads, links to research and privacy policy.',
  alternates: { canonical: '/about', languages: { 'x-default': '/about' } },
  openGraph: {
    title: 'About PixCloak',
    description: 'Privacy-first, local image tools and guides.',
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
          image tasks fast, trustworthy, and accessible directly in your browser — no uploads,
          no tracking, and no surprises.
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
          <li>Compress photos to a target size (KB) with binary‑search quality tuning</li>
          <li>Choose output format: JPEG / WebP / PNG; resize by longest side or exact WxH</li>
          <li>Redact images with solid blocks or strong pixelation; remove EXIF/GPS on export</li>
          <li>Batch processing and ZIP download for productivity</li>
          <li>Works offline after first load (PWA); all processing happens locally</li>
        </ul>

        <h2>Further reading</h2>
        <ul>
          <li><Link href="/privacy">Privacy policy</Link> — what we collect on the site</li>
          <li><Link href="/research">Research</Link> — methodology and deeper write‑ups</li>
          <li><Link href="/guides/gsc-operations">Search &amp; indexing notes</Link> — for teams publishing guides</li>
        </ul>

        <h2>Our principles</h2>
        <ul>
          <li><strong>Privacy by default</strong>: we avoid collecting personal data and do not upload your images.</li>
          <li><strong>Performance</strong>: Web Worker/Canvas processing, minimal JavaScript, and responsive UI.</li>
          <li><strong>Clarity</strong>: clean UX, keyboard shortcuts, and helpful guides for common tasks.</li>
        </ul>

        <h2>Roadmap (high level)</h2>
        <ul>
          <li>Template presets and team‑oriented workflows</li>
          <li>CLI/API and automation for batch pipelines</li>
          <li>More programmatic SEO guides for practical use cases</li>
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


