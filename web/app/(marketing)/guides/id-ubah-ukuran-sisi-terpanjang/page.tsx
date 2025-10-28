import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Ubah ukuran sisi terpanjang ke 1920px | PixCloak',
  description: 'Turunkan dimensi ke 1920px sisi terpanjang lalu kompres ke 200–800KB. Tetap menjaga rasio aspek dan mempercepat pemuatan. Proses lokal di browser, tanpa unggah.',
  alternates: { canonical: '/guides/id-ubah-ukuran-sisi-terpanjang', languages: { id: '/guides/id-ubah-ukuran-sisi-terpanjang', en: '/guides/resize-longest-side' } },
};

export default function IDResizeLongest() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Ubah ukuran sisi terpanjang ke 1920px', url: '/guides/id-ubah-ukuran-sisi-terpanjang' }
      ]} />
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
    </>
  );
}
