import type { Metadata } from "next";
import { FaqJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Compress Image to 100 KB (Online, Local) | PixCloak",
  description: "Reduce image file size to 100 KB with local in‑browser compression.",
  alternates: { canonical: "/guides/compress-image-to-100kb" },
};

export default function GuideCompress100KB() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Compress Image to 100 KB</h1>
        <ol>
          <li>Open <a href="/compress">/compress</a>.</li>
          <li>Select target KB = 100; adjust quality/resize to meet the goal.</li>
          <li>Export JPEG/WebP; nothing is uploaded to any server.</li>
        </ol>
        <p className="text-muted">For photos, try WebP and resize the longest side (e.g., 1920px) for better quality at low KB.</p>
      </div>
      <div className="card">
        <h2>Related</h2>
        <ul>
          <li><a href="/guides/compress-to-200kb">Compress to 200 KB</a></li>
          <li><a href="/guides/convert-jpeg-to-webp">Convert JPEG to WebP</a></li>
        </ul>
      </div>
      <FaqJsonLd
        items={[
          { question: "How to hit exactly 100 KB?", answer: "Use target KB preset, then adjust quality and optionally resize until the preview meets the limit." },
          { question: "Local processing?", answer: "Yes. Compression happens in your browser only." }
        ]}
      />
    </div>
  );
}


