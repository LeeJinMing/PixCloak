import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Screenshot Privacy Checklist (Before Sharing) | PixCloak',
  description: 'Hide contacts, IDs, order numbers, and QR codes; crop sensitive UI; export without EXIF/GPS. A quick checklist to prevent privacy leaks when posting screenshots.',
  alternates: {
    canonical: '/guides/screenshot-privacy-check',
    languages: { 'x-default': '/guides/screenshot-privacy-check', en: '/guides/screenshot-privacy-check' }
  },
};

export default function GuideScreenshotPrivacy() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Screenshot Privacy Check (before sharing)</h1>
        <ul>
          <li>Hide contacts, email/phone, addresses, order numbers, QR codes.</li>
          <li>Consider cropping irrelevant UI that might reveal identity.</li>
          <li>Export without EXIF/GPS; verify thumbnails don’t leak info.</li>
        </ul>
        <p className="text-muted">Run a quick checklist each time before posting screenshots online.</p>
      </div>
    </div>
  );
}


