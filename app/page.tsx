import type { Metadata } from "next";

export default function Home() {
  return (
    <div>
      <h1 style={{ margin: '8px 0' }}>Free Image Tools — Compress & Redact (No Upload)</h1>
      <p className="text-muted" style={{ marginBottom: 12 }}>
        Compress and redact images entirely in your browser. No upload, privacy‑first, fast and simple.
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
              { '@type': 'ListItem', position: 4, name: 'Guides', url: '/guides' }
            ]
          })
        }}
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Free Image Tools: Compress & Redact (No Upload) | PixCloak",
  description:
    "Compress and redact images locally in your browser. No upload. Fast JPEG/PNG/WebP compression to exact KB, privacy‑first tools, and step‑by‑step guides.",
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
    title: "Free Image Tools: Compress & Redact (No Upload) | PixCloak",
    description: "Compress and redact images locally. No upload. Explore fast, private tools and guides.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Tools: Compress & Redact (No Upload) | PixCloak",
    description: "Compress and redact images locally. No upload.",
  },
};
