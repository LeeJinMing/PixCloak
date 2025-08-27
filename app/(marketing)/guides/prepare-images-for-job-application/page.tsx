export default function GuideJobApplication() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Prepare images for job application portals</h1>
        <ul>
          <li>Common caps: 200KB avatars, 500KB attachments</li>
          <li>Resize to ≤ 1920px; then target size</li>
          <li>Remove EXIF/GPS on export (default)</li>
        </ul>
        <p>Start fast: <a href="/compress?kb=200">/compress?kb=200</a> and <a href="/compress?kb=500">/compress?kb=500</a>.</p>
      </div>
    </div>
  );
}


