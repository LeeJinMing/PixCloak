import type { Metadata } from "next";
import Client from "./Client";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "OG/Twitter Card 1200×630 (Free, No Upload) | PixCloak",
  description: "Create 1200×630 OG/Twitter images in your browser—no uploads. Preview instantly and export PNG/JPG fast. Perfect for blogs, docs, and social sharing.",
  alternates: { canonical: "/tools/og-card", languages: { "x-default": "/tools/og-card" } },
};

export default function Page() {
  return (
    <>
      <SoftwareAppJsonLd
        name="OG/Twitter Card Generator"
        url="/tools/og-card"
        description="Create Open Graph and Twitter Card images at 1200x630 resolution. Perfect for social media sharing and blog post previews."
      />
      <FaqJsonLd items={[
        { question: "What are OG/Twitter Card images?", answer: "Open Graph and Twitter Card images appear when you share links on social media platforms, providing visual previews that increase click-through rates." },
        { question: "Why 1200x630 resolution?", answer: "This is the recommended size for optimal display across Facebook, Twitter, LinkedIn, and other social platforms. It provides the best balance of quality and compatibility." },
        { question: "What can I include in the image?", answer: "Add text, logos, backgrounds, and graphics. The tool provides templates and customization options for professional-looking social media cards." },
        { question: "How do I use the generated image?", answer: "Download the image and add it to your website's meta tags using og:image and twitter:image properties in your HTML head section." }
      ]} />
      <Client />
    </>
  );
}


