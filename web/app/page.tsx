import type { Metadata } from "next";
import Link from "next/link";
import {
  IconBook,
  IconCompress,
  IconGrid,
  IconHeic,
  IconPdf,
  IconRedact,
  IconResearch,
  IconRotate,
} from "@/components/home-icons";

export default function Home() {
  return (
    <div>
      <h1 className="home-hero-title">Free Image Tools — Compress &amp; Redact (No Upload)</h1>
      <p className="text-muted" style={{ marginBottom: 12 }}>
        Compress and redact images entirely in your browser. No upload, privacy‑first, fast and simple.
      </p>
      <p className="text-muted" style={{ fontSize: 14, marginTop: -4, marginBottom: 20 }}>
        Last reviewed: April 2026.
      </p>

      <div style={{ display: "grid", gap: 24 }}>
        <section aria-labelledby="home-start">
          <h2 id="home-start" className="home-section-label">
            Start here
          </h2>
          <div className="home-tool-grid">
            <Link href="/compress" className="home-feature-card">
              <div className="home-feature-card__row">
                <span className="home-feature-card__icon" aria-hidden>
                  <IconCompress />
                </span>
                <div>
                  <div className="home-feature-card__title">Image Compressor</div>
                  <div className="text-muted" style={{ fontSize: 14, lineHeight: 1.45 }}>
                    Reduce JPG/PNG/WebP to target KB. Batch ZIP. Works offline.
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/redact" className="home-feature-card">
              <div className="home-feature-card__row">
                <span className="home-feature-card__icon" aria-hidden>
                  <IconRedact />
                </span>
                <div>
                  <div className="home-feature-card__title">Image Redactor</div>
                  <div className="text-muted" style={{ fontSize: 14, lineHeight: 1.45 }}>
                    Blur faces, hide plates, black out text. Strip EXIF/GPS.
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/tools" className="home-feature-card">
              <div className="home-feature-card__row">
                <span className="home-feature-card__icon" aria-hidden>
                  <IconGrid />
                </span>
                <div>
                  <div className="home-feature-card__title">All image tools</div>
                  <div className="text-muted" style={{ fontSize: 14, lineHeight: 1.45 }}>
                    Full directory: crop, WebP, favicon, sprites, and more.
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        <section aria-labelledby="home-convert">
          <h2 id="home-convert" className="home-section-label">
            Convert &amp; fix
          </h2>
          <p className="text-muted" style={{ fontSize: 14, margin: "-4px 0 12px" }}>
            New: local utilities for formats that usually need an extra step before compress or upload.
          </p>
          <div className="home-tool-grid">
            <Link href="/tools/rotate-flip" className="home-feature-card">
              <div className="home-feature-card__row">
                <span className="home-feature-card__icon" aria-hidden>
                  <IconRotate />
                </span>
                <div>
                  <div className="home-feature-card__title">Rotate &amp; flip</div>
                  <div className="text-muted" style={{ fontSize: 14, lineHeight: 1.45 }}>
                    90°/180°, mirror. Batch ZIP. Fixes sideways EXIF ignored by some sites.
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/tools/heic-converter" className="home-feature-card">
              <div className="home-feature-card__row">
                <span className="home-feature-card__icon" aria-hidden>
                  <IconHeic />
                </span>
                <div>
                  <div className="home-feature-card__title">HEIC to JPG / WebP</div>
                  <div className="text-muted" style={{ fontSize: 14, lineHeight: 1.45 }}>
                    iPhone photos to JPEG or WebP. Quality slider, batch ZIP.
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/tools/pdf-to-image" className="home-feature-card">
              <div className="home-feature-card__row">
                <span className="home-feature-card__icon" aria-hidden>
                  <IconPdf />
                </span>
                <div>
                  <div className="home-feature-card__title">PDF to image</div>
                  <div className="text-muted" style={{ fontSize: 14, lineHeight: 1.45 }}>
                    Each page as PNG (capped pages). Then compress or resize as needed.
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        <section aria-labelledby="home-learn">
          <h2 id="home-learn" className="home-section-label">
            Learn &amp; trust
          </h2>
          <div className="home-tool-grid--pair">
            <Link href="/guides" className="home-feature-card">
              <div className="home-feature-card__row">
                <span className="home-feature-card__icon" aria-hidden>
                  <IconBook />
                </span>
                <div>
                  <div className="home-feature-card__title">Guides &amp; FAQs</div>
                  <div className="text-muted" style={{ fontSize: 14, lineHeight: 1.45 }}>
                    Step‑by‑step: 100KB/200KB, ZIP batch, TinyPNG-style workflows.
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/research" className="home-feature-card">
              <div className="home-feature-card__row">
                <span className="home-feature-card__icon" aria-hidden>
                  <IconResearch />
                </span>
                <div>
                  <div className="home-feature-card__title">Research &amp; docs</div>
                  <div className="text-muted" style={{ fontSize: 14, lineHeight: 1.45 }}>
                    How compression and privacy architecture work (EEAT).
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <h2 style={{ marginBottom: 12, fontSize: 20, color: "#0f172a" }}>Popular quick links</h2>
        <div className="home-quick-group">
          <h3>Compression &amp; size</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link className="pill" href="/guides/compress-image-to-100kb">
              Compress to 100KB
            </Link>
            <Link className="pill" href="/guides/compress-to-200kb">
              Compress to 200KB
            </Link>
            <Link className="pill" href="/guides/zip-batch-download">
              Download ZIP (batch)
            </Link>
            <Link className="pill" href="/guides/tinypng-alternative-free-no-upload">
              TinyPNG alternative
            </Link>
            <Link className="pill" href="/guides/complete-image-compression-guide">
              Compression guide
            </Link>
          </div>
        </div>
        <div className="home-quick-group">
          <h3>Format &amp; dimensions</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link className="pill" href="/tools/resize-image">
              Resize image
            </Link>
            <Link className="pill" href="/tools/rotate-flip">
              Rotate &amp; flip
            </Link>
            <Link className="pill" href="/tools/png-jpg-converter">
              PNG ↔ JPG
            </Link>
            <Link className="pill" href="/tools/webp-converter">
              WebP converter
            </Link>
            <Link className="pill" href="/tools/heic-converter">
              HEIC to JPG
            </Link>
            <Link className="pill" href="/tools/pdf-to-image">
              PDF to image
            </Link>
          </div>
        </div>
        <div className="home-quick-group">
          <h3>Privacy &amp; metadata</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link className="pill" href="/guides/export-without-metadata">
              Remove EXIF/GPS
            </Link>
            <Link className="pill" href="/guides/blur-face-in-photo">
              Blur faces
            </Link>
            <Link className="pill" href="/guides/license-plate-redaction">
              Hide plates
            </Link>
          </div>
        </div>
        <div className="home-quick-group">
          <h3>About</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link className="pill" href="/about">
              About / trust
            </Link>
            <Link className="pill" href="/research">
              Algorithm &amp; privacy docs
            </Link>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2 style={{ marginBottom: 8 }}>FAQ</h2>
        <div style={{ display: "grid", gap: 8 }}>
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
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Image Compressor", url: "/compress" },
              { "@type": "ListItem", position: 2, name: "Image Redactor", url: "/redact" },
              { "@type": "ListItem", position: 3, name: "All image tools", url: "/tools" },
              { "@type": "ListItem", position: 4, name: "Rotate and flip images", url: "/tools/rotate-flip" },
              { "@type": "ListItem", position: 5, name: "HEIC to JPG or WebP", url: "/tools/heic-converter" },
              { "@type": "ListItem", position: 6, name: "PDF to image", url: "/tools/pdf-to-image" },
              { "@type": "ListItem", position: 7, name: "Guides", url: "/guides" },
              { "@type": "ListItem", position: 8, name: "Research and technical docs", url: "/research" },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Will my images be uploaded?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. All processing runs locally in your browser; files never leave your device.",
                },
              },
              {
                "@type": "Question",
                name: "Which formats do you support?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "JPEG, PNG, and WebP for compression and export. Tools vary; see each page for details.",
                },
              },
              {
                "@type": "Question",
                name: "Can I batch download results?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Use the compressor’s ZIP option or follow the batch download guide.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: "PixCloak—Compress & Redact Images Locally (No",
  description: "Free browser tools: compress JPG/PNG/WebP to exact KB (TinyPNG-style, local-only), redact faces & license plates, strip EXIF. HEIC, PDF, rotate & flip,...",
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
    description: "Exact-KB compression and privacy redaction in your browser. Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixCloak—compress & redact locally",
    description: "No-upload image tools for KB targets and privacy. Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
  },
};
