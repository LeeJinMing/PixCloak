export default function GuideCompress800KB() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Compress images to 800KB</h1>
        <ol>
          <li>Open <a href="/compress?kb=800">/compress?kb=800</a></li>
          <li>Use WebP for smaller size; JPEG for compatibility</li>
          <li>Resize longest side if files are huge</li>
        </ol>
        <p className="text-muted">Good for higher‑quality posts and submissions.</p>
      </div>
    </div>
  );
}


