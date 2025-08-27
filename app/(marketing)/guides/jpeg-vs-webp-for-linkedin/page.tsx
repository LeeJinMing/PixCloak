export default function GuideJpegWebpLinkedIn() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>JPEG vs WebP for LinkedIn</h1>
        <ul>
          <li>Prefer WebP for feed images; JPEG for banners with gradients</li>
          <li>Use 1920px longest side; start from 500KB</li>
          <li>Preview artifacts before posting</li>
        </ul>
        <p>Open <a href="/compress?kb=500">/compress?kb=500</a> and toggle format.</p>
      </div>
    </div>
  );
}


