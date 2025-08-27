export default function GuideForms() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Prepare images for web forms</h1>
        <ul>
          <li>Typical limits: 200KB (avatar), 500KB (attachments)</li>
          <li>Use presets: <a href="/compress?kb=200">200KB</a> / <a href="/compress?kb=500">500KB</a></li>
          <li>Resize longest side to 1920px for phone photos</li>
        </ul>
      </div>
    </div>
  );
}


