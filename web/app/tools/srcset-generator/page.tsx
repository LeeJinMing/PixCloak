import type { Metadata } from "next";
import Client from "./Client";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Responsive img srcset Generator | PixCloak",
  description: "Generate responsive img srcset/sizes markup and suggested KB per breakpoint. Copy optimized HTML locally to improve LCP and save bandwidth—no uploads.",
  alternates: { canonical: "/tools/srcset-generator", languages: { "x-default": "/tools/srcset-generator" } },
};

export default function Page() {
  return (
    <>
      <SoftwareAppJsonLd
        name="Responsive img srcset Generator"
        url="/tools/srcset-generator"
        description="Generate responsive img srcset and sizes markup for optimal loading across devices. Includes KB suggestions per breakpoint."
      />
      <FaqJsonLd items={[
        { question: "What is img srcset?", answer: "srcset allows browsers to choose the most appropriate image size based on device pixel density and viewport width, improving loading performance." },
        { question: "How do I use the generated HTML?", answer: "Copy the generated img tag with srcset and sizes attributes directly into your HTML. The browser will automatically select the best image." },
        { question: "What are the recommended KB sizes?", answer: "Mobile: 50-100KB, Tablet: 100-200KB, Desktop: 200-500KB. Adjust based on your image content and quality requirements." },
        { question: "Do I need multiple image files?", answer: "Yes. Create different sized versions of your image (e.g., 400px, 800px, 1200px) and upload them to your server with the generated srcset markup." }
      ]} />
      <Client />
    </>
  );
}


