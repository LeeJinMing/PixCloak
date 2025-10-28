import type { Metadata } from "next";
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import RelatedTasks from "@/components/RelatedTasks";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy & Compliance for Images (Local, No Upload) | PixCloak",
  description: "Practical checklist to share images safely: redact faces/plates/IDs, black out sensitive text, remove EXIF/GPS. Local processing, no uploads.",
  alternates: { canonical: "/guides/privacy-compliance" },
  openGraph: { title: "Privacy & Compliance for Images", description: "Redact + remove EXIF/GPS locally. No upload.", url: "/guides/privacy-compliance" },
  twitter: { title: "Privacy & Compliance for Images", description: "Local processing, no upload." },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Privacy & Compliance for Images (Local, No Upload)', url: '/guides/privacy-compliance' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 16 }}>
        <div className="card">
          <h1 style={{ marginBottom: 8 }}>Privacy & Compliance for Images</h1>
          <p className="text-muted" style={{ marginBottom: 12 }}>
            This checklist helps teams prepare images for compliant sharing: redact sensitive regions, remove metadata, and keep processing local.
          </p>
          <ol style={{ paddingLeft: 18 }}>
            <li>Identify sensitive fields (faces, plates, ID numbers, contacts, timestamps, QR codes).</li>
            <li>Use <Link className="pill" href="/redact">Redact</Link> to cover or pixelate those areas. Prefer solid blocks for irreversible masking.</li>
            <li>Remove EXIF/GPS with re-encoding. See <Link className="pill" href="/guides/exif-gps-removal">EXIF/GPS removal</Link>.</li>
            <li>Keep file size limits with <Link className="pill" href="/">Target KB</Link> (e.g., 200KB/500KB/1MB).</li>
            <li>For batches, export ZIP in the tool after processing.</li>
          </ol>
          <ul className="text-muted" style={{ paddingLeft: 18, marginTop: 8 }}>
            <li>Local processing: images never leave your device.</li>
            <li>Re-encoding strips EXIF/GPS by default on export.</li>
          </ul>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org', '@type': 'HowTo', name: 'Privacy & Compliance for Images', step: [
                  { '@type': 'HowToStep', name: 'Identify sensitive fields' },
                  { '@type': 'HowToStep', name: 'Redact sensitive regions' },
                  { '@type': 'HowToStep', name: 'Remove EXIF/GPS metadata' },
                  { '@type': 'HowToStep', name: 'Compress to target KB' },
                  { '@type': 'HowToStep', name: 'Batch export as ZIP' },
                ]
              })
            }}
          />
        </div>
        <div className="card">
          <h2 style={{ marginBottom: 8 }}>Industry playbooks</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            <div>
              <strong>HR/Recruiting</strong>
              <ul style={{ paddingLeft: 18 }}>
                <li>Avatars ≤ 200KB; screenshots ≤ 500KB</li>
                <li>Redact contact info, ID numbers; export without EXIF/GPS</li>
              </ul>
              <Link className="pill" href="/guides/long-tail/resume-200kb">Resume 200KB</Link>
              <Link className="pill" href="/guides/long-tail/job-application-500kb">Job application 500KB</Link>
            </div>
            <div>
              <strong>Government/Legal</strong>
              <ul style={{ paddingLeft: 18 }}>
                <li>Common caps: 200–500KB; prefer 1920px then target KB</li>
                <li>Use solid blocks for ID/MRZ; keep irreversible masking</li>
              </ul>
              <Link className="pill" href="/guides/long-tail/gov-portal-200kb-cn">Gov portal 200KB (CN)</Link>
              <Link className="pill" href="/guides/long-tail/passport-scan-redact">Passport redaction</Link>
            </div>
            <div>
              <strong>Publishing/Social</strong>
              <ul style={{ paddingLeft: 18 }}>
                <li>Use presets: 200/300/500/800KB depending on channel</li>
                <li>Add high-contrast text; avoid sensitive UI in screenshots</li>
              </ul>
              <Link className="pill" href="/guides/long-tail/youtube-thumbnail-200kb">YouTube 200KB</Link>
              <Link className="pill" href="/guides/long-tail/instagram-story-1080x1920">Instagram Story</Link>
            </div>
          </div>
        </div>
        <RelatedTasks />
      </div>
    </>
  );
}


