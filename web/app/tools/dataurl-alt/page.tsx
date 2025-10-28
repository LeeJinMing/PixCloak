import type { Metadata } from "next";
import Client from "./Client";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Data URL Converter & Alt Suggestions | PixCloak",
  description: "Convert images to Base64 data URLs and generate helpful alt text suggestions for accessibility. 100% client‑side processing—no uploads, copy and use instantly.",
  alternates: { canonical: "/tools/dataurl-alt", languages: { "x-default": "/tools/dataurl-alt" } },
};

export default function Page() {
  return (
    <>
      <SoftwareAppJsonLd
        name="Data URL Converter & Alt Text Generator"
        url="/tools/dataurl-alt"
        description="Convert images to Base64 data URLs and generate accessibility-friendly alt text suggestions. Perfect for embedding images and improving web accessibility."
      />
      <FaqJsonLd items={[
        { question: "What is a data URL?", answer: "A data URL embeds image data directly in HTML/CSS using Base64 encoding, eliminating the need for separate image files and HTTP requests." },
        { question: "When should I use data URLs?", answer: "For small images (under 10KB), icons, logos, or when you need to embed images in CSS/HTML without external files. Not recommended for large images." },
        { question: "How does alt text generation work?", answer: "AI-powered analysis of image content generates descriptive alt text suggestions that improve accessibility for screen readers and SEO." },
        { question: "What image formats are supported?", answer: "Supports PNG, JPG, WebP, GIF, and other common formats. Outputs Base64-encoded data URLs ready for HTML/CSS use." }
      ]} />
      <Client />
    </>
  );
}


