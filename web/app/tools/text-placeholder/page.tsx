import type { Metadata } from "next";
import Link from "next/link";
import Client from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Text Placeholder Image Generator—YouTube, IG, OG Sizes | PixCloak",
  description:
    "Create simple labeled placeholder PNGs/JPGs for mockups: YouTube 1280×720, Instagram 1080×1080, Twitter 1200×675, and custom. Local export—no upload.",
  alternates: { canonical: "/tools/text-placeholder", languages: { "x-default": "/tools/text-placeholder" } },
  openGraph: {
    title: "Text placeholder images",
    description: "Preset canvas sizes for social mockups.",
    url: "/tools/text-placeholder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Placeholder generator",
    description: "Branded text cards for layouts.",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          { name: "Text placeholder", url: "/tools/text-placeholder" },
        ]}
      />
      <SoftwareAppJsonLd
        name="Text Placeholder Generator"
        url="/tools/text-placeholder"
        description="Generate text-based placeholder images with social media and thumbnail presets. Customize colors, text, and export locally."
      />
      <FaqJsonLd items={[
        { question: "What are text placeholders used for?", answer: "Text placeholders are temporary images with text content, commonly used for social media posts, thumbnails, banners, and UI mockups." },
        { question: "What size presets are available?", answer: "Includes Instagram (1080x1080), Facebook (1200x630), Twitter (1200x675), YouTube (1280x720), and custom dimensions." },
        { question: "Can I customize the appearance?", answer: "Yes. Change background colors, text colors, font size, and add custom text content to match your brand or design needs." },
        { question: "What formats can I export?", answer: "Export as PNG or JPG. PNG preserves transparency, while JPG offers smaller file sizes for solid backgrounds." }
      ]} />
      <Client />
      <div className="container" style={{ display: "grid", gap: 12 }}>
        <div className="card">
          <h2>Related tools</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/tools/og-card" className="pill">OG card</Link>
            <Link href="/tools/crop-templates" className="pill">Crop</Link>
            <Link href="/compress" className="pill">Compress</Link>
          </div>
        </div>
      </div>
    </>
  );
}


