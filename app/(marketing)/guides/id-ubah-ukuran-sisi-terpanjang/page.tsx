export default function IDResizeLongest() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Ubah ukuran berdasarkan sisi terpanjang (mis. 1920px)</h1>
        <ol>
          <li>Buka <a href="/compress">/compress</a></li>
          <li>Pilih Resize = Longest side dan isi nilai (1920)</li>
          <li>Kompres dengan kualitas atau target KB</li>
        </ol>
        <p className="text-muted">Menurunkan resolusi sebelum kompres sangat mengurangi ukuran dengan kualitas tetap baik.</p>
      </div>
    </div>
  );
}
