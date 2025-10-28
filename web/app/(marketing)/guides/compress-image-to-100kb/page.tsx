import type { Metadata } from "next";
import { FaqJsonLd } from "@/components/SeoJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "How to Compress Images to 100KB (Free, No Quality Loss)",
  description: "Reduce image file size to exactly 100KB for forms, applications, and uploads. Simple 3-step guide works on any device—no app download. Supports JPEG, PNG, WebP.",
  alternates: {
    canonical: "/guides/compress-image-to-100kb",
    languages: {
      'x-default': "/guides/compress-image-to-100kb",
      en: "/guides/compress-image-to-100kb",
    }
  },
  openGraph: {
    title: "How to Compress Images to 100KB (Free, No Quality Loss)",
    description: "Reduce image file size to exactly 100KB for forms, applications, and uploads. Simple 3-step guide works on any device—no app download.",
    url: "/guides/compress-image-to-100kb",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Compress Images to 100KB",
    description: "Reduce image file size to exactly 100KB. Simple 3-step guide, no app download needed.",
  },
};

export default function GuideCompress100KB() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Compress to 100KB', url: '/guides/compress-image-to-100kb' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>How to Compress Images to 100KB</h1>

          <h2>Why Compress Images to 100KB?</h2>
          <p>
            Many online forms, government portals, and job application systems impose strict 100KB file size limits.
            Modern smartphone cameras produce 3-10MB photos, which are rejected by these upload forms.
            Compressing images to exactly 100KB ensures your files meet requirements without quality compromise visible on screens.
          </p>
          <p>
            Common scenarios requiring 100KB images include: passport/visa applications (many countries require under 100KB),
            government ID portals, some job application systems (especially in Europe and Asia), scholarship applications,
            and certain contest/registration forms. Failing to meet these limits results in upload errors and application delays.
          </p>

          <h2>How to Compress Images to 100KB: Step-by-Step</h2>
          <ol>
            <li>
              <strong>Open the compression tool</strong>: Visit <a href="/compress?kb=100">/compress?kb=100</a> to load
              the compressor with 100KB preset already selected. This works on any device—iPhone, Android, Windows, Mac—no app download needed.
            </li>
            <li>
              <strong>Upload your image</strong>: Drag and drop your photo, or click &quot;Choose Files&quot; to select from your device.
              Multiple images can be processed simultaneously. Files never leave your browser—everything runs locally for maximum privacy.
            </li>
            <li>
              <strong>Set target to 100KB</strong>: If not pre-selected, enter &quot;100&quot; in the Target KB field.
              The tool will automatically calculate the optimal compression settings to reach exactly 100KB.
            </li>
            <li>
              <strong>Choose format</strong>: WebP produces smallest files (best for 100KB target). JPEG is more compatible.
              PNG only for screenshots/graphics with text—photos compress poorly as PNG at 100KB.
            </li>
            <li>
              <strong>Resize if needed</strong>: For high-resolution photos (4000x3000px+), resize longest side to 1920px or 1280px first.
              This dramatically improves quality at 100KB. Most forms display images at 800-1200px maximum anyway.
            </li>
            <li>
              <strong>Preview and adjust</strong>: Check the preview. If quality isn&#39;t acceptable, try: reducing dimensions further (1280px → 960px),
              switching format (JPEG → WebP), or cropping unnecessary background.
            </li>
            <li>
              <strong>Download</strong>: Click &quot;Download&quot; for single files or &quot;Download ZIP&quot; for batch processing.
              Verify file size in your downloads folder—should be under 100KB.
            </li>
          </ol>

          <h2>Tips & Best Practices</h2>
          <ul>
            <li><strong>Resize before compressing</strong>: Downscale to 1920px or 1280px longest side first. This maintains better visual quality at 100KB than compressing a 4000px image.</li>
            <li><strong>Use WebP when possible</strong>: WebP achieves 30-40% smaller file sizes than JPEG. For 100KB targets, this means noticeably better quality.</li>
            <li><strong>Crop tight</strong>: Remove unnecessary background, sky, or empty space. A well-cropped 100KB image looks better than a wide-angle 100KB shot.</li>
            <li><strong>Avoid heavy compression on faces</strong>: If the image includes faces (passport photos, profile pictures), prioritize face area by cropping closer. Compression artifacts on faces are more noticeable.</li>
            <li><strong>Test on actual form</strong>: Some systems claim &quot;100KB limit&quot; but actually accept 100.5KB or even 110KB. Test with your compressed file—if rejected, aim for 95KB to be safe.</li>
            <li><strong>Don&#39;t over-sharpen</strong>: Heavily compressed images + sharpening = visible artifacts. Use natural photos without post‑processing filters.</li>
            <li><strong>Batch process smartly</strong>: If compressing multiple images to 100KB, verify each one individually. Different photos may need different resize dimensions to maintain quality.</li>
            <li><strong>Keep originals</strong>: Always keep original high-resolution photos. Compression is lossy—you can&#39;t restore quality later.</li>
          </ul>

          <h2>When to Use 100KB Compression</h2>
          <p><strong>Best for:</strong></p>
          <ul>
            <li>Government forms: Passport applications, visa photos, national ID portals (especially in India, Bangladesh, Philippines)</li>
            <li>Job applications: Resume attachments, profile photos for strict HR systems</li>
            <li>Scholarship/exam registrations: Many educational portals have 100KB hard limits</li>
            <li>Low-bandwidth scenarios: Sharing photos in regions with slow internet</li>
            <li>Archival: When you need thousands of photos stored in minimal space</li>
          </ul>
          <p><strong>NOT recommended for:</strong></p>
          <ul>
            <li>Printing: 100KB images will appear pixelated in print. Use original resolution (300 DPI, several MB).</li>
            <li>Professional portfolios: Use 500KB-1MB for portfolio images to showcase quality.</li>
            <li>Large displays: If images will be viewed on 4K monitors or TVs, use 200-500KB minimum.</li>
            <li>Photography contests: Unless specifically required, use higher quality (1-5MB) to show detail.</li>
          </ul>
          <p><strong>Alternatives:</strong></p>
          <ul>
            <li>If quality at 100KB is too low, check if the form accepts <a href="/guides/compress-to-200kb">200KB</a> instead.</li>
            <li>For web use where no strict limit exists, use <a href="/guides/compress-to-500kb">500KB</a> for better balance.</li>
            <li>For social media profiles, <a href="/guides/avatar-200kb">200KB avatars</a> are standard.</li>
          </ul>
        </div>

        <div className="card">
          <h2>Related Guides</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="/guides/compress-to-200kb" className="pill">Compress to 200KB</a>
            <a href="/guides/compress-to-500kb" className="pill">Compress to 500KB</a>
            <a href="/guides/convert-jpeg-to-webp" className="pill">Convert JPEG to WebP</a>
            <a href="/guides/resize-longest-side" className="pill">Resize images</a>
            <a href="/guides/avatar-200kb" className="pill">Create profile picture</a>
          </div>
        </div>

        <FaqJsonLd
          items={[
            {
              question: "How to compress an image to exactly 100KB?",
              answer: "Use our compression tool with the 100KB target preset. Resize longest side to 1920px or lower first for best quality. Choose WebP format for smallest file size. The tool automatically adjusts compression to hit exactly 100KB."
            },
            {
              question: "Will 100KB reduce image quality?",
              answer: "Yes, but quality loss depends on original size. A 4000x3000px photo resized to 1280px then compressed to 100KB looks good on screens. Without resizing, quality suffers. Use WebP format to minimize visible artifacts."
            },
            {
              question: "Is 100KB enough for passport photos?",
              answer: "Yes. Most passport/visa systems requiring 100KB also specify dimensions (600x600px or similar). At these small dimensions, 100KB provides acceptable quality. Follow official dimension requirements closely."
            },
            {
              question: "Can I compress multiple images to 100KB at once?",
              answer: "Yes. Our batch tool processes multiple images simultaneously, applying the same 100KB target to each. Download all as a ZIP file for convenience."
            },
            {
              question: "Does compressing to 100KB remove EXIF/GPS data?",
              answer: "Yes. Compression removes metadata including EXIF, GPS coordinates, and camera info automatically. This protects your privacy when uploading to public forms."
            },
            {
              question: "What's the best format for 100KB images?",
              answer: "WebP produces smallest file sizes (30-40% smaller than JPEG). Use WebP when the upload form accepts it. If unsure, use JPEG—it's universally compatible. Avoid PNG for photos; it compresses poorly."
            },
            {
              question: "Why is my 100KB image rejected by the form?",
              answer: "Some systems have additional requirements: specific dimensions (e.g., 600x600px), format restrictions (JPEG only), or aspect ratio rules. Check the form's detailed specifications beyond just file size."
            },
            {
              question: "Can I compress images to 100KB on my phone?",
              answer: "Yes. Our tool works in mobile browsers (Safari on iPhone, Chrome on Android). No app download needed. Simply visit the website, upload photos, and compress directly in your browser."
            },
          ]}
        />
      </div>
    </>
  );
}


