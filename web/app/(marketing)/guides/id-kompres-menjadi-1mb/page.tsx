import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Kompres gambar menjadi 1MB (kualitas tinggi) | PixCloak',
  description: 'Kompres ke 1MB untuk portofolio berkualitas. Pilih WebP/JPEG, ubah ukuran ke 1920px. Proses lokal tanpa upload. Hapus EXIF/GPS. Batch ZIP untuk banyak file.',
  alternates: {
    canonical: '/guides/id-kompres-menjadi-1mb',
    languages: {
      en: '/guides/compress-to-1mb',
    },
  },
};

export default function IdKompres1MB() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Kompres gambar menjadi 1MB (kualitas tinggi)', url: '/guides/id-kompres-menjadi-1mb' }
      ]} />
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
    </>
  );
}


