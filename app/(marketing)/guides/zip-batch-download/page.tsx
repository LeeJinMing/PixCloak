export default function GuideZipBatch() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Batch Compress and Download as ZIP</h1>
        <ol>
          <li>Open <a href="/compress">/compress</a></li>
          <li>Drag multiple images into the upload area</li>
          <li>Set Format/Resize/Target (KB) as needed and click Compress</li>
          <li>Click <strong>Download ZIP</strong> to save all results at once</li>
        </ol>
        <p className="text-muted">Tip: Set a prefix/suffix to keep exported files organized.</p>
      </div>
    </div>
  );
}


