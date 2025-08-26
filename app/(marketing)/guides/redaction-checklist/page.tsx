export default function GuideRedactionChecklist() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Pre‑publish Privacy Checklist (Images)</h1>
        <ul>
          <li>Mask faces, license plates, phone numbers, emails, addresses, QR codes?</li>
          <li>Remove EXIF/GPS?</li>
          <li>Keep sufficient safety margins around masked areas?</li>
          <li>Use irreversible methods (solid blocks or strong pixelation)?</li>
        </ul>
        <p>
          Go to <a href="/redact">/redact</a> to redact locally before publishing.
        </p>
      </div>
    </div>
  );
}


