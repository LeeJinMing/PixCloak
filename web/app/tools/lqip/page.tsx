import type { Metadata } from "next";
import Link from "next/link";
import Client from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "LQIP Generator—Tiny Blur Placeholders (Base64) | PixCloak",
  description:
    "Create low-quality image placeholders (LQIP) as small Base64 data URLs for lazy loading and faster perceived load. Runs locally—no upload.",
  alternates: { canonical: "/tools/lqip", languages: { "x-default": "/tools/lqip" } },
  openGraph: {
    title: "LQIP / blur-up placeholder generator",
    description: "Generate tiny Base64 previews for responsive images.",
    url: "/tools/lqip",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LQIP generator",
    description: "Base64 blur placeholders in the browser.",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          { name: "LQIP", url: "/tools/lqip" },
        ]}
      />
      <SoftwareAppJsonLd
        name="LQIP Generator"
        url="/tools/lqip"
        description="Generate lightweight blurred placeholders encoded as data URLs for progressive image loading."
      />
      <FaqJsonLd
        items={[
          {
            question: "What is LQIP?",
            answer: "Low Quality Image Placeholder—a very small preview, often blurred, shown while the full image loads.",
          },
          {
            question: "How big are the data URLs?",
            answer: "Typically a few kilobytes, much smaller than the final image, so they can be inlined in HTML or CSS.",
          },
          {
            question: "Are images uploaded?",
            answer: "No. The source image is processed only inside your browser.",
          },
        ]}
      />
      <div className="container" style={{ display: "grid", gap: 12 }}>
        <div className="card">
          <h1 className="page-hero-title">LQIP Placeholder Generator (Blur-Up, No Upload)</h1>
          <p className="text-muted" style={{ marginBottom: 0 }}>
            Improve perceived performance: embed a tiny preview while <code>srcset</code> or lazy loading fetches the real asset. Works with{" "}
            <Link href="/tools/srcset-generator">srcset markup</Link> workflows.
          </p>
        </div>
      </div>
      <Client />
      <div className="container" style={{ display: "grid", gap: 12 }}>
        <div className="card">
          <h2>Related tools</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/tools/srcset-generator" className="pill">srcset generator</Link>
            <Link href="/tools/dataurl-alt" className="pill">Data URL</Link>
            <Link href="/compress" className="pill">Compress</Link>
          </div>
        </div>
      </div>
    </>
  );
}
