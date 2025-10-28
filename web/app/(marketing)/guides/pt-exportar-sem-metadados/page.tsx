import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Exportar sem metadados (remover EXIF/GPS) | PixCloak',
  description: 'Remova EXIF/GPS de fotos, protegendo localização. Exporte em JPEG/WebP/PNG para limpar metadados automaticamente. 100% local, sem uploads. Suporta lote e ZIP.',
  alternates: { canonical: '/guides/pt-exportar-sem-metadados' },
};

export default function PTExportNoMetadata() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Exportar sem metadados (remover EXIF/GPS)', url: '/guides/pt-exportar-sem-metadados' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>Exportar imagens sem metadados</h1>
          <ol>
            <li>Use <a href="/compress">/compress</a> ou <a href="/redact">/redact</a></li>
            <li>Exporte em JPEG/WebP/PNG — a re‑codificação remove EXIF/GPS</li>
            <li>Opcional: verifique com um visualizador EXIF</li>
          </ol>
          <p className="text-muted">Tudo é processado localmente no seu navegador.</p>
        </div>
      </div>
    </>
  );
}
