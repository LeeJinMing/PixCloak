import type { Metadata } from "next";
import { Suspense } from "react";
import RedactClient from "./Client";
import AdsenseUnit from "@/components/Adsense";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Redact Image Online Free: Blur Face & License Plate | PixCloak",
  description:
    "Redact photos in your browser: blur faces, blur license plates, black out text, pixelate sensitive areas. Export without EXIF/GPS. Nothing uploaded—private by default.",
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
    title: "Image redaction online (free, no upload)",
    description: "Blur faces and plates, censor text, strip EXIF. Runs locally in your browser.",
    url: "/redact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Redact image online—blur face & license plate",
    description: "Local redaction tool: blur, pixelate, black bars. No upload.",
  },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Redact", url: "/redact" },
        ]}
      />
      <div style={{ position: 'relative' }}>
        <div className="ad-rail" style={{ left: 0 }}>
          <AdsenseUnit format="auto" />
        </div>
        <div className="ad-rail" style={{ right: 0 }}>
          <AdsenseUnit format="auto" />
        </div>
        <h1 style={{ margin: '8px 0' }}>
          Redact Image Online—Blur Faces, License Plates & Text (No Upload)
        </h1>
        <p className="text-muted" style={{ maxWidth: 720, marginBottom: 12 }}>
          Use blur or pixelation for faces and number plates, solid blocks for IDs and text. Redaction is stronger than a simple blur for
          compliance-style masking; everything stays on your device. EXIF/GPS is removed on export—good before sharing or publishing.
        </p>
        <RedactClient />
        <div className="ad-bottom">
          <AdsenseUnit format="auto" />
        </div>
        <div className="card" style={{ marginTop: 16 }}>
          <h2 style={{ marginBottom: 8 }}>Related guides</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="/guides/blur-face-in-photo" className="pill">Blur faces in photos</a>
            <a href="/guides/blur-number-plate-online" className="pill">Blur number plates (UK)</a>
            <a href="/guides/license-plate-redaction" className="pill">License plate redaction (US)</a>
            <a href="/guides/black-out-text-in-image" className="pill">Black out text</a>
            <a href="/guides/remove-gps-data-from-photos" className="pill">Remove GPS/EXIF</a>
          </div>
        </div>
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
      </div>
    </Suspense>
  );
}


