import type { Metadata } from 'next';
import Client from './Client';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Free Favicon Generator: All Sizes + Manifest... | PixCloak",
  description: "Generate favicons in all sizes (16x16 to 512x512) instantly. Includes manifest.json and HTML code. Works locally—no uploads. For websites, PWAs, iOS, Android.",
  alternates: {
    canonical: "/tools/favicon-pack",
    languages: { "x-default": "/tools/favicon-pack", en: "/tools/favicon-pack" },
  },
  openGraph: {
    title: "Free Favicon Generator: All Sizes + Manifest",
    description: "Generate favicons for all devices. Download ZIP with manifest.json. Free, no uploads.",
    url: "/tools/favicon-pack",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Tools', url: '/tools' },
        { name: 'Favicon Generator', url: '/tools/favicon-pack' }
      ]} />

      <SoftwareAppJsonLd
        name="Favicon Generator"
        url="/tools/favicon-pack"
        description="Generate favicons in all sizes with manifest.json. 100% local processing, no uploads."
      />

      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>Free Favicon Generator: All Sizes + Manifest (No Upload)</h1>

          <h2>Quick Start</h2>
          <ol>
            <li><strong>Upload logo/image</strong> (PNG, JPG, SVG recommended - square 512x512 or larger)</li>
            <li><strong>Preview all sizes</strong> (16x16 to 512x512 auto-generated)</li>
            <li><strong>Download ZIP</strong> with all files + manifest.json + HTML code</li>
            <li><strong>Upload to website</strong> and add HTML snippet to &lt;head&gt;</li>
          </ol>
          <p><strong>Works locally. No uploads. Free, unlimited.</strong></p>
        </div>

        <Client />

        <div className="card">
          <h2>What is a Favicon?</h2>
          <p>
            <strong>Favicons are tiny icons displayed in browser tabs, bookmarks, and home screens.</strong> The name comes from "favorite icon"
            - originally shown in browser bookmarks. Modern websites need multiple sizes for different platforms and devices.
          </p>

          <h3>Where Favicons Appear</h3>
          <ul>
            <li><strong>Browser tabs:</strong> 16x16 or 32x32 icon left of page title</li>
            <li><strong>Bookmarks bar:</strong> 32x32 icon in bookmark list</li>
            <li><strong>iOS home screen:</strong> 180x180 icon when user adds to home</li>
            <li><strong>Android home screen:</strong> 192x192 or 512x512 icon for PWA</li>
            <li><strong>Windows taskbar:</strong> 32x32 icon when site is pinned</li>
            <li><strong>Google search results:</strong> 192x192 icon next to site name (mobile)</li>
          </ul>
        </div>

        <div className="card">
          <h2>Why You Need Multiple Favicon Sizes</h2>
          <p><strong>Different devices and platforms require different sizes:</strong></p>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginTop: '12px' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Size</th>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Used For</th>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Platform</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>16x16</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Browser tabs (standard size)</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>All browsers</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>32x32</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Bookmarks, Windows taskbar</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Chrome, Firefox, Windows</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>180x180</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>iOS home screen (when saved)</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>iPhone, iPad Safari</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>192x192</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Android home screen, Google search</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Android Chrome</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>512x512</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>PWA splash screens, app icons</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Progressive Web Apps</td>
              </tr>
            </tbody>
          </table>

          <p style={{ marginTop: '12px' }}><strong>Without multiple sizes:</strong> Browsers scale one size to fit—results in blurry or pixelated icons.
            Providing exact sizes ensures sharp display on all devices.</p>
        </div>

        <div className="card">
          <h2>What's Included in ZIP Download</h2>

          <h3>Image Files</h3>
          <ul>
            <li><strong>favicon.ico:</strong> Multi-resolution (16x16, 32x32, 48x48) for legacy browser support</li>
            <li><strong>apple-touch-icon.png:</strong> 180x180 for iOS Safari (iPhone, iPad)</li>
            <li><strong>android-chrome-192x192.png:</strong> For Android home screens and PWA</li>
            <li><strong>android-chrome-512x512.png:</strong> High-res for Android splash screens</li>
            <li><strong>favicon-16x16.png:</strong> Browser tabs (modern browsers)</li>
            <li><strong>favicon-32x32.png:</strong> Bookmarks and taskbar</li>
          </ul>

          <h3>Configuration Files</h3>
          <ul>
            <li><strong>manifest.json:</strong> PWA configuration (name, icons, theme colors)</li>
            <li><strong>HTML-code.txt:</strong> Ready-to-paste &lt;head&gt; tags</li>
          </ul>

          <h3>HTML Code Snippet</h3>
          <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto', fontSize: '13px' }}>{`<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">`}</pre>
        </div>

        <div className="card">
          <h2>How to Install Favicons</h2>

          <h3>For Static HTML Websites</h3>
          <ol>
            <li><strong>Unzip files</strong> to root directory (same folder as index.html)</li>
            <li><strong>Copy HTML snippet</strong> from HTML-code.txt</li>
            <li><strong>Paste into &lt;head&gt;</strong> section of every HTML page (before &lt;/head&gt;)</li>
            <li><strong>Upload files to server</strong> along with HTML pages</li>
          </ol>

          <h3>For Next.js</h3>
          <ol>
            <li><strong>Place files in /public folder</strong> (favicon.ico, manifest.json, all PNGs)</li>
            <li><strong>Add metadata to layout.tsx</strong>:
              <pre style={{ background: '#f5f5f5', padding: '8px', borderRadius: '4px', marginTop: '8px', fontSize: '13px' }}>{`export const metadata = {
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}`}</pre>
            </li>
            <li><strong>Next.js auto-detects</strong> favicon.ico and manifest.json in /public</li>
          </ol>

          <h3>For WordPress</h3>
          <ol>
            <li><strong>Upload via admin:</strong> Appearance → Customize → Site Identity → Site Icon</li>
            <li><strong>Or use FTP:</strong> Upload all files to /wp-content/themes/your-theme/ folder</li>
            <li><strong>Or use plugin:</strong> "Favicon by RealFaviconGenerator" handles all sizes automatically</li>
          </ol>

          <h3>For React (Create React App)</h3>
          <ol>
            <li><strong>Replace files in /public folder:</strong> Delete existing favicon.ico, add new files</li>
            <li><strong>Update index.html</strong> &lt;head&gt; with new &lt;link&gt; tags</li>
            <li><strong>Restart dev server</strong> to see changes (Ctrl+C, then npm start)</li>
          </ol>
        </div>

        <div className="card">
          <h2>Best Practices for Favicon Design</h2>

          <h3>1. Start with High Resolution</h3>
          <p>
            <strong>Upload 512x512 or larger source image.</strong> Tool scales down to smaller sizes. Starting small (e.g., 64x64)
            and scaling up creates blurry results. Always scale down, never up.
          </p>

          <h3>2. Use Square Aspect Ratio (1:1)</h3>
          <p>
            <strong>Favicons must be square.</strong> Rectangular logos get cropped. If your logo is wide, add padding to make it
            square before generating. Use <a href="/tools/aspect-pad">Aspect Ratio Padder</a> to add padding automatically.
          </p>

          <h3>3. Keep Design Simple</h3>
          <p><strong>Avoid tiny text and complex details.</strong> At 16x16 pixels, text becomes unreadable. Use:</p>
          <ul>
            <li>Simple logo mark (icon only, not full logo with text)</li>
            <li>Single letter or monogram</li>
            <li>Bold, recognizable shape</li>
            <li>High contrast (dark on light or light on dark)</li>
          </ul>
          <p><strong>Bad examples:</strong> Full company name text, intricate patterns, thin lines, multiple colors that blur together at small size.</p>
          <p><strong>Good examples:</strong> Apple's apple, Twitter's bird, single letter in bold font, simple geometric shape.</p>

          <h3>4. Test on Dark and Light Backgrounds</h3>
          <p>
            <strong>Some browsers use dark mode.</strong> If your favicon is dark (e.g., black logo), it disappears on dark tabs. Solutions:
          </p>
          <ul>
            <li>Add light-colored border or outline</li>
            <li>Use transparent background with balanced colors</li>
            <li>Provide separate dark mode favicon (advanced—requires media query)</li>
          </ul>

          <h3>5. Use PNG or SVG Source</h3>
          <p>
            <strong>PNG (transparent) or SVG (vector) work best.</strong> JPG adds white backgrounds to transparent areas. If using JPG,
            ensure background matches website theme color.
          </p>
        </div>

        <div className="card">
          <h2>Troubleshooting</h2>

          <h3>Favicon Not Showing After Upload</h3>
          <p><strong>Cause:</strong> Browser cache is showing old favicon.</p>
          <p><strong>Fix:</strong></p>
          <ul>
            <li>Hard refresh page: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)</li>
            <li>Clear browser cache: Settings → Privacy → Clear browsing data</li>
            <li>Try different browser to confirm new favicon is correct</li>
            <li>Wait 24 hours—browsers cache favicons aggressively</li>
          </ul>

          <h3>Favicon Looks Blurry on Retina Displays</h3>
          <p><strong>Cause:</strong> Only providing 16x16 size. Retina displays need 32x32 or larger.</p>
          <p><strong>Fix:</strong> Ensure HTML includes both 16x16 and 32x32 &lt;link&gt; tags. Modern browsers automatically select appropriate size for display density.</p>

          <h3>iOS Home Screen Icon Looks Wrong</h3>
          <p><strong>Cause:</strong> Missing apple-touch-icon.png or using wrong size.</p>
          <p><strong>Fix:</strong> Upload apple-touch-icon.png (180x180) to root directory. Ensure &lt;link rel="apple-touch-icon"&gt; is in &lt;head&gt;.</p>

          <h3>PWA Icon Not Showing</h3>
          <p><strong>Cause:</strong> manifest.json not linked or icons path incorrect in manifest.</p>
          <p><strong>Fix:</strong> Verify manifest.json is in root directory, linked in &lt;head&gt;, and "icons" array contains correct paths (e.g., "/android-chrome-192x192.png").</p>
        </div>

        <div className="card">
          <h2>Related Tools</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="/tools/resize-image" className="pill">Resize Logo</a>
            <a href="/tools/crop-templates" className="pill">Crop to Square</a>
            <a href="/tools/remove-bg-lite" className="pill">Remove Background</a>
            <a href="/compress" className="pill">Compress Images</a>
          </div>
        </div>

        <FaqJsonLd items={[
          { question: "How do I create a favicon for my website?", answer: "Upload logo image (512x512 or larger, square), preview generated sizes, download ZIP with all files and manifest.json, upload files to website root directory, add HTML snippet to <head> section. Tool generates all required sizes (16x16 to 512x512) automatically. Works locally—no uploads. Free, unlimited." },
          { question: "What size should my favicon be?", answer: "Provide multiple sizes for different platforms: 16x16 and 32x32 for browser tabs/bookmarks, 180x180 for iOS, 192x192 and 512x512 for Android/PWA. Start with 512x512 source image—tool generates all sizes automatically. Single size looks blurry on some devices." },
          { question: "How do I add favicon to Next.js?", answer: "Place all files in /public folder. Add metadata to app/layout.tsx: export const metadata = { icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' } }. Next.js auto-detects favicon.ico and manifest.json in /public. Restart dev server to see changes." },
          { question: "Why doesn't my favicon appear after uploading?", answer: "Browser cache shows old favicon. Hard refresh (Ctrl+Shift+R), clear browser cache, or wait 24 hours. Verify files are in correct location (root directory) and HTML <link> tags are in <head> section. Test in different browser to confirm upload worked." },
          { question: "Can I use PNG instead of ICO for favicon?", answer: "Yes—modern browsers support PNG favicons. However, include favicon.ico for legacy browser support (IE 11, old mobile browsers). Our tool generates both: favicon.ico (16x16, 32x32 multi-resolution) and separate PNG files (16x16, 32x32, 180x180, 192x192, 512x512) for comprehensive compatibility." },
          { question: "What is manifest.json for favicons?", answer: "manifest.json defines PWA (Progressive Web App) properties: app name, icons for different sizes, theme colors, display mode. Required for Android home screen icons and PWA installation. Browsers read manifest.json to show app-like experience when user adds site to home screen." },
          { question: "How to create rounded app icons for iOS?", answer: "Upload square logo—iOS automatically rounds corners (20% radius). Don't pre-round logo; iOS applies its own masking. Ensure important elements aren't near edges (corners get cropped). Test by saving to iOS home screen—Safari → Share → Add to Home Screen." },
          { question: "Do I need to add favicon to every page?", answer: "Add <link> tags to <head> of every HTML page, or use template/layout file that applies to all pages. In Next.js/React, add to layout.tsx or index.html (applies globally). Files themselves (favicon.ico, PNGs) only need one copy in root directory." },
        ]} />
      </div>
    </>
  );
}
