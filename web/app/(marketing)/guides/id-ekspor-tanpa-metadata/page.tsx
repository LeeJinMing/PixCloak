import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Ekspor tanpa metadata (hapus EXIF/GPS) | PixCloak',
  description: 'Hapus EXIF & GPS saat ekspor JPEG/WebP/PNG langsung di browser. 100% lokal, tanpa unggah. Cocok untuk berbagi aman di web/email/formulir.',
  alternates: {
    canonical: '/guides/id-ekspor-tanpa-metadata',
    languages: {
      'x-default': '/guides/export-without-metadata',
      en: '/guides/export-without-metadata',
      id: '/guides/id-ekspor-tanpa-metadata',
      zh: '/guides/export-without-metadata-zh',
      es: '/guides/es-exportar-sin-metadatos',
      pt: '/guides/pt-exportar-sem-metadados',
    },
  },
};

export default function IDExportNoMetadata() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Ekspor tanpa metadata (hapus EXIF/GPS)', url: '/guides/id-ekspor-tanpa-metadata' }
      ]} />
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
    </>
  );
}
