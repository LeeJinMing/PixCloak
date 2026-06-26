import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import { FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: 'WeChat Remove EXIF When Sending Photos? (2026 Answer)',
  description:
    'Does WeChat strip EXIF/GPS when you send photos? Not reliably—原图 and file mode keep location data. Free local checker + compressor; no upload.',
  alternates: {
    canonical: '/guides/remove-exif-wechat',
    languages: {
      zh: '/guides/remove-exif-wechat-zh',
      en: '/guides/remove-exif-wechat',
      'x-default': '/guides/remove-exif-wechat',
    },
  },
  openGraph: {
    title: 'WeChat remove EXIF when sending photos?',
    description:
      'WeChat may strip some EXIF in compressed mode—but GPS can survive. Safe 3-step local workflow before sharing on WeChat.',
    url: '/guides/remove-exif-wechat',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Does WeChat Remove EXIF Metadata?',
    description:
      'WeChat may strip some EXIF data — but GPS coordinates can still leak. Full guide with safe cleanup workflow.',
  },
};

export default function GuideRemoveExifWeChat() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Does WeChat Remove EXIF?', url: '/guides/remove-exif-wechat' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>

        {/* ── FEATURED SNIPPET TARGET: Direct Answer Box ── */}
        <div className="card" style={{ borderLeft: '4px solid #0070f3' }}>
          <h1>Does WeChat Remove EXIF When Sending Photos?</h1>
          <p className="text-muted" style={{ fontSize: 14, marginTop: 4, marginBottom: 12 }}>Last reviewed: June 2026.</p>
          <p>
            <strong>Short answer: Sometimes, but not reliably.</strong> WeChat recompresses photos before sending,
            which can strip some EXIF fields — but GPS coordinates and device info may still survive in certain sending modes.
            <strong> Do not rely on WeChat to protect your privacy.</strong> Strip metadata locally before sending.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
            <Link className="pill" href="/tools/exif-checker">Check photo EXIF now</Link>
            <Link className="pill" href="/compress">Strip metadata &amp; compress</Link>
            <Link className="pill" href="/redact">Redact visible details</Link>
          </div>
        </div>

        {/* ── Q&A SECTION 1 ── */}
        <div className="card">
          <h2>Q: Does WeChat automatically remove EXIF data from photos?</h2>
          <p>
            <strong>A: It depends on the sending mode.</strong>
          </p>
          <ul>
            <li>
              <strong>Standard photo send (compressed):</strong> WeChat recompresses the image, typically reducing it to under 1MB.
              This process usually strips most EXIF tags — including GPS, camera model, and shutter settings.
              <em> However, this is a side effect of compression, not an intentional privacy feature.</em>
            </li>
            <li>
              <strong>&ldquo;Original quality&rdquo; send (原图):</strong> When you tap the &ldquo;Original&rdquo; toggle before sending,
              WeChat transmits the file with minimal or no recompression.
              <strong> In this mode, all EXIF data — including GPS coordinates — is preserved and visible to the recipient.</strong>
            </li>
            <li>
              <strong>File attachment send:</strong> Sending a photo as a &ldquo;File&rdquo; (文件) bypasses all compression.
              The recipient receives the exact original file with 100% of metadata intact.
            </li>
          </ul>
          <p style={{ marginTop: 8 }}>
            <strong>Summary table:</strong>
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, marginTop: 8 }}>
            <thead>
              <tr style={{ background: 'var(--surface-2, #f5f5f5)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--border, #ddd)' }}>Send Mode</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--border, #ddd)' }}>EXIF Stripped?</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--border, #ddd)' }}>GPS Safe?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border, #eee)' }}>Standard (compressed)</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border, #eee)' }}>Usually, but inconsistent</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border, #eee)' }}>⚠️ Not guaranteed</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border, #eee)' }}>Original quality (原图)</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border, #eee)' }}>No — full metadata kept</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border, #eee)' }}>❌ GPS fully exposed</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 12px' }}>File attachment (文件)</td>
                <td style={{ padding: '8px 12px' }}>No — original file sent</td>
                <td style={{ padding: '8px 12px' }}>❌ GPS fully exposed</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Q&A SECTION 2 ── */}
        <div className="card">
          <h2>Q: Can someone see my location from a photo I sent on WeChat?</h2>
          <p>
            <strong>A: Yes — if you sent it in &ldquo;Original&rdquo; mode or as a file.</strong> A recipient can download your photo
            and open it in any EXIF viewer (iPhone Photos → Info tab, or any online EXIF tool) to extract your GPS coordinates.
            Those coordinates can be pasted into Google Maps to identify your exact home address, workplace, or daily route.
          </p>
          <p>
            Even in compressed mode, GPS fields have been observed surviving recompression in some WeChat versions and devices.
            The inconsistency is the problem — you cannot tell by looking at the photo whether GPS was removed.
          </p>
          <p><strong>Risk scenarios:</strong></p>
          <ul>
            <li>Sending a photo of a document taken at home → recipient can see your home address</li>
            <li>Sharing product photos in a business group → exposes your office or warehouse location</li>
            <li>Sending ID card photos for verification → leaks background location details</li>
            <li>Posting screenshots of maps or conversations → timestamp and device info exposed</li>
          </ul>
        </div>

        {/* ── Q&A SECTION 3 ── */}
        <div className="card">
          <h2>Q: What EXIF data does WeChat typically strip vs. keep?</h2>
          <p>
            <strong>A:</strong> Based on testing across iOS and Android WeChat versions in 2025–2026:
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--surface-2, #f5f5f5)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--border, #ddd)' }}>EXIF Field</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--border, #ddd)' }}>Compressed Mode</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--border, #ddd)' }}>Original Mode</th>
              </tr>
            </thead>
            <tbody>
              {([
                ['GPS Latitude/Longitude', '⚠️ Usually stripped (not always)', '❌ Kept'],
                ['Camera Make/Model', '⚠️ Sometimes stripped', '❌ Kept'],
                ['Date/Time Taken', '⚠️ Sometimes stripped', '❌ Kept'],
                ['Lens/Focal Length', '✅ Usually stripped', '❌ Kept'],
                ['ISO/Aperture/Shutter', '✅ Usually stripped', '❌ Kept'],
                ['Software/Editing App', '⚠️ Inconsistent', '❌ Kept'],
                ['Thumbnail Image', '⚠️ Inconsistent', '❌ Kept'],
              ] as [string, string, string][]).map(([field, compressed, original]) => (
                <tr key={field}>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border, #eee)' }}>{field}</td>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border, #eee)' }}>{compressed}</td>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border, #eee)' }}>{original}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginTop: 12, color: 'var(--muted, #666)', fontSize: 14 }}>
            <strong>Key finding:</strong> GPS stripping is <em>inconsistent</em> even in compressed mode. Behavior varies by
            WeChat version, iOS/Android version, and whether the image was taken by the native camera app or a third-party app.
            There is no documented WeChat policy guaranteeing EXIF removal.
          </p>
        </div>

        {/* ── Q&A SECTION 4 — THE SAFE WORKFLOW ── */}
        <div className="card">
          <h2>Q: How do I reliably remove EXIF before sending on WeChat?</h2>
          <p>
            <strong>A: Clean the photo locally first, then send the clean copy.</strong> This takes under 30 seconds and gives
            you a predictable, verified result regardless of how WeChat handles the file.
          </p>

          <h3>Safe 3-Step Workflow</h3>
          <ol>
            <li>
              <strong>Check first:</strong> Open the <Link href="/tools/exif-checker">EXIF/GPS checker</Link> and drag in your photo.
              If GPS, camera model, or date fields appear, proceed to step 2.
              If no EXIF is detected, the photo is already clean.
            </li>
            <li>
              <strong>Strip metadata:</strong> Use the <Link href="/compress">PixCloak compressor</Link> to export a clean copy.
              Set your target file size (e.g. 500KB), compress — the export automatically removes all EXIF/GPS.
              Or use the <Link href="/redact">redactor</Link> if you also need to hide visible text, faces, or QR codes.
            </li>
            <li>
              <strong>Send the clean copy:</strong> Share the downloaded file on WeChat — not the original.
              In compressed mode or original mode, the exported copy contains zero EXIF.
            </li>
          </ol>

          <h3>Why Local Stripping Is Better Than Trusting WeChat</h3>
          <ul>
            <li><strong>Predictable:</strong> You can verify with the EXIF checker before sending — no guesswork</li>
            <li><strong>Works for all send modes:</strong> Safe even if recipient asks for &ldquo;Original&rdquo; quality</li>
            <li><strong>App-version independent:</strong> Not affected by WeChat updates changing compression behavior</li>
            <li><strong>Zero upload risk:</strong> PixCloak processes locally in your browser — your photo never leaves your device</li>
          </ul>
        </div>

        {/* ── Q&A SECTION 5 ── */}
        <div className="card">
          <h2>Q: Does WeChat Moments or WeChat Work (企业微信) behave differently?</h2>
          <p><strong>A: Yes.</strong></p>
          <ul>
            <li>
              <strong>WeChat Moments (朋友圈):</strong> Photos are always recompressed before posting. GPS is usually stripped,
              but image dimensions and timestamp may remain. Still not a reliable privacy guarantee.
            </li>
            <li>
              <strong>WeChat Work / WeCom (企业微信):</strong> Enterprise accounts may have different compression settings
              configured by the company admin. Some enterprise configurations preserve original quality by default.
              Assume full EXIF is retained unless your IT team explicitly confirms otherwise.
            </li>
            <li>
              <strong>WeChat Mini Programs:</strong> Images uploaded via mini programs go through each app&apos;s own pipeline.
              WeChat has no control over EXIF handling in mini programs. Always strip before uploading.
            </li>
          </ul>
        </div>

        {/* ── RELATED TOOLS ── */}
        <div className="card">
          <h2>Related Privacy Tools</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link href="/tools/exif-checker" className="pill">Check EXIF/GPS</Link>
            <Link href="/compress" className="pill">Strip metadata &amp; compress</Link>
            <Link href="/redact" className="pill">Redact visible text/faces</Link>
            <Link href="/guides/export-without-metadata" className="pill">Export without metadata guide</Link>
            <Link href="/guides/compress-to-200kb" className="pill">Compress to 200KB</Link>
          </div>
        </div>

      </div>

      <FaqJsonLd items={[
        {
          question: "Does WeChat remove EXIF metadata when sending photos?",
          answer: "WeChat removes some EXIF data when compressing photos in standard send mode, but this is inconsistent and not guaranteed. GPS coordinates can survive recompression. In 'Original quality' (原图) mode or when sending as a file attachment, all EXIF data including GPS is fully preserved. Do not rely on WeChat to protect your privacy — strip metadata locally before sending."
        },
        {
          question: "Can someone see my location from a photo I sent on WeChat?",
          answer: "Yes, if you sent the photo in Original mode or as a file attachment. The recipient can open the photo in any EXIF viewer to extract GPS coordinates and find your exact location on a map. Even in compressed mode, GPS has been observed surviving WeChat recompression in some app versions. Always strip GPS metadata locally before sharing sensitive photos."
        },
        {
          question: "How do I remove GPS from a photo before sending on WeChat?",
          answer: "Use a local EXIF remover: open pixcloak.com/tools/exif-checker to verify GPS is present, then use pixcloak.com/compress to export a clean copy with all metadata stripped. Send the downloaded clean copy on WeChat instead of the original. This works regardless of WeChat's send mode — the exported file contains zero EXIF."
        },
        {
          question: "Does WeChat Original mode (原图) keep EXIF data?",
          answer: "Yes. When you enable 'Original' (原图) before sending on WeChat, the photo is transmitted with minimal or no compression, preserving all EXIF data including GPS coordinates, camera model, date/time, and lens information. Never send sensitive photos in Original mode without stripping EXIF first."
        },
        {
          question: "Does WeChat Moments remove EXIF data?",
          answer: "WeChat Moments recompresses photos before posting, which usually strips GPS data. However, image dimensions and timestamps may remain. This behavior can vary by WeChat version and device. For privacy-sensitive photos, strip EXIF locally before posting to Moments."
        },
      ]} />
    </>
  );
}


