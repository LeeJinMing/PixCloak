import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy: Your Data Stays Local',
  description: 'PixCloak processes image files locally in your browser and separately discloses optional website analytics, advertising, and consent storage.',
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
          Image operations such as compression, redaction, metadata cleanup, conversion, and resizing are performed
          locally in your browser via Canvas and related Web APIs. PixCloak does not send the image file to its server.
        </p>

        <h2>Personal data</h2>
        <p>
          We do not require accounts for V1.0. We do not store your images, filenames, embedded metadata, or editing selections.
          If you voluntarily contact us via email, we will receive your email address and message content solely to
          respond to your request.
        </p>

        <h2>Cookies & storage</h2>
        <p>
          The site stores your privacy choice in local storage under <code>pixcloak-consent-v1</code>. Tool preferences
          may also be stored locally. You can reopen “Privacy choices” at any time to clear and choose again.
        </p>

        <h2>Analytics</h2>
        <p>
          If you choose “Allow analytics &amp; ads” and analytics is enabled for this deployment, the site loads Vercel
          Analytics to measure page and product usage. PixCloak does not add image bytes, filenames, metadata, detected
          text, or exact image dimensions to analytics events. Vercel may process technical request information under
          its own privacy terms.
        </p>

        <h2>Advertising</h2>
        <p>
          If you accept optional services, advertising is enabled for the deployment, and the required Google consent
          configuration is marked ready, the site may load Google AdSense. Google may use cookies or similar technology
          and process technical information under its own policies. Ads are separate from image processing and do not
          receive image files from PixCloak. Legal pages and embedded tools do not intentionally contain ad units.
        </p>

        <h2>Anonymous product events</h2>
        <p>
          Product events are limited to the tool name, input/output format, broad file-size or batch-count bucket,
          processing-duration bucket, and standardized error code. Image content, filenames, metadata, recognized text,
          and exact dimensions are prohibited event properties.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy inquiries, email <a href="mailto:support@pixcloak.com">support@pixcloak.com</a>.
        </p>
      </div>
    </div>
  );
}


