import type { Metadata } from "next";

export default function Home() {
  return (
    <div>
      <h1 style={{ margin: '8px 0' }}>Free Image Tools — Compress & Redact (No Upload)</h1>
      <p className="text-muted" style={{ marginBottom: 12 }}>
        Compress and redact images entirely in your browser. No upload, privacy‑first, fast and simple.
      </p>
      <p className="text-muted" style={{ fontSize: 14, marginTop: -4, marginBottom: 12 }}>
        Last reviewed: April 2026.
      </p>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <a href="/compress" className="card" style={{ padding: 16, display: 'block' }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Image Compressor</div>
          <div className="text-muted">Reduce JPG/PNG/WebP to target KB. Works offline.</div>
        </a>
        <a href="/redact" className="card" style={{ padding: 16, display: 'block' }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Image Redactor</div>
          <div className="text-muted">Blur/hide sensitive info. Remove EXIF/GPS.</div>
        </a>
        <a href="/tools" className="card" style={{ padding: 16, display: 'block' }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>More Image Tools</div>
          <div className="text-muted">Crop, convert, favicon pack, sprites & more.</div>
        </a>
        <a href="/guides" className="card" style={{ padding: 16, display: 'block' }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Guides & FAQs</div>
          <div className="text-muted">Step‑by‑step guides for common image tasks.</div>
        </a>
        <a href="/research" className="card" style={{ padding: 16, display: 'block' }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Research & docs</div>
          <div className="text-muted">How compression and privacy architecture work (EEAT).</div>
        </a>
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <h2 style={{ marginBottom: 8 }}>Popular quick links</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a className="pill" href="/guides/compress-image-to-100kb">Compress to 100KB</a>
          <a className="pill" href="/guides/compress-to-200kb">Compress to 200KB</a>
          <a className="pill" href="/guides/zip-batch-download">Download ZIP (batch)</a>
          <a className="pill" href="/guides/export-without-metadata">Remove EXIF/GPS</a>
          <a className="pill" href="/guides/blur-face-in-photo">Blur faces</a>
          <a className="pill" href="/guides/license-plate-redaction">Hide plates</a>
          <a className="pill" href="/guides/tinypng-alternative-free-no-upload">TinyPNG alternative</a>
          <a className="pill" href="/guides/complete-image-compression-guide">Compression guide</a>
          <a className="pill" href="/tools/resize-image">Resize image</a>
          <a className="pill" href="/tools/png-jpg-converter">PNG ↔ JPG</a>
          <a className="pill" href="/tools/webp-converter">WebP converter</a>
          <a className="pill" href="/about">About / trust</a>
          <a className="pill" href="/research">Algorithm & privacy docs</a>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2 style={{ marginBottom: 8 }}>FAQ</h2>
        <div style={{ display: 'grid', gap: 8 }}>
          <div>
            <strong>Will my images be uploaded?</strong>
            <div className="text-muted">No. All processing runs locally in your browser; files never leave your device.</div>
          </div>
          <div>
            <strong>Which formats do you support?</strong>
            <div className="text-muted">JPEG, PNG, and WebP for compression and export. Tools vary; see each page for details.</div>
          </div>
          <div>
            <strong>Can I batch download results?</strong>
            <div className="text-muted">Yes. Use the compressor’s ZIP option or follow the batch download guide.</div>
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Image Compressor', url: '/compress' },
              { '@type': 'ListItem', position: 2, name: 'Image Redactor', url: '/redact' },
              { '@type': 'ListItem', position: 3, name: 'Image Tools', url: '/tools' },
              { '@type': 'ListItem', position: 4, name: 'Guides', url: '/guides/complete-image-compression-guide' },
              { '@type': 'ListItem', position: 5, name: 'Research & technical docs', url: '/research' }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'Will my images be uploaded?', acceptedAnswer: { '@type': 'Answer', text: 'No. All processing runs locally in your browser; files never leave your device.' } },
              { '@type': 'Question', name: 'Which formats do you support?', acceptedAnswer: { '@type': 'Answer', text: 'JPEG, PNG, and WebP for compression and export. Tools vary; see each page for details.' } },
              { '@type': 'Question', name: 'Can I batch download results?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use the compressor’s ZIP option or follow the batch download guide.' } }
            ]
          })
        }}
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: "PixCloak—Compress & Redact Images Locally (No Upload)",
  description:
    "Free browser tools: compress JPG/PNG/WebP to exact KB (TinyPNG-style, local-only), redact faces & license plates, strip EXIF. 20+ utilities—nothing uploaded.",
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "/",
      en: "/",
      "en-US": "/",
      "en-GB": "/",
      zh: "/",
    },
  },
  openGraph: {
    title: "PixCloak—local image compress & redact",
    description: "Exact-KB compression and privacy redaction in your browser.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixCloak—compress & redact locally",
    description: "No-upload image tools for KB targets and privacy.",
  },
};
