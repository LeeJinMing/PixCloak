import type { Metadata } from "next";
import RelatedTasks from "@/components/RelatedTasks";

export const metadata: Metadata = {
  title: "Privacy & Compliance for Images (Local Processing)",
  description: "Practical checklist to handle images with privacy-first workflow: redact sensitive info, remove EXIF/GPS, and export locally.",
  alternates: { canonical: "/guides/privacy-compliance" },
  openGraph: { title: "Privacy & Compliance for Images", description: "Redact + remove EXIF/GPS locally. No upload." },
  twitter: { title: "Privacy & Compliance for Images", description: "Local processing, no upload." },
};

export default function Page() {
  return (
    <div className="container" style={{ display: 'grid', gap: 16 }}>
      <div className="card">
        <h1 style={{ marginBottom: 8 }}>Privacy & Compliance for Images</h1>
        <p className="text-muted" style={{ marginBottom: 12 }}>
          This checklist helps teams prepare images for compliant sharing: redact sensitive regions, remove metadata, and keep processing local.
        </p>
        <ol style={{ paddingLeft: 18 }}>
          <li>Identify sensitive fields (faces, plates, ID numbers, contacts, timestamps, QR codes).</li>
          <li>Use <a className="pill" href="/redact">Redact</a> to cover or pixelate those areas. Prefer solid blocks for irreversible masking.</li>
          <li>Remove EXIF/GPS with re-encoding. See <a className="pill" href="/guides/exif-gps-removal">EXIF/GPS removal</a>.</li>
          <li>Keep file size limits with <a className="pill" href="/">Target KB</a> (e.g., 200KB/500KB/1MB).</li>
          <li>For batches, export ZIP in the tool after processing.</li>
        </ol>
        <ul className="text-muted" style={{ paddingLeft: 18, marginTop: 8 }}>
          <li>Local processing: images never leave your device.</li>
          <li>Re-encoding strips EXIF/GPS by default on export.</li>
        </ul>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'HowTo', name: 'Privacy & Compliance for Images', step: [
            { '@type': 'HowToStep', name: 'Identify sensitive fields' },
            { '@type': 'HowToStep', name: 'Redact sensitive regions' },
            { '@type': 'HowToStep', name: 'Remove EXIF/GPS metadata' },
            { '@type': 'HowToStep', name: 'Compress to target KB' },
            { '@type': 'HowToStep', name: 'Batch export as ZIP' },
          ] }) }}
        />
      </div>
      <RelatedTasks />
    </div>
  );
}


