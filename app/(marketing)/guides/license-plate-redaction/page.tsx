export default function GuidePlateRedaction() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Redact License Plates in Photos</h1>
        <ol>
          <li>Open <a href="/redact">/redact</a></li>
          <li>Select Preset = “License Plate” (or draw a box manually).</li>
          <li>Choose mode Solid or Pixelate; export JPG (EXIF/GPS removed).</li>
        </ol>
        <p className="text-muted">Keep margins around plates to avoid partial leaks; avoid blur that can be reversed.</p>
      </div>
    </div>
  );
}


