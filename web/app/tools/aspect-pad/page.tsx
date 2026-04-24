import type { Metadata } from "next";
import Link from "next/link";
import Client from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Aspect Ratio Padder—16:9, 1:1, 9:16 Without Cropping | PixCloak",
  description:
    "Pad images to Instagram, YouTube, or custom aspect ratios using solid color or blur fill—no cropping. Local in browser, no upload. Fix 1080×1080 and vertical formats safely.",
  alternates: {
    canonical: "/tools/aspect-pad",
    languages: { "x-default": "/tools/aspect-pad", en: "/tools/aspect-pad" },
  },
  openGraph: {
    title: "Pad to target aspect ratio",
    description: "Letterbox or pillarbox without losing image content.",
    url: "/tools/aspect-pad",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aspect ratio padder",
    description: "Blur or color bars for social sizes.",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          { name: "Aspect pad", url: "/tools/aspect-pad" },
        ]}
      />
      <SoftwareAppJsonLd
        name="Aspect Ratio Padder"
        url="/tools/aspect-pad"
        description="Add padding to reach target aspect ratios for social and web banners without cropping the original content."
      />
      <FaqJsonLd
        items={[
          {
            question: "Padding vs cropping?",
            answer: "Padding keeps every pixel of the original image and adds borders; cropping cuts content away to fit a ratio.",
          },
          {
            question: "Instagram 1080×1080?",
            answer: "Use 1:1 padding from a taller or wider photo to get a square without cutting off subjects.",
          },
          {
            question: "Is processing local?",
            answer: "Yes. Files are not uploaded to a server.",
          },
        ]}
      />
      <div className="container" style={{ display: "grid", gap: 12 }}>
        <div className="card">
          <h1>Aspect Ratio Padder—Letterbox &amp; Pillarbox (No Upload)</h1>
          <p className="text-muted" style={{ marginBottom: 0 }}>
            When you need exact ratios (feed square, story 9:16, YouTube 16:9) but do not want to crop, pad with color or a blurred
            extension of the image. Complements <Link href="/tools/crop-templates">crop templates</Link> when cropping is acceptable.
          </p>
        </div>
      </div>
      <Client />
    </>
  );
}
