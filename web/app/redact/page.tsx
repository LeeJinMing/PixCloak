import type { Metadata } from "next";
import { Suspense } from "react";
import RedactClient from "./Client";
import AdsenseUnit from "@/components/Adsense";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Redact Image Online—Blur Faces, Plates, Text",
  description: "Redact images locally: blur faces, hide license plates, black out text, pixelate sensitive areas, and export without EXIF/GPS. No upload.",
  alternates: {
    canonical: "/redact",
    languages: {
      "x-default": "/redact",
      en: "/redact",
      "en-US": "/redact",
      "en-GB": "/redact",
      es: "/redact-es",
      pt: "/redact-pt",
      id: "/redact-id",
      zh: "/redact",
    },
  },
  openGraph: {
    title: "Redact image online: faces, plates, text",
    description: "Blur, pixelate, or black out sensitive image details locally. No upload. EXIF/GPS removed on export.",
    url: "/redact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Redact image online—blur face & license plate",
    description: "Local redaction tool: blur, pixelate, black bars. No upload. Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Redact", url: "/redact" },
        ]}
      />
      <SoftwareAppJsonLd
        name="PixCloak Redact"
        url="/redact"
        description="Redact images locally: blur or pixelate faces and license plates, black out text, strip EXIF/GPS. No server upload."
        image="/og.png"
      />
      <FaqJsonLd
        items={[
          { question: "Does this upload my images?", answer: "No. Everything runs locally in your browser; files never leave your device." },
          { question: "Can I blur faces and license plates online for free?", answer: "Yes. Draw blur or pixelate regions over faces, plates (number plates), or other sensitive areas, then export. No account and no upload." },
          { question: "Redact vs blur license plate—which should I use?", answer: "Blur or heavy pixelation hides detail for casual viewers; solid black boxes are stronger when you need obvious irreversible masking. This tool supports both styles." },
          { question: "Is this an image redaction tool for compliance?", answer: "It helps you mask sensitive regions locally before sharing. You remain responsible for your process and legal requirements; the tool keeps files on-device for privacy." },
          { question: "How do I remove EXIF/GPS?", answer: "Export from the tool; exports are stripped of metadata including EXIF and GPS coordinates." },
        ]}
      />
      <Suspense fallback={null}>
      <div style={{ position: 'relative' }}>
        <div className="ad-rail" style={{ left: 0 }}>
          <AdsenseUnit format="auto" />
        </div>
        <div className="ad-rail" style={{ right: 0 }}>
          <AdsenseUnit format="auto" />
        </div>
        <h1 className="page-hero-title">
          Redact Image Online—Blur Faces, Plates & Text (No Upload)
        </h1>
        <p className="text-muted page-hero-lede">
          Hide faces, license plates, IDs, screenshots, and private text before sharing. Use pixelation or solid blocks for stronger privacy
          than soft blur. Files stay on your device, and EXIF/GPS is removed on export.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          <a href="/guides/blur-face-in-photo" className="pill">Blur faces</a>
          <a href="/guides/license-plate-redaction" className="pill">Hide license plates</a>
          <a href="/guides/black-out-text-in-image" className="pill">Black out text</a>
          <a href="/tools/exif-checker" className="pill">Check EXIF/GPS</a>
        </div>
        <div className="card" style={{ marginBottom: 16 }}>
          <h2 style={{ marginBottom: 8 }}>Best for</h2>
          <p className="text-muted" style={{ marginTop: 0 }}>
            Screenshots, IDs, invoices, documents, faces, plates, and client images that should not expose private details or hidden metadata.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <a href="/tools/exif-checker" className="pill">Check EXIF/GPS first</a>
            <a href="/compress" className="pill">Compress after redaction</a>
            <a href="/guides/redaction-checklist" className="pill">Use redaction checklist</a>
          </div>
        </div>
        <RedactClient />
        <div className="ad-bottom">
          <AdsenseUnit format="auto" />
        </div>
        <div className="card" style={{ marginTop: 16 }}>
          <h2 style={{ marginBottom: 8 }}>Related tools</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            <a href="/compress" className="pill">Compress</a>
            <a href="/tools/exif-checker" className="pill">EXIF checker</a>
            <a href="/tools/rotate-flip" className="pill">Rotate &amp; flip</a>
            <a href="/tools" className="pill">All tools</a>
          </div>
          <h2 style={{ marginBottom: 8 }}>Related guides</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="/guides/blur-face-in-photo" className="pill">Blur faces in photos</a>
            <a href="/guides/blur-number-plate-online" className="pill">Blur number plates (UK)</a>
            <a href="/guides/license-plate-redaction" className="pill">License plate redaction (US)</a>
            <a href="/guides/black-out-text-in-image" className="pill">Black out text</a>
            <a href="/guides/remove-gps-data-from-photos" className="pill">Remove GPS/EXIF</a>
          </div>
        </div>
      </div>
      </Suspense>
    </>
  );
}


