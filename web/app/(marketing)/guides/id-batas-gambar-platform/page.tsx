import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Batas gambar per platform (KB & dimensi) | PixCloak',
  description: 'Avatar 200KB, postingan 500KB, sisi terpanjang 1920px. Preset cepat dan ekspor lokal tanpa unggah. Cocok untuk sosial, blog, dan formulir.',
  alternates: { canonical: '/guides/id-batas-gambar-platform', languages: { id: '/guides/id-batas-gambar-platform', en: '/guides/platform-image-limits' } },
};

export default function IDPlatformLimits() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Batas gambar per platform (KB & dimensi)', url: '/guides/id-batas-gambar-platform' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Batas umum gambar di platform (ukuran & dimensi)</h1>
        <ul>
          <li>Avatar: ≤ 200KB; 512–1024px persegi</li>
          <li>Postingan: ≤ 500KB; sisi terpanjang ≤ 1920px</li>
          <li>Banner: uji JPEG vs WebP untuk gradasi/teks</li>
        </ul>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a className="pill" href="/compress?kb=200">Preset 200KB</a>
          <a className="pill" href="/compress?kb=500">Preset 500KB</a>
          <a className="pill-ghost" href="/guides/resize-longest-side">Ubah ukuran 1920px</a>
        </div>
      </div>
    </div>
    </>
  );
}
