import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sensor foto (blur/EXIF) | PixCloak',
  description: 'Blur wajah, plat nomor, dan teks; hapus EXIF/GPS saat ekspor. 100% lokal, tanpa unggah.',
  alternates: {
    canonical: '/redact-id',
    languages: { 'x-default': '/redact', en: '/redact', es: '/redact-es', pt: '/redact-pt', id: '/redact-id', zh: '/redact' }
  }
};

export default function RedactID() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Redaksi gambar (lokal)</h1>
        <p>Gambar kotak untuk menutupi area sensitif (blok/piksel). Ekspor menghapus EXIF/GPS. Semua diproses lokal.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a className="pill" href="/redact">Buka alat</a>
          <a className="pill-ghost" href="/guides/id-ekspor-tanpa-metadata">Tanpa metadata</a>
        </div>
      </div>
    </div>
  );
}
