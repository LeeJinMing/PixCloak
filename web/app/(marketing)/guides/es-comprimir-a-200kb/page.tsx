import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Comprimir imágenes a 200KB (Gratis, sin subir) | PixCloak',
  description: 'Comprime a 200KB sin subir archivos: ajusta calidad, redimensiona a 1920px si es necesario y descarga JPEG/WebP o ZIP. Funciona en navegador, gratis y offline.',
  alternates: {
    canonical: '/guides/es-comprimir-a-200kb',
    languages: {
      en: '/guides/compress-to-200kb',
    },
  },
};

export default function EsComprimir200KB() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Comprimir imágenes a 200KB (Gratis, sin subir)', url: '/guides/es-comprimir-a-200kb' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Comprimir imágenes a 200KB</h1>
        <ol>
          <li>Abra <a href="/compress?kb=200">/compress?kb=200</a></li>
          <li>Arrastre sus fotos y haga clic en Compress</li>
          <li>Descargue archivos individuales o ZIP</li>
        </ol>
        <p className="text-muted">Todo se procesa localmente en su navegador. No se sube nada.</p>
      </div>
    </div>
    </>
  );
}


