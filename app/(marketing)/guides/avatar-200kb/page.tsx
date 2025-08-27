export default function GuideAvatar200KB() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Create 200KB avatars</h1>
        <ol>
          <li>Open <a href="/compress?kb=200">/compress?kb=200</a></li>
          <li>Resize to 512–1024px square, then Compress</li>
          <li>Export as WebP or JPEG</li>
        </ol>
        <p className="text-muted">Many profile forms cap images at 200KB.</p>
      </div>
    </div>
  );
}


