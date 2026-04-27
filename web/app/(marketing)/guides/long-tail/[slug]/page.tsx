import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/SeoJsonLd";
import {
  LONG_TAIL_GUIDE_MAP,
  LONG_TAIL_GROUPS,
  LONG_TAIL_SLUGS,
  type LongTailAction,
  type LongTailGuide,
} from "@/lib/longTailGuides";

const PUBLISHED_AT = "2025-10-03";
const MODIFIED_AT = "2026-01-19";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pixcloak.com";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return LONG_TAIL_SLUGS.map((slug) => ({ slug }));
}

function getTargetLabel(guide: LongTailGuide) {
  if (guide.action === "compress") return guide.targetSize ?? "a smaller file size";
  if (guide.action === "resize") return guide.targetDimensions ?? "the right dimensions";
  if (guide.action === "convert") return "WebP output";
  if (guide.action === "redact") return "irreversible redactions";
  if (guide.action === "exif") return "metadata-free exports";
  if (guide.action === "watermark") return "consistent text watermarks";
  if (guide.action === "remove-bg") return "clean background cutouts";
  if (guide.action === "sprite") return "optimized sprite sheets";
  if (guide.action === "lqip") return "lightweight placeholders";
  return "exact aspect ratios";
}

function getActionSentence(guide: LongTailGuide) {
  const target = getTargetLabel(guide);
  const purpose = guide.purpose ? ` for ${guide.purpose}` : "";
  switch (guide.action) {
    case "compress":
      return `compress ${guide.keyword} to ${target}${purpose}`;
    case "resize":
      return `resize ${guide.keyword} to ${target}${purpose}`;
    case "convert":
      return `convert ${guide.keyword} to ${target}${purpose}`;
    case "redact":
      return `redact sensitive areas in ${guide.keyword}${purpose}`;
    case "exif":
      return `remove EXIF data from ${guide.keyword}${purpose}`;
    case "watermark":
      return `add text watermarks to ${guide.keyword}${purpose}`;
    case "remove-bg":
      return `remove backgrounds from ${guide.keyword}${purpose}`;
    case "sprite":
      return `build sprite sheets from ${guide.keyword}${purpose}`;
    case "lqip":
      return `generate LQIP placeholders for ${guide.keyword}${purpose}`;
    case "pad":
    default:
      return `crop and pad ${guide.keyword} to exact ratios${purpose}`;
  }
}

function getActionTitle(guide: LongTailGuide) {
  const target = getTargetLabel(guide);
  switch (guide.action) {
    case "compress":
      return `Compress ${guide.keyword} to ${target}`;
    case "resize":
      return `Resize ${guide.keyword} to ${target}`;
    case "convert":
      return `Convert ${guide.keyword} to ${target}`;
    case "redact":
      return `Redact ${guide.keyword} Safely`;
    case "exif":
      return `Remove EXIF from ${guide.keyword}`;
    case "watermark":
      return `Batch Text Watermark for ${guide.keyword}`;
    case "remove-bg":
      return `Remove Backgrounds from ${guide.keyword}`;
    case "sprite":
      return `Sprite Sheet Generator for ${guide.keyword}`;
    case "lqip":
      return `LQIP Placeholders for ${guide.keyword}`;
    case "pad":
    default:
      return `Crop and Pad ${guide.keyword} to Exact Ratios`;
  }
}

function compactLabel(value: string, maxLength = 26) {
  const cleaned = value
    .replace(/\s+uploads?$/i, "")
    .replace(/\s+images?$/i, "")
    .replace(/\s+photos?$/i, "")
    .replace(/\s+attachments?$/i, "")
    .trim();
  if (cleaned.length <= maxLength) return cleaned;
  return `${cleaned.slice(0, maxLength - 1).trimEnd()}…`;
}

function toSentenceCase(value: string) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildTitle(guide: LongTailGuide) {
  const label = compactLabel(guide.platform ?? guide.keyword);
  const target = getTargetLabel(guide);
  switch (guide.action) {
    case "compress":
      return `${target} ${label} Guide`;
    case "resize":
      return `${target} ${label} Resize`;
    case "convert":
      return `${label} WebP Converter`;
    case "redact":
      return `${label} Redaction Guide`;
    case "exif":
      return `${label} EXIF Removal`;
    case "watermark":
      return `${label} Watermark Guide`;
    case "remove-bg":
      return `${label} Solid BG Removal`;
    case "sprite":
      return `${label} Sprite Sheet`;
    case "lqip":
      return `${label} LQIP Guide`;
    case "pad":
    default:
      return `${label} Crop and Pad`;
  }
}

function buildDescription(guide: LongTailGuide) {
  const target = getTargetLabel(guide);
  const label = compactLabel(guide.platform ?? guide.keyword, 34);
  return `Prepare ${label} for ${target} with PixCloak. Follow local, no-upload steps to check quality, strip metadata, and export clean files.`;
}

function getToolLabel(action: LongTailAction) {
  switch (action) {
    case "compress":
      return "Image Compressor";
    case "resize":
      return "Resize Tool";
    case "convert":
      return "WebP Converter";
    case "redact":
      return "Redactor";
    case "exif":
      return "EXIF Remover";
    case "watermark":
      return "Watermark Tool";
    case "remove-bg":
      return "Background Remover";
    case "sprite":
      return "Sprite Sheet Tool";
    case "lqip":
      return "LQIP Generator";
    case "pad":
    default:
      return "Aspect Ratio Tool";
  }
}

function getNextAction(guide: LongTailGuide) {
  const target = getTargetLabel(guide);
  switch (guide.action) {
    case "compress":
      return {
        title: `Compress to ${target}`,
        body: "Open the compressor with this target prefilled, then preview quality before export.",
        href: guide.toolPath,
      };
    case "resize":
      return {
        title: `Resize to ${target}`,
        body: "Open the resize tool with this dimension target, then compress if the file is still too large.",
        href: guide.toolPath,
      };
    case "redact":
      return {
        title: "Redact sensitive areas",
        body: "Mask faces, plates, IDs, or text locally, then export a clean copy without EXIF/GPS.",
        href: guide.toolPath,
      };
    case "exif":
      return {
        title: "Check EXIF/GPS",
        body: "Verify hidden metadata first, then download a cleaned copy before sharing.",
        href: "/tools/exif-checker",
      };
    default:
      return {
        title: `Open ${getToolLabel(guide.action)}`,
        body: "Use the matching local tool, then download the processed file without uploading it.",
        href: guide.toolPath,
      };
  }
}

function getRelatedLinks(action: LongTailAction) {
  const related: Record<LongTailAction, { name: string; url: string }[]> = {
    compress: [
      { name: "Compress to 200KB", url: "/guides/compress-to-200kb" },
      { name: "Compress to 500KB", url: "/guides/compress-to-500kb" },
      { name: "Custom KB targets", url: "/guides/compress-to-target-kb" },
      { name: "Resize to 1920px first", url: "/guides/resize-to-1920" },
      { name: "Quality vs Size", url: "/guides/how-to-compress-image-without-losing-quality" },
    ],
    resize: [
      { name: "Resize to 1920px", url: "/guides/resize-to-1920" },
      { name: "Resize longest side", url: "/guides/resize-longest-side" },
      { name: "Platform image limits", url: "/guides/platform-image-limits" },
      { name: "Compress to target KB", url: "/guides/compress-to-target-kb" },
      { name: "Image SEO optimization", url: "/guides/image-seo-optimization" },
    ],
    redact: [
      { name: "Redaction checklist", url: "/guides/redaction-checklist" },
      { name: "Privacy compliance", url: "/guides/privacy-compliance" },
      { name: "Remove EXIF/GPS", url: "/guides/exif-gps-removal" },
    ],
    exif: [
      { name: "Remove EXIF from iPhone", url: "/guides/remove-exif-iphone" },
      { name: "Remove EXIF from WeChat", url: "/guides/remove-exif-wechat" },
      { name: "EXIF/GPS removal", url: "/guides/exif-gps-removal" },
    ],
    convert: [
      { name: "JPEG to WebP", url: "/guides/convert-jpeg-to-webp" },
      { name: "PNG vs JPG", url: "/guides/png-vs-jpg-when-to-use-each" },
      { name: "JPEG vs WebP", url: "/guides/jpeg-vs-webp-size-quality" },
    ],
    watermark: [
      { name: "Image SEO optimization", url: "/guides/image-seo-optimization" },
      { name: "Platform image limits", url: "/guides/platform-image-limits" },
      { name: "Compress to 500KB", url: "/guides/compress-to-500kb" },
    ],
    "remove-bg": [
      { name: "Prepare images for portfolio", url: "/guides/prepare-images-for-portfolio" },
      { name: "Prepare images for forms", url: "/guides/prepare-images-for-forms" },
      { name: "Compress to 800KB", url: "/guides/compress-to-800kb" },
    ],
    sprite: [
      { name: "Image SEO optimization", url: "/guides/image-seo-optimization" },
      { name: "Convert JPEG to WebP", url: "/guides/convert-jpeg-to-webp" },
      { name: "Resize longest side", url: "/guides/resize-longest-side" },
    ],
    lqip: [
      { name: "Image SEO optimization", url: "/guides/image-seo-optimization" },
      { name: "JPEG vs WebP", url: "/guides/jpeg-vs-webp-size-quality" },
      { name: "Compress to target KB", url: "/guides/compress-to-target-kb" },
    ],
    pad: [
      { name: "Resize longest side", url: "/guides/resize-longest-side" },
      { name: "Platform image limits", url: "/guides/platform-image-limits" },
      { name: "Resize to 1920px", url: "/guides/resize-to-1920" },
    ],
  };
  return related[action] ?? related.compress;
}

function getSteps(guide: LongTailGuide) {
  const target = getTargetLabel(guide);
  switch (guide.action) {
    case "compress":
      return [
        {
          title: "Open the compressor",
          body: `Launch PixCloak and open the Image Compressor. Starting with the right tool ensures the encoder targets ${target} without guessing or over-compressing.`,
        },
        {
          title: "Upload your files",
          body: "Drag and drop images or select them from your device. Processing runs locally, so you can work with sensitive files without uploads or accounts.",
        },
        {
          title: `Set the target size (${target})`,
          body: "Enter the target size and choose a format. WebP usually yields the smallest files, while JPEG is the safest for older platforms.",
        },
        {
          title: "Preview and adjust quality",
          body: "Compare the original and compressed results. If the image looks soft, resize to a smaller dimension first and re-run compression.",
        },
        {
          title: "Download and verify",
          body: "Export the final file and confirm the size in your file details. Keeping the size consistent reduces upload errors and rework.",
        },
        {
          title: "Batch when needed",
          body: "For multiple assets, use batch export to keep the same settings across the set. Consistency matters for teams and multi-image uploads.",
        },
      ];
    case "resize":
      return [
        {
          title: "Open the resize tool",
          body: `Use PixCloak Resize Tool to target ${target}. This keeps dimensions consistent across platforms and prevents automatic cropping.`,
        },
        {
          title: "Enter exact dimensions",
          body: "Input the width and height or lock the aspect ratio for one-side resizing. Use padding if you must keep the full image visible.",
        },
        {
          title: "Choose fit strategy",
          body: "Pick crop for edge-to-edge layouts or pad with a neutral background for a safe-fit layout. This avoids cutting off important content.",
        },
        {
          title: "Select output format",
          body: "Export as WebP for web speed, JPEG for compatibility, or PNG if you need transparent backgrounds or sharp UI text.",
        },
        {
          title: "Preview at 100%",
          body: "Check text, logos, and edges before exporting. Small blur can be fixed by slightly increasing output size or sharpening.",
        },
        {
          title: "Compress after resizing",
          body: "If file size is still high, compress after resizing to avoid double artifacts. This keeps clarity while meeting file limits.",
        },
      ];
    case "convert":
      return [
        {
          title: "Open the converter",
          body: "Use the WebP Converter in PixCloak. It handles single images or batches and keeps output consistent across a folder.",
        },
        {
          title: "Upload images",
          body: "Drag in JPG or PNG files. WebP supports both photos and transparency, which makes it a strong default for the web.",
        },
        {
          title: "Set quality",
          body: "Choose a quality level that balances size and clarity. A mid-range value typically preserves detail while keeping files small.",
        },
        {
          title: "Export and verify",
          body: "Download the WebP outputs and spot-check them in your browser. If you see banding, increase quality slightly.",
        },
        {
          title: "Keep a fallback",
          body: "If your platform does not support WebP, keep a JPEG fallback. This avoids upload errors and broken previews.",
        },
      ];
    case "redact":
      return [
        {
          title: "Open the redactor",
          body: "Use PixCloak Redactor to mark sensitive regions. Local processing ensures ID numbers and signatures never leave your device.",
        },
        {
          title: "Select sensitive areas",
          body: "Draw boxes over IDs, faces, MRZ lines, or contact details. Leave a small margin to avoid partial visibility after export.",
        },
        {
          title: "Choose irreversible masking",
          body: "Solid blocks are safest for compliance. Pixelation can still reveal information if the block is too small or repeated.",
        },
        {
          title: "Preview at zoom",
          body: "Zoom in to ensure the sensitive text is fully covered. Re-check edges where the background is high-contrast.",
        },
        {
          title: "Export and strip metadata",
          body: "Export as a new file and remove EXIF/GPS metadata. This prevents hidden data leaks that remain even after redaction.",
        },
      ];
    case "exif":
      return [
        {
          title: "Re-encode the image",
          body: "Use PixCloak to re-export the image. The export pipeline strips EXIF and GPS metadata automatically.",
        },
        {
          title: "Verify metadata removal",
          body: "Check the file using the EXIF checker. Confirm that GPS coordinates and device data are gone before sharing.",
        },
        {
          title: "Save a clean copy",
          body: "Keep the cleaned version in a separate folder. This avoids re-sharing the original by mistake.",
        },
        {
          title: "Share the metadata-free file",
          body: "Upload or send the cleaned export. The file will look identical but will not carry hidden location data.",
        },
      ];
    case "watermark":
      return [
        {
          title: "Open the watermark tool",
          body: "Use PixCloak Watermark to add a consistent text mark. This protects ownership and discourages unauthorized reuse.",
        },
        {
          title: "Set text, size, and opacity",
          body: "Pick a legible font, keep opacity around 20-35%, and choose a corner or center position depending on content density.",
        },
        {
          title: "Apply to a batch",
          body: "Add multiple images to apply a uniform watermark. Consistent placement looks professional and avoids accidental overlaps.",
        },
        {
          title: "Export and review",
          body: "Check readability on light and dark regions. If the watermark disappears, increase contrast or add a subtle shadow.",
        },
      ];
    case "remove-bg":
      return [
        {
          title: "Open background removal",
          body: "Use PixCloak background removal for quick cutouts. It works best on high-contrast edges and clean product shots.",
        },
        {
          title: "Upload the image",
          body: "Choose images with clear subject separation. This improves edge accuracy and reduces the need for manual cleanup.",
        },
        {
          title: "Refine the output",
          body: "Check edges for halos or missing details. If needed, add a soft edge or adjust background color to match the target layout.",
        },
        {
          title: "Export in the right format",
          body: "Use PNG for transparency or WebP if supported. Then compress to keep file size reasonable for web use.",
        },
      ];
    case "sprite":
      return [
        {
          title: "Collect consistent assets",
          body: "Prepare icons at consistent sizes and padding. Uniform assets generate cleaner sprites and predictable CSS positions.",
        },
        {
          title: "Generate the sprite sheet",
          body: "Use PixCloak Sprite Sheet tool to arrange icons in a grid. Adjust spacing to prevent bleeding in CSS background positioning.",
        },
        {
          title: "Export sprite and metadata",
          body: "Download the sprite sheet and map coordinates. Keep the mapping file with your front-end assets for easy integration.",
        },
        {
          title: "Test in the UI",
          body: "Apply the sprite in your CSS and verify hover states. A quick test avoids rendering glitches later in production.",
        },
      ];
    case "lqip":
      return [
        {
          title: "Open the LQIP tool",
          body: "Use PixCloak LQIP Generator to create tiny blurred placeholders. This improves perceived performance and CLS stability.",
        },
        {
          title: "Choose tiny dimensions",
          body: "Set a very small width, such as 20-40px. The placeholder should load instantly while keeping a recognizable shape.",
        },
        {
          title: "Export base64 or image",
          body: "Use base64 for inline HTML or a tiny image file. Both reduce layout shift and keep initial paint fast.",
        },
        {
          title: "Swap on load",
          body: "Replace the placeholder once the full image loads. This technique keeps the page feeling responsive.",
        },
      ];
    case "pad":
    default:
      return [
        {
          title: "Open the aspect tool",
          body: "Use PixCloak Aspect Pad to fit images into exact ratios without losing content.",
        },
        {
          title: "Choose target ratio",
          body: "Set the target ratio or dimensions. Use padding for safe-fit layouts or crop for edge-to-edge designs.",
        },
        {
          title: "Select background style",
          body: "Pick a neutral background or brand color to keep the frame consistent across a set.",
        },
        {
          title: "Export and review",
          body: "Check that key elements stay inside the safe area. Adjust padding if logos or text are too close to edges.",
        },
      ];
  }
}

function getTips(guide: LongTailGuide) {
  const target = getTargetLabel(guide);
  switch (guide.action) {
    case "compress":
      return [
        `Resize before compressing. Reducing dimensions often halves file size, giving you more quality headroom at ${target}.`,
        "Choose WebP when possible. It delivers smaller files at similar quality, but keep JPEG for legacy uploads.",
        "Avoid re-saving multiple times. Each compression pass adds artifacts and reduces clarity, especially in gradients.",
        "Keep text readable. Increase output size slightly if small text looks soft after compression.",
        "Strip EXIF data when sharing. Metadata can leak device and location details even when the image looks safe.",
        "Test on the target device. Mobile screens reveal artifacts that desktop monitors can hide.",
        "Keep originals archived. If you need a different size later, start from the original instead of the compressed file.",
      ];
    case "resize":
      return [
        `Lock aspect ratio whenever possible. It prevents stretched faces and preserves composition.`,
        "Use padding instead of cropping when you must keep all content visible, such as logos or documents.",
        "Avoid upscaling. Enlarging small images creates blur that no compressor can fix.",
        "Export in WebP or JPEG depending on platform support. PNG is best for text-heavy graphics.",
        "Resize once, then compress. Multiple resize passes accumulate blur and soften edges.",
        "Preview at 100% zoom. Small artifacts are easier to spot before upload.",
        "Standardize naming. Consistent filenames make batch workflows easier to manage.",
      ];
    case "convert":
      return [
        "Start with high-quality originals. Converting from a heavily compressed JPEG will carry artifacts into WebP.",
        "Use transparent PNG sources when you need alpha channels in WebP output.",
        "Set quality in the 75-85 range for photos; lower values can cause banding in gradients.",
        "Keep a JPEG fallback for platforms without WebP support.",
        "Batch convert to keep sizes consistent across a library.",
        "Avoid embedding metadata you do not need; remove EXIF before export.",
      ];
    case "redact":
      return [
        "Prefer solid blocks for irreversible masking; pixelation can be reversed if blocks are too small.",
        "Zoom in before exporting. Small gaps at edges can reveal sensitive text.",
        "Redact surrounding context such as addresses, barcodes, or QR codes that imply identity.",
        "Export to a new file name so the original stays intact and unshared.",
        "Remove EXIF data to prevent hidden location leaks.",
      ];
    case "exif":
      return [
        "Re-export instead of editing metadata. Re-encoding is the safest way to strip EXIF across devices.",
        "Verify with an EXIF checker before sharing to confirm GPS data is removed.",
        "Avoid sharing originals. Store a clean version for public use.",
        "Combine with redaction for truly sensitive documents.",
        "Keep file size in check after re-export to avoid upload failures.",
      ];
    case "watermark":
      return [
        "Keep opacity between 20-35% so content stays visible while marks remain noticeable.",
        "Use a contrasting color or subtle shadow for readability on mixed backgrounds.",
        "Apply consistent placement to maintain brand cohesion across a set.",
        "Avoid covering key product details or faces; use corners or edges instead.",
        "Export a clean master copy without watermarks for internal use.",
      ];
    case "remove-bg":
      return [
        "Use high-contrast images for better edge detection.",
        "Refine edges around hair or soft fabrics if the background is noisy.",
        "Export with transparency when placing on different backgrounds.",
        "Compress after background removal to keep file size manageable.",
        "Test on light and dark backgrounds to spot halos.",
      ];
    case "sprite":
      return [
        "Normalize icon sizes before generating the sprite sheet.",
        "Add consistent padding to prevent background bleeding in CSS.",
        "Keep a mapping file with coordinates for easier front-end integration.",
        "Export in WebP or PNG depending on transparency needs.",
        "Run a quick UI test to confirm hover states and alignment.",
      ];
    case "lqip":
      return [
        "Keep placeholder width tiny (20-40px). Smaller is faster and still readable.",
        "Use a blurred or low-quality preview to avoid sudden shifts on load.",
        "Inline base64 if you want zero extra requests on initial render.",
        "Avoid color banding by using a slightly higher quality for gradients.",
        "Replace placeholders on load to keep CLS stable.",
      ];
    case "pad":
    default:
      return [
        "Use padding when content must stay fully visible.",
        "Pick neutral background colors for universal compatibility.",
        "Keep text within the safe area to avoid platform cropping.",
        "Export in WebP or PNG depending on transparency needs.",
        "Resize once to avoid soft edges.",
      ];
  }
}

function getUseCases(guide: LongTailGuide) {
  const platform = guide.platform ?? "your platform";
  const target = getTargetLabel(guide);
  return [
    `Uploading to ${platform} with strict size or dimension checks.`,
    `Keeping assets consistent across teams with a standard target like ${target}.`,
    "Improving mobile performance and reducing bounce rates.",
    "Preparing assets for email, forms, or ATS portals that reject oversized files.",
    "Sharing sensitive images without leaking hidden metadata.",
  ];
}

function getFaqItems(guide: LongTailGuide) {
  const target = getTargetLabel(guide);
  return [
    {
      question: `How do I ${getActionSentence(guide)}?`,
      answer:
        "Open the PixCloak tool, upload your file, apply the target settings, and export. The workflow is fully local, so images never leave your device.",
    },
    {
      question: `Why is ${target} important for ${guide.keyword}?`,
      answer:
        "Consistent targets prevent upload failures and keep page performance fast. You control quality instead of letting platforms auto-compress your files.",
    },
    {
      question: "Does PixCloak upload my files?",
      answer:
        "No. All processing happens locally in your browser. Nothing is uploaded or stored on a server.",
    },
    {
      question: "What format should I use?",
      answer:
        "WebP is best for web use, JPEG is the safest for legacy platforms, and PNG is ideal for transparency or text-heavy graphics.",
    },
    {
      question: "How do I keep quality high?",
      answer:
        "Resize first, then compress once. Avoid multiple export cycles and preview at 100% to catch blur before uploading.",
    },
    {
      question: "Can I process a batch?",
      answer:
        "Yes. PixCloak supports batch workflows for compression, resizing, conversion, and watermarking. Keep settings consistent for predictable results.",
    },
  ];
}

function buildAlternates(guide: LongTailGuide) {
  const group = LONG_TAIL_GROUPS[guide.group] ?? [guide];
  const base = group.find((item) => item.locale === "en") ?? group[0];
  const languages: Record<string, string> = {
    "x-default": `/guides/long-tail/${base.slug}`,
    en: `/guides/long-tail/${base.slug}`,
  };
  for (const item of group) {
    if (item.locale !== "en") {
      languages[item.locale] = `/guides/long-tail/${item.slug}`;
    }
  }
  return {
    canonical: `/guides/long-tail/${guide.slug}`,
    languages,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = LONG_TAIL_GUIDE_MAP.get(slug);
  if (!guide) {
    return {
      title: "Page Not Found | PixCloak",
      description: "The requested page could not be found. Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
    };
  }

  const title = buildTitle(guide);
  const description = buildDescription(guide);
  const alternates = buildAlternates(guide);

  return {
    title,
    description,
    alternates,
    openGraph: {
      title: title.replace(" | PixCloak", ""),
      description,
      url: `/guides/long-tail/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: title.replace(" | PixCloak", ""),
      description,
    },
  };
}

export default async function LongTailGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = LONG_TAIL_GUIDE_MAP.get(slug);

  if (!guide) {
    notFound();
  }

  const description = buildDescription(guide);
  const actionTitle = getActionTitle(guide);
  const actionSentence = getActionSentence(guide);
  const h1 = `How to ${toSentenceCase(actionSentence)}`;
  const target = getTargetLabel(guide);
  const toolLabel = getToolLabel(guide.action);
  const steps = getSteps(guide);
  const tips = getTips(guide);
  const useCases = getUseCases(guide);
  const faqItems = getFaqItems(guide);
  const relatedLinks = getRelatedLinks(guide.action);
  const nextAction = getNextAction(guide);
  const pageUrl = `${SITE_URL}/guides/long-tail/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: h1,
    description,
    datePublished: PUBLISHED_AT,
    dateModified: MODIFIED_AT,
    author: { "@type": "Organization", name: "PixCloak" },
    publisher: {
      "@type": "Organization",
      name: "PixCloak",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` },
    },
    mainEntityOfPage: pageUrl,
    image: `${SITE_URL}/og.png`,
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: h1,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.body,
    })),
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Guides", url: "/guides" },
          { name: actionTitle, url: `/guides/long-tail/${slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <div className="container" style={{ display: "grid", gap: 16 }}>
        <div className="card">
          <h1>{h1}</h1>
          <p className="text-muted" style={{ fontSize: 14, marginBottom: 12 }}>Last reviewed: April 2026.</p>
          <p className="text-muted">
            If you need to {actionSentence}, this guide gives you a repeatable
            workflow with PixCloak. Everything runs locally in your browser, so
            files never leave your device and you keep full control of sensitive
            assets. We focus on hitting {target} while preserving clarity, clean
            edges, and reliable upload results.
          </p>
          <p className="text-muted">
            You will also learn how to verify outputs before upload, which
            formats work best, and how to avoid common mistakes that trigger
            platform re-compression. The steps are short, but the reasoning
            matters: predictable outputs reduce rework and keep every upload
            consistent.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
            <Link className="pill" href={guide.toolPath}>
              Open {toolLabel}
            </Link>
            <Link className="pill" href="/compress">
              Free Image Compressor
            </Link>
            <span className="pill-ghost">Offline processing</span>
            <span className="pill-ghost">No uploads</span>
          </div>
        </div>

        <div className="card" style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}>
          <h2 style={{ marginBottom: 8 }}>Next step: {nextAction.title}</h2>
          <p style={{ marginTop: 0 }}>{nextAction.body}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link className="button" href={nextAction.href}>
              Start with PixCloak
            </Link>
            <Link className="pill" href="/tools/platform-checker">
              Check upload limits first
            </Link>
            <Link className="pill" href="/tools/exif-checker">
              Check EXIF/GPS
            </Link>
          </div>
        </div>

        <div className="card">
          <h2>Why {actionTitle}?</h2>
          <p>
            Platforms enforce size and dimension limits to keep pages fast and
            layouts consistent. When files are too large, uploads can fail, and
            platforms often re-compress images with settings you cannot control.
            Hitting {target} yourself means you decide the trade-offs between
            quality and size, which keeps visuals professional and predictable.
          </p>
          <p>
            Smaller, well-sized assets also improve Core Web Vitals and mobile
            performance. A standard target helps teams avoid mixed quality and
            inconsistent results across campaigns. When every asset is prepared
            the same way, reviews are faster and re-uploads are rare.
          </p>
        </div>

        <div className="card">
          <h2>How to {actionSentence}: Step-by-step</h2>
          <ol style={{ paddingLeft: 18 }}>
            {steps.map((step) => (
              <li key={step.title} style={{ marginBottom: 10 }}>
                <strong>{step.title}:</strong> {step.body}
              </li>
            ))}
          </ol>
        </div>

        <div className="card">
          <h2>Tips &amp; Best Practices</h2>
          <ul style={{ paddingLeft: 18 }}>
            {tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2>When to use this workflow</h2>
          <p>
            Use this process when you need reliable uploads, consistent visuals,
            or faster load times. It is especially useful for assets that appear
            repeatedly across pages or campaigns, where small quality drift
            becomes obvious.
          </p>
          <p>
            If you need print-ready assets or archival quality, keep a master
            copy and only apply these steps to the version you plan to publish.
            Avoid upscaling low-resolution files, because resizing cannot
            recreate missing detail.
          </p>
          <ul style={{ paddingLeft: 18 }}>
            {useCases.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2>FAQ</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3 style={{ marginBottom: 6 }}>{item.question}</h3>
                <p className="text-muted" style={{ margin: 0 }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>Related guides</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {relatedLinks.map((link) => (
              <Link key={link.url} href={link.url} className="pill">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <FaqJsonLd items={faqItems} />
    </>
  );
}
