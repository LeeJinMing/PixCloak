import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Image Privacy and Upload Guides",
  description: "Test-backed guides for private image sharing, upload limits, and website image preparation.",
  alternates: { canonical: "/guides" },
};

const groups = [
  {
    href: "/guides/privacy-sharing",
    title: "Private image sharing",
    description: "Remove visible details and hidden metadata before sending a photo or screenshot.",
    links: [
      ["/guides/does-wechat-remove-exif-test", "Does WeChat remove EXIF?"],
      ["/guides/remove-gps-location-photo", "Remove GPS location from a photo"],
      ["/guides/blur-pixelate-solid-redaction", "Blur vs pixelate vs solid redaction"],
      ["/guides/redact-id-card-safely", "Redact an ID card safely"],
      ["/guides/hide-faces-plates-private-text", "Hide faces, plates, and private text"],
      ["/guides/screenshot-privacy-checklist-v1", "Screenshot privacy checklist"],
    ],
  },
  {
    href: "/guides/upload-success",
    title: "Upload success",
    description: "Understand whether a portal is rejecting file size, dimensions, or format.",
    links: [
      ["/guides/compress-image-under-100kb", "Compress an image under 100KB"],
      ["/guides/compress-image-under-200kb", "Compress an image under 200KB"],
      ["/guides/why-upload-portal-rejects-image", "Why an upload portal rejects an image"],
      ["/guides/heic-upload-error-convert-locally", "Fix a HEIC upload error"],
      ["/guides/reduce-image-size-iphone", "Reduce image size on iPhone"],
      ["/guides/file-size-dimensions-format", "File size, dimensions, and format"],
    ],
  },
  {
    href: "/guides/web-images",
    title: "Website images",
    description: "Focused guidance for formats and search performance, backed by working tools.",
    links: [
      ["/guides/generate-complete-favicon-pack", "Generate a complete favicon pack"],
      ["/guides/webp-vs-jpeg-downloadable-samples", "WebP vs JPEG with samples"],
      ["/guides/remove-transparent-padding", "Remove transparent padding"],
      ["/guides/prepare-images-core-web-vitals", "Prepare images for Core Web Vitals"],
    ],
  },
] as const;

export default function GuidesPage() {
  return (
    <div className="workflow-page">
      <section className="workflow-hero">
        <div><span className="eyebrow">GUIDES</span><h1>Practical guidance tied to a working tool</h1><p>Each indexed guide addresses one distinct task and sends you directly to the relevant local workflow.</p></div>
      </section>
      <div className="guide-hub-grid">
        {groups.map((group) => (
          <section key={group.title} className="card guide-hub-card">
            <h2><Link href={group.href}>{group.title}</Link></h2><p>{group.description}</p>
            <div>{group.links.map(([href, label]) => <Link key={href} href={href}>{label}<span>→</span></Link>)}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
