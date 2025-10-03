import type { Metadata } from "next";
import { FaqJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Convert JPG to WebP Online (Free, Smaller File Size) | PixCloak",
  description: "Convert JPEG to WebP and reduce file size by 30-50%. Free online tool works in browser—no uploads, no limits. Batch convert multiple images. Perfect for faster websites.",
  alternates: {
    canonical: "/guides/convert-jpg-to-webp-online",
    languages: {
      'x-default': "/guides/convert-jpg-to-webp-online",
      en: "/guides/convert-jpg-to-webp-online",
    }
  },
  openGraph: {
    title: "Convert JPG to WebP Online (Free, Smaller File Size)",
    description: "Convert JPEG to WebP and reduce file size by 30-50%. Free online tool works in browser—no uploads, no limits.",
    url: "/guides/convert-jpg-to-webp-online",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert JPG to WebP Online",
    description: "Reduce file size by 30-50%. Free tool, works in browser. No uploads.",
  },
};

export default function GuideConvertJpgToWebp() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Convert JPG to WebP Online</h1>
        <ol>
          <li>Open <a href="/compress">/compress</a>.</li>
          <li>Select output = WebP; preview size/quality until it fits your needs.</li>
          <li>Export—processing is 100% local with metadata stripped.</li>
        </ol>
        <p className="text-muted">WebP usually offers smaller size at similar quality vs JPEG.</p>
      </div>
      <div className="card">
        <h2>Related</h2>
        <ul>
          <li><a href="/guides/compress-image-to-100kb">Compress to 100 KB</a></li>
          <li><a href="/guides/jpeg-vs-webp-size-quality">JPEG vs WebP: Size & Quality</a></li>
        </ul>
      </div>
      <FaqJsonLd
        items={[
          { question: "Why WebP?", answer: "WebP typically achieves smaller file sizes at similar visual quality compared to JPEG." },
          { question: "Is it local?", answer: "Yes. Conversion runs in your browser with no uploads." }
        ]}
      />
    </div>
  );
}


