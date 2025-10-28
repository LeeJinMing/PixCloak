import type { Metadata } from 'next';
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "How to Reduce Image File Size (Free, 2 Minutes) | PixCloak",
  description: "Reduce image file size in 3 steps: resize to 1920px, compress to target KB, remove EXIF. Free tool, no uploads. Works for JPEG, PNG, WebP.",
  alternates: {
    canonical: '/guides/how-to-reduce-image-file-size',
    languages: {
      'x-default': '/guides/how-to-reduce-image-file-size',
      en: '/guides/how-to-reduce-image-file-size',
    },
  },
  openGraph: {
    title: "How to Reduce Image File Size (Free, 2 Minutes)",
    description: "Step-by-step: resize, compress, remove metadata. Reduce file size by 50-90% with minimal quality loss. Free browser tool.",
    url: "/guides/how-to-reduce-image-file-size",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Reduce Image File Size",
    description: "Resize → Compress → Target KB. Free tool, 2 minutes. For web, email, social.",
  },
};

export default function HowToReduceImageFileSize() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'How to Reduce Image File Size', url: '/guides/how-to-reduce-image-file-size' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>How to Reduce Image File Size (Free, 2 Minutes)</h1>

          <h2>Quick Answer</h2>
          <p><strong>3 steps to reduce image file size by 50-90%:</strong></p>
          <ol>
            <li><strong>Resize</strong> to 1920px longest side (removes unnecessary pixels screens can't display)</li>
            <li><strong>Compress</strong> to JPEG 80% or WebP 75% (removes data humans can't see)</li>
            <li><strong>Remove EXIF</strong> metadata (saves additional 10-50KB, protects privacy)</li>
          </ol>
          <p><a href="/compress">👉 Try free tool (works in browser, no upload) →</a></p>
          <p><strong>Result:</strong> 2-4MB camera photos reduce to 300-500KB, perfect for websites, email, social media.</p>

          <h2>Why Reduce Image File Size?</h2>

          <h3>1. Website Speed & SEO</h3>
          <p>
            <strong>Google penalizes slow-loading images.</strong> Core Web Vitals measure Largest Contentful Paint (LCP)—images over 500KB hurt
            your score, lowering search rankings. Images under 500KB load in under 2.5 seconds on 4G, earning "Good" ratings and better SEO.
          </p>
          <p>
            <strong>Conversion rates drop with slow loading.</strong> Amazon found every 100ms of load time costs 1% in sales. If your e-commerce
            site loads in 5 seconds instead of 3 seconds, you lose 20% of potential customers who bounce before page finishes loading.
          </p>

          <h3>2. Email Delivery & Limits</h3>
          <p>
            <strong>Email providers have attachment limits.</strong> Gmail: 25MB, Outlook: 20MB, Yahoo: 25MB. But large emails bounce, get flagged
            as spam, or take minutes to send on slow connections. Keep images at 200-500KB each, total email under 10MB for reliable delivery.
          </p>
          <p>
            <strong>Gmail clips emails over 102KB.</strong> If email body (HTML + inline images) exceeds 102KB, Gmail shows "[Message clipped] View
            entire message" link. Recipients must click to see full content—many don't, assuming email is complete. Solution: keep images at 200KB
            or use attachments instead of inline.
          </p>

          <h3>3. Social Media Upload Requirements</h3>
          <p>
            <strong>Platforms have file size limits:</strong> Instagram: 30MB, Facebook: 4MB per photo, Twitter: 5MB, LinkedIn: 10MB. Exceed these,
            uploads fail or get heavily re-compressed (quality loss). Starting with 500KB images ensures platform compression doesn't degrade quality.
          </p>
          <p>
            <strong>Mobile uploads on slow networks:</strong> Uploading 3MB photo on 3G takes 30-60 seconds. Uploading 500KB photo takes 5-10 seconds.
            Smaller files mean faster uploads, less frustration, more likely to complete post.
          </p>

          <h3>4. Storage & Bandwidth Costs</h3>
          <p>
            <strong>Website hosting bandwidth costs money.</strong> If your website gets 10,000 monthly visitors viewing 5 images each (50,000 image
            loads), using 500KB instead of 2MB images saves 75GB bandwidth monthly—that's $5-15/month in hosting costs, or staying within free tier
            limits instead of upgrading.
          </p>
          <p>
            <strong>Cloud storage fills up fast.</strong> Google Photos free tier ended 2021—now you pay for storage. iPhone users run out of iCloud
            space. Reducing image file size by 75% means 4x more photos fit in same storage, delaying need for paid upgrades.
          </p>

          <h2>Method 1: Resize First (50-70% Reduction)</h2>
          <p><strong>This is the most important step—always resize before compressing.</strong></p>

          <h3>Why Resizing Works</h3>
          <p>
            Your camera outputs 4000x3000px photos (12 megapixels). Your laptop screen is 1920x1080px (2 megapixels). The extra 10 million pixels
            are invisible on screens—removing them loses zero visible quality while dramatically reducing file size.
          </p>

          <h3>Recommended Sizes by Use Case</h3>
          <ul>
            <li><strong>Websites/blogs:</strong> 1920px longest side (fits desktop screens, looks sharp on Retina displays)</li>
            <li><strong>Mobile-only content:</strong> 1080px longest side (mobile screens rarely exceed 1080px)</li>
            <li><strong>Email:</strong> 800px longest side (email clients display at 600px max—800px covers Retina)</li>
            <li><strong>Social media:</strong> 1080x1080px for Instagram, 1200x675px for Twitter, 1200x627px for LinkedIn</li>
            <li><strong>Profile pictures:</strong> 800x800px (platforms display at 200-400px—800px is 2x for Retina)</li>
            <li><strong>Thumbnails:</strong> 400px longest side (thumbnails display at 200px or less)</li>
          </ul>

          <h3>How to Resize</h3>
          <p>Use <a href="/guides/resize-to-1920">our resize tool</a> or any image editor:</p>
          <ul>
            <li><strong>Maintain aspect ratio:</strong> Don't stretch or squash—keep original proportions</li>
            <li><strong>Use bicubic interpolation:</strong> Best quality for downsizing (most editors default to this)</li>
            <li><strong>Never upsize:</strong> Enlarging images creates blurry, pixelated results—always make smaller, never larger</li>
          </ul>

          <h3>File Size After Resize</h3>
          <p>Example: 4000x3000px photo (12MP) at 5MB → resize to 1920x1440px (2.7MP) = 1.5MB (70% reduction) with zero visible quality loss.</p>

          <h2>Method 2: Format Conversion (25-35% Additional Reduction)</h2>

          <h3>PNG to JPEG/WebP (Huge Savings)</h3>
          <p>
            <strong>PNG photos are 10x larger than JPEG.</strong> 1920x1080 PNG photo is 3.5MB; same photo in JPEG 80% is 350KB. That's 90% reduction
            with zero visible difference on screens.
          </p>
          <p><strong>When to convert PNG to JPEG:</strong></p>
          <ul>
            <li>If PNG contains a photo (not screenshot/graphic), always convert to JPEG or WebP</li>
            <li>Exception: PNG with transparency (logo on transparent background)—keep as PNG or convert to WebP</li>
          </ul>

          <h3>JPEG to WebP (Moderate Savings)</h3>
          <p>
            <strong>WebP is 25-35% smaller than JPEG at same quality.</strong> 500KB JPEG becomes 350KB WebP, looks identical. Use WebP for all
            website images—supported by 95%+ of browsers (Chrome, Firefox, Safari, Edge).
          </p>
          <p><strong>When to keep JPEG:</strong></p>
          <ul>
            <li>Email attachments (some older email clients don't display WebP)</li>
            <li>Maximum compatibility needed (ancient browsers, Windows Photo Viewer)</li>
            <li>Printing (print shops prefer JPEG or TIFF)</li>
          </ul>

          <h3>Format Selection Guide</h3>
          <ul>
            <li><strong>For photos on websites:</strong> Use WebP (best compression)</li>
            <li><strong>For photos in email:</strong> Use JPEG (universal compatibility)</li>
            <li><strong>For screenshots with text:</strong> Use PNG (keeps text sharp)</li>
            <li><strong>For logos with transparency:</strong> Use PNG or WebP (transparency support)</li>
          </ul>

          <h2>Method 3: Compression (Additional 40-60% Reduction)</h2>

          <h3>Understanding Quality Settings</h3>
          <p><strong>JPEG/WebP quality scale is 0-100%:</strong></p>
          <ul>
            <li><strong>100%:</strong> Minimal compression, huge files (2-5MB), visually identical to 90%—waste of bandwidth</li>
            <li><strong>90-95%:</strong> Light compression, large files (1-2MB), perfect quality—use only for printing</li>
            <li><strong>80-85%:</strong> ⭐ Optimal compression, moderate files (300-500KB), excellent quality—use for web/email</li>
            <li><strong>70-75%:</strong> Moderate compression, small files (200-300KB), acceptable quality—use for thumbnails</li>
            <li><strong>60%:</strong> Heavy compression, tiny files (150KB), visible artifacts—avoid unless forced</li>
            <li><strong>Below 60%:</strong> Extreme compression, obvious quality loss—never use</li>
          </ul>

          <h3>Recommended Settings</h3>
          <ul>
            <li><strong>Websites/blogs:</strong> JPEG 80% or WebP 75% → 300-500KB for 1920px images</li>
            <li><strong>Email:</strong> JPEG 80% → 200KB for 800px images</li>
            <li><strong>Social media:</strong> JPEG 85% → 500KB (platforms re-compress anyway)</li>
            <li><strong>Thumbnails:</strong> JPEG 75% or WebP 70% → 100-200KB for 400px images</li>
          </ul>

          <h3>How to Compress</h3>
          <p>Use our <a href="/compress">free compressor</a>:</p>
          <ol>
            <li>Select target KB (100KB, 200KB, 500KB, or custom)</li>
            <li>Upload images (or drag and drop)</li>
            <li>Tool automatically finds optimal quality to hit target KB</li>
            <li>Download single image or ZIP for batch</li>
          </ol>
          <p>Tool processes locally in browser—no uploads, completely private.</p>

          <h2>Method 4: Remove EXIF Metadata (Additional 10-50KB)</h2>

          <h3>What is EXIF?</h3>
          <p>Photos contain hidden metadata:</p>
          <ul>
            <li><strong>GPS coordinates:</strong> Reveals exact location where photo was taken (often your home address)</li>
            <li><strong>Camera info:</strong> Make, model, serial number, lens used</li>
            <li><strong>Shooting settings:</strong> ISO, aperture, shutter speed, focal length</li>
            <li><strong>Date/time:</strong> When photo was taken</li>
            <li><strong>Software:</strong> Editor used (Photoshop, Lightroom)</li>
            <li><strong>Photographer name:</strong> Copyright, creator info</li>
          </ul>

          <h3>Why Remove EXIF?</h3>
          <ul>
            <li><strong>Privacy protection:</strong> GPS reveals home addresses—stalkers, burglars use this. Remove EXIF before sharing publicly.</li>
            <li><strong>File size reduction:</strong> EXIF adds 10-50KB per image. For batch of 50 photos, removing EXIF saves 500KB-2.5MB.</li>
            <li><strong>GDPR compliance:</strong> GPS/location data is personal information. Sharing publicly may violate privacy laws.</li>
            <li><strong>Professional appearance:</strong> Photos for clients shouldn't leak your camera gear or shooting secrets.</li>
          </ul>

          <h3>How to Remove EXIF</h3>
          <p>Our compressor automatically strips all EXIF/GPS on export—you don't need to remember. Every downloaded image has metadata removed for privacy.</p>
          <p><a href="/guides/export-without-metadata">More on EXIF removal →</a></p>

          <h2>Complete Workflow: Maximum File Size Reduction</h2>

          <h3>Example: 4000x3000px Camera Photo (5MB)</h3>
          <p><strong>Goal:</strong> Reduce to 500KB for website featured image</p>
          <ol>
            <li><strong>Original:</strong> 4000x3000px, 5MB (too large for web)</li>
            <li><strong>After resize to 1920x1440px:</strong> 1.5MB (70% reduction, zero visible loss)</li>
            <li><strong>After convert to WebP:</strong> 1MB (33% additional reduction)</li>
            <li><strong>After compress to 75% quality:</strong> 520KB (48% additional reduction)</li>
            <li><strong>After remove EXIF:</strong> 500KB (4% additional reduction)</li>
          </ol>
          <p><strong>Total reduction: 90% (5MB → 500KB)</strong>, excellent quality maintained, perfect for web display.</p>

          <h3>Time Required</h3>
          <ul>
            <li><strong>Single image:</strong> 30-60 seconds</li>
            <li><strong>Batch of 10 images:</strong> 2-3 minutes</li>
            <li><strong>Batch of 50 images:</strong> 5-10 minutes</li>
          </ul>

          <h2>Tools to Reduce Image File Size</h2>

          <h3>PixCloak (Recommended)</h3>
          <p><strong>Why we recommend our own tool:</strong></p>
          <ul>
            <li>✅ 100% local processing (no uploads, complete privacy)</li>
            <li>✅ Exact KB targeting (hit 200KB, 500KB, 1MB precisely)</li>
            <li>✅ Batch processing unlimited (compress 1 or 100 images free)</li>
            <li>✅ Automatic EXIF removal (privacy protection built-in)</li>
            <li>✅ Works offline (Progressive Web App, install on phone)</li>
            <li>✅ No account needed, no file limits, always free</li>
          </ul>
          <p><a href="/compress">Try PixCloak compressor →</a></p>

          <h3>Alternative Tools</h3>
          <p><strong>For resizing:</strong></p>
          <ul>
            <li>Windows: Photos app (built-in), Paint (basic), GIMP (free, advanced)</li>
            <li>Mac: Preview (built-in), Photos (built-in)</li>
            <li>Online: Our resize tool, BeFunky, ResizePixel</li>
          </ul>
          <p><strong>For compression:</strong></p>
          <ul>
            <li>TinyPNG (requires upload, 20 image limit free)</li>
            <li>Squoosh (Google, local processing, single image only)</li>
            <li>ImageOptim (Mac only, local processing)</li>
          </ul>

          <h2>Common Mistakes to Avoid</h2>

          <h3>Mistake 1: Compressing Before Resizing</h3>
          <p><strong>Wrong order:</strong> Compress 4000px image to 500KB → poor quality (forced to use quality 50-60%)</p>
          <p><strong>Correct order:</strong> Resize to 1920px first, then compress to 500KB → excellent quality (can use quality 80-85%)</p>

          <h3>Mistake 2: Over-Compressing for Marginal Gains</h3>
          <p><strong>Not worth it:</strong> Going from 550KB to 500KB by dropping quality 85% → 75% often causes visible quality loss for minimal file size benefit.</p>
          <p><strong>Better approach:</strong> If within 10% of target, stop compressing. 550KB loads just as fast as 500KB on modern connections.</p>

          <h3>Mistake 3: Using Wrong Format</h3>
          <p><strong>Common error:</strong> Keeping PNG for photos (3.5MB) when JPEG would be 350KB (10x smaller, looks identical)</p>
          <p><strong>Fix:</strong> Use JPEG or WebP for all photos. Reserve PNG for screenshots with text or logos with transparency.</p>

          <h3>Mistake 4: Re-Compressing Already-Compressed Images</h3>
          <p><strong>Quality degrades rapidly:</strong> Download from Instagram (already compressed) → compress again → quality loss</p>
          <p><strong>Solution:</strong> Always compress from original camera exports or uncompressed source files.</p>

          <h3>Mistake 5: Not Testing on Mobile</h3>
          <p><strong>Desktop hides artifacts:</strong> Image looks fine on large monitor, terrible on phone screen</p>
          <p><strong>Always test:</strong> View compressed image on actual mobile device before considering it done.</p>
        </div>

        <div className="card">
          <h2>Try Free Image Compressor</h2>
          <p>Reduce image file size by 50-90% in 2 minutes:</p>
          <a href="/compress" style={{ padding: '12px 24px', background: '#0070f3', color: 'white', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, display: 'inline-block', marginTop: '12px' }}>
            Reduce Image Size Now →
          </a>
        </div>

        <div className="card">
          <h2>Related Guides</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="/guides/how-to-compress-image-without-losing-quality" className="pill">Compress without losing quality</a>
            <a href="/guides/resize-to-1920" className="pill">Resize to 1920px</a>
            <a href="/guides/compress-to-200kb" className="pill">Compress to 200KB</a>
            <a href="/guides/compress-to-500kb" className="pill">Compress to 500KB</a>
            <a href="/guides/export-without-metadata" className="pill">Remove EXIF data</a>
          </div>
        </div>

        <FaqJsonLd
          items={[
            { question: "How do I reduce image file size for free?", answer: "Resize to 1920px, compress to JPEG 80% or WebP 75%, remove EXIF metadata. Use free browser tool at pixcloak.com/compress—no uploads, automatic quality optimization, unlimited images. Reduces file size by 50-90% with minimal quality loss. Works on iPhone, Android, desktop." },
            { question: "What is the best way to reduce image file size without losing quality?", answer: "Resize to appropriate dimensions first (1920px for web), then compress to JPEG 80-85% or WebP 75-80%. This removes pixels screens can't display (zero loss) and data humans can't see (imperceptible loss). Result: 50-90% smaller files, excellent quality maintained." },
            { question: "How much can I reduce image file size?", answer: "Typical results: 4000x3000px camera photo (5MB) → resize to 1920x1440px + WebP 75% + remove EXIF = 500KB. That's 90% reduction with excellent quality for web/email. More aggressive: 100KB target for small avatars, 200KB for profile pictures, 1MB for high-quality portfolios." },
            { question: "Why is my image file size so large?", answer: "Cameras output 4000px+ images with 12+ megapixels (5-10MB files). Your screen only displays 1920px (2 megapixels). Extra pixels are invisible on screens but increase file size dramatically. Solution: resize to screen size (1920px), reduces file size 70% with zero visible loss." },
            { question: "How to reduce image file size on iPhone?", answer: "Open Safari browser, visit pixcloak.com/compress, tap Choose Files, select photos, set target KB (200KB, 500KB), tap Compress, download. No app needed—works in browser. Reduces iPhone photos (2-4MB) to target size in 2-3 seconds. Processes locally, no uploads." },
            { question: "Can I reduce image file size without an app?", answer: "Yes—use browser-based compressor at pixcloak.com/compress. Works on iPhone, Android, desktop without app installation. Processes images locally in browser (no uploads). Resize, compress, remove EXIF all in one tool. No account, no limits, free forever." },
            { question: "How to reduce image file size for email?", answer: "Resize to 800px width, compress to JPEG 80%, target 200KB per image. Email clients display at 600px max—800px covers Retina displays. Keep total email under 10MB (about 50 images at 200KB each). Gmail clips emails over 102KB, so fewer inline images or use attachments." },
            { question: "Does reducing image file size affect quality?", answer: "Minimal effect if done correctly. Resize to 1920px (removes invisible pixels), compress to JPEG 80% (removes imperceptible data)—result looks excellent on screens. Only noticeable if printing at poster size (16x20 inches). For web/email/social, quality loss is imperceptible." },
          ]}
        />
      </div>
    </>
  );
}

