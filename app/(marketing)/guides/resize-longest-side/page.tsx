export default function GuideResizeLongest() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Resize by Longest Side (e.g., 1920px for web)</h1>
        <ol>
          <li>Open <a href="/compress">/compress</a></li>
          <li>Choose Resize = Longest side, set value (e.g., 1920).</li>
          <li>Compress with desired quality or target size.</li>
        </ol>
        <p className="text-muted">Downscaling before compression saves size dramatically with minimal perceived loss.</p>
      </div>
    </div>
  );
}


