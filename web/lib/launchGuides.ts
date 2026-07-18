export type GuideTopic = "privacy-sharing" | "upload-success" | "web-images";

export type LaunchGuide = {
  slug: string;
  topic: GuideTopic;
  title: string;
  description: string;
  answer: string;
  toolHref: string;
  toolLabel: string;
  steps: string[];
  limitations: string[];
  sources: Array<{ label: string; href: string }>;
};

const exifSource = { label: "CIPA Exif 2.32 specification", href: "https://www.cipa.jp/std/documents/e/DC-008-Translation-2019-E.pdf" };
const canvasSource = { label: "MDN: HTMLCanvasElement.toBlob()", href: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob" };
const fileSource = { label: "MDN: Using files from web applications", href: "https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications" };
const webpSource = { label: "Google: WebP image format", href: "https://developers.google.com/speed/webp" };
const imageSeoSource = { label: "Google Search Central: Image SEO", href: "https://developers.google.com/search/docs/appearance/google-images" };
const webVitalsSource = { label: "web.dev: Optimize LCP", href: "https://web.dev/articles/optimize-lcp" };

export const guideTopics: Record<GuideTopic, { slug: GuideTopic; title: string; description: string; workflowHref: string; workflowLabel: string }> = {
  "privacy-sharing": { slug: "privacy-sharing", title: "Private image sharing", description: "Remove visible identifiers and hidden metadata before a photo or screenshot leaves your device.", workflowHref: "/safe-share", workflowLabel: "Open Safe Share" },
  "upload-success": { slug: "upload-success", title: "Successful image uploads", description: "Diagnose and fix file-size, dimension, and format requirements without uploading the source image.", workflowHref: "/upload-ready", workflowLabel: "Open Upload Ready" },
  "web-images": { slug: "web-images", title: "Website image preparation", description: "Choose useful formats and dimensions for faster pages, search visibility, and complete asset packs.", workflowHref: "/tools", workflowLabel: "Open image tools" },
};

export const launchGuides: LaunchGuide[] = [
  {
    slug: "does-wechat-remove-exif-test", topic: "privacy-sharing", title: "Does WeChat Remove EXIF? Original vs Compressed Test",
    description: "Why messaging behavior is not a privacy guarantee, and how to verify a clean export before sending.",
    answer: "WeChat may transform some sent images, but the result depends on how the file is sent and the client version. Treat that behavior as unverified: inspect the exact file you will share and export a clean copy yourself.",
    toolHref: "/tools/exif-checker", toolLabel: "Inspect this image's metadata",
    steps: ["Select the exact original or downloaded file.", "Check EXIF, GPS, XMP, and IPTC markers.", "Remove metadata, reopen the output, and share only the verified copy."],
    limitations: ["A platform can change behavior without notice.", "HEIC metadata inspection is incomplete in V1.0; convert it before the final check."], sources: [exifSource, fileSource],
  },
  {
    slug: "remove-gps-location-photo", topic: "privacy-sharing", title: "How to Remove GPS Location from a Photo",
    description: "Detect the EXIF GPS pointer, re-encode the image locally, and verify that location metadata is gone.",
    answer: "Use a metadata-aware export, then scan the exported bytes—not just the preview. PixCloak reopens the result and checks supported EXIF, GPS, XMP, and IPTC markers before download.",
    toolHref: "/tools/exif-checker", toolLabel: "Remove and verify GPS metadata",
    steps: ["Open the metadata checker and choose the photo.", "Confirm whether GPS is reported as found.", "Remove metadata and download only after the clean-export verification appears."],
    limitations: ["Removing GPS does not hide visible landmarks or addresses.", "Keep the original if you need location data for your own archive."], sources: [exifSource, canvasSource],
  },
  {
    slug: "blur-pixelate-solid-redaction", topic: "privacy-sharing", title: "Blur vs Pixelate vs Solid Redaction",
    description: "Choose a permanent covering method for faces, plates, IDs, and private text.",
    answer: "A solid block is the clearest privacy choice. Pixelation and strong blur can be appropriate when context matters, but weak blur or coarse pixelation may leave shapes readable. Always inspect the flattened export at full size.",
    toolHref: "/safe-share", toolLabel: "Compare all three redaction modes",
    steps: ["Select the sensitive region at normal zoom.", "Use solid, strong pixelation, or permanent blur.", "Export, reopen, and inspect the exact downloaded pixels."],
    limitations: ["Manual selection can miss small details.", "V1.0 does not automatically detect faces, plates, text, or QR codes."], sources: [canvasSource],
  },
  {
    slug: "redact-id-card-safely", topic: "privacy-sharing", title: "How to Redact an ID Card Safely",
    description: "A conservative checklist for hiding identity numbers, addresses, signatures, and machine-readable regions.",
    answer: "Cover every field the recipient does not explicitly need, including repeated numbers, barcodes, QR codes, signatures, and background documents. Export a new flattened image and remove metadata from that copy.",
    toolHref: "/safe-share", toolLabel: "Prepare an ID image locally",
    steps: ["List the fields the recipient actually needs.", "Cover all other text, codes, faces, signatures, and document numbers.", "Review the export separately from the original before sharing."],
    limitations: ["Requirements vary by recipient and jurisdiction.", "PixCloak does not decide which identity fields a verifier legally needs."], sources: [canvasSource, exifSource],
  },
  {
    slug: "hide-faces-plates-private-text", topic: "privacy-sharing", title: "How to Hide Faces, Plates, and Private Text",
    description: "Use a per-image review queue so one redaction layout is never copied blindly across a batch.",
    answer: "Review each image independently. Draw boxes only after checking that image's faces, plates, names, notifications, codes, and reflected details; batch export should reject files that were not reviewed.",
    toolHref: "/safe-share", toolLabel: "Start the per-image review queue",
    steps: ["Choose one or more images.", "Review every queue item and add its own redaction boxes.", "Export a verified ZIP; retry only failed files."],
    limitations: ["Manual review is intentionally required in V1.0.", "Cropped previews can hide details near the original image edge."], sources: [canvasSource, fileSource],
  },
  {
    slug: "screenshot-privacy-checklist-v1", topic: "privacy-sharing", title: "Screenshot Privacy Checklist",
    description: "A final visual and metadata review before posting a chat, dashboard, map, ticket, or receipt.",
    answer: "Check names, avatars, timestamps, notifications, account IDs, URLs, QR codes, map labels, browser tabs, and background windows. Then remove metadata and reopen the exported file.",
    toolHref: "/safe-share", toolLabel: "Run the Safe Share checklist",
    steps: ["Inspect all four edges and system UI.", "Cover visible identifiers and machine-readable codes.", "Verify metadata and inspect the downloaded result at 100% zoom."],
    limitations: ["Redaction cannot undo information already shared.", "A screenshot can reveal identity through context even after names are hidden."], sources: [canvasSource],
  },
  {
    slug: "compress-image-under-100kb", topic: "upload-success", title: "Compress an Image to Under 100KB",
    description: "Meet a strict 100KB cap with verified output and automatic dimension reduction when quality is not enough.",
    answer: "Set a 100KB hard limit. PixCloak searches for the highest acceptable quality, reduces dimensions only when needed, and rejects any output that still exceeds 102,400 bytes.",
    toolHref: "/upload-ready?kb=100", toolLabel: "Use the verified 100KB preset",
    steps: ["Choose the 100KB preset and preferred format.", "Process the file; allow dimensions to fall if quality alone cannot meet the cap.", "Download only after the actual size and decode verification are shown."],
    limitations: ["Very detailed images may need much smaller dimensions.", "PNG can be inefficient for photographs; JPEG or WebP may preserve more detail under 100KB."], sources: [canvasSource, webpSource],
  },
  {
    slug: "compress-image-under-200kb", topic: "upload-success", title: "Compress an Image to Under 200KB",
    description: "Use a hard 200KB limit instead of guessing a quality slider value.",
    answer: "A quality percentage does not correspond to one file size. Use a byte target, then verify the exported Blob is no larger than 204,800 bytes and can be decoded before download.",
    toolHref: "/upload-ready?kb=200", toolLabel: "Use the verified 200KB preset",
    steps: ["Select 200KB and the portal's accepted format.", "Optionally cap the longest side first.", "Check target, actual size, format, dimensions, quality, and verified status."],
    limitations: ["Some portals use decimal 200,000-byte limits; choose a slightly lower custom target if needed.", "The portal may also enforce pixel dimensions or aspect ratio."], sources: [canvasSource, fileSource],
  },
  {
    slug: "why-upload-portal-rejects-image", topic: "upload-success", title: "Why an Upload Portal Rejects Your Image",
    description: "Separate file-size, pixel-dimension, aspect-ratio, format, corruption, and filename failures.",
    answer: "A small file can still have the wrong dimensions or format. Match every stated requirement, use a simple filename, and verify that the exported image decodes before trying again.",
    toolHref: "/upload-ready", toolLabel: "Match the portal requirements",
    steps: ["Record the maximum bytes, allowed formats, dimensions, and aspect ratio.", "Apply those requirements together rather than changing one value at a time.", "Use the verified output and retry with a plain ASCII filename if the portal is old."],
    limitations: ["PixCloak cannot inspect undocumented server-side portal rules.", "A portal can reject color profiles, animation, or account state for reasons unrelated to image size."], sources: [fileSource],
  },
  {
    slug: "heic-upload-error-convert-locally", topic: "upload-success", title: "HEIC Upload Error: Convert Locally",
    description: "Convert an iPhone HEIC/HEIF photo to a verified JPEG or WebP without sending the source file to a converter server.",
    answer: "Choose JPEG for widest portal compatibility. PixCloak decodes HEIC in a local worker, re-encodes the pixels, and checks that the result opens before download.",
    toolHref: "/tools/heic-converter", toolLabel: "Convert HEIC locally",
    steps: ["Choose the HEIC file and JPEG output.", "Convert and wait for the decoded preview.", "If the portal also has a KB cap, continue to Upload Ready with the JPEG result."],
    limitations: ["Full HEIC metadata inspection is not available in V1.0.", "Unusual HEIF sequences or unsupported codecs may fail with an explicit compatibility message."], sources: [fileSource, canvasSource],
  },
  {
    slug: "reduce-image-size-iphone", topic: "upload-success", title: "Reduce Image Size on iPhone",
    description: "Use Safari to convert HEIC, limit the longest side, and meet a hard KB target locally.",
    answer: "Start with the portal's accepted format and limit. If the photo is HEIC, convert to JPEG; then set 1920 or 2048px longest side and the exact KB cap.",
    toolHref: "/upload-ready?longest=1920", toolLabel: "Use the 1920px mobile preset",
    steps: ["Open the workflow in a current Safari browser.", "Choose the photo and select the portal's target.", "Keep the tab active until verification finishes, then save the result."],
    limitations: ["Large photos need significant memory during local decoding.", "V1.0 is not an offline-installed PWA; keep the page connection available."], sources: [fileSource],
  },
  {
    slug: "file-size-dimensions-format", topic: "upload-success", title: "File Size vs Dimensions vs Format",
    description: "Understand why bytes, pixel count, image content, format, and encoder quality must be considered together.",
    answer: "Dimensions describe pixel count; file size describes encoded bytes. Format and image complexity determine how efficiently those pixels compress, so two 1920×1080 images can have very different sizes.",
    toolHref: "/upload-ready", toolLabel: "Compare formats with one image",
    steps: ["Match required dimensions or longest side.", "Choose JPEG/WebP for photographs and PNG when lossless detail or transparency is essential.", "Apply the byte cap last and inspect the verified result."],
    limitations: ["Encoder output varies by browser.", "Converting a low-quality source to a larger format cannot restore lost detail."], sources: [webpSource, canvasSource],
  },
  {
    slug: "generate-complete-favicon-pack", topic: "web-images", title: "Generate a Complete Favicon Pack",
    description: "Prepare a square source and generate the common browser icon sizes from one local file.",
    answer: "Start with a simple, square, high-resolution source with safe margins. Generate the pack, then inspect the smallest icon rather than assuming a detailed logo remains legible at 16px.",
    toolHref: "/tools/favicon-pack", toolLabel: "Open Favicon Pack in Labs",
    steps: ["Use a square source with transparent or intentional background.", "Generate the available icon sizes locally.", "Inspect 16px and 32px results and add the chosen files to the site's head/manifest."],
    limitations: ["This Labs tool is not indexed until its full browser matrix is complete.", "A generated pack does not replace platform-specific maskable icon design."], sources: [imageSeoSource],
  },
  {
    slug: "webp-vs-jpeg-downloadable-samples", topic: "web-images", title: "WebP vs JPEG with Downloadable Samples",
    description: "Compare real downloadable outputs instead of relying on one universal compression claim.",
    answer: "WebP often produces fewer bytes at a similar visual quality, while JPEG remains a conservative compatibility choice. Test the actual image because texture, noise, gradients, and browser encoders change the result.",
    toolHref: "/tools/png-jpg-converter", toolLabel: "Convert and compare your image",
    steps: ["Encode the same source at comparable visual quality.", "Compare bytes and inspect edges, text, gradients, and fine texture at 100%.", "Choose the format that meets both compatibility and quality requirements."],
    limitations: ["The samples are illustrative, not a universal benchmark.", "Browser canvas encoders may differ from build-time image pipelines."], sources: [webpSource, canvasSource],
  },
  {
    slug: "remove-transparent-padding", topic: "web-images", title: "Remove Transparent Padding from an Image",
    description: "Trim empty alpha around icons and product cutouts without changing visible pixels.",
    answer: "Find the smallest bounding box containing non-transparent pixels, then crop to that box. Keep a deliberate margin if shadows, focus rings, or visual alignment need breathing room.",
    toolHref: "/tools/trim-transparent", toolLabel: "Open Trim Transparent in Labs",
    steps: ["Choose a PNG or WebP with alpha.", "Preview the detected non-transparent bounds.", "Export and confirm the new dimensions in the downloaded image."],
    limitations: ["Near-transparent shadows may be treated as visible content.", "Trimming every asset independently can create inconsistent visual alignment."], sources: [canvasSource],
  },
  {
    slug: "prepare-images-core-web-vitals", topic: "web-images", title: "Prepare Images for Core Web Vitals",
    description: "Reduce LCP risk with correctly sized assets, efficient formats, explicit dimensions, and a stable page layout.",
    answer: "Serve an image close to its rendered dimensions, reserve width and height, avoid lazy-loading the likely LCP image, and compress it without making text or product detail unreadable.",
    toolHref: "/tools/resize-image?longest=1920", toolLabel: "Resize a source image",
    steps: ["Measure the largest rendered slot and device density you support.", "Resize and compare JPEG/WebP output for the actual source.", "Set intrinsic dimensions and verify LCP/CLS in field or lab data after deployment."],
    limitations: ["Image optimization alone cannot fix slow server response or render-blocking CSS.", "Lab results do not replace real-user Core Web Vitals data."], sources: [webVitalsSource, imageSeoSource],
  },
];

export function guideBySlug(slug: string) { return launchGuides.find((guide) => guide.slug === slug); }
export function guidesForTopic(topic: GuideTopic) { return launchGuides.filter((guide) => guide.topic === topic); }
