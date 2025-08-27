export default function IDCompressTargetKB() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Kompres gambar ke ukuran target (200KB/500KB)</h1>
        <ol>
          <li>Buka <a href="/compress?kb=200">/compress?kb=200</a> atau <a href="/compress?kb=500">/compress?kb=500</a></li>
          <li>Seret banyak gambar lalu klik Compress.</li>
          <li>Unduh hasil sebagai ZIP.</li>
        </ol>
        <p className="text-muted">Pencarian biner kualitas; diproses lokal di browser.</p>
      </div>
    </div>
  );
}
