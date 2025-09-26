export default function RelatedTasks() {
  return (
    <div className="card" style={{ marginTop: 16 }}>
      <h2 style={{ marginBottom: 8 }}>Related tasks</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <a href="/compress?kb=200" className="pill">Compress to 200KB</a>
        <a href="/compress?kb=500" className="pill">Compress to 500KB</a>
        <a href="/compress?kb=1024" className="pill">Compress to 1MB</a>
        <a href="/guides/resize-to-1920" className="pill">Resize to 1920</a>
        <a href="/guides/resize-longest-side" className="pill">Resize longest side</a>
        <a href="/guides/exif-gps-removal" className="pill">Remove EXIF/GPS</a>
        <a href="/redact" className="pill">Redact sensitive info</a>
        <a href="/guides/zip-batch-download" className="pill">ZIP batch download</a>
        <a href="/guides/embed-button" className="pill">Embed a button</a>
        <a href="/guides/languages" className="pill">Read in other languages</a>
      </div>
    </div>
  );
}


