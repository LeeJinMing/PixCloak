import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kompres gambar menjadi 1MB (kualitas tinggi) | PixCloak',
  description: 'Siapkan portofolio dan pengajuan berkualitas: target 1MB, pilih WebP/JPEG, dan ubah ukuran bila perlu. Proses lokal di browser; unduh sebagai ZIP.',
  alternates: {
    canonical: '/guides/id-kompres-menjadi-1mb',
    languages: {
      en: '/guides/compress-to-1mb',
    },
  },
};

export default function IdKompres1MB() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Kompres gambar hingga 1MB</h1>
        <ol>
          <li>Buka <a href="/compress?kb=1024">/compress?kb=1024</a></li>
          <li>Pilih format dan atur ukuran (mis. sisi terpanjang 1920px)</li>
          <li>Unduh sebagai ZIP untuk banyak file</li>
        </ol>
        <p className="text-muted">Proses lokal di browser Anda. Tidak ada unggahan.</p>
      </div>
    </div>
  );
}


