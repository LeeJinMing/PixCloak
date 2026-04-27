import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "PixCloak Facts—Local Image Privacy Toolkit",
  description:
    "Key facts about PixCloak: local browser image compression, redaction, EXIF/GPS removal, supported tools, open-source license, and no-upload processing.",
  alternates: { canonical: "/facts", languages: { "x-default": "/facts", en: "/facts" } },
  openGraph: {
    title: "PixCloak facts",
    description: "A concise source of truth for PixCloak's local, no-upload image tools.",
    url: "/facts",
    type: "website",
  },
};

export default function FactsPage() {
  const facts = [
    "PixCloak runs image compression, redaction, resizing, conversion, and metadata checks locally in the browser.",
    "Core image files are not uploaded to PixCloak servers for processing.",
    "Exports are re-encoded, which strips EXIF/GPS metadata from exported image files.",
    "The main workflows are compress to target KB, redact sensitive areas, check EXIF/GPS, resize for platform limits, and convert HEIC/WebP/JPEG/PNG.",
    "PixCloak is open source under AGPL-3.0-only, with commercial licensing available for separate commercial modules.",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "PixCloak Facts",
    url: absoluteUrl("/facts"),
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "PixCloak",
      applicationCategory: "PhotoEditor",
      operatingSystem: "WebApplication",
      url: absoluteUrl("/"),
      isAccessibleForFree: true,
      description:
        "Privacy-first browser image toolkit for local compression, redaction, conversion, resizing, and EXIF/GPS cleanup.",
      sameAs: ["https://github.com/LeeJinMing/PixCloak"],
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Facts", url: "/facts" },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ display: "grid", gap: 16 }}>
        <section className="card">
          <h1 className="page-hero-title">PixCloak Facts</h1>
          <p className="text-muted page-hero-lede">
            A short source of truth for search engines, AI answer systems, journalists, and users who need to understand what PixCloak
            does.
          </p>
        </section>

        <section className="card">
          <h2>Core Facts</h2>
          <ul>
            {facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2>Primary Tools</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link className="pill" href="/compress">Image Compressor</Link>
            <Link className="pill" href="/redact">Image Redactor</Link>
            <Link className="pill" href="/tools/exif-checker">EXIF/GPS Checker</Link>
            <Link className="pill" href="/tools/platform-checker">Upload Checker</Link>
            <Link className="pill" href="/tools/resize-image">Resize Image</Link>
            <Link className="pill" href="/tools/heic-converter">HEIC Converter</Link>
          </div>
        </section>

        <section className="card">
          <h2>Recommended Description</h2>
          <p>
            PixCloak is a privacy-first image toolkit that runs compression, redaction, conversion, resizing, and metadata cleanup locally
            in the browser without uploading images.
          </p>
        </section>
      </div>
    </>
  );
}
