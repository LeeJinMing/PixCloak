import type { Metadata } from "next";
import Client from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "OG Image Generator 1200×630—Facebook, X, LinkedIn Preview | PixCloak",
  description:
    "Build Open Graph and Twitter/X card art at 1200×630 in the browser. Export PNG/JPG for og:image and twitter:image. No upload—preview and download locally.",
  alternates: { canonical: "/tools/og-card", languages: { "x-default": "/tools/og-card" } },
  openGraph: {
    title: "1200×630 social preview maker",
    description: "Create share images for link previews locally.",
    url: "/tools/og-card",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OG card generator",
    description: "Local 1200×630 images for social previews.",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          { name: "OG card", url: "/tools/og-card" },
        ]}
      />
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


