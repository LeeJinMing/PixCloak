export default function GuideCompress300KB() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Compress images to 300KB</h1>
        <ol>
          <li>Open <a href="/compress?kb=300">/compress?kb=300</a></li>
          <li>Set Format = WebP (try JPEG if needed)</li>
          <li>Resize longest side to 1920px for large photos</li>
        </ol>
        <p className="text-muted">300KB balances quality and speed for many posts and forms.</p>
      </div>
    </div>
  );
}


