export default function GuidePortfolio() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Prepare images for portfolio websites</h1>
        <ul>
          <li>Resize longest side to 1920px</li>
          <li>Start from 800KB–1MB for fewer artifacts</li>
          <li>Use WebP where supported; JPEG for universal compatibility</li>
        </ul>
        <p>Try <a href="/compress?kb=800">/compress?kb=800</a> or <a href="/compress?kb=1024">/compress?kb=1024</a>.</p>
      </div>
    </div>
  );
}


