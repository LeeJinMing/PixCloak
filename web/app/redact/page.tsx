import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import RedactClient from "./Client";
import AdsenseUnit from "@/components/Adsense";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from "@/components/SeoJsonLd";
import { ServerFaqSection, faqToJsonLd } from "@/components/ServerFaqSection";
import { ToolNextSteps } from "@/components/ToolNextSteps";
import { getRedactStrings } from "@/lib/i18n/redact";

const redactFaq = getRedactStrings("en");

export const metadata: Metadata = {
  title: "Redact Image Online Free—Blur Face, License Plate & Text",
  description:
    "Free image redaction online: blur faces, redact license plates, black out text. Runs in your browser—no upload. EXIF/GPS stripped on export.",
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
      zh: "/zh/redact",
    },
  },
  openGraph: {
    title: "Redact image online free—face, plate, text",
    description:
      "Image redaction in your browser: blur, pixelate, or black out faces, plates, and text. No upload; metadata removed on export.",
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
        description="Redact photos online free in your browser: blur faces, hide license plates, black out text. Image redaction with no server upload; EXIF/GPS stripped on export."
        image="/og.png"
      />
      <FaqJsonLd items={faqToJsonLd(redactFaq.faq)} />
      <Suspense fallback={null}>
      <div style={{ position: 'relative' }}>
        <div className="ad-rail" style={{ left: 0 }}>
          <AdsenseUnit format="auto" />
        </div>
        <div className="ad-rail" style={{ right: 0 }}>
          <AdsenseUnit format="auto" />
        </div>
        <h1 className="page-hero-title">
          Redact Photo Online Free—Blur Faces, License Plates & Text
        </h1>
        <div className="card" style={{ marginBottom: 16 }}>
          <p style={{ marginTop: 0, marginBottom: 8 }}>
            <strong>Short answer:</strong> Upload a photo, draw blur, pixelate, or solid black boxes over faces, license plates (number plates),
            IDs, or text, then download. This free <strong>image redaction tool</strong> runs in your browser—nothing is uploaded—and exports
            strip EXIF/GPS.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/guides/license-plate-redaction" className="pill">Redact vs blur plate</Link>
            <Link href="/guides/blur-face-in-photo" className="pill">Blur faces guide</Link>
            <Link href="/guides/long-tail/id-card-privacy-redaction" className="pill">ID card redaction</Link>
          </div>
        </div>
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
        <ServerFaqSection title={redactFaq.faqTitle} items={redactFaq.faq} />
        <ToolNextSteps tool="redact" locale="en" />
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


