import type { Metadata } from "next";
import Client from "./Client";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "LQIP Generator: Tiny Base64 Placeholders | PixCloak",
  description: "Create LQIP placeholders as tiny Base64 for faster page loads. Preview and copy locally—no uploads. Perfect for skeleton screens and perceived performance.",
  alternates: { canonical: "/tools/lqip", languages: { "x-default": "/tools/lqip" } },
};

export default function Page() {
  return (
    <>
      <SoftwareAppJsonLd
        name="LQIP Generator"
        url="/tools/lqip"
        description="Generate Low Quality Image Placeholders (LQIP) as tiny Base64 strings for faster page loading and better perceived performance."
      />
      <FaqJsonLd items={[
        { question: "What is LQIP?", answer: "Low Quality Image Placeholder - a tiny, blurred version of an image used as a placeholder while the full image loads, improving perceived performance." },
        { question: "How small are LQIP files?", answer: "Typically 1-3KB as Base64 strings, compared to full images that can be 100KB-1MB. They load instantly and provide visual context." },
        { question: "How do I use LQIP in my website?", answer: "Embed the Base64 string directly in your HTML as a data URL, or use it as a background-image in CSS while the main image loads." },
        { question: "What's the difference between LQIP and blur-up?", answer: "LQIP shows a blurred version of the actual image, while blur-up uses a solid color placeholder. LQIP provides better visual context." }
      ]} />
      <Client />
    </>
  );
}


