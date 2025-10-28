import type { Metadata } from 'next';
import { FaqJsonLd, SoftwareAppJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Free Image Tools: Resize, Convert, Compress... | PixCloak",
  description: "20+ free image tools—resize, convert PNG/JPG, crop, watermark, compress, remove background. Works offline, no uploads. For web, social media, photography.",
  alternates: {
    canonical: "/tools",
    languages: { "x-default": "/tools", en: "/tools" }
  },
  openGraph: {
    title: "Free Image Tools: Resize, Convert, Compress (No Upload)",
    description: "20+ free image tools. Works offline, no uploads. For web and social media.",
    url: "/tools",
    type: "website",
  },
};

export default function ToolsPage() {
  const featuredTools = [
    { href: '/tools/resize-image', title: 'Resize Image', desc: 'Resize to 1920px, 1080px, 800px or custom. 3 fit modes. Batch + ZIP.', searches: '395k/mo' },
    { href: '/tools/png-jpg-converter', title: 'PNG ↔ JPG Converter', desc: 'Convert between PNG and JPG. Adjust quality, choose background color.', searches: '544k/mo' },
    { href: '/tools/remove-bg-lite', title: 'Remove Background', desc: 'Remove backgrounds by color. 100% local, no uploads. Free unlimited.', searches: '336k/mo' },
    { href: '/compress', title: 'Image Compressor', desc: 'Compress to exact KB (100KB, 200KB, 500KB). Convert to WebP or JPEG.', searches: '1.2M/mo' },
    { href: '/tools/crop-templates', title: 'Crop Image', desc: 'Crop to 1:1, 4:3, 16:9 for Instagram, Facebook, LinkedIn. Batch support.', searches: '80k/mo' },
    { href: '/tools/favicon-pack', title: 'Favicon Generator', desc: 'Generate all favicon sizes + manifest.json. For web, iOS, Android, PWA.', searches: '58k/mo' },
  ];

  const toolsByCategory = {
    'Format & Conversion': [
      { href: '/tools/png-jpg-converter', title: 'PNG ↔ JPG Converter', desc: 'Convert between PNG and JPG with quality control.' },
      { href: '/tools/webp-converter', title: 'WebP Converter', desc: 'Convert to WebP—25-35% smaller than JPG. Batch + ZIP.' },
      { href: '/tools/dataurl-alt', title: 'Data URL Converter', desc: 'Convert images to Base64 data URLs with alt suggestions.' },
    ],
    'Resize & Crop': [
      { href: '/tools/resize-image', title: 'Resize Image', desc: 'Resize to preset or custom dimensions. Contain/Cover/Stretch modes.' },
      { href: '/tools/crop-templates', title: 'Crop Image', desc: 'Crop to exact aspect ratios (1:1, 4:3, 16:9, 4:5, 9:16, 2:3).' },
      { href: '/tools/aspect-pad', title: 'Aspect Ratio Padder', desc: 'Add padding to achieve target aspect ratio without cropping.' },
      { href: '/tools/trim-transparent', title: 'Trim Transparent', desc: 'Auto-trim transparent edges from PNG images.' },
    ],
    'Privacy & Metadata': [
      { href: '/redact', title: 'Photo Redaction', desc: 'Blur faces, hide license plates, black out text. Remove EXIF/GPS.' },
      { href: '/tools/exif-checker', title: 'EXIF/GPS Checker', desc: 'Detect and remove EXIF/GPS metadata from photos.' },
      { href: '/tools/watermark', title: 'Text Watermark', desc: 'Add custom text watermarks. Batch process. Copyright protection.' },
    ],
    'Design & Branding': [
      { href: '/tools/remove-bg-lite', title: 'Remove Background', desc: 'Remove solid color backgrounds. Export transparent PNG.' },
      { href: '/tools/favicon-pack', title: 'Favicon Generator', desc: 'Generate all favicon sizes (16x16 to 512x512) + manifest.json.' },
      { href: '/tools/og-card', title: 'OG Card Generator', desc: 'Create 1200×630 social media images + meta tags.' },
      { href: '/tools/svg-optimizer', title: 'SVG Optimizer', desc: 'Minify and clean SVG code locally. Reduce file size.' },
      { href: '/tools/text-placeholder', title: 'Text Placeholder', desc: 'Generate text-based placeholder images for mockups.' },
    ],
    'Web Development': [
      { href: '/tools/srcset-generator', title: 'srcset Generator', desc: 'Generate responsive <img> srcset and sizes attributes.' },
      { href: '/tools/lqip', title: 'LQIP Placeholder', desc: 'Create tiny Base64 placeholders with blur for lazy loading.' },
      { href: '/tools/sprite-sheet', title: 'Sprite Sheet', desc: 'Combine images into sprite sheet + JSON coordinate mapping.' },
      { href: '/tools/image-diff', title: 'Image Diff', desc: 'A/B slider comparison and pixel difference visualization.' },
    ],
    'Utilities': [
      { href: '/tools/platform-checker', title: 'Platform Compliance', desc: 'Check if images meet platform KB/dimension requirements.' },
      { href: '/tools/dpi-converter', title: 'DPI/PPI Converter', desc: 'Calculate print size from pixels using DPI/PPI.' },
      { href: '/tools/batch-rename', title: 'Batch Rename', desc: 'Rename multiple images with patterns. Download as ZIP.' },
    ],
  };

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Tools', url: '/tools' }
      ]} />

      <SoftwareAppJsonLd
        name="PixCloak Image Tools"
        url="/tools"
        description="20+ free image tools—resize, convert, compress, crop, watermark. 100% local processing, no uploads."
      />

    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
          <h1>Free Image Tools: Resize, Convert, Compress (No Upload)</h1>
          <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <strong>20+ professional image tools, all free and working locally in your browser.</strong> No uploads, no account required,
            no file size limits. Process images for websites, social media, photography, and design—everything happens on your device.
            Your images never leave your computer.
          </p>
      </div>

        {/* Featured Tools */}
        <div className="card">
          <h2>Featured Tools (Most Popular)</h2>
          <p style={{ fontSize: '14px', marginBottom: '16px' }}>
            Our most-used tools for everyday image tasks. Millions of monthly searches, trusted by web developers, designers, and content creators.
          </p>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {featuredTools.map((tool, i) => (
              <a key={i} href={tool.href} className="card" style={{ display: 'block', background: '#f8f9fa' }}>
            <div style={{ display: 'grid', gap: 6 }}>
                  <div style={{ fontWeight: 700, fontSize: '16px' }}>{tool.title}</div>
                  <div className="text-muted" style={{ fontSize: '14px', lineHeight: '1.5' }}>{tool.desc}</div>
                  <div style={{ fontSize: '12px', color: '#22c55e', fontWeight: 600 }}>{tool.searches} searches</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* All Tools by Category */}
        <div className="card">
          <h2>All Tools by Category</h2>
          {Object.entries(toolsByCategory).map(([category, tools]) => (
            <div key={category} style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '12px', color: '#1a1a1a' }}>{category}</h3>
              <div style={{ display: 'grid', gap: 10 }}>
                {tools.map((tool, i) => (
                  <a key={i} href={tool.href} className="card" style={{ display: 'block', padding: '12px', background: '#fafafa' }}>
                    <div style={{ display: 'grid', gap: 4 }}>
                      <div style={{ fontWeight: 600, fontSize: '15px' }}>{tool.title}</div>
                      <div className="text-muted" style={{ fontSize: '14px' }}>{tool.desc}</div>
            </div>
          </a>
        ))}
      </div>
            </div>
          ))}
        </div>

        {/* Why Use PixCloak Tools */}
        <div className="card">
          <h2>Why Use PixCloak Tools?</h2>

          <h3>100% Local Processing (No Uploads)</h3>
          <p>
            <strong>Your images never leave your device.</strong> All processing happens in your browser using JavaScript and Canvas API.
            No server uploads = no privacy concerns, no data breaches, no surveillance. Perfect for sensitive photos, personal documents,
            confidential designs, or client work. GDPR/CCPA compliant by design.
          </p>

          <h3>Completely Free, No Limits</h3>
          <p>
            <strong>No file size limits, no daily quotas, no "upgrade to premium."</strong> Process 1 image or 1,000 images—always free.
            No account required, no email sign-up, no tracking cookies. Compare to competitors like TinyPNG (20 images/month free),
            Remove.bg (1 free image, then $0.20 each), Compressor.io (limited batch processing). We don't believe in artificial restrictions.
          </p>

          <h3>Works Offline</h3>
          <p>
            <strong>No internet? No problem.</strong> After first page load, tools work offline. Great for photographers on location,
            designers traveling, developers in low-connectivity areas. Your workflow isn't interrupted by spotty Wi-Fi.
          </p>

          <h3>Batch Processing + ZIP Download</h3>
          <p>
            <strong>Process 100+ images at once.</strong> Apply same settings to entire folders—resize, convert, crop, watermark.
            Download all results as single ZIP file. Saves hours compared to one-by-one editing. Essential for event photographers,
            e-commerce product uploads, social media content batches.
          </p>

          <h3>Professional Quality</h3>
          <p>
            <strong>Same algorithms used by Photoshop and professional tools.</strong> High-quality resampling (Lanczos), smart compression,
            accurate color space handling. Results match or exceed paid alternatives. Built by developers who understand image processing
            and web performance.
          </p>
        </div>

        {/* Tools by Use Case */}
        <div className="card">
          <h2>Tools by Use Case</h2>

          <h3>For Website Developers</h3>
          <p><strong>Make your site faster.</strong> Image optimization is #1 way to improve page speed and Core Web Vitals.</p>
          <ul>
            <li><a href="/compress">Image Compressor</a> - Reduce file sizes to exact KB targets (100KB, 200KB, 500KB)</li>
            <li><a href="/tools/webp-converter">WebP Converter</a> - Convert to WebP for 25-35% smaller files</li>
            <li><a href="/tools/resize-image">Resize Image</a> - Downscale to 1920px before compression for massive savings</li>
            <li><a href="/tools/srcset-generator">srcset Generator</a> - Create responsive images for different screen sizes</li>
            <li><a href="/tools/lqip">LQIP Placeholder</a> - Generate low-quality placeholders for lazy loading</li>
          </ul>

          <h3>For Social Media Managers</h3>
          <p><strong>Meet platform requirements.</strong> Every platform has different size/dimension rules. Get them right first time.</p>
          <ul>
            <li><a href="/tools/crop-templates">Crop Image</a> - Crop to 1:1 (Instagram), 4:5 (portrait), 16:9 (landscape)</li>
            <li><a href="/tools/resize-image">Resize Image</a> - Resize to platform-specific dimensions (1080x1080, 1200x628)</li>
            <li><a href="/compress">Image Compressor</a> - Hit exact KB limits (Twitter 5MB, Instagram 8MB, LinkedIn 10MB)</li>
            <li><a href="/tools/watermark">Watermark Tool</a> - Add brand watermarks to all posts for copyright</li>
            <li><a href="/tools/batch-rename">Batch Rename</a> - Organize uploads with consistent naming</li>
          </ul>

          <h3>For Photographers</h3>
          <p><strong>Protect your work.</strong> Privacy, copyright, and client proofing tools.</p>
          <ul>
            <li><a href="/redact">Photo Redaction</a> - Blur faces/plates for privacy, remove EXIF/GPS location data</li>
            <li><a href="/tools/watermark">Watermark Tool</a> - Add watermarks to client proofs and portfolio samples</li>
            <li><a href="/tools/exif-checker">EXIF Checker</a> - Verify metadata removal before sharing online</li>
            <li><a href="/compress">Image Compressor</a> - Create web-friendly versions without quality loss</li>
            <li><a href="/tools/batch-rename">Batch Rename</a> - Rename event galleries with consistent naming</li>
          </ul>

          <h3>For E-commerce & Product Photography</h3>
          <p><strong>Professional product images.</strong> Fast loading, consistent sizing, optimized for sales.</p>
          <ul>
            <li><a href="/tools/remove-bg-lite">Remove Background</a> - Create transparent PNGs for product photos</li>
            <li><a href="/tools/resize-image">Resize Image</a> - Standardize all product images to same dimensions</li>
            <li><a href="/tools/crop-templates">Crop Image</a> - Crop to 1:1 square for grid/thumbnail consistency</li>
            <li><a href="/compress">Image Compressor</a> - Reduce file sizes without visible quality loss</li>
            <li><a href="/tools/watermark">Watermark Tool</a> - Protect product images from competitor theft</li>
          </ul>

          <h3>For Designers</h3>
          <p><strong>Design tools and utilities.</strong> From mockups to production assets.</p>
          <ul>
            <li><a href="/tools/favicon-pack">Favicon Generator</a> - Generate all favicon sizes + manifest.json for websites/PWAs</li>
            <li><a href="/tools/og-card">OG Card Generator</a> - Create social media share images (1200x630)</li>
            <li><a href="/tools/svg-optimizer">SVG Optimizer</a> - Minify SVG code and reduce file size</li>
            <li><a href="/tools/text-placeholder">Text Placeholder</a> - Generate placeholder images for wireframes</li>
            <li><a href="/tools/aspect-pad">Aspect Padder</a> - Add padding to achieve target aspect ratio</li>
          </ul>
        </div>

        {/* How It Works */}
        <div className="card">
          <h2>How PixCloak Tools Work</h2>

          <h3>1. Select Tool</h3>
          <p>
            Choose the tool you need. Each tool has a specific purpose—resize, convert, compress, crop, watermark, etc.
            If you're not sure which tool to use, start with our <a href="#featured">featured tools</a> (most popular for general tasks).
          </p>

          <h3>2. Upload Images</h3>
          <p>
            Drag and drop images or click to select files. Upload single images or entire folders. Supports JPG, PNG, WebP, and more.
            <strong>Files stay on your device</strong>—no uploads to servers. Works with any file size (competitors limit 5-20MB).
          </p>

          <h3>3. Adjust Settings</h3>
          <p>
            Configure quality, dimensions, aspect ratio, compression level, etc. Each tool has smart presets (1920px, 200KB, 1:1 square)
            for common use cases. Or use custom settings for specific requirements. Live preview shows results before processing.
          </p>

          <h3>4. Process & Download</h3>
          <p>
            Click process/convert/compress button. Tools work instantly for single images, 5-30 seconds for batches of 100+ images.
            Download individual files or entire batch as ZIP. Original files unchanged—you get new optimized versions.
          </p>
        </div>

        {/* Common Questions */}
        <div className="card">
          <h2>Common Questions</h2>

          <h3>Do I need to create an account?</h3>
          <p>
            <strong>No.</strong> All tools work without sign-up, login, or account. No email required. No tracking.
            Just visit page and start using tools immediately.
          </p>

          <h3>Are there file size limits?</h3>
          <p>
            <strong>No artificial limits.</strong> Process is limited only by your device's RAM and browser capabilities. Typically:
            single images up to 100MB+, batches of 500+ images. Much higher limits than competitors (TinyPNG: 5MB, Remove.bg: 25MB).
          </p>

          <h3>What image formats are supported?</h3>
          <p>
            <strong>All common formats:</strong> JPG/JPEG, PNG, WebP, GIF, BMP, SVG (for some tools). Input and output formats
            vary by tool—e.g., <a href="/tools/png-jpg-converter">PNG↔JPG Converter</a> handles PNG and JPG,
            <a href="/tools/webp-converter">WebP Converter</a> outputs WebP format.
          </p>

          <h3>Do tools work on mobile devices?</h3>
          <p>
            <strong>Yes, fully responsive.</strong> All tools work on iPhone, iPad, Android phones/tablets. Mobile Safari, Chrome,
            Firefox supported. Some tools (like batch processing) work better on desktop due to screen size, but all core functionality
            available on mobile.
          </p>

          <h3>Can I use these tools commercially?</h3>
          <p>
            <strong>Yes, 100% free for personal and commercial use.</strong> No attribution required. Use for client work, business
            websites, e-commerce, social media marketing—whatever you need. No license fees, no usage restrictions.
          </p>

          <h3>How is this free with no ads?</h3>
          <p>
            <strong>Sustainable open-core model.</strong> Core tools are free and always will be (AGPL-3.0 license). We may offer
            optional premium features in future (team collaboration, CLI/API, priority support) but all current tools remain free forever.
            Some pages show minimal ads (never on tool pages—only marketing pages) to cover hosting costs.
          </p>
        </div>

        {/* Related Resources */}
        <div className="card">
          <h2>Learn More</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="/guides" className="pill">Image Guides</a>
            <a href="/guides/complete-image-compression-guide" className="pill">Compression Guide</a>
            <a href="/guides/how-to-compress-image-without-losing-quality" className="pill">Quality Guide</a>
            <a href="/about" className="pill">About PixCloak</a>
          </div>
        </div>

        <FaqJsonLd items={[
          { question: "Are PixCloak tools really free?", answer: "Yes, 100% free with no limits. No file size restrictions, no daily quotas, no 'upgrade to premium.' Process unlimited images for personal or commercial use. No account or email required." },
          { question: "Do my images get uploaded to a server?", answer: "No. All processing happens locally in your browser using JavaScript. Your images never leave your device. No uploads = complete privacy. Works offline after first page load." },
          { question: "What's the best tool to compress images for my website?", answer: "Use Image Compressor (/compress) to reduce file sizes to exact KB targets (100KB, 200KB, 500KB). Then optionally convert to WebP (/tools/webp-converter) for 25-35% additional savings. For large images, resize to 1920px first (/tools/resize-image) before compressing." },
          { question: "How do I crop images for Instagram?", answer: "Use Crop Image tool (/tools/crop-templates). Select 1:1 aspect ratio for Instagram feed posts (displays as square), or 4:5 for portrait posts (taller images get more screen space). Tool shows exact crop area before processing." },
          { question: "Can I process multiple images at once?", answer: "Yes—all tools support batch processing. Upload 10, 50, 100+ images, apply same settings to all, download as ZIP. Great for event photos, product catalogs, social media content batches. No limits on batch size." },
          { question: "What's the difference between resize and crop?", answer: "Resize changes dimensions while keeping all content (may change aspect ratio). Crop cuts out portion of image to achieve specific aspect ratio (removes content outside crop box). Use Resize (/tools/resize-image) to make images smaller. Use Crop (/tools/crop-templates) to change aspect ratio for social media." },
          { question: "How do I remove EXIF/GPS data from photos?", answer: "Use EXIF Checker (/tools/exif-checker) to detect metadata, then export images from Compressor (/compress) or Redaction tool (/redact)—both automatically strip EXIF/GPS on export. Protects privacy by removing location data, camera info, timestamps." },
          { question: "Can I convert PNG to JPG without quality loss?", answer: "Use PNG↔JPG Converter (/tools/png-jpg-converter). Set quality to 90-95 for minimal quality loss. Note: PNG (lossless) to JPG (lossy) always involves some compression. For photos, quality 85-90 is visually identical to original but much smaller file size." },
          { question: "What image size should I use for social media?", answer: "Instagram feed: 1080x1080 (1:1) or 1080x1350 (4:5). Facebook/LinkedIn: 1200x628 (1.91:1). Twitter: 1200x675 (16:9). Instagram Stories: 1080x1920 (9:16). Use Crop Image tool (/tools/crop-templates) with platform presets." },
          { question: "How do I create a favicon for my website?", answer: "Use Favicon Generator (/tools/favicon-pack). Upload logo (512x512 or larger, square), tool generates all sizes (16x16 to 512x512) plus manifest.json and HTML code. Download ZIP, upload files to website root, paste HTML into <head>. Works for regular websites, PWAs, iOS, Android." },
          { question: "Is there a limit on file size or number of images?", answer: "No artificial limits. Your device's RAM and browser are only constraints. Typically: single images up to 100MB+, batches of 500+ images work fine. Much higher than competitors (TinyPNG: 5MB limit, 20 images/month free)." },
          { question: "Do tools work offline?", answer: "Yes. After first page load (downloads JavaScript/CSS), tools work completely offline. Great for traveling photographers, remote work, areas with poor internet. Processing happens on your device, not on servers." },
          { question: "Can I use these tools for commercial projects?", answer: "Yes. Free for personal and commercial use with no restrictions. Use for client work, business websites, e-commerce, marketing. No attribution required. No license fees." },
          { question: "How do I add watermarks to protect my photos?", answer: "Use Watermark tool (/tools/watermark). Enter text (your name, logo, copyright, website), customize position/opacity/size/font/color, apply to single image or batch. Download watermarked images. Great for photographers protecting portfolio samples and client proofs." },
          { question: "What's the best way to optimize images for website speed?", answer: "3-step process: 1) Resize to 1920px (/tools/resize-image), 2) Compress to 200-500KB (/compress), 3) Optional: convert to WebP (/tools/webp-converter) for 25-35% extra savings. This workflow typically reduces file sizes by 70-90% with minimal quality loss. Improves Core Web Vitals and SEO." },
        ]} />
    </div>
    </>
  );
}
