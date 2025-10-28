import type { Metadata } from 'next';
import Client from './Client';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "PNG to JPG & JPG to PNG Converter (No Upload) | PixCloak",
  description: "Convert PNG to JPG or JPG to PNG in browser. Adjust quality, choose background color. Batch convert 100+ images. Works locally—no uploads. Free, unlimited.",
  alternates: {
    canonical: "/tools/png-jpg-converter",
    languages: {
      "x-default": "/tools/png-jpg-converter",
      en: "/tools/png-jpg-converter",
    },
  },
  openGraph: {
    title: "Free PNG to JPG & JPG to PNG Converter (No Upload)",
    description: "Convert PNG↔JPG in browser. Batch processing. Quality control. Works locally. Free.",
    url: "/tools/png-jpg-converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PNG to JPG & JPG to PNG Converter",
    description: "Convert image formats locally. No uploads. Batch processing. Free.",
  },
};

export default function PngJpgConverterPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Tools', url: '/tools' },
        { name: 'PNG/JPG Converter', url: '/tools/png-jpg-converter' }
      ]} />

      <SoftwareAppJsonLd
        name="PNG to JPG & JPG to PNG Converter"
        url="/tools/png-jpg-converter"
        description="Convert between PNG and JPG formats. Adjust quality, choose background color for transparent PNGs. Batch processing. Works locally in browser."
      />

      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>Free PNG to JPG & JPG to PNG Converter (No Upload)</h1>

          <h2>Quick Start</h2>
          <ol>
            <li><strong>Choose direction:</strong> PNG→JPG or JPG→PNG</li>
            <li><strong>Upload images</strong> (drag & drop or click)</li>
            <li><strong>Adjust settings:</strong> Quality (PNG→JPG), background color (if transparent)</li>
            <li><strong>Download</strong> converted images (single or ZIP for batch)</li>
          </ol>
          <p><strong>Works locally in browser. No uploads. Free, unlimited.</strong></p>
        </div>

        <Client />

        <div className="card">
          <h2>PNG to JPG: When & Why</h2>

          <h3>Why Convert PNG to JPG?</h3>
          <p>
            <strong>PNG files are 5-10x larger than JPG for photos.</strong> A 1920x1080 PNG photo is 3-5MB. Same photo as JPG
            (quality 80%) is 300-500KB. That's 90% smaller with no visible difference on screens.
          </p>

          <h3>When to Convert PNG to JPG</h3>
          <ul>
            <li><strong>Email attachments:</strong> PNG photos are too large (3-5MB). Convert to JPG reduces to 300-500KB—faster sending,
              less likely to bounce.</li>
            <li><strong>Website images:</strong> PNG slows page load. JPG loads 10x faster, improves SEO (Google Core Web Vitals).</li>
            <li><strong>Social media uploads:</strong> Instagram, Facebook, Twitter re-compress PNGs anyway. Upload JPG directly saves
              upload time on mobile.</li>
            <li><strong>Storage space:</strong> 1000 PNG photos at 4MB each = 4GB. Convert to JPG at 400KB = 400MB (90% savings).</li>
            <li><strong>Printing:</strong> Print shops accept JPG. PNG offers no advantage for print—just wastes file transfer time.</li>
          </ul>

          <h3>Important: Background Color for Transparent PNGs</h3>
          <p>
            <strong>JPG doesn't support transparency.</strong> If your PNG has transparent background (logo, screenshot), you must choose
            background color when converting to JPG:
          </p>
          <ul>
            <li><strong>White background:</strong> Most common. Use for product photos, documents, clean professional look.</li>
            <li><strong>Black background:</strong> Use for dark mode websites, artistic photos.</li>
            <li><strong>Custom color:</strong> Match your website/brand background color.</li>
          </ul>
          <p><strong>Preview before downloading</strong> to ensure background looks good.</p>

          <h3>Quality Settings (PNG to JPG)</h3>
          <ul>
            <li><strong>90-100%:</strong> Maximum quality, large files (1-2MB). Use only for print or professional photography.</li>
            <li><strong>80-85%:</strong> ⭐ Recommended. Excellent quality, moderate size (300-500KB). Perfect for web, email, social.</li>
            <li><strong>70-75%:</strong> Good quality, small size (200-300KB). Use for thumbnails, mobile uploads.</li>
            <li><strong>60% or below:</strong> Visible quality loss—avoid unless forced by platform limits.</li>
          </ul>
        </div>

        <div className="card">
          <h2>JPG to PNG: When & Why</h2>

          <h3>Why Convert JPG to PNG?</h3>
          <p>
            <strong>PNG is lossless; JPG is lossy.</strong> Every time you edit and save JPG, quality degrades. PNG preserves quality
            through multiple edits. PNG also supports transparency—JPG doesn't.
          </p>

          <h3>When to Convert JPG to PNG</h3>
          <ul>
            <li><strong>Need transparency:</strong> Remove background, create logo with transparent edges—requires PNG.</li>
            <li><strong>Further editing planned:</strong> If you'll edit image multiple times (Photoshop, GIMP), convert to PNG first.
              Prevents quality loss from repeated JPG saves.</li>
            <li><strong>Screenshots with text:</strong> PNG keeps text sharp. JPG makes text slightly blurry (compression artifacts
              around edges).</li>
            <li><strong>Graphics with solid colors:</strong> Logos, diagrams, illustrations—PNG compresses these better than JPG
              (counterintuitive but true for non-photo images).</li>
            <li><strong>Archival/master copies:</strong> Store editing masters as PNG. Export final delivery as JPG.</li>
          </ul>

          <h3>Important: File Size Increases</h3>
          <p>
            <strong>JPG→PNG conversion increases file size 5-10x.</strong> 500KB JPG becomes 3-5MB PNG. This is normal—PNG is lossless,
            stores more data.
          </p>
          <p>
            <strong>Don't convert if you only need to view/share.</strong> Only convert JPG to PNG if you need transparency or plan
            to edit. For simple sharing, keep as JPG (smaller, faster).
          </p>
        </div>

        <div className="card">
          <h2>PNG vs JPG: Quick Comparison</h2>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Feature</th>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>PNG</th>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>JPG</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}><strong>File Size</strong></td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Large (3-5MB for photos)</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>✅ Small (300-500KB)</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}><strong>Transparency</strong></td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>✅ Supported</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>❌ Not supported</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}><strong>Compression</strong></td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>✅ Lossless (no quality loss)</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Lossy (slight quality loss)</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}><strong>Best For</strong></td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Logos, screenshots, text, transparency</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>✅ Photos, web, email, social</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}><strong>Browser Support</strong></td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>✅ All browsers</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>✅ All browsers</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}><strong>Editing</strong></td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>✅ No quality loss on re-save</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Quality degrades on re-save</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}><strong>Loading Speed</strong></td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Slow (large files)</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>✅ Fast (small files)</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ marginTop: '16px' }}>Rule of Thumb</h3>
          <ul>
            <li><strong>Use PNG for:</strong> Logos, icons, screenshots with text, images needing transparency, graphics with solid colors</li>
            <li><strong>Use JPG for:</strong> Photos, website images, email attachments, social media posts, anything without transparency</li>
          </ul>
        </div>

        <div className="card">
          <h2>How to Convert PNG to JPG</h2>
          <ol>
            <li><strong>Select direction:</strong> Click "PNG → JPG" at top of tool</li>
            <li><strong>Upload PNG images:</strong> Drag & drop or click Choose Files</li>
            <li><strong>Set quality:</strong> Slider appears (default 85%—recommended for most uses)</li>
            <li><strong>Choose background color</strong> (if PNG has transparency):
              <ul>
                <li>White (default, most common)</li>
                <li>Black (for dark backgrounds)</li>
                <li>Custom (click color picker)</li>
              </ul>
            </li>
            <li><strong>Preview:</strong> Check result before downloading (especially background color)</li>
            <li><strong>Download:</strong> Single JPG or ZIP for batch</li>
          </ol>
        </div>

        <div className="card">
          <h2>How to Convert JPG to PNG</h2>
          <ol>
            <li><strong>Select direction:</strong> Click "JPG → PNG" at top of tool</li>
            <li><strong>Upload JPG images:</strong> Drag & drop or click Choose Files</li>
            <li><strong>Convert:</strong> No settings needed—conversion is automatic</li>
            <li><strong>Download:</strong> Single PNG or ZIP for batch</li>
          </ol>
          <p><strong>Note:</strong> JPG to PNG doesn't improve quality or add transparency. It only changes format. If your JPG has
            white background, PNG will also have white background (not transparent). To remove background, use <a href="/tools/remove-bg-lite">
              Background Remover tool</a>.</p>
        </div>

        <div className="card">
          <h2>Batch Conversion</h2>
          <p>
            <strong>Convert 100+ images at once.</strong> Select all files (Ctrl+A or Cmd+A), choose settings, convert. Tool processes
            all simultaneously. Download ZIP with all converted images.
          </p>
          <p><strong>Processing speed:</strong></p>
          <ul>
            <li>1-10 images: 2-5 seconds</li>
            <li>50 images: 10-20 seconds</li>
            <li>100+ images: 30-60 seconds (depends on image sizes and browser)</li>
          </ul>
          <p><strong>No file limit.</strong> Process as many as your browser memory allows. For very large batches (500+), split into
            multiple batches for stability.</p>
        </div>

        <div className="card">
          <h2>Common Use Cases</h2>

          <h3>PNG to JPG</h3>
          <ul>
            <li><strong>Screenshots for documentation:</strong> Screenshots save as PNG by default (large files). Convert to JPG reduces
              file size 80-90% for faster sharing.</li>
            <li><strong>iPhone photos:</strong> iPhone 12+ uses HEIC format, but some apps export as PNG. Convert to JPG for better
              compatibility and smaller size.</li>
            <li><strong>Downloaded graphics:</strong> Many websites serve images as PNG (preserve transparency). If you don't need
              transparency, convert to JPG saves storage.</li>
            <li><strong>Email newsletters:</strong> Large PNG attachments bounce. Convert to JPG ensures delivery.</li>
          </ul>

          <h3>JPG to PNG</h3>
          <ul>
            <li><strong>Logo preparation:</strong> Got logo as JPG? Convert to PNG before removing background or adding to transparent
              compositions.</li>
            <li><strong>Editing workflow:</strong> Starting with JPG but need to make multiple edits? Convert to PNG first, prevents
              quality loss from repeated saves.</li>
            <li><strong>Screenshot text sharpness:</strong> If you accidentally saved screenshot as JPG (text looks blurry), convert to
              PNG doesn't fix blur but prevents further degradation if you edit.</li>
          </ul>
        </div>

        <div className="card">
          <h2>Related Tools</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="/compress" className="pill">Compress Images</a>
            <a href="/tools/resize-image" className="pill">Resize Images</a>
            <a href="/tools/webp-converter" className="pill">Convert to WebP</a>
            <a href="/tools/remove-bg-lite" className="pill">Remove Background</a>
            <a href="/guides/compress-to-500kb" className="pill">Compress to 500KB</a>
          </div>
        </div>

        <FaqJsonLd items={[
          { question: "How do I convert PNG to JPG for free?", answer: "Upload PNG, choose quality (80-85% recommended), select background color if transparent, download JPG. Works in browser—no uploads to server. Free, unlimited, no watermarks. Batch convert 100+ images at once." },
          { question: "Why is my PNG file so large compared to JPG?", answer: "PNG is lossless (stores all pixel data), JPG is lossy (discards imperceptible data). 1920x1080 PNG is 3-5MB; same image as JPG (quality 80%) is 300-500KB. PNG is 10x larger for photos. Use PNG only when you need transparency or lossless quality." },
          { question: "Can I convert JPG to PNG to improve quality?", answer: "No—conversion doesn't improve quality. JPG→PNG just changes format; it doesn't recover data already lost in JPG compression. Quality is locked at original JPG level. Only convert JPG to PNG if you need transparency or plan multiple edits." },
          { question: "What happens to transparent background when converting PNG to JPG?", answer: "JPG doesn't support transparency. Tool replaces transparent areas with your chosen background color (white, black, or custom). Preview shows result before download. If you need to keep transparency, don't convert—keep as PNG or use WebP format instead." },
          { question: "Should I use PNG or JPG for website images?", answer: "Use JPG for photos (90% smaller, loads 10x faster). Use PNG for logos, icons, screenshots with text, anything needing transparency. For web photos, JPG quality 80-85% looks excellent on screens and loads fast—critical for SEO and Core Web Vitals." },
          { question: "Can I batch convert multiple PNG to JPG at once?", answer: "Yes—select all PNG files (10, 50, 100+), set quality once, convert. Tool processes simultaneously. Download ZIP with all converted JPGs. No file limit. Free, unlimited batch processing. Typical speed: 50 images in 10-20 seconds." },
          { question: "How to convert PNG to JPG on iPhone without app?", answer: "Open Safari, visit this page (pixcloak.com/tools/png-jpg-converter), tap Choose Files, select PNG photos, set quality (85%), download JPG. Works in browser—no app installation. Converts locally on iPhone, no uploads." },
          { question: "Does converting PNG to JPG reduce quality?", answer: "Slight quality loss (imperceptible on screens at 80-85%). JPG compression removes data humans can't see—fine textures, subtle color variations. At quality 80%, photos look identical to PNG on screens. Only noticeable if printing at poster size (16x20 inches) or zooming to 200%+." },
        ]} />
      </div>
    </>
  );
}

