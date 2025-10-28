import type { Metadata } from "next";
import Client from "./Client";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Text Placeholder – Social/Thumbnail presets | PixCloak",
  description: "Generate text‑based placeholder images for social and thumbnails with size presets. Customize colors/text and export locally—no uploads.",
  alternates: { canonical: "/tools/text-placeholder", languages: { "x-default": "/tools/text-placeholder" } },
};

export default function Page() {
  return (
    <>
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
    </>
  );
}


