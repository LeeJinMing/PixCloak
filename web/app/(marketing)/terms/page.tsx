import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service: Free Image Tools | PixCloak',
  description: 'Read the service terms for PixCloak. Lawful use, intellectual property, no uploads by default, disclaimers, limitations, and contact information.',
  alternates: { canonical: '/terms', languages: { 'x-default': '/terms' } },
};

export default function TermsPage() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <h1>Terms of Service</h1>

        <h2>1. Acceptable use</h2>
        <p>
          You may use PixCloak for lawful purposes only. You are responsible for ensuring you have rights to process
          content and for complying with applicable laws and platform policies when publishing processed images.
        </p>

        <h2>2. Intellectual property</h2>
        <p>
          You retain rights to your content. PixCloak owns the site and software. Open‑source components are provided
          under their respective licenses (see repository).
        </p>

        <h2>3. No uploads</h2>
        <p>
          Core processing happens locally in your browser. We do not store your images. If hosting or sync features are
          added in the future, they will be opt‑in and documented.
        </p>

        <h2>4. Disclaimer of warranties</h2>
        <p>
          The service is provided “as is” without warranties of any kind. We do not guarantee that output will meet a
          specific standard or that the service will be uninterrupted or error‑free.
        </p>

        <h2>5. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, PixCloak shall not be liable for any indirect, incidental, or
          consequential damages arising from your use of the service.
        </p>

        <h2>6. Changes</h2>
        <p>
          We may update these Terms from time to time. Significant changes will be announced on this page. Continued use
          of the service after changes constitutes acceptance of the revised Terms.
        </p>

        <h2>7. Contact</h2>
        <p>
          Questions about these Terms? Email <a href="mailto:support@pixcloak.com">support@pixcloak.com</a>.
        </p>
      </div>
    </div>
  );
}


