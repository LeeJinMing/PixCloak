import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Comprimir a tamaño objetivo (200KB/500KB) | PixCloak',
  description: 'Logra 200KB/500KB sin subir archivos. Usa Target (KB), redimensiona a 1920px si es necesario y exporta WebP/JPEG o ZIP. Procesamiento local en el navegador.',
  alternates: { canonical: '/guides/es-comprimir-a-kb-objetivo', languages: { es: '/guides/es-comprimir-a-kb-objetivo', en: '/guides/compress-to-target-kb' } },
};

export default function ESCompressTargetKB() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Comprimir a tamaño objetivo (200KB/500KB)', url: '/guides/es-comprimir-a-kb-objetivo' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Comprimir imágenes a un tamaño objetivo (200KB/500KB)</h1>
        <ol>
          <li>Abrir <a href="/compress?kb=200">/compress?kb=200</a> o <a href="/compress?kb=500">/compress?kb=500</a></li>
          <li>Arrastra múltiples imágenes y pulsa Compress.</li>
          <li>Descarga todo como ZIP.</li>
        </ol>
        <p className="text-muted">Búsqueda binaria de calidad; procesamiento local en tu navegador.</p>
      </div>
    </div>
    </>
  );
}
