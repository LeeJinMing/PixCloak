import type { Metadata } from "next";
import Link from "next/link";
import { FaqJsonLd } from "@/components/SeoJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Redact vs Blur License Plate—Which Is Safer? (Free)",
  description:
    "Redact vs blur license plate: soft blur can be reversed—use pixelate or solid blocks. Free online tool, no upload. For car listings, accident photos, social posts.",
  alternates: {
    canonical: "/guides/license-plate-redaction",
    languages: {
      "x-default": "/guides/license-plate-redaction",
      en: "/guides/license-plate-redaction",
    },
  },
  openGraph: {
    title: "Redact vs blur license plate—which is safer?",
    description:
      "Hide plates with pixelation or solid blocks—not soft blur. Free browser tool; EXIF/GPS removed on export.",
    url: "/guides/license-plate-redaction",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Redact vs Blur License Plate",
    description:
      "Why pixelate beats blur for plates. Free local redaction tool—no upload.",
  },
};

export default function GuidePlateRedaction() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Guides", url: "/guides" },
          { name: "License plate redaction", url: "/guides/license-plate-redaction" },
        ]}
      />
      <div className="container" style={{ display: "grid", gap: 12 }}>
        <div className="card" style={{ borderLeft: "4px solid #0070f3" }}>
          <h1>Redact vs Blur License Plate: Which Should You Use?</h1>
          <p style={{ marginBottom: 8 }}>
            <strong>Short answer:</strong> For license plates, <strong>redact with pixelate or a solid block</strong>—not soft blur.
            Plates stay readable under mild blur; pixelation and solid covers are much harder to reverse.
          </p>
          <p className="text-muted" style={{ fontSize: 14, marginBottom: 12 }}>
            Last reviewed: June 2026.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link className="pill" href="/redact">
              Redact plate now
            </Link>
            <Link className="pill" href="/guides/blur-face-in-photo">
              Blur faces
            </Link>
            <Link className="pill" href="/guides/blur-number-plate-online">
              UK number plates
            </Link>
          </div>
        </div>

        <div className="card">
          <h2>Redact vs blur: quick comparison</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, marginTop: 8 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                <th style={{ padding: "8px", textAlign: "left" }}>Method</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Plate privacy</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>
                  <strong>Solid block</strong>
                </td>
                <td style={{ padding: "8px" }}>Strongest — irreversible</td>
                <td style={{ padding: "8px" }}>Insurance, legal, GDPR-sensitive posts</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>
                  <strong>Pixelate (20px+)</strong>
                </td>
                <td style={{ padding: "8px" }}>Very strong — nearly irreversible</td>
                <td style={{ padding: "8px" }}>Car listings, social media, dashcam clips</td>
              </tr>
              <tr>
                <td style={{ padding: "8px" }}>
                  <strong>Soft blur</strong>
                </td>
                <td style={{ padding: "8px" }}>Weak — characters may remain readable</td>
                <td style={{ padding: "8px" }}>Not recommended for plates</td>
              </tr>
            </tbody>
          </table>
          <p style={{ marginTop: 12 }}>
            Searchers often ask <em>&ldquo;redact vs blur license plate&rdquo;</em> because blur looks fine at thumbnail size but fails at full resolution.
            Always zoom in after export and confirm no digits are visible.
          </p>
        </div>

        <div className="card">
          <h2>How to redact a license plate (3 steps)</h2>
          <ol>
            <li>
              Open the <Link href="/redact">image redaction tool</Link> in your browser—no upload.
            </li>
            <li>
              Draw a box over the plate with margin; choose <strong>Pixelate</strong> or <strong>Solid</strong> (License Plate preset available).
            </li>
            <li>
              Export JPEG or WebP. EXIF/GPS is removed automatically.
            </li>
          </ol>
          <p className="text-muted">
            Keep 10–15% margin around the plate. Check reflections in bumpers, windows, and wet pavement—plates often appear twice in one photo.
          </p>
        </div>

        <div className="card">
          <h2>When you must redact plates</h2>
          <ul>
            <li>Online car marketplaces (Craigslist, Facebook Marketplace, AutoTrader)</li>
            <li>Accident or insurance documentation shared outside the insurer portal</li>
            <li>Street photography, protests, or dashcam footage posted publicly</li>
            <li>Fleet or delivery photos that could enable vehicle tracking</li>
          </ul>
        </div>

        <FaqJsonLd
          items={[
            {
              question: "Redact vs blur license plate—which is better?",
              answer:
                "Redact with pixelate or a solid block. Soft blur often leaves plate characters readable at full size and can sometimes be partially reversed. Pixelation (20px+) or solid blocks are the safe choice for public sharing.",
            },
            {
              question: "Why should I blur license plates in photos?",
              answer:
                "To protect privacy and prevent vehicle tracking. Many jurisdictions expect plate redaction when sharing photos publicly on marketplaces, social media, or news sites.",
            },
            {
              question: "Should I use blur or pixelate for license plates?",
              answer:
                "Use solid blocks or strong pixelation. Soft blur can sometimes be reversed with image processing techniques and may not hide all characters.",
            },
            {
              question: "How do I redact a license plate online for free?",
              answer:
                "Open pixcloak.com/redact, upload your photo, draw over the plate with pixelate or solid mode, and download. Processing is 100% local—no upload—and EXIF/GPS is stripped on export.",
            },
          ]}
        />
      </div>
    </>
  );
}
