import { Suspense } from "react";
import type { Metadata } from "next";
import CompressClient from "./Client";
import AdsenseUnit from "@/components/Adsense";

export const metadata: Metadata = {
  title: "Online JPEG & PNG Image Compressor – Target KB, Local (No Upload)",
  description:
    "Compress images to a target size (200KB/500KB/1MB), choose JPEG/WebP/PNG, resize to 1920, and batch download as ZIP. 100% local processing in your browser—no upload, privacy‑first.",
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "/compress",
      en: "/compress",
      es: "/compress-es",
      pt: "/compress-pt",
      id: "/compress-id",
    },
  },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <div style={{ position: 'relative' }}>
        <h1 style={{ position: 'absolute', left: -9999, top: -9999 }}>Online JPEG & PNG Image Compressor</h1>
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
      </div>
    </Suspense>
  );
}


