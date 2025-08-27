export default function GuidePost500KB() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Prepare 500KB images for posts</h1>
        <ol>
          <li>Open <a href="/compress?kb=500">/compress?kb=500</a></li>
          <li>Set longest side ≤ 1920px, then Compress</li>
          <li>Download ZIP for multiple images</li>
        </ol>
        <p className="text-muted">500KB works well for most forms and communities.</p>
      </div>
    </div>
  );
}


