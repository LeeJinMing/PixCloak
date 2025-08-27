export default function GuideResize1920() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Resize longest side to 1920px</h1>
        <ol>
          <li>Open <a href="/compress">/compress</a></li>
          <li>Set Resize = Longest side, value = 1920</li>
          <li>Compress to 200–800KB as needed</li>
        </ol>
        <p className="text-muted">Downscaling first saves time and improves compression quality.</p>
      </div>
    </div>
  );
}


