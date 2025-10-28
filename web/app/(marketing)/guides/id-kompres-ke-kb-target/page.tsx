import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Kompres ke target KB (200KB/500KB) | PixCloak',
  description: 'Capai 200KB/500KB tanpa unggah. Pakai Target (KB), ubah ukuran sisi terpanjang 1920px bila perlu, lalu ekspor WebP/JPEG atau ZIP. Pemrosesan lokal di browser.',
  alternates: { canonical: '/guides/id-kompres-ke-kb-target', languages: { id: '/guides/id-kompres-ke-kb-target', en: '/guides/compress-to-target-kb' } },
};

export default function IDCompressTargetKB() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Kompres ke target KB (200KB/500KB)', url: '/guides/id-kompres-ke-kb-target' }
      ]} />
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
    </>
  );
}
