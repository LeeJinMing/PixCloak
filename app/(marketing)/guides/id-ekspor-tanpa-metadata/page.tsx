export default function IDExportNoMetadata() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Ekspor gambar tanpa metadata</h1>
        <ol>
          <li>Gunakan <a href="/compress">/compress</a> atau <a href="/redact">/redact</a></li>
          <li>Ekspor sebagai JPEG/WebP/PNG — re‑encoding menghapus EXIF/GPS</li>
          <li>Pilihan: verifikasi dengan penampil EXIF</li>
        </ol>
        <p className="text-muted">Semua pemrosesan berlangsung lokal di browser Anda.</p>
      </div>
    </div>
  );
}
