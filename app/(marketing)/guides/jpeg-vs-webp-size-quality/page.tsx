export default function GuideJpegVsWebp() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>JPEG vs WebP: Size and Quality</h1>
        <ul>
          <li>WebP usually achieves smaller size at the same visual quality</li>
          <li>JPEG is broadly compatible and good for photos</li>
          <li>PNG fits UI/icons/line art with transparency</li>
        </ul>
        <p>Try both in <a href="/compress">/compress</a>: set Format to WebP/JPEG and compare sizes and Saved%.</p>
      </div>
    </div>
  );
}


