export default function GuideJpegWebpTwitter() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>JPEG vs WebP for X/Twitter</h1>
        <ul>
          <li>WebP is smaller but may be re‑encoded by the platform</li>
          <li>Try WebP first; fall back to high‑quality JPEG if artifacts</li>
          <li>Keep width ≤ 1920px; target 500KB for fast load</li>
        </ul>
        <p>Test quickly in <a href="/compress?kb=500">/compress?kb=500</a> with Format WebP/JPEG.</p>
      </div>
    </div>
  );
}


