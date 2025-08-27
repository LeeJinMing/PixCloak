export default function GuideRemoveExifWeChat() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Remove EXIF from WeChat images</h1>
        <ol>
          <li>Open <a href="/compress">/compress</a></li>
          <li>Drop images and export as JPEG/WebP</li>
          <li>EXIF/GPS will be stripped automatically</li>
        </ol>
        <p className="text-muted">WeChat may recompress images; use original files when possible.</p>
      </div>
    </div>
  );
}


