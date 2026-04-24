import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CompressClient from "./Client";
import AdsenseUnit from "@/components/Adsense";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Compress Images to 100KB/200KB/500KB—TinyPNG Alternative | PixCloak",
  description:
    "Hit exact file sizes (100KB, 200KB, 500KB, 1MB) from JPG/PNG/WebP. Batch ZIP, no upload—TinyPNG-style limits in your browser. Free, unlimited.",
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
    title: "Image compressor to target KB (no upload)",
    description: "Shrink photos for web, forms, and social. Exact KB targets, runs locally.",
    url: "/compress",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress to exact KB locally",
    description: "TinyPNG-style limits without uploading your files.",
  },
  // Disable Google Auto ads on this tool page; we render manual side rails & bottom units only
  other: {
    'google-adsense-page-ads': 'disable'
  }
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Compress", url: "/compress" },
        ]}
      />
      <h1 className="page-hero-title">
        Image Compressor to Exact KB—100KB, 200KB, 500KB (No Upload)
      </h1>
      <p className="text-muted page-hero-lede">
        Dial in a target size for forms, job portals, and social limits. Processing stays in your browser—useful when you want a{" "}
        <strong>TinyPNG-style</strong> smaller file without sending photos to a third party. WebP and JPEG export; metadata stripped on
        export. From iPhone HEIC or PDF pages, convert first with{" "}
        <Link href="/tools/heic-converter">HEIC to JPG/WebP</Link> or <Link href="/tools/pdf-to-image">PDF to image</Link>, then shrink
        here; fix orientation with <Link href="/tools/rotate-flip">rotate &amp; flip</Link> before compressing if needed.
      </p>
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
            <h2 style={{ marginBottom: 8 }}>Related tools</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
              <a href="/tools/resize-image" className="pill">Resize image</a>
              <a href="/tools/rotate-flip" className="pill">Rotate &amp; flip</a>
              <a href="/tools/png-jpg-converter" className="pill">PNG ↔ JPG</a>
              <a href="/tools/webp-converter" className="pill">WebP converter</a>
              <a href="/tools/heic-converter" className="pill">HEIC to JPG / WebP</a>
              <a href="/tools/pdf-to-image" className="pill">PDF to image</a>
              <a href="/tools" className="pill">All tools</a>
            </div>
            <h2 style={{ marginBottom: 8 }}>Related guides</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a href="/guides/compress-image-to-100kb" className="pill">Compress to 100 KB</a>
              <a href="/guides/compress-to-200kb" className="pill">Compress to 200 KB</a>
              <a href="/guides/convert-jpg-to-webp-online" className="pill">Convert JPG to WebP</a>
              <a href="/guides/resize-longest-side" className="pill">Resize longest side</a>
              <a href="/guides/tinypng-alternative-free-no-upload" className="pill">TinyPNG alternative (guide)</a>
              <a href="/guides/complete-image-compression-guide" className="pill">Full compression guide</a>
            </div>
          </div>
          <SoftwareAppJsonLd
            name="PixCloak Compress"
            url="/compress"
            description="Compress images locally to exact KB targets; export JPEG, WebP, or PNG without uploads. Strips metadata on export."
            image="/og.png"
          />
          <FaqJsonLd
            items={[
              { question: "Can I compress to 100 KB or 200 KB?", answer: "Yes. Use target KB presets or adjust quality until the preview meets the desired size." },
              { question: "How do I compress pictures without losing quality?", answer: "Pick a slightly higher target KB or lower compression until the preview looks good. Heavy size cuts always trade bits for bytes; this tool lets you preview before exporting." },
              { question: "Is this a TinyPNG alternative?", answer: "Similar goal—smaller images—but files are processed only in your browser. There is no per-day upload quota because nothing is uploaded." },
              { question: "Is the compression done locally?", answer: "Yes. All processing happens in‑browser; nothing is uploaded to any server." },
              { question: "Do you support WebP and PNG?", answer: "Yes. You can export JPEG, WebP, and PNG based on your needs." },
            ]}
          />
        </div>
      </Suspense>
    </>
  );
}


