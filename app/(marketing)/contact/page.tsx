export default function ContactPage() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Contact</h1>
        <p>If you have questions, suggestions, or found an issue, feel free to reach out.</p>
        <p>
          Email: <a href="mailto:support@pixcloak.com">support@pixcloak.com</a>
        </p>
        <p className="text-muted" style={{ fontSize: 12 }}>
          We usually respond within 1–2 business days.
        </p>
      </div>
    </div>
  );
}
