import type { Metadata } from "next";
import { Suspense } from "react";
import RedactClient from "./Client";
import AdsenseUnit from "@/components/Adsense";
import { SoftwareAppJsonLd, FaqJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Free Photo Redaction: Blur Faces, Hide Plates | PixCloak",
  description:
    "Blur faces, hide license plates, and black out text. Remove EXIF/GPS automatically. 100% local—no uploads. Simple, fast, and privacy‑friendly.",
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
    title: "Free Photo Redaction Tool: Blur Faces & Remove EXIF",
    description: "Blur faces, hide license plates, remove EXIF/GPS. 100% local processing, no uploads.",
    url: "/redact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Photo Redaction Tool: Blur Faces & Remove EXIF",
    description: "Redact sensitive info in photos. 100% local, no uploads. GDPR-friendly.",
  },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <div style={{ position: 'relative' }}>
        <div className="ad-rail" style={{ left: 0 }}>
          <AdsenseUnit format="auto" />
        </div>
        <div className="ad-rail" style={{ right: 0 }}>
          <AdsenseUnit format="auto" />
        </div>
        <h1 style={{ margin: '8px 0' }}>Free Photo Redaction – Blur Faces, Hide Plates, Remove EXIF</h1>
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
          description="Redact images locally: blur/pixelate/censor sensitive regions and remove EXIF/GPS without uploading."
          image="/og.png"
        />
        <FaqJsonLd
          items={[
            { question: "Does this upload my images?", answer: "No. Everything runs locally in your browser; files never leave your device." },
            { question: "Can I blur faces and license plates?", answer: "Yes. Use blur or pixelate for faces, license plates (number plates), and any sensitive text." },
            { question: "How do I remove EXIF/GPS?", answer: "Export from the tool; exports are stripped of metadata including EXIF and GPS coordinates." },
          ]}
        />
      </div>
    </Suspense>
  );
}


