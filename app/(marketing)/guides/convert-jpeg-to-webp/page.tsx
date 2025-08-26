export default function GuideJpegToWebp() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Convert JPEG to WebP (smaller size, keeps quality)</h1>
        <ol>
          <li>Open <a href="/compress">/compress</a></li>
          <li>Set Format to <strong>WebP</strong>. Optionally set Target (KB).</li>
          <li>Click Compress, then Download or ZIP.</li>
        </ol>
        <p className="text-muted">WebP usually achieves smaller size than JPEG at the same visual quality.</p>
      </div>
    </div>
  );
}


