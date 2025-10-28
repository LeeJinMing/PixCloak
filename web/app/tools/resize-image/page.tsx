import type { Metadata } from 'next';
import Client from './Client';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Free Image Resizer: Resize to Exact Dimensions... | PixCloak",
  description: "Resize images to exact dimensions (1920px, 1080px) or percentages. Batch resize 100+ images. Works locally—no uploads. For web, Instagram, email.",
  alternates: {
    canonical: "/tools/resize-image",
    languages: {
      "x-default": "/tools/resize-image",
      en: "/tools/resize-image",
    },
  },
  openGraph: {
    title: "Free Image Resizer: Resize to Exact Dimensions (No Upload)",
    description: "Resize to 1920px, 1080px, or custom dimensions. Batch processing. Works locally. Free, unlimited.",
    url: "/tools/resize-image",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Resizer: Resize to Exact Dimensions",
    description: "Resize images locally in browser. No uploads. Batch processing. Free.",
  },
};

export default function ResizeImagePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Tools', url: '/tools' },
        { name: 'Resize Image', url: '/tools/resize-image' }
      ]} />

      <SoftwareAppJsonLd
        name="Free Image Resizer"
        url="/tools/resize-image"
        description="Resize images to exact dimensions or percentages. Batch processing. Works locally in browser, no uploads. Free and unlimited."
      />

      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>Free Image Resizer: Resize to Exact Dimensions (No Upload)</h1>

          <h2>Quick Start</h2>
          <p><strong>Resize images in 3 clicks:</strong></p>
          <ol>
            <li><strong>Upload images</strong> (drag & drop or click)</li>
            <li><strong>Choose size</strong>: 1920px web, 1080px mobile, 800px email, or custom dimensions</li>
            <li><strong>Download</strong> resized images (single or ZIP for batch)</li>
          </ol>
          <p><strong>Works locally in browser. No uploads. Free, unlimited.</strong></p>
        </div>

        <Client />

        <div className="card">
          <h2>Why Resize Images?</h2>

          <h3>1. Website Speed & SEO</h3>
          <p>
            <strong>Large images slow down websites.</strong> A 4000x3000px photo (5MB) takes 15-30 seconds to load on 3G.
            Google penalizes slow sites—Core Web Vitals measure Largest Contentful Paint (LCP). Images over 2.5 seconds
            hurt rankings.
          </p>
          <p>
            <strong>Resize before upload saves bandwidth.</strong> Resizing 4000px to 1920px reduces file size by 75%
            with zero visible quality loss. Your 1920px screen can't display 4000px anyway—extra pixels are wasted.
          </p>

          <h3>2. Social Media Requirements</h3>
          <p><strong>Platforms have size limits and recommendations:</strong></p>
          <ul>
            <li><strong>Instagram post:</strong> 1080x1080px (square), 1080x1350px (portrait)</li>
            <li><strong>Instagram Story:</strong> 1080x1920px (9:16 ratio)</li>
            <li><strong>Facebook post:</strong> 1200x630px, 2048x2048px max</li>
            <li><strong>Twitter:</strong> 1200x675px (16:9), 5MB max file size</li>
            <li><strong>LinkedIn post:</strong> 1200x627px (1.91:1 ratio)</li>
            <li><strong>Pinterest:</strong> 1000x1500px (2:3 ratio)</li>
          </ul>
          <p>
            Uploading wrong sizes gets auto-cropped by platform—cutting off important parts. Resize beforehand to control
            what gets cropped.
          </p>

          <h3>3. Email Delivery</h3>
          <p>
            <strong>Email providers have attachment limits.</strong> Gmail: 25MB, Outlook: 20MB. Large attachments bounce
            or get flagged as spam. Inline images over 800px width break layouts in mobile email clients.
          </p>
          <p>
            <strong>Resize to 800px width for email.</strong> Keeps file size under 200KB, loads instantly, displays
            perfectly on mobile (most email readers display at 600px max width—800px provides safety margin).
          </p>

          <h3>4. Storage & Costs</h3>
          <p>
            <strong>Cloud storage fills up fast.</strong> 1000 camera photos at 5MB each = 5GB. Resize to 1920px at 500KB
            each = 500MB (90% savings). Stay within free tier limits (Google Photos 15GB, iCloud 5GB).
          </p>
        </div>

        <div className="card">
          <h2>Common Resize Scenarios</h2>

          <h3>For Websites & Blogs</h3>
          <ul>
            <li><strong>1920px longest side:</strong> Featured images, hero banners, blog posts (fits 1920x1080 desktop screens)</li>
            <li><strong>1200px longest side:</strong> Content images, product photos (balances quality and loading speed)</li>
            <li><strong>800px longest side:</strong> Thumbnails, sidebar images (fast loading, good enough for small displays)</li>
          </ul>
          <p><strong>Why not larger?</strong> Most monitors are 1920px wide. Uploading 4000px images wastes bandwidth—visitors'
            browsers download huge files but display at 1920px. Result: slow page load, high bounce rate, poor SEO.</p>

          <h3>For Social Media</h3>
          <ul>
            <li><strong>Instagram:</strong> 1080x1080px square, 1080x1350px portrait, 1080x1920px Story</li>
            <li><strong>Facebook:</strong> 1200x630px for link previews, 1080x1080px for posts</li>
            <li><strong>Twitter:</strong> 1200x675px (16:9 ratio, matches feed layout)</li>
            <li><strong>LinkedIn:</strong> 1200x627px for posts, 400x400px for profile picture</li>
          </ul>
          <p><strong>Exact dimensions matter.</strong> Off-size images get cropped automatically—faces cut off, text unreadable,
            important elements missing. Resize before uploading to control composition.</p>

          <h3>For Email</h3>
          <ul>
            <li><strong>800px width:</strong> Inline images (displays well on mobile, loads fast)</li>
            <li><strong>600px width:</strong> Email newsletters (standard email template width)</li>
            <li><strong>200x200px:</strong> Email signatures (small enough to not trigger spam filters)</li>
          </ul>

          <h3>For Mobile Devices</h3>
          <ul>
            <li><strong>1080px longest side:</strong> Mobile wallpapers, app backgrounds</li>
            <li><strong>800x800px:</strong> Profile pictures, avatars (2x Retina displays at 400px)</li>
            <li><strong>400px:</strong> Thumbnails, small icons</li>
          </ul>

          <h3>For Print</h3>
          <ul>
            <li><strong>4x6 inches at 300 DPI:</strong> 1200x1800px</li>
            <li><strong>5x7 inches at 300 DPI:</strong> 1500x2100px</li>
            <li><strong>8x10 inches at 300 DPI:</strong> 2400x3000px</li>
          </ul>
          <p><strong>Print needs higher resolution.</strong> Screens display at 72-96 DPI. Print needs 300 DPI for sharp results.
            Don't resize for print—keep originals at full resolution.</p>
        </div>

        <div className="card">
          <h2>How to Resize Images</h2>

          <h3>Method 1: Resize to Preset Dimensions</h3>
          <ol>
            <li><strong>Select preset:</strong> 1920px (web), 1080px (mobile), 800px (email), or choose custom</li>
            <li><strong>Upload images:</strong> Drag & drop or click Choose Files (accepts JPG, PNG, WebP)</li>
            <li><strong>Preview:</strong> Check new dimensions below (aspect ratio maintained automatically)</li>
            <li><strong>Download:</strong> Single image or ZIP for batch</li>
          </ol>
          <p><strong>Aspect ratio is maintained.</strong> If your image is 4000x3000px (4:3) and you resize to 1920px longest side,
            result is 1920x1440px (still 4:3). Width and height scale proportionally—no stretching or distortion.</p>

          <h3>Method 2: Resize to Exact Dimensions</h3>
          <ol>
            <li><strong>Enter custom dimensions:</strong> Width x Height in pixels (e.g., 1200x800)</li>
            <li><strong>Choose fit mode:</strong>
              <ul>
                <li><strong>Contain:</strong> Fit inside dimensions, add padding if needed (no cropping)</li>
                <li><strong>Cover:</strong> Fill dimensions exactly, crop excess (may cut edges)</li>
                <li><strong>Stretch:</strong> Force exact dimensions (distorts image—not recommended)</li>
              </ul>
            </li>
            <li><strong>Upload & download</strong></li>
          </ol>

          <h3>Method 3: Resize by Percentage</h3>
          <ol>
            <li><strong>Choose percentage:</strong> 50% (half size), 75%, 25%</li>
            <li><strong>Upload images:</strong> Tool calculates new dimensions automatically</li>
            <li><strong>Download:</strong> Useful when you need proportional reduction without knowing target pixels</li>
          </ol>
        </div>

        <div className="card">
          <h2>Best Practices for Resizing</h2>

          <h3>1. Resize Before Compressing</h3>
          <p>
            <strong>Always resize first, compress second.</strong> Compressing 4000px to 500KB forces quality below 60%—visible
            artifacts. Resize to 1920px first, then compress to 500KB uses quality 85%—looks excellent.
          </p>
          <p>Wrong order wastes quality. Right order maximizes quality per byte.</p>

          <h3>2. Never Upsize (Enlarge) Images</h3>
          <p>
            <strong>Enlarging creates blurry, pixelated results.</strong> If your image is 800x600px, resizing to 1920x1440px
            doesn't add detail—just makes pixels bigger. Result looks soft, unprofessional.
          </p>
          <p>
            <strong>Solution:</strong> Always start with high-resolution originals. Can't fix low-res images by enlarging. If you
            must enlarge, limit to 150% max—beyond that, quality degrades noticeably.
          </p>

          <h3>3. Maintain Aspect Ratio</h3>
          <p>
            <strong>Stretching distorts images.</strong> A 4:3 photo stretched to 16:9 looks squashed or stretched—faces too
            wide, objects elongated. Always maintain original proportions.
          </p>
          <p>
            <strong>If you need different ratio:</strong> Use crop tool first, resize second. Cropping removes excess without
            distortion. Stretching deforms image.
          </p>

          <h3>4. Use Appropriate Resampling</h3>
          <p>
            <strong>Bicubic interpolation for downsizing.</strong> This tool uses bicubic—best quality for making images smaller.
            Produces sharp, clean results.
          </p>
          <p>
            <strong>Why it matters:</strong> Nearest neighbor (fast but pixelated), bilinear (soft but blurry), bicubic (sharp
            and smooth—best for photos).
          </p>

          <h3>5. Check Results on Target Device</h3>
          <p>
            <strong>Preview on actual device before finalizing.</strong> Resize for Instagram? Check on phone. For website?
            Check on desktop and mobile.
          </p>
          <p>What looks good on desktop may look pixelated on Retina displays, or too large on mobile screens.</p>
        </div>

        <div className="card">
          <h2>Common Mistakes to Avoid</h2>

          <h3>Mistake 1: Resizing After Compressing</h3>
          <p>
            <strong>Wrong order degrades quality.</strong> If you compress 4000px to 500KB (quality 60%), then resize to 1920px,
            you're stuck with quality 60% artifacts in smaller image.
          </p>
          <p>
            <strong>Correct order:</strong> Resize to 1920px (removes unnecessary pixels), then compress to 500KB (quality 85%)—
            much better result.
          </p>

          <h3>Mistake 2: Resizing for Wrong Platform</h3>
          <p>
            <strong>Each platform has optimal sizes.</strong> Resizing to 1920px for Instagram Story (needs 1080x1920) gets
            auto-cropped, cutting top and bottom. Check platform requirements before resizing.
          </p>

          <h3>Mistake 3: Using Wrong Fit Mode</h3>
          <p>
            <strong>"Cover" crops image; "Contain" adds padding.</strong> For exact dimensions, choose fit mode carefully.
            Cover cuts edges; Contain keeps everything but may add borders.
          </p>
          <p>
            <strong>When to use each:</strong> Cover for backgrounds (full coverage, okay to crop edges). Contain for logos
            (keep all elements, okay to add padding).
          </p>

          <h3>Mistake 4: Not Testing Mobile View</h3>
          <p>
            <strong>Desktop looks fine, mobile looks terrible.</strong> Image resized to 1920px loads in 10 seconds on 3G.
            Mobile users see blank space, bounce before image loads.
          </p>
          <p>
            <strong>Solution:</strong> Create mobile-specific sizes (1080px or smaller) for responsive images. Use srcset
            to serve different sizes based on device.
          </p>

          <h3>Mistake 5: Losing Original Files</h3>
          <p>
            <strong>Always keep originals.</strong> Once you resize from 4000px to 1920px, you can't get 4000px back. If you
            need print version later (needs high res), you're stuck.
          </p>
          <p>
            <strong>Workflow:</strong> Keep originals in separate folder. Export resized versions for web/social. Never
            overwrite originals.
          </p>
        </div>

        <div className="card">
          <h2>Batch Resizing</h2>

          <h3>Why Batch Resize?</h3>
          <p>
            <strong>Save time with bulk processing.</strong> Resizing 100 images one-by-one takes 30-60 minutes. Batch resizing
            takes 2-3 minutes total.
          </p>

          <h3>How to Batch Resize</h3>
          <ol>
            <li><strong>Select all images:</strong> Drag entire folder or select multiple files (Ctrl+A or Cmd+A)</li>
            <li><strong>Choose dimensions:</strong> One size applies to all images</li>
            <li><strong>Process:</strong> Tool resizes all images simultaneously</li>
            <li><strong>Download ZIP:</strong> All resized images packaged in one file</li>
          </ol>

          <h3>Batch Processing Limits</h3>
          <ul>
            <li><strong>No file limit:</strong> Process 1 or 1000 images (depends on browser memory)</li>
            <li><strong>Recommended batch size:</strong> 50-100 images per batch (faster, more stable)</li>
            <li><strong>Large batches:</strong> Split into multiple batches if browser slows down</li>
          </ul>
        </div>

        <div className="card">
          <h2>Related Tools</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="/compress" className="pill">Compress Images</a>
            <a href="/tools/crop-image" className="pill">Crop to Aspect Ratio</a>
            <a href="/tools/png-to-jpg" className="pill">PNG to JPG</a>
            <a href="/guides/resize-to-1920" className="pill">Resize to 1920px Guide</a>
            <a href="/guides/compress-to-500kb" className="pill">Compress to 500KB</a>
          </div>
        </div>

        <FaqJsonLd items={[
          { question: "How do I resize an image to exact dimensions?", answer: "Upload image, enter custom width x height (e.g., 1920x1080), choose fit mode (Contain, Cover, or Stretch), download. Works locally in browser—no uploads. Free, unlimited." },
          { question: "Can I resize images for free?", answer: "Yes—this tool is 100% free, unlimited. No account, no watermarks, no file limits. Processes locally in browser, no uploads to server. Works for JPG, PNG, WebP. Batch resize 100+ images at once." },
          { question: "What size should I resize images for website?", answer: "1920px longest side for featured images and hero banners (fits desktop screens). 1200px for content images (balances quality and speed). 800px for thumbnails (fast loading). Always resize before compressing for best quality." },
          { question: "How to resize image without losing quality?", answer: "Resize before compressing (not after). Use bicubic resampling (default in this tool). Never upsize (enlarge)—only downsize. If going below 50% of original, resize in 2 steps (75%, then 50%) for sharper results." },
          { question: "Can I batch resize multiple images at once?", answer: "Yes—upload 1, 10, 100+ images. Select preset or custom dimensions. Tool processes all images simultaneously. Download as ZIP with all resized images. Batch processing is free and unlimited." },
          { question: "How to resize image for Instagram?", answer: "Instagram post: 1080x1080px (square) or 1080x1350px (portrait). Instagram Story: 1080x1920px (9:16 ratio). Use exact dimensions—off-size images get auto-cropped by Instagram, cutting important parts. Resize before uploading to control composition." },
          { question: "Should I resize or crop images first?", answer: "If changing aspect ratio: crop first, resize second. If keeping aspect ratio: resize only (maintains proportions automatically). Never stretch—crops or adds padding for exact dimensions. Maintain aspect ratio whenever possible for best quality." },
          { question: "How to resize images on iPhone without app?", answer: "Use this tool in Safari browser: visit pixcloak.com/tools/resize-image, tap Choose Files, select photos, pick size (1920px, 1080px, custom), download. Works in browser—no app installation. Free, unlimited, no uploads." },
        ]} />
      </div>
    </>
  );
}

