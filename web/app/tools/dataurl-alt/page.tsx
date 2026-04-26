import type { Metadata } from "next";
import Link from "next/link";
import Client from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Data URL Converter & Alt Suggestions",
  description: "Convert images to Base64 data URLs and generate helpful alt text suggestions for accessibility. 100% client‑side processing—no uploads, copy and use instantly.",
  alternates: { canonical: "/tools/dataurl-alt", languages: { "x-default": "/tools/dataurl-alt" } },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Tools", url: "/tools" },
        { name: "Data URL converter", url: "/tools/dataurl-alt" },
      ]} />
      <SoftwareAppJsonLd
        name="Data URL Converter & Alt Text Generator"
        url="/tools/dataurl-alt"
        description="Convert images to Base64 data URLs and generate accessibility-friendly alt text suggestions. Perfect for embedding images and improving web accessibility."
      />
      <FaqJsonLd items={[
        { question: "What is a data URL?", answer: "A data URL embeds image data directly in HTML/CSS using Base64 encoding, eliminating the need for separate image files and HTTP requests." },
        { question: "When should I use data URLs?", answer: "For small images (under 10KB), icons, logos, or when you need to embed images in CSS/HTML without external files. Not recommended for large images." },
        { question: "How does alt text suggestion work?", answer: "Short descriptions are suggested from the filename and image dimensions—edit them for accuracy before publishing. No server-side vision API is used." },
        { question: "What image formats are supported?", answer: "Supports PNG, JPG, WebP, GIF, and other common formats. Outputs Base64-encoded data URLs ready for HTML/CSS use." }
      ]} />
      <Client />
      <div className="container" style={{ display: "grid", gap: 12 }}>
        <div className="card">
          <h2>Related tools</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/tools/lqip" className="pill">LQIP placeholder</Link>
            <Link href="/tools/srcset-generator" className="pill">srcset generator</Link>
            <Link href="/compress" className="pill">Compress</Link>
            <Link href="/tools/webp-converter" className="pill">WebP</Link>
            <Link href="/tools/svg-optimizer" className="pill">SVG optimizer</Link>
          </div>
        </div>
      </div>
    </>
  );
}
