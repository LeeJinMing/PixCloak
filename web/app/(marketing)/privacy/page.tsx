import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy: Your Data Stays Local | PixCloak',
  description: 'We design PixCloak with privacy‑first principles. All image processing happens locally in your browser—no uploads, minimal storage, and clear disclosures.',
  alternates: { canonical: '/privacy', languages: { 'x-default': '/privacy' } },
};

export default function PrivacyPage() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <h1>Privacy Policy</h1>
        <p>We design PixCloak with privacy‑first principles. This page explains what we do (and do not) collect.</p>

        <h2>Local processing</h2>
        <p>
          All image operations (compression/redaction/resizing) are performed locally in your browser via Canvas/Web
          APIs. Your files are <strong>not</strong> uploaded to our servers.
        </p>

        <h2>Personal data</h2>
        <p>
          We do not require accounts for using core features. We do not store your images or personal identifiers.
          If you voluntarily contact us via email, we will receive your email address and message content solely to
          respond to your request.
        </p>

        <h2>Cookies & storage</h2>
        <p>
          The app may use minimal local storage for UI preferences (e.g., last used quality). These values stay on your
          device and are not transmitted.
        </p>

        <h2>Analytics</h2>
        <p>
          We may use basic, privacy‑respecting analytics to understand general usage trends (e.g., page views). No
          personal data or images are collected. If analytics is enabled, we will disclose the provider and scope here.
        </p>

        <h2>Third‑party services</h2>
        <p>
          We avoid third‑party trackers. If future features integrate external services, they will be documented here
          with clear opt‑in choices.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy inquiries, email <a href="mailto:support@pixcloak.com">support@pixcloak.com</a>.
        </p>
      </div>
    </div>
  );
}


