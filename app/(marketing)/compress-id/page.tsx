export default function CompressID() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Kompres gambar (lokal, tanpa unggah)</h1>
        <p>Gunakan mode ukuran target (200KB/500KB) atau kualitas tetap; semua diproses secara lokal di browser.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a className="pill" href="/compress?kb=200">200KB</a>
          <a className="pill" href="/compress?kb=500">500KB</a>
          <a className="pill-ghost" href="/guides/id-ubah-ukuran-sisi-terpanjang">Ubah ukuran 1920px</a>
        </div>
      </div>
    </div>
  );
}
