import type { Metadata } from 'next';
import Client from './Client';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Free WebP Converter: JPG/PNG to WebP (No Upload) | PixCloak",
  description: "Convert images to WebP format—25-35% smaller than JPG. Works offline, no uploads. Batch convert and download ZIP. For faster websites, better SEO, free.",
  alternates: {
    canonical: "/tools/webp-converter",
    languages: { "x-default": "/tools/webp-converter", en: "/tools/webp-converter" },
  },
  openGraph: {
    title: "Free WebP Converter: JPG/PNG to WebP",
    description: "Convert to WebP format—25-35% smaller files. Batch convert, download ZIP. Free, no uploads.",
    url: "/tools/webp-converter",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Tools', url: '/tools' },
        { name: 'WebP Converter', url: '/tools/webp-converter' }
      ]} />

      <SoftwareAppJsonLd
        name="WebP Converter"
        url="/tools/webp-converter"
        description="Convert images to WebP format for 25-35% smaller file sizes. 100% local processing, no uploads."
      />

      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>Free WebP Converter: Convert JPG/PNG to WebP (No Upload)</h1>

          <h2>Quick Start</h2>
          <ol>
            <li><strong>Upload images</strong> (JPG/PNG, single or batch)</li>
            <li><strong>Adjust quality</strong> (80-90 recommended for best balance)</li>
            <li><strong>Optional: resize</strong> before converting (faster websites)</li>
            <li><strong>Download WebP files</strong> (individual or ZIP for batch)</li>
          </ol>
          <p><strong>Works locally. No uploads. Free, unlimited.</strong></p>
        </div>

        <Client />

        <div className="card">
          <h2>What is WebP?</h2>
          <p>
            <strong>WebP is a modern image format developed by Google.</strong> Provides superior compression—typically 25-35%
            smaller file sizes than JPG at equivalent quality. Supports both lossy (like JPG) and lossless (like PNG) compression,
            plus transparency (alpha channel) and animation.
          </p>

          <h3>Key Benefits</h3>
          <ul>
            <li><strong>Smaller file sizes:</strong> 25-35% smaller than JPG, 50-80% smaller than PNG (with transparency)</li>
            <li><strong>Faster page loads:</strong> Smaller files = less bandwidth = faster websites = better user experience</li>
            <li><strong>Better SEO:</strong> Google prioritizes fast-loading sites; WebP improves Core Web Vitals scores</li>
            <li><strong>Same quality:</strong> Visually identical to JPG at 80-90% quality but significantly smaller</li>
            <li><strong>Wide support:</strong> 95%+ browsers support WebP (Chrome, Firefox, Safari, Edge since 2020)</li>
          </ul>
        </div>

        <div className="card">
          <h2>WebP vs JPG vs PNG</h2>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginTop: '12px' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Feature</th>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>WebP</th>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>JPG</th>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>PNG</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}><strong>File Size</strong></td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee', color: '#22c55e' }}>✓ Smallest</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Medium</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee', color: '#ef4444' }}>✗ Largest</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}><strong>Quality</strong></td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee', color: '#22c55e' }}>✓ Excellent</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Good</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee', color: '#22c55e' }}>✓ Lossless</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}><strong>Transparency</strong></td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee', color: '#22c55e' }}>✓ Yes</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee', color: '#ef4444' }}>✗ No</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee', color: '#22c55e' }}>✓ Yes</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}><strong>Animation</strong></td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee', color: '#22c55e' }}>✓ Yes</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee', color: '#ef4444' }}>✗ No</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee', color: '#f59e0b' }}>~ APNG only</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}><strong>Browser Support</strong></td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>95%+ (2020+)</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee', color: '#22c55e' }}>✓ 100%</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee', color: '#22c55e' }}>✓ 100%</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}><strong>Best For</strong></td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Websites, apps</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Photos, general</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Logos, graphics</td>
              </tr>
            </tbody>
          </table>

          <p style={{ marginTop: '12px' }}><strong>Example:</strong> 500KB JPG → 350KB WebP (30% smaller, same quality)</p>
        </div>

        <div className="card">
          <h2>When to Use WebP</h2>

          <h3>✅ Perfect For</h3>
          <ul>
            <li><strong>Website images:</strong> Hero images, blog photos, product galleries—faster page loads</li>
            <li><strong>E-commerce:</strong> Product photos—smaller files = faster browsing = more sales</li>
            <li><strong>Mobile apps:</strong> Reduces app size and mobile data usage</li>
            <li><strong>Content-heavy sites:</strong> News, blogs, portfolios with many images</li>
            <li><strong>SEO optimization:</strong> Google rewards fast-loading sites with better rankings</li>
          </ul>

          <h3>❌ Not Ideal For</h3>
          <ul>
            <li><strong>Email attachments:</strong> Some email clients don't display WebP (use JPG instead)</li>
            <li><strong>Print files:</strong> Printers expect JPG/TIFF (WebP is web-only format)</li>
            <li><strong>Legacy systems:</strong> Old software (pre-2020) may not support WebP</li>
            <li><strong>Microsoft Office:</strong> PowerPoint/Word don't support WebP (as of 2025)</li>
          </ul>
        </div>

        <div className="card">
          <h2>How to Convert to WebP</h2>

          <h3>Single Image Conversion</h3>
          <ol>
            <li><strong>Upload JPG or PNG</strong> (any size, camera photos OK)</li>
            <li><strong>Set quality to 80-90</strong> (85 is sweet spot—great quality, 30% smaller)</li>
            <li><strong>Optional: resize first</strong> (e.g., 1920px for web—further reduces file size)</li>
            <li><strong>Download WebP</strong> (same filename with .webp extension)</li>
          </ol>

          <h3>Batch Conversion (Multiple Images)</h3>
          <ol>
            <li><strong>Upload all images</strong> (drag and drop entire folder)</li>
            <li><strong>Apply same settings</strong> (quality 85, optional resize)</li>
            <li><strong>Convert all at once</strong> (processes in parallel—fast)</li>
            <li><strong>Download ZIP</strong> (all WebP files in single download)</li>
          </ol>
          <p><strong>Saves hours compared to one-by-one conversion.</strong></p>
        </div>

        <div className="card">
          <h2>WebP Quality Settings</h2>

          <h3>Quality Recommendations</h3>
          <ul>
            <li><strong>90-95 (high):</strong> Near-lossless quality. Use for hero images, key visuals. File size: 70-80% of original JPG.</li>
            <li><strong>80-85 (recommended):</strong> Best balance. Visually identical to JPG but 25-35% smaller. Default choice for most images.</li>
            <li><strong>70-75 (good):</strong> Slight quality reduction (barely noticeable). File size: 50-60% of original. Good for thumbnails, gallery images.</li>
            <li><strong>60-65 (acceptable):</strong> Noticeable quality loss in detailed areas. Only use when file size is critical (mobile apps with strict size limits).</li>
          </ul>

          <h3>Testing Quality</h3>
          <p>
            <strong>Always preview before converting entire batch.</strong> Upload one sample image, try quality 85, download, compare
            side-by-side with original. If quality looks good, use same setting for all images. If not, increase to 90.
          </p>
        </div>

        <div className="card">
          <h2>Browser Support & Fallback Strategy</h2>

          <h3>Current Support (2025)</h3>
          <ul>
            <li><strong>Chrome:</strong> Full support since 2010</li>
            <li><strong>Firefox:</strong> Full support since 2019</li>
            <li><strong>Safari:</strong> Full support since 2020 (macOS Big Sur, iOS 14)</li>
            <li><strong>Edge:</strong> Full support since 2020</li>
            <li><strong>Overall:</strong> 95%+ of global users can view WebP</li>
          </ul>

          <h3>What About Older Browsers?</h3>
          <p>
            <strong>Use HTML &lt;picture&gt; element for automatic fallback:</strong>
          </p>
          <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto', fontSize: '13px' }}>{`<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description">
</picture>`}</pre>
          <p>
            Modern browsers load WebP (smaller, faster). Old browsers (IE 11, Safari pre-2020) load JPG fallback. Best of both worlds:
            speed for 95% of users, compatibility for remaining 5%.
          </p>
        </div>

        <div className="card">
          <h2>WebP for SEO & Performance</h2>

          <h3>Core Web Vitals Impact</h3>
          <p>
            <strong>Google measures page speed using Core Web Vitals.</strong> WebP improves:
          </p>
          <ul>
            <li><strong>LCP (Largest Contentful Paint):</strong> Smaller images load faster—improves LCP score</li>
            <li><strong>FID (First Input Delay):</strong> Less bandwidth used—browser responds faster</li>
            <li><strong>CLS (Cumulative Layout Shift):</strong> Images load quicker—reduces layout shifts</li>
          </ul>

          <h3>Real-World Performance Gains</h3>
          <p><strong>Example website with 50 JPG images (25MB total):</strong></p>
          <ul>
            <li><strong>Before:</strong> 5.5 second page load on 3G mobile</li>
            <li><strong>After (WebP):</strong> 3.8 second load (30% faster)</li>
            <li><strong>Result:</strong> Lower bounce rate, higher engagement, better SEO rankings</li>
          </ul>
        </div>

        <div className="card">
          <h2>Related Tools</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="/compress" className="pill">Compress Images</a>
            <a href="/tools/png-jpg-converter" className="pill">PNG/JPG Converter</a>
            <a href="/tools/resize-image" className="pill">Resize Images</a>
            <a href="/tools/crop-templates" className="pill">Crop Images</a>
          </div>
        </div>

        <FaqJsonLd items={[
          { question: "How do I convert JPG to WebP?", answer: "Upload JPG image, set quality (80-90 recommended), optionally resize, download WebP file. Batch convert multiple images and download as ZIP. Works locally—no uploads. Free, unlimited. WebP is 25-35% smaller than JPG at same quality." },
          { question: "Is WebP better than JPG?", answer: "Yes for websites—WebP is 25-35% smaller than JPG at equivalent quality. Faster page loads, better SEO, same visual quality. However, JPG has 100% compatibility; WebP is 95%+ (not supported in old browsers, email clients, Office apps)." },
          { question: "Do all browsers support WebP?", answer: "95%+ browsers support WebP: Chrome (2010+), Firefox (2019+), Safari (2020+), Edge (2020+). Not supported: IE 11, old Safari (pre-2020), some email clients. Use <picture> element for automatic JPG fallback in old browsers." },
          { question: "Can I use WebP for email?", answer: "Not recommended—many email clients (Outlook, Gmail web on old browsers) don't display WebP. Recipients see broken image icon. For email attachments, use JPG (photos) or PNG (graphics with transparency). WebP is for websites/apps only." },
          { question: "What quality should I use for WebP?", answer: "80-85 quality (recommended)—visually identical to original but 25-35% smaller. 90-95 (near-lossless, for hero images). 70-75 (good for thumbnails). Always preview one image first, then apply same quality to batch." },
          { question: "How much smaller is WebP than PNG?", answer: "WebP is 50-80% smaller than PNG for images with transparency. Example: 2MB PNG with transparency → 500KB WebP (75% smaller). For photos, use WebP instead of PNG—massive size reduction with no quality loss." },
        ]} />
      </div>
    </>
  );
}
