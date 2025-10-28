import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us: Questions & Support | PixCloak',
  description: 'Questions or feedback about PixCloak? Email support@pixcloak.com with your scenario and an example file (no private data). We reply within 1–2 business days.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Contact</h1>
        <p>If you have questions, suggestions, or found an issue, please reach out. Short, actionable feedback is most helpful.</p>
        <p>
          Email: <a href="mailto:support@pixcloak.com">support@pixcloak.com</a>
        </p>
        <ul>
          <li>What did you try to do?</li>
          <li>What happened vs. expected?</li>
          <li>Example file (if possible) – do not include private info</li>
        </ul>
        <p className="text-muted" style={{ fontSize: 12 }}>
          We usually respond within 1–2 business days.
        </p>
      </div>
    </div>
  );
}
