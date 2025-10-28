import type { Metadata } from 'next';
import Client from './Client';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Free Background Remover: Remove BG (No Upload) | PixCloak",
  description: "Remove background from images by color. Adjust tolerance for solid backgrounds (white, green, gray). 100% local—no uploads. Free, unlimited.",
  alternates: {
    canonical: "/tools/remove-bg-lite",
    languages: { "x-default": "/tools/remove-bg-lite", en: "/tools/remove-bg-lite" },
  },
  openGraph: {
    title: "Free Background Remover: Remove BG (No Upload)",
    description: "Remove background by color. Works locally. No uploads. Free, unlimited.",
    url: "/tools/remove-bg-lite",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Tools', url: '/tools' },
        { name: 'Remove Background', url: '/tools/remove-bg-lite' }
      ]} />

      <SoftwareAppJsonLd
        name="Background Remover (Color-based)"
        url="/tools/remove-bg-lite"
        description="Remove solid color backgrounds from images. Adjustable tolerance. 100% local processing, no uploads."
      />

      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>Free Background Remover: Remove BG (No Upload)</h1>

          <h2>Quick Start</h2>
          <ol>
            <li><strong>Upload image</strong> with solid background (white, green, gray)</li>
            <li><strong>Click background color</strong> to select what to remove</li>
            <li><strong>Adjust tolerance</strong> slider (0-100) to refine selection</li>
            <li><strong>Download</strong> transparent PNG</li>
          </ol>
          <p><strong>Works best for solid color backgrounds. 100% local—no uploads. Free, unlimited.</strong></p>
        </div>

        <Client />

        <div className="card">
          <h2>When to Use This Tool</h2>
          <p>
            <strong>Best for simple, solid color backgrounds.</strong> This is a color-based tool—removes pixels similar to clicked
            color. Works great for product photos, logos, screenshots with uniform backgrounds.
          </p>

          <h3>✅ Works Great For:</h3>
          <ul>
            <li><strong>Product photography:</strong> White or gray studio backgrounds</li>
            <li><strong>Green screen removal:</strong> Chroma key backgrounds</li>
            <li><strong>Logo cleanup:</strong> Downloaded logos with white/colored backgrounds</li>
            <li><strong>Screenshots:</strong> Desktop backgrounds, solid color UI elements</li>
            <li><strong>E-commerce:</strong> Amazon, eBay listings (require white backgrounds)</li>
            <li><strong>Social media graphics:</strong> Remove solid backgrounds from text images</li>
          </ul>

          <h3>❌ Not Recommended For:</h3>
          <ul>
            <li><strong>Complex backgrounds:</strong> Patterns, gradients, multiple colors</li>
            <li><strong>Hair/fur detail:</strong> Use AI tools (remove.bg) for fine edge details</li>
            <li><strong>Portrait photography:</strong> Complex backgrounds need AI processing</li>
            <li><strong>Low contrast:</strong> When subject and background have similar colors</li>
          </ul>

          <h3>vs AI Background Removers (remove.bg)</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginTop: '12px' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Feature</th>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>PixCloak (This Tool)</th>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>remove.bg (AI)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Processing</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>✅ 100% local (no upload)</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Uploads to server</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Privacy</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>✅ Complete (offline)</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Images uploaded</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Free Limit</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>✅ Unlimited</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>50 images/month</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Speed</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>✅ Instant (1-2 seconds)</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>5-10 seconds (upload + process)</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Best For</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Solid backgrounds</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>✅ Complex backgrounds, hair/fur</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Works Offline</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>✅ Yes</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>No (needs internet)</td>
              </tr>
            </tbody>
          </table>
          <p style={{ marginTop: '12px' }}><strong>When to use which:</strong></p>
          <ul>
            <li><strong>Use our tool:</strong> Solid backgrounds, privacy-sensitive images, unlimited free processing, offline work</li>
            <li><strong>Use remove.bg:</strong> Complex backgrounds, portraits, hair/fur detail, willing to upload and pay after 50 images</li>
          </ul>
        </div>

        <div className="card">
          <h2>How to Remove Background</h2>

          <h3>Step 1: Upload Image</h3>
          <p>
            Click Choose File or drag & drop. Accepts JPG, PNG, WebP. Works best with images where background is a single solid color
            (white, green, gray, blue, etc.).
          </p>

          <h3>Step 2: Click Background Color</h3>
          <p>
            <strong>Click anywhere on the background you want to remove.</strong> Tool auto-detects that color and removes all similar
            pixels. Preview updates in real-time.
          </p>
          <p><strong>Tips for clicking:</strong></p>
          <ul>
            <li>Click middle of background (not edges where color might vary)</li>
            <li>If background has slight gradients, click darkest or lightest area first, adjust tolerance after</li>
            <li>Multiple clicks update selection—experiment to find best starting point</li>
          </ul>

          <h3>Step 3: Adjust Tolerance</h3>
          <p>
            <strong>Tolerance (0-100) controls how similar colors must be to get removed.</strong>
          </p>
          <ul>
            <li><strong>Low tolerance (0-15):</strong> Only removes exact color matches. Use for uniform backgrounds.</li>
            <li><strong>Medium tolerance (15-30):</strong> ⭐ Recommended starting point. Removes slightly varying shades.</li>
            <li><strong>High tolerance (30-50):</strong> Removes broader range of colors. Use for gradient backgrounds.</li>
            <li><strong>Very high (50+):</strong> May remove parts of subject if colors are similar. Use carefully.</li>
          </ul>
          <p><strong>Strategy:</strong> Start at 15-20, gradually increase until entire background is removed but subject remains intact.</p>

          <h3>Step 4: Preview & Refine</h3>
          <p>
            <strong>Check preview carefully:</strong>
          </p>
          <ul>
            <li>Is entire background removed? Increase tolerance.</li>
            <li>Are parts of subject missing? Decrease tolerance or click different background spot.</li>
            <li>Are edges rough? This is normal for color-based removal—use Trim Transparent tool after to clean edges.</li>
          </ul>

          <h3>Step 5: Download Transparent PNG</h3>
          <p>
            Click Download to save transparent PNG. <strong>JPG doesn't support transparency</strong>—always exports as PNG to preserve
            transparent areas.
          </p>
        </div>

        <div className="card">
          <h2>Common Use Cases</h2>

          <h3>Product Photography for E-commerce</h3>
          <p>
            <strong>Amazon, eBay, Shopify require white backgrounds.</strong> If you photographed products on gray or colored
            backgrounds, remove background first, then add white background:
          </p>
          <ol>
            <li>Remove current background using this tool</li>
            <li>Download transparent PNG</li>
            <li>Open in any image editor, add white background layer</li>
            <li>Or use our <a href="/compress">Compress tool</a> which automatically adds white background when converting PNG to JPG</li>
          </ol>

          <h3>Green Screen Removal (Chroma Key)</h3>
          <p>
            <strong>Perfect for green screen content.</strong> Click green background, adjust tolerance to 25-35 (green screens have
            slight lighting variations), download transparent result. Use in video editors or composite with other images.
          </p>

          <h3>Logo Cleanup</h3>
          <p>
            <strong>Downloaded logo has white background?</strong> Remove it to create transparent logo for websites, presentations,
            watermarks. Tolerance 10-15 works well for clean white backgrounds.
          </p>

          <h3>Screenshot Editing</h3>
          <p>
            <strong>Isolate UI elements, buttons, icons from screenshots.</strong> Click desktop background or surrounding UI, remove
            to create clean assets for documentation, presentations.
          </p>
        </div>

        <div className="card">
          <h2>Tips for Best Results</h2>

          <h3>1. Photograph on Solid Color Backgrounds</h3>
          <p>
            <strong>Prevention better than cleanup.</strong> If possible, photograph products on white, gray, or green backgrounds.
            Uniform lighting reduces shadows and color variations—makes removal easier.
          </p>

          <h3>2. Good Lighting is Critical</h3>
          <p>
            <strong>Shadows create color gradients.</strong> Evenly lit backgrounds remove cleanly. Uneven lighting creates gradients
            requiring higher tolerance—may remove subject parts.
          </p>

          <h3>3. High Contrast Helps</h3>
          <p>
            <strong>Subject and background should be different colors.</strong> White product on white background is impossible to
            separate. Gray product on white background works perfectly.
          </p>

          <h3>4. Start Conservative, Increase Gradually</h3>
          <p>
            <strong>Easier to remove more than to undo removal.</strong> Start with tolerance 15, increase by 5 each time, stop when
            background is gone but subject remains.
          </p>

          <h3>5. Clean Edges with Trim Tool</h3>
          <p>
            <strong>After background removal, use <a href="/tools/trim-transparent">Trim Transparent tool</a>.</strong> Auto-crops to
            content bounds, removes excess transparent space, creates clean result.
          </p>
        </div>

        <div className="card">
          <h2>Troubleshooting</h2>

          <h3>Problem: Parts of Subject Are Disappearing</h3>
          <p><strong>Cause:</strong> Tolerance too high or subject has similar colors to background.</p>
          <p><strong>Fix:</strong> Lower tolerance to 10-15. If doesn't help, subject and background are too similar—consider AI tool or
            re-photograph with different background color.</p>

          <h3>Problem: Background Not Fully Removed</h3>
          <p><strong>Cause:</strong> Background has gradients or lighting variations.</p>
          <p><strong>Fix:</strong> Increase tolerance to 25-35. Click darkest or lightest part of background. For strong gradients, may
            need to remove in multiple passes (remove light areas, then dark areas separately) using image editor.</p>

          <h3>Problem: Edges Look Rough or Pixelated</h3>
          <p><strong>Cause:</strong> Color-based removal creates hard edges (not AI smooth edges).</p>
          <p><strong>Fix:</strong> This is normal for color-based tools. For professional results: 1) Use AI tool (remove.bg), or
            2) Use this tool then refine edges in Photoshop/GIMP with feather/blur, or 3) Acceptable for web use—viewers rarely notice.</p>

          <h3>Problem: Transparent Areas Show Checker Pattern</h3>
          <p><strong>This is correct!</strong> Checker pattern indicates transparency. When you place this image on website/document,
            those areas will show background through. Download PNG to preserve transparency.</p>
        </div>

        <div className="card">
          <h2>Related Tools</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="/tools/trim-transparent" className="pill">Trim Transparent Edges</a>
            <a href="/compress" className="pill">Compress Images</a>
            <a href="/tools/favicon-pack" className="pill">Create Favicon</a>
            <a href="/guides/export-without-metadata" className="pill">Remove EXIF</a>
          </div>
        </div>

        <FaqJsonLd items={[
          { question: "How do I remove background from image for free?", answer: "Upload image, click background color to select, adjust tolerance slider until background is removed, download transparent PNG. Works locally in browser—no uploads. Free, unlimited. Best for solid color backgrounds (white, green, gray)." },
          { question: "Can I remove background without uploading?", answer: "Yes—this tool processes 100% locally in browser. Images never upload to server. Works offline after first page load. Completely private. All processing happens on your device using Canvas API." },
          { question: "Is this better than remove.bg?", answer: "Different use cases. Use our tool for: solid backgrounds, privacy-sensitive images, unlimited free processing, offline work. Use remove.bg for: complex backgrounds, portraits, hair/fur detail. Our tool is instant and free unlimited; remove.bg uses AI but requires upload and limits free tier to 50 images." },
          { question: "Why does my image look pixelated after removing background?", answer: "Color-based removal creates hard edges (not AI smooth edges). For professional results, use AI tool or refine edges in Photoshop. For web use, hard edges are acceptable—viewers rarely notice. Keep original image high resolution before removal to minimize pixelation." },
          { question: "Can I remove background from multiple images at once?", answer: "Currently processes one image at a time. For batch background removal with consistent backgrounds (e.g., 100 product photos on white), process 2-3 to find optimal tolerance setting, then process rest using same settings for consistency." },
          { question: "Does this work on iPhone/mobile?", answer: "Yes—open Safari or Chrome browser on iPhone/Android, visit this page, upload photos from camera roll, adjust tolerance with slider, download transparent PNG. No app installation needed. Works in mobile browser." },
          { question: "How to save image with transparent background?", answer: "Download as PNG—only format that preserves transparency. JPG doesn't support transparency (converts transparent areas to white or black). If platform requires JPG (e.g., email), first add white background layer in image editor, then convert to JPG." },
          { question: "What is tolerance in background removal?", answer: "Tolerance (0-100) controls how similar colors must be to get removed. Low (0-15) removes only exact matches; medium (15-30) removes slightly varying shades; high (30-50) removes broad range. Start at 15, increase gradually until background gone but subject remains." },
        ]} />
      </div>
    </>
  );
}
