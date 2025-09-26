export type Scenario = {
  slug: string;
  title: string;
  description: string;
  presets: { label: string; href: string }[]; // e.g. /compress?kb=200
  faq: { q: string; a: string }[];
};

export const scenarios: Scenario[] = [
  {
    slug: "resume-200kb",
    title: "Compress resume images to 200KB (HR ATS)",
    description:
      "Guidance to prepare resume images under 200KB for applicant tracking systems.",
    presets: [
      { label: "200KB", href: "/compress?kb=200" },
      { label: "500KB", href: "/compress?kb=500" },
      { label: "1920px", href: "/guides/resize-to-1920" },
    ],
    faq: [
      {
        q: "Will EXIF/GPS be removed?",
        a: "Yes, export re-encodes and strips metadata by default.",
      },
      {
        q: "What format should I choose?",
        a: "JPEG or WebP for photos; PNG for screenshots.",
      },
    ],
  },
  {
    slug: "gov-portal-500kb",
    title: "Prepare images for government portals (≤500KB)",
    description:
      "Step-by-step to meet ≤500KB constraints commonly found on public portals.",
    presets: [
      { label: "500KB", href: "/compress?kb=500" },
      { label: "Target KB Guide", href: "/guides/compress-to-target-kb" },
    ],
    faq: [
      {
        q: "How to ensure clarity?",
        a: "Prefer resize longest side to 1920px before compressing.",
      },
    ],
  },
  {
    slug: "wechat-screenshot-exif",
    title: "Share WeChat screenshots safely (no EXIF/GPS)",
    description: "Remove metadata and redact sensitive info before sharing.",
    presets: [
      { label: "Redact", href: "/redact" },
      { label: "Remove EXIF", href: "/guides/remove-exif-wechat" },
    ],
    faq: [
      {
        q: "Is processing local?",
        a: "Yes, all runs in the browser. Nothing is uploaded.",
      },
    ],
  },
  {
    slug: "visa-photo-300kb",
    title: "Compress visa application photos to 300KB",
    description: "Meet common visa portal size limits while keeping clarity.",
    presets: [
      { label: "300KB", href: "/compress?kb=300" },
      { label: "Resize 1920px", href: "/guides/resize-to-1920" },
    ],
    faq: [
      {
        q: "Passport scan ok?",
        a: "Prefer solid redact for sensitive ID lines, then compress.",
      },
    ],
  },
  {
    slug: "linkedin-banner-1584x396",
    title: "Resize LinkedIn banner to 1584×396",
    description: "Exact size for LinkedIn cover with minimal artifacts.",
    presets: [
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
      { label: "WebP vs JPEG", href: "/guides/jpeg-vs-webp-size-quality" },
    ],
    faq: [
      { q: "Which format?", a: "WebP often smaller; PNG for flat graphics." },
    ],
  },
  {
    slug: "university-application-1mb",
    title: "Prepare images for university applications (≤1MB)",
    description: "Compress transcripts/portfolio screenshots under 1MB.",
    presets: [
      { label: "1MB", href: "/compress?kb=1024" },
      { label: "Remove EXIF", href: "/guides/export-without-metadata" },
    ],
    faq: [
      { q: "Clarity tips?", a: "Resize longest side then choose target KB." },
    ],
  },
  {
    slug: "job-application-500kb",
    title: "Compress job application images to 500KB",
    description: "HR systems often require ≤500KB per image.",
    presets: [
      { label: "500KB", href: "/compress?kb=500" },
      { label: "Target KB Guide", href: "/guides/compress-to-target-kb" },
    ],
    faq: [
      {
        q: "Batch export?",
        a: "Use ZIP batch in the compressor after processing.",
      },
    ],
  },
  {
    slug: "passport-scan-redact",
    title: "Redact passport scans before sharing",
    description: "Mask ID numbers and MRZ, remove EXIF/GPS, then export.",
    presets: [
      { label: "Redact Tool", href: "/redact" },
      { label: "EXIF/GPS Removal", href: "/guides/exif-gps-removal" },
    ],
    faq: [
      {
        q: "Solid or pixelate?",
        a: "Use solid for sensitive numbers; pixelate for faces/plates.",
      },
    ],
  },
  {
    slug: "email-attachment-10mb",
    title: "Prepare images for 10MB email attachments",
    description: "Compress and ZIP multiple images to fit 10MB limits.",
    presets: [
      { label: "200KB", href: "/compress?kb=200" },
      { label: "ZIP Batch", href: "/guides/zip-batch-download" },
    ],
    faq: [
      {
        q: "How many images?",
        a: "Aim 200–500KB each; then ZIP to stay under provider limits.",
      },
    ],
  },
  {
    slug: "website-hero-1920px",
    title: "Optimize website hero images (1920px)",
    description: "Resize to 1920px then encode at high quality WebP/JPEG.",
    presets: [
      { label: "1920px", href: "/guides/resize-to-1920" },
      { label: "WebP vs JPEG", href: "/guides/jpeg-vs-webp-size-quality" },
    ],
    faq: [
      { q: "Transparency?", a: "Keep PNG for UI/screens; photos → WebP/JPEG." },
    ],
  },
  {
    slug: "github-readme-images",
    title: "Optimize images for GitHub README",
    description: "Reduce size for repository pages to load fast.",
    presets: [
      { label: "500KB", href: "/compress?kb=500" },
      { label: "Remove Metadata", href: "/guides/export-without-metadata" },
    ],
    faq: [
      { q: "Animation?", a: "Prefer short WebP over heavy GIF when possible." },
    ],
  },
  {
    slug: "id-card-privacy-redaction",
    title: "ID card privacy redaction best practices",
    description: "Mask sensitive areas and export without metadata.",
    presets: [
      { label: "Redact Tool", href: "/redact" },
      {
        label: "License Plate/ID guide",
        href: "/guides/license-plate-redaction",
      },
    ],
    faq: [
      {
        q: "Multiple boxes?",
        a: "Add multiple boxes and prefer extreme pixelation or solid.",
      },
    ],
  },
];
