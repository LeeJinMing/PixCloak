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


