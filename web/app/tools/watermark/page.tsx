import type { Metadata } from 'next';
import Client from './Client';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Free Watermark Tool: Add Text to Images (No... | PixCloak",
  description: "Add text watermarks to images—customize position, opacity, font, color. Batch process and download ZIP. Works offline, no uploads. Protect copyright, free.",
  alternates: {
    canonical: "/tools/watermark",
    languages: { "x-default": "/tools/watermark", en: "/tools/watermark" },
  },
  openGraph: {
    title: "Free Watermark Tool: Add Text to Images",
    description: "Add custom text watermarks. Batch process, download ZIP. Free, no uploads.",
    url: "/tools/watermark",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Tools', url: '/tools' },
        { name: 'Watermark Tool', url: '/tools/watermark' }
      ]} />

      <SoftwareAppJsonLd
        name="Watermark Tool"
        url="/tools/watermark"
        description="Add text watermarks to images with custom position, opacity, font. 100% local processing, no uploads."
      />

      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>Free Watermark Tool: Add Text to Images (No Upload)</h1>

          <h2>Quick Start</h2>
          <ol>
            <li><strong>Upload images</strong> (JPG/PNG/WebP, single or batch)</li>
            <li><strong>Enter watermark text</strong> (your name, brand, copyright, URL)</li>
            <li><strong>Customize style</strong> (position, opacity, size, font, color)</li>
            <li><strong>Preview and download</strong> (individual files or ZIP for batch)</li>
          </ol>
          <p><strong>Works locally. No uploads. Free, unlimited.</strong></p>
        </div>

        <Client />

        <div className="card">
          <h2>Why Add Watermarks?</h2>

          <h3>Copyright Protection</h3>
          <p>
            <strong>Prevents unauthorized use and proves ownership.</strong> When your photo appears elsewhere without permission,
            watermarks provide legal evidence of ownership. Discourages casual theft—most people won't bother removing watermarks
            when easier-to-steal unwatermarked images exist.
          </p>

          <h3>Brand Recognition</h3>
          <p>
            <strong>Free marketing every time image is shared.</strong> Watermarks with your name/logo/URL turn every photo into
            advertising. Especially valuable for:
          </p>
          <ul>
            <li><strong>Photographers:</strong> Portfolio watermarks lead clients back to you</li>
            <li><strong>Designers:</strong> Watermarked mockups prevent client use before payment</li>
            <li><strong>Content creators:</strong> Watermarks ensure credit when content goes viral</li>
            <li><strong>Small businesses:</strong> Product photos with logo build brand awareness</li>
          </ul>

          <h3>Professional Presentation</h3>
          <p>
            <strong>Signals quality and professionalism.</strong> Watermarked images look more official, increasing perceived value.
            Clients associate watermarks with paid/premium content worth protecting.
          </p>
        </div>

        <div className="card">
          <h2>Watermark Options Explained</h2>

          <h3>Position</h3>
          <ul>
            <li><strong>Bottom right (most common):</strong> Doesn't obstruct subject, easy to see but non-intrusive</li>
            <li><strong>Bottom left:</strong> Good for images where main subject is right-aligned</li>
            <li><strong>Top right:</strong> Works for social media where bottom gets cropped</li>
            <li><strong>Center:</strong> Maximum protection but obstructs view—use only for preview/draft images</li>
          </ul>

          <h3>Opacity</h3>
          <ul>
            <li><strong>30-50% (subtle):</strong> Visible but doesn't distract. Best for client-facing work, portfolio</li>
            <li><strong>60-80% (standard):</strong> Clear and readable. Good copyright protection, harder to remove</li>
            <li><strong>90-100% (bold):</strong> Maximum visibility. Use for proofs, samples, preview images before purchase</li>
          </ul>

          <h3>Font Size</h3>
          <ul>
            <li><strong>2-3% of image height (small):</strong> Discreet, doesn't interfere with composition</li>
            <li><strong>4-5% (medium):</strong> Standard size—readable without being distracting</li>
            <li><strong>6-10% (large):</strong> Bold statement, use for proofs or when protection is priority</li>
          </ul>

          <h3>Font Style</h3>
          <ul>
            <li><strong>Sans-serif (clean):</strong> Modern, professional, readable at small sizes (Arial, Helvetica)</li>
            <li><strong>Serif (formal):</strong> Traditional, elegant for wedding/portrait photographers (Times, Georgia)</li>
            <li><strong>Script (elegant):</strong> Artistic, personal touch for creative work (cursive fonts)</li>
            <li><strong>Monospace (technical):</strong> Copyright notices, legal text (Courier)</li>
          </ul>

          <h3>Color</h3>
          <ul>
            <li><strong>White with 50% opacity:</strong> Works on dark backgrounds, most versatile</li>
            <li><strong>Black with 50% opacity:</strong> Works on light backgrounds</li>
            <li><strong>Brand color:</strong> Reinforces brand identity (e.g., Tiffany blue, Coca-Cola red)</li>
            <li><strong>Contrasting color:</strong> Ensures visibility regardless of background</li>
          </ul>
        </div>

        <div className="card">
          <h2>Best Practices for Professional Watermarking</h2>

          <h3>1. Don't Obstruct the Main Subject</h3>
          <p>
            <strong>Place watermark in negative space (backgrounds, sky, empty areas).</strong> Never cover faces, products,
            or key elements. Viewers should see image content first, notice watermark second.
          </p>

          <h3>2. Stay Consistent</h3>
          <p>
            <strong>Use same position, style, and opacity across all images.</strong> Consistency builds brand recognition.
            Clients should instantly recognize your watermark style. Inconsistent watermarks look unprofessional and amateurish.
          </p>

          <h3>3. Keep It Simple</h3>
          <p><strong>Best watermarks:</strong></p>
          <ul>
            <li>Your name or brand name (not full tagline or long description)</li>
            <li>Website URL (shortens recognition: "YourName.com")</li>
            <li>Simple logo mark (icon only, not full logo with text)</li>
            <li>Copyright symbol + year + name ("© 2025 Jane Doe")</li>
          </ul>
          <p><strong>Avoid:</strong> Long sentences, multiple lines, excessive styling, emoji, ALL CAPS SHOUTING</p>

          <h3>4. Balance Protection with Aesthetics</h3>
          <p>
            <strong>Too subtle = easy to remove. Too bold = ruins image.</strong> Sweet spot: 40-60% opacity, positioned in corner
            or edge, readable but not distracting. Remember: watermark should protect without devaluing the image.
          </p>

          <h3>5. Consider Your Use Case</h3>
          <ul>
            <li><strong>Social media posts:</strong> 30-40% opacity, small, bottom corner—for brand awareness not theft prevention</li>
            <li><strong>Portfolio samples:</strong> 50-60% opacity, medium size—shows work quality while claiming ownership</li>
            <li><strong>Client proofs:</strong> 70-80% opacity, large, centered—prevents use before payment</li>
            <li><strong>Stock photography:</strong> 80-100% opacity, diagonal across image—maximum protection for paid content</li>
          </ul>
        </div>

        <div className="card">
          <h2>Watermarking for Photographers</h2>

          <h3>Wedding & Event Photography</h3>
          <p>
            <strong>Watermark proofs only, not final deliverables.</strong> Clients pay for unwatermarked images. Proof galleries
            should have 60-70% opacity watermark (clients can view but can't use without paying). Final delivered images: no watermark.
          </p>

          <h3>Stock Photography</h3>
          <p>
            <strong>Heavy watermark across center for previews.</strong> Prevents theft while showing image quality. Use diagonal
            text, 80-100% opacity, repeating pattern. Buyers get unwatermarked version after purchase.
          </p>

          <h3>Social Media Portfolio</h3>
          <p>
            <strong>Light watermark for brand awareness.</strong> Goal is attracting clients, not preventing theft. Use 30-40%
            opacity with your name/URL in bottom corner. Too heavy watermark discourages engagement and looks paranoid.
          </p>

          <h3>Print Sales</h3>
          <p>
            <strong>Watermark online versions only.</strong> Never watermark prints—customers pay premium for clean images.
            Online gallery watermarks prevent customers from screenshotting and printing themselves.
          </p>
        </div>

        <div className="card">
          <h2>Batch Processing Workflow</h2>

          <h3>For Event Photographers (100+ Images)</h3>
          <ol>
            <li><strong>Upload entire event folder</strong> (drag and drop all JPGs)</li>
            <li><strong>Set watermark once</strong> (e.g., "© 2025 YourName.com")</li>
            <li><strong>Choose position</strong> (bottom right, 50% opacity)</li>
            <li><strong>Apply to all images</strong> (one click applies same watermark)</li>
            <li><strong>Download as ZIP</strong> (all watermarked images in single file)</li>
          </ol>
          <p><strong>Saves hours compared to watermarking one-by-one.</strong></p>

          <h3>For Product Photography</h3>
          <p>
            <strong>Watermark all product photos before uploading to store.</strong> Prevents competitors from stealing your
            product images. Use subtle watermark (30% opacity) so it doesn't distract customers but still protects ownership.
          </p>

          <h3>For Social Media Content Creators</h3>
          <p>
            <strong>Batch watermark weekly content.</strong> Process all week's posts in one session. Consistent watermarking
            builds brand recognition. When content goes viral, watermark ensures credit comes back to you.
          </p>
        </div>

        <div className="card">
          <h2>Common Questions</h2>

          <h3>Can someone remove my watermark?</h3>
          <p>
            <strong>Yes, but it takes effort.</strong> Watermarks deter casual theft (people copying images for personal blogs,
            social media). Professional image thieves can remove watermarks with Photoshop, but that takes time—they'll target
            easier unwatermarked images instead. Watermarks also provide legal proof of ownership if you need to pursue copyright
            infringement.
          </p>

          <h3>Should I watermark personal photos?</h3>
          <p>
            <strong>Usually no.</strong> Watermarks are for professional/commercial use. Personal photos shared with friends/family
            don't need watermarks—they clutter the image. Exception: if posting travel/photography content publicly where theft is
            possible, light watermark (30% opacity) is reasonable.
          </p>

          <h3>Where's the best position for watermarks?</h3>
          <p>
            <strong>Bottom right corner = industry standard.</strong> Doesn't obstruct subject, easy to spot, non-intrusive.
            Alternatives: bottom left (if subject is right-aligned), top right (for social media where bottom gets cropped),
            center (only for proofs/samples, not final images).
          </p>
        </div>

        <div className="card">
          <h2>Related Tools</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="/compress" className="pill">Compress Images</a>
            <a href="/tools/resize-image" className="pill">Resize Images</a>
            <a href="/tools/batch-rename" className="pill">Batch Rename</a>
            <a href="/tools/crop-templates" className="pill">Crop Images</a>
          </div>
        </div>

        <FaqJsonLd items={[
          { question: "How do I add a watermark to my images?", answer: "Upload images, enter watermark text (name/logo/URL), customize position/opacity/size/font/color, download result. Batch process multiple images and download as ZIP. Works locally—no uploads. Free, unlimited." },
          { question: "Can I watermark multiple images at once?", answer: "Yes—batch watermarking available. Upload multiple images (10, 50, 100+), apply same watermark settings to all, download as ZIP. Maintains consistent branding across all images. Great for photographers processing event galleries." },
          { question: "What's the best position for a watermark?", answer: "Bottom right corner (industry standard). Doesn't obstruct subject, easy to see, non-intrusive. Alternatives: bottom left (subject right-aligned), top right (social media—bottom gets cropped), center (proofs only—obstructs view)." },
          { question: "How can I remove a watermark from an image?", answer: "This tool adds watermarks, not removes them. Removing someone else's watermark is often copyright infringement. If it's YOUR watermark on YOUR image: re-export from original unwatermarked file. If you lost original: difficult—requires Photoshop content-aware fill or cloning." },
          { question: "What opacity should I use for watermarks?", answer: "30-40% (subtle brand awareness, social media), 50-60% (standard protection, portfolio), 70-80% (client proofs before payment), 90-100% (maximum protection, stock previews). Balance: visible enough to protect, subtle enough not to ruin image aesthetics." },
          { question: "Do watermarks prevent theft?", answer: "They deter casual theft (bloggers, social media users). Professional thieves can remove watermarks with effort, but will target easier unwatermarked images first. Watermarks also provide legal proof of ownership for copyright claims." },
          { question: "Should I watermark photos on Instagram?", answer: "Optional. Light watermark (30% opacity, corner) for brand recognition—helps when content is reposted. But Instagram already credits original poster when shared. Heavy watermarks look paranoid and reduce engagement. Most photographers skip watermarks on Instagram." },
          { question: "Can I use my logo as a watermark?", answer: "Yes—but keep it simple. Use logo icon/mark only (not full logo with tagline). Resize logo to 3-5% of image size. Use 40-60% opacity. Position in corner. Complex/large logos distract from image and look unprofessional." },
        ]} />
      </div>
    </>
  );
}
