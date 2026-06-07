import type { Metadata } from 'next';
import Link from 'next/link';
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Compress Photos on iPhone Without Losing Quality (Free, No App)",
  description:
    "Compress iPhone photos to 200KB, 500KB or any target size — free, no upload, works in Safari. Step-by-step guide for recent iOS versions with Shortcuts workflow.",
  alternates: {
    canonical: '/guides/how-to-compress-on-iphone',
    languages: {
      'x-default': '/guides/how-to-compress-on-iphone',
      en: '/guides/how-to-compress-on-iphone',
    },
  },
  openGraph: {
    title: "Compress iPhone photos without losing quality — Free, No App",
    description: "No app download. Works in Safari. Choose target KB, compress locally, and save back to Photos. Compatible with modern iOS Safari.",
    url: "/guides/how-to-compress-on-iphone",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress iPhone Photos Without Losing Quality",
    description: "Free, no app needed. Works in modern iOS Safari. Compress to any KB target. No upload, unlimited, privacy-first.",
  },
};

export default function HowToCompressOnIPhone() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'How to Compress Images on iPhone', url: '/guides/how-to-compress-on-iphone' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>Compress Photos on iPhone Without Losing Quality (Free, No App)</h1>
          <p className="text-muted" style={{ fontSize: 14, marginBottom: 12 }}>Last reviewed: June 2026 · Tested on recent iOS Safari versions.</p>

          {/* ── FEATURED SNIPPET: Quick Answer Box ── */}
          <div style={{ background: 'var(--surface-2, #f0f7ff)', border: '1px solid var(--border, #cce0ff)', borderRadius: 8, padding: '12px 16px', marginBottom: 16 }}>
            <p style={{ margin: 0, fontWeight: 600 }}>Quick Answer</p>
            <p style={{ margin: '6px 0 0' }}>
              Open Safari on your iPhone → go to <Link href="/compress">pixcloak.com/compress</Link> → tap
              &ldquo;Choose Files&rdquo; → select photos → set target size (200KB or 500KB) → tap Compress → Download.
              No app download, no upload, no quality loss. Works in modern iOS Safari.
            </p>
          </div>

          {/* ── iOS Compatibility Table ── */}
          <h2>iOS Version Compatibility</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--surface-2, #f5f5f5)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--border, #ddd)' }}>iOS Version</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--border, #ddd)' }}>Safari Support</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--border, #ddd)' }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {([
                ['Latest iOS Safari', '✅ Full support', 'Fast local processing; Files app download is smooth'],
                ['iOS 18', '✅ Full support', 'All core compression features work in Safari.'],
                ['iOS 17', '✅ Full support', 'Recommended minimum — Canvas API fully stable'],
                ['iOS 16', '✅ Works', 'Slightly slower on older A14/A15 devices'],
                ['iOS 15', '⚠️ Mostly works', 'Batch ZIP download may require manual extraction'],
                ['iOS 13–14', '⚠️ Limited', 'Single-file compression works; batch less reliable'],
              ] as [string, string, string][]).map(([ver, support, notes]) => (
                <tr key={ver}>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border, #eee)' }}>{ver}</td>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border, #eee)' }}>{support}</td>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border, #eee)' }}>{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ── Method Comparison Table ── */}
          <h2 style={{ marginTop: 20 }}>Best Methods to Compress Photos on iPhone — Compared</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--surface-2, #f5f5f5)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--border, #ddd)' }}>Method</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--border, #ddd)' }}>Exact KB Target</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--border, #ddd)' }}>No Upload</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--border, #ddd)' }}>Free</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--border, #ddd)' }}>Quality</th>
              </tr>
            </thead>
            <tbody>
              {([
                ['PixCloak (Safari)', '✅ Yes', '✅ Yes', '✅ Unlimited', '⭐⭐⭐⭐⭐'],
                ['iOS Shortcuts', '❌ Quality % only', '✅ Yes', '✅ Yes', '⭐⭐⭐⭐'],
                ['Mail App (Small/Med)', '❌ No control', '✅ Yes', '✅ Yes', '⭐⭐⭐'],
                ['App Store apps', '⚠️ Some do', '❌ Most upload', '⚠️ Paywalled', '⭐⭐⭐⭐'],
                ['iCloud "Optimize"', '❌ No', '❌ Uploads to iCloud', '✅ Yes (plan req)', '⭐⭐⭐⭐'],
              ] as [string, string, string, string, string][]).map(([method, exact, noUpload, free, quality]) => (
                <tr key={method} style={method.startsWith('PixCloak') ? { background: 'var(--surface-2, #f0fff4)' } : {}}>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border, #eee)', fontWeight: method.startsWith('PixCloak') ? 600 : 400 }}>{method}</td>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border, #eee)' }}>{exact}</td>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border, #eee)' }}>{noUpload}</td>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border, #eee)' }}>{free}</td>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border, #eee)' }}>{quality}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '12px 0' }}>
            <Link className="pill" href="/compress?kb=200">Compress to 200KB</Link>
            <Link className="pill" href="/compress?kb=500">Compress to 500KB</Link>
            <Link className="pill" href="/tools/heic-converter">Convert HEIC first</Link>
          </div>

          <h2>Quick Steps — Compress iPhone Photos in 30 Seconds</h2>
          <ol>
            <li><strong>Open Safari browser</strong> on your iPhone</li>
            <li><strong>Visit</strong> <Link href="/compress">pixcloak.com/compress</Link></li>
            <li><strong>Tap "Choose Files"</strong> → select photos from camera roll</li>
            <li><strong>Set target size</strong> (100KB, 200KB, 500KB, or custom)</li>
            <li><strong>Tap "Compress"</strong> → wait 2-5 seconds</li>
            <li><strong>Tap "Download"</strong> → compressed images save to Photos app</li>
          </ol>
          <p><strong>No app installation, no account, no upload.</strong> Works in Safari and keeps image processing on your device.</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            <Link className="pill" href="/compress?kb=200">Compress to 200KB</Link>
            <Link className="pill" href="/compress?kb=500">Compress to 500KB</Link>
            <Link className="pill" href="/tools/heic-converter">Convert HEIC first</Link>
          </div>
          <p><Link href="/compress">Compress iPhone photos now</Link></p>

          <h2>Why Compress iPhone Photos?</h2>

          <h3>iPhone Photos Are Huge</h3>
          <p>
            <strong>iPhone cameras produce 2-4MB photos.</strong> iPhone 12 and newer: HEIC format (2-3MB), older iPhones: JPEG (3-5MB). These
            large files cause problems:
          </p>
          <ul>
            <li><strong>Email bounces:</strong> Gmail/Outlook reject attachments if total size exceeds 25MB. Five iPhone photos = 10-20MB,
              leaving little room for other files.</li>
            <li><strong>Slow uploads on cellular:</strong> Uploading 3MB photo on LTE takes 15-30 seconds. Uploading 500KB compressed photo
              takes 3-5 seconds.</li>
            <li><strong>Storage fills up fast:</strong> 1000 iPhone photos at 3MB each = 3GB. Compressed to 500KB each = 500MB (83% savings).</li>
            <li><strong>Website speed penalties:</strong> If running blog/business from iPhone, large images hurt SEO and loading speed.</li>
            <li><strong>Social media limits:</strong> Instagram: 30MB max, Facebook: 4MB per photo. Uploading large photos triggers aggressive
              platform compression, reducing quality.</li>
          </ul>

          <h3>Common Scenarios Requiring Compression</h3>
          <ul>
            <li><strong>Email attachments:</strong> Sending vacation photos, documents, receipts to friends/work</li>
            <li><strong>Job applications:</strong> Resume, portfolio samples, ID scans often have 200KB-500KB limits</li>
            <li><strong>Social media posts:</strong> Facebook, Instagram, Twitter—smaller files upload faster, look better (less platform re-compression)</li>
            <li><strong>Marketplace listings:</strong> eBay, Craigslist, Facebook Marketplace—fast uploads, buyers on slow connections can view quickly</li>
            <li><strong>Form submissions:</strong> Government forms, insurance claims, medical portals often have strict size limits</li>
            <li><strong>iMessage/WhatsApp:</strong> Large photos use mobile data—compressed photos save data costs</li>
          </ul>

          <h2>Method 1: Browser-Based Compression (Recommended)</h2>

          <h3>Why Use Browser Instead of App?</h3>
          <ul>
            <li>✅ <strong>No App Store approval wait:</strong> Start compressing immediately, no installation</li>
            <li>✅ <strong>No storage used:</strong> Apps take 50-200MB iPhone storage. Browser tool uses zero permanent storage.</li>
            <li>✅ <strong>No privacy risk:</strong> Processing happens locally in Safari—images never upload to server. Apps often upload
              to remote servers for processing.</li>
            <li>✅ <strong>No limits or paywalls:</strong> Compress unlimited photos free. Many apps limit free tier to 5-10 images,
              then require $5-10/month subscription.</li>
            <li>✅ <strong>Always updated:</strong> Browser tool updates automatically. Apps require manual updates, often with "Rate us!" interruptions.</li>
            <li>✅ <strong>Works offline:</strong> After first page load, works without internet (Progressive Web App). Install to home
              screen for app-like experience.</li>
          </ul>

          <h3>Detailed Step-by-Step</h3>

          <h4>Step 1: Open Safari Browser</h4>
          <p>
            Use Safari (not Chrome) on iPhone. Safari has better support for local file processing on iOS. Chrome works but may have permission issues.
          </p>

          <h4>Step 2: Navigate to Compressor</h4>
          <p>
            In Safari address bar, type: <strong>pixcloak.com/compress</strong> and go. Bookmark this page for future use—tap Share icon →
            Add Bookmark.
          </p>
          <p><strong>Optional: Add to Home Screen</strong></p>
          <p>
            For app-like experience: tap Share icon → "Add to Home Screen" → name it "Compress Photos". Creates icon on home screen, opens in
            fullscreen mode without Safari UI. Works offline after installation.
          </p>

          <h4>Step 3: Select Photos from Camera Roll</h4>
          <ol>
            <li>Tap <strong>"Choose Files"</strong> button (blue button, center of screen)</li>
            <li>Photo picker appears—browse camera roll, albums, iCloud photos</li>
            <li>Tap photos to select (multiple selection supported—select 1, 5, or 50 photos at once)</li>
            <li>Tap <strong>"Add"</strong> or <strong>"Done"</strong> (top-right corner)</li>
          </ol>
          <p><strong>Tips for photo selection:</strong></p>
          <ul>
            <li>Select multiple at once for batch processing (faster than one-by-one)</li>
            <li>Check file sizes before selecting—Settings → General → iPhone Storage → Photos shows which photos are large</li>
            <li>HEIC photos (iPhone 12+) are smaller than JPEG—if given choice, select HEIC originals</li>
          </ul>

          <h4>Step 4: Choose Target File Size</h4>
          <p><strong>Tap KB dropdown menu to select target:</strong></p>
          <ul>
            <li><strong>100KB:</strong> For tiny avatars, email signatures, mobile app icons</li>
            <li><strong>200KB:</strong> For profile pictures (LinkedIn), job applications, forum avatars</li>
            <li><strong>500KB:</strong> ⭐ Recommended for most uses—websites, email, social media, excellent quality</li>
            <li><strong>1MB:</strong> For portfolios, press kits, maximum quality web display</li>
            <li><strong>Custom:</strong> Tap "Custom" to enter exact size (e.g., 300KB, 750KB) if platform has specific requirement</li>
          </ul>
          <p><strong>Not sure which target to choose?</strong> Start with 500KB—best balance of quality and file size for general use.</p>

          <h4>Step 5: Compress Photos</h4>
          <p>
            Tap <strong>"Compress"</strong> button. Processing happens locally on iPhone—no upload wait. Progress shows for each image:
          </p>
          <ul>
            <li>Single photo: 2-3 seconds</li>
            <li>10 photos: 10-20 seconds</li>
            <li>50 photos: 60-90 seconds</li>
          </ul>
          <p>iPhone CPU does compression—newer iPhones (13, 14, 15 Pro) are faster. Older iPhones (8, X) take 2x longer but still work fine.</p>

          <h4>Step 6: Download Compressed Photos</h4>
          <p><strong>Single photo:</strong> Tap "Download" button below preview. Photo saves to Photos app in Downloads album.</p>
          <p><strong>Multiple photos:</strong> Tap "Download ZIP" button. ZIP file downloads to Files app → Downloads folder. Open Files app,
            navigate to Downloads, tap ZIP to extract, tap photos to save to Photos app.</p>
          <p><strong>Alternative for multiple photos:</strong> Tap download on each photo individually—slower but saves directly to Photos app
            without ZIP extraction step.</p>

          <h4>Step 7: Verify Compressed Photos</h4>
          <p>
            Open Photos app → Downloads album (or main library). Tap compressed photo → tap Info icon (ⓘ) → check file size. Should match
            target (200KB, 500KB, etc).
          </p>
          <p><strong>Quality check:</strong> Zoom to 100% (pinch to zoom). Check faces, text, details. If sharp and clean, compression successful.</p>

          <h2>Method 2: Shortcuts App (Advanced)</h2>

          <h3>Pros & Cons vs Browser Method</h3>
          <p><strong>Advantages:</strong></p>
          <ul>
            <li>One-tap compression from Share menu (faster for frequent use)</li>
            <li>Can automate batch processing of entire albums</li>
            <li>Integrated into iOS—feels more "native"</li>
          </ul>
          <p><strong>Disadvantages:</strong></p>
          <ul>
            <li>No exact KB targeting—can only set quality %, not file size</li>
            <li>More complex setup (creating shortcut takes 5-10 minutes)</li>
            <li>Quality inconsistent—same quality % produces different file sizes for different photos</li>
            <li>Doesn't remove EXIF/GPS automatically (privacy risk)</li>
          </ul>
          <p><strong>Recommendation:</strong> Use browser method for exact KB targeting and privacy. Use Shortcuts only if you compress photos
            dozens of times per day and need one-tap speed.</p>

          <h2>Method 3: Third-Party Apps (Not Recommended)</h2>

          <h3>Popular Apps & Their Limitations</h3>
          <ul>
            <li><strong>Photo Compress:</strong> Free tier: 5 images/day. $4.99/month for unlimited. Uploads to server (privacy concern).</li>
            <li><strong>Resize Photos:</strong> Free with ads. Ads cover UI, making it frustrating to use. No exact KB targeting.</li>
            <li><strong>Image Size:</strong> Free tier: 10 images/week. $2.99/month for unlimited. Local processing (good) but paywall annoying.</li>
            <li><strong>Compress Photos & Pictures:</strong> Free with aggressive ads. Requires "rate us 5 stars" to unlock batch processing.</li>
          </ul>
          <p><strong>Why these apps exist:</strong> They were created before Safari supported local file processing well (iOS 11-12 era).
            Modern Safari (iOS 13+) has full Canvas API support—browser-based compression now works perfectly, making apps obsolete for this use case.</p>

          <h2>Tips for Best Results on iPhone</h2>

          <h3>1. Shoot in HEIC Format (iPhone 12+)</h3>
          <p>
            <strong>HEIC photos are 50% smaller than JPEG with same quality.</strong> Enable: Settings → Camera → Formats → select "High Efficiency"
            (HEIC) instead of "Most Compatible" (JPEG). 3MB JPEG becomes 1.5MB HEIC before compression—starts smaller, compresses better.
          </p>
          <p><strong>Compatibility note:</strong> Most modern systems support HEIC (Windows 10+, Mac, Android, web browsers). If sharing with
            someone on ancient Windows 7, select "Most Compatible" temporarily.</p>

          <h3>2. Delete Duplicates & Blurry Photos Before Compressing</h3>
          <p>
            iPhone duplicates photos (Live Photos, burst mode, screenshots). Delete unnecessary copies first—faster compression, less clutter.
            Settings → General → iPhone Storage → Review Large Attachments shows duplicates.
          </p>

          <h3>3. Compress in Batches by Use Case</h3>
          <p><strong>Group photos by target size:</strong></p>
          <ul>
            <li>Profile pictures → compress all to 200KB in one batch</li>
            <li>Website images → compress all to 500KB in one batch</li>
            <li>Email attachments → compress all to 300KB in one batch</li>
          </ul>
          <p>Consistent file sizes look more professional than random mix (150KB, 400KB, 800KB).</p>

          <h3>4. Use WiFi for First Page Load</h3>
          <p>
            First visit loads ~500KB of JavaScript for compression engine. Use WiFi to avoid cellular data charges. After first load, works
            offline—no data used for compression.
          </p>

          <h3>5. Enable iCloud Photos Optimization</h3>
          <p>
            Settings → Photos → Optimize iPhone Storage. Keeps full-resolution photos in iCloud, stores optimized versions on iPhone. Saves
            storage, allows compressing from full-res originals when needed.
          </p>

          <h2>Troubleshooting Common iPhone Issues</h2>

          <h3>"Cannot Access Photos" Permission Error</h3>
          <p><strong>Fix:</strong> Settings → Safari → Photos → select "All Photos". Safari needs permission to access camera roll.</p>

          <h3>Download Button Does Nothing</h3>
          <p><strong>Fix:</strong> Settings → Safari → Downloads → change location to "Photos" (not iCloud Drive). Or tap-and-hold Download
            button → "Download Linked File".</p>

          <h3>Photos Save as WebP Instead of JPEG</h3>
          <p><strong>Fix:</strong> Before compressing, tap format dropdown → select "JPEG" instead of "WebP". JPEG has better iPhone Photos app
            compatibility.</p>

          <h3>Compression Takes Forever (5+ Minutes)</h3>
          <p><strong>Causes:</strong> iPhone 6s or older (slow CPU), iOS 12 or older (poor Safari performance), low battery mode (throttles CPU).</p>
          <p><strong>Fix:</strong> Disable Low Power Mode, close other apps, restart iPhone. Or compress fewer photos at once (5-10 instead of 50).</p>

          <h3>Compressed Photos Look Blurry</h3>
          <p><strong>Cause:</strong> Target file size too small for original dimensions. 4000x3000px photo compressed to 100KB will look poor.</p>
          <p><strong>Fix:</strong> Increase target to 200KB or 500KB. Or resize photos first using Photos app Edit → Crop, then compress.</p>

          <h2>Alternatives: Built-in iPhone Features</h2>

          <h3>Mail App "Reduce File Size" Option</h3>
          <p><strong>How it works:</strong> When attaching photos to email, Mail app asks "Small, Medium, Large, Actual Size". Select Small
            or Medium to compress.</p>
          <p><strong>Limitations:</strong></p>
          <ul>
            <li>Only works in Mail app—can't use for other purposes (social media, forms, websites)</li>
            <li>No control over exact file size—"Small" might be 150KB or 300KB depending on original</li>
            <li>No preview—can't check quality before sending</li>
            <li>Doesn't remove EXIF/GPS data (privacy risk)</li>
          </ul>
          <p><strong>When to use:</strong> Quick email to friends/family where exact size doesn't matter. For everything else, use browser compressor.</p>

          <h3>Photos App "Duplicate" Feature</h3>
          <p><strong>How it works:</strong> Photos app (iOS 16+) detects duplicate photos, suggests deletion to save space.</p>
          <p><strong>Limitations:</strong> Only removes duplicates, doesn't compress originals. Compression still needed for email/upload limits.</p>
        </div>

        <div className="card">
          <h2>Compress iPhone Photos for Specific Use Cases</h2>

          <h3>For Job Applications &amp; Resumes (200KB limit)</h3>
          <p>
            Most job portals (LinkedIn, Indeed, Workday, Taleo) accept profile photos up to <strong>200KB</strong>.
            iPhone photos are 10–15x too large out of the camera. Open PixCloak in Safari, set target to 200KB, and compress.
            The result looks identical on a recruiter&apos;s screen but passes the upload limit every time.
          </p>

          <h3>For Visa &amp; Government Form Photos (300KB limit)</h3>
          <p>
            US visa applications (DS-160), USCIS forms, and most government portals specify a maximum of 240KB–300KB.
            Use <Link href="/compress?kb=240">compress to 240KB</Link> or <Link href="/compress?kb=300">compress to 300KB</Link> for guaranteed acceptance.
            The photo quality is indistinguishable from the original when viewed on a monitor.
          </p>

          <h3>For Email Attachments (keep under 10MB total)</h3>
          <p>
            Gmail caps total attachment size at 25MB; Outlook at 20MB. Five iPhone photos = 15–20MB.
            Compress each to 500KB before attaching — five compressed photos = 2.5MB total, well under any limit.
          </p>

          <h3>For Social Media (Instagram, Facebook, TikTok)</h3>
          <p>
            Instagram accepts up to 30MB per photo but <strong>re-compresses your upload</strong> if it&apos;s large.
            This double-compression can introduce artifacts and reduce sharpness. Pre-compress to 500KB in Safari
            before uploading — Instagram shows your photo at its best because it&apos;s already optimized.
          </p>

          <h3>For iMessage &amp; WhatsApp (save mobile data)</h3>
          <p>
            Sending a 3MB iPhone photo on LTE uses your data plan. Compress to 200KB first — 93% smaller file,
            same visual quality on a phone screen. Over a month of regular photo sharing, this can save 50–200MB of data.
          </p>
        </div>

        <div className="card">
          <h2>Ready to Compress iPhone Photos?</h2>
          <p>No app download, no account, no limits. Start compressing now:</p>
          <Link href="/compress" style={{ padding: '12px 24px', background: '#0070f3', color: 'white', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, display: 'inline-block', marginTop: '12px' }}>
            Compress in Safari Browser →
          </Link>
        </div>

        <div className="card">
          <h2>Related Guides</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link href="/guides/how-to-compress-image-without-losing-quality" className="pill">Compress without losing quality</Link>
            <Link href="/guides/how-to-reduce-image-file-size" className="pill">Reduce image file size</Link>
            <Link href="/guides/compress-to-200kb" className="pill">Compress to 200KB</Link>
            <Link href="/guides/compress-to-500kb" className="pill">Compress to 500KB</Link>
            <Link href="/guides/export-without-metadata" className="pill">Remove EXIF/GPS</Link>
          </div>
        </div>

        <FaqJsonLd
          items={[
            { question: "How do I compress images on iPhone without an app?", answer: "Open Safari browser, visit pixcloak.com/compress, tap Choose Files, select photos from camera roll, set target size (200KB, 500KB), tap Compress, download compressed photos to Photos app. No app installation needed—works entirely in Safari. Free, unlimited, no account required." },
            { question: "How to compress photos on iPhone without losing quality?", answer: "Use PixCloak in Safari (pixcloak.com/compress). Set target to 500KB — this reduces a 3MB iPhone photo by 83% while maintaining excellent screen quality. Quality is indistinguishable on phone and laptop screens. Only noticeable when printing at poster size. Works in modern iOS Safari." },
            { question: "Does photo compression work on recent iOS versions?", answer: "Yes. PixCloak works in modern iOS Safari. Browser-based compression uses Canvas API support available in recent iOS versions, and Files app downloads work for single images and ZIP exports." },
            { question: "Can I compress photos on iPhone for free?", answer: "Yes—use Safari browser compressor at pixcloak.com/compress. Completely free, no limits, no ads, no subscription. Compress unlimited photos to exact KB targets (100KB-1MB). Processes locally on iPhone, no uploads. Also works offline after first page load (Progressive Web App)." },
            { question: "How to reduce iPhone photo size for email?", answer: "Open Safari, go to pixcloak.com/compress, select photos, choose 200KB or 500KB target, compress, download. Or use Mail app's built-in 'Reduce File Size' option when attaching photos (select Small or Medium). Browser method gives exact KB control and better quality." },
            { question: "Why are my iPhone photos so large?", answer: "iPhone cameras produce 2-4MB photos (HEIC: 2-3MB, JPEG: 3-5MB). High resolution (4000x3000px, 12 megapixels) for printing quality. Most web/email use doesn't need this much—compressing to 500KB maintains excellent screen quality while reducing file size 80-90%." },
            { question: "How to compress photos on iPhone for Instagram?", answer: "Use Safari browser compressor: select photos, choose 500KB target, compress, download. Instagram accepts up to 30MB but re-compresses uploads. Starting with 500KB ensures Instagram's compression doesn't degrade quality. Also uploads faster on cellular (5 seconds vs 30 seconds for 3MB photo)." },
            { question: "Can I compress multiple iPhone photos at once?", answer: "Yes—browser compressor supports batch processing. Select 5, 10, 50, or more photos at once. Compress all to same target KB. Download as ZIP file or download individually. Processing time: 2-3 seconds per photo on modern iPhones (13, 14, 15 Pro), 5 seconds per photo on older iPhones (8, X, 11)." },
            { question: "How to compress photos on iPhone without uploading?", answer: "Use browser-based compressor (pixcloak.com/compress) which processes locally on iPhone using Safari's Canvas API. Images never upload to server—compression happens entirely on your device. Verifiable: open Safari's network tab, watch for zero upload traffic during compression. GDPR-compliant, private by design." },
            { question: "What is the best way to compress photos on iPhone for a visa application?", answer: "Use PixCloak in Safari: go to pixcloak.com/compress, select your photo, set target to 240KB (for DS-160 US visa) or 300KB (for most other government forms), tap Compress, download. The compressed photo is under the size limit and maintains the quality and clarity required for official documents." },
          ]}
        />
      </div>
    </>
  );
}

