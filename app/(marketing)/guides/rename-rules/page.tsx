export default function GuideRenameRules() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Batch Rename Rules (prefix/suffix, keep extension)</h1>
        <ol>
          <li>Open <a href="/compress">/compress</a></li>
          <li>Set prefix/suffix; enable “keep original extension” if needed.</li>
          <li>Compress and Download ZIP – files are renamed accordingly.</li>
        </ol>
        <p className="text-muted">Consistent filenames help with uploads and versioning.</p>
      </div>
    </div>
  );
}


