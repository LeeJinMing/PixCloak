import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About PixCloak: Privacy‑First Image Toolkit',
  description: 'PixCloak: privacy‑first image toolkit. Compress to exact KB, redact faces/plates, remove EXIF/GPS, batch ZIP—everything runs locally in your browser, no...',
  alternates: { canonical: '/about', languages: { 'x-default': '/about' } },
};

export default function AboutPage() {
  const year = new Date().getFullYear();
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <h1>About PixCloak</h1>
        <p>
          PixCloak is a privacy‑first image toolkit. Our goal is to make everyday
          image tasks fast, trustworthy, and accessible directly in your browser — no uploads,
          no tracking, and no surprises.
        </p>

        <h2>What you can do</h2>
        <ul>
          <li>Compress photos to a target size (KB) with binary‑search quality tuning</li>
          <li>Choose output format: JPEG / WebP / PNG; resize by longest side or exact WxH</li>
          <li>Redact images with solid blocks or strong pixelation; remove EXIF/GPS on export</li>
          <li>Batch processing and ZIP download for productivity</li>
          <li>Works offline after first load (PWA); all processing happens locally</li>
        </ul>

        <h2>Open‑core model</h2>
        <p>
          The core is open‑source under <strong>AGPL‑3.0‑only</strong>. Advanced/enterprise modules
          may be offered under a commercial license. See <code>LICENSE</code> and <code>COMMERCIAL.md</code>
          in the repository for details.
        </p>

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
          Questions or suggestions? Email <a href="mailto:support@pixcloak.com">support@pixcloak.com</a>.
        </p>
        <p className="text-muted" style={{ fontSize: 12 }}>© {year} PixCloak</p>
      </div>
    </div>
  );
}


