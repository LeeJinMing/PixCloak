export default function GuideExifGpsRemoval() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>How to Remove EXIF/GPS from Images</h1>
        <p>Re‑encoding on export removes most EXIF/GPS metadata. Our tools clear them by default.</p>
        <ol>
          <li>Open <a href="/redact">/redact</a> or <a href="/compress">/compress</a></li>
          <li>Export as JPG – EXIF/GPS will be removed automatically.</li>
        </ol>
        <p>We may add an optional toggle to keep non‑sensitive fields later.</p>
      </div>
    </div>
  );
}


