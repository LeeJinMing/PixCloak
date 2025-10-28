import { Suspense } from "react";
import type { Metadata } from "next";
import CompressClient from "./Client";
import AdsenseUnit from "@/components/Adsense";
import { SoftwareAppJsonLd, FaqJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Free Image Compressor: Reduce JPG/PNG to 100KB | PixCloak",
  description:
    "Compress images to 100KB–500KB without quality loss. Works offline—no uploads. Convert JPEG/PNG/WebP fast for web, email, and social media in seconds.",
  alternates: {
    canonical: "/compress",
    languages: {
      "x-default": "/compress",
      en: "/compress",
      "en-US": "/compress",
      "en-GB": "/compress",
      es: "/compress-es",
      pt: "/compress-pt",
      id: "/compress-id",
      zh: "/compress",
    },
  },
  openGraph: {
    title: "Free Image Compressor: Reduce JPG/PNG to 100KB | PixCloak",
    description: "Compress images to exact sizes (100KB, 200KB, 500KB, 1MB) without losing quality. Works offline, no uploads needed.",
    url: "/compress",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Compressor: Reduce JPG/PNG to 100KB | PixCloak",
    description: "Compress images to exact sizes (100KB, 200KB, 500KB, 1MB) without losing quality. Works offline.",
  },
  // Disable Google Auto ads on this tool page; we render manual side rails & bottom units only
  other: {
    'google-adsense-page-ads': 'disable'
  }
};

export default function Page() {
  return (
    <>
      <h1 style={{ margin: '8px 0' }}>Free Image Compressor – Reduce JPG/PNG to 100KB (No Upload)</h1>
      <Suspense fallback={null}>
        <div style={{ position: 'relative' }}>
          {/* Side rails - keep away from main controls */}
          <div className="ad-rail" style={{ left: 0 }}>
            <AdsenseUnit format="auto" />
          </div>
          <div className="ad-rail" style={{ right: 0 }}>
            <AdsenseUnit format="auto" />
          </div>
          <CompressClient />
          {/* Bottom ad below main content */}
          <div className="ad-bottom">
            <AdsenseUnit format="auto" />
          </div>
          <div className="card" style={{ marginTop: 16 }}>
            <h2 style={{ marginBottom: 8 }}>Related guides</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a href="/guides/compress-image-to-100kb" className="pill">Compress to 100 KB</a>
              <a href="/guides/compress-to-200kb" className="pill">Compress to 200 KB</a>
              <a href="/guides/convert-jpg-to-webp-online" className="pill">Convert JPG to WebP</a>
              <a href="/guides/resize-longest-side" className="pill">Resize longest side</a>
            </div>
          </div>
          <SoftwareAppJsonLd
            name="PixCloak Compress"
            url="/compress"
            description="Compress images locally to a target KB, convert to WebP/JPEG/PNG, and export without uploads."
            image="/og.png"
          />
          <FaqJsonLd
            items={[
              { question: "Can I compress to 100 KB or 200 KB?", answer: "Yes. Use target KB presets or adjust quality until the preview meets the desired size." },
              { question: "Is the compression done locally?", answer: "Yes. All processing happens in‑browser; nothing is uploaded to any server." },
              { question: "Do you support WebP and PNG?", answer: "Yes. You can export JPEG, WebP, and PNG based on your needs." },
            ]}
          />
        </div>
      </Suspense>
    </>
  );
}


