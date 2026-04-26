import type { Metadata } from "next";
import Link from "next/link";
import Client from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Responsive srcset & sizes Generator for <img>",
  description: "Build img srcset and sizes attributes with width hints and rough KB targets for mobile/tablet/desktop. Paste into HTML—improve LCP. All local, no upload.",
  alternates: { canonical: "/tools/srcset-generator", languages: { "x-default": "/tools/srcset-generator" } },
  openGraph: {
    title: "srcset / sizes markup helper",
    description: "Responsive image HTML for performance. Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
    url: "/tools/srcset-generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "srcset generator",
    description: "Copy-paste responsive img tags. Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          { name: "srcset generator", url: "/tools/srcset-generator" },
        ]}
      />
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
      <div className="container" style={{ display: "grid", gap: 12 }}>
        <div className="card">
          <h2>Related tools</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/tools/lqip" className="pill">LQIP</Link>
            <Link href="/tools/webp-converter" className="pill">WebP</Link>
            <Link href="/compress" className="pill">Compress</Link>
            <Link href="/tools/resize-image" className="pill">Resize</Link>
          </div>
        </div>
      </div>
    </>
  );
}


