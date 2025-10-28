import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Límites de imágenes por plataforma (KB y... | PixCloak',
  description: 'Avatares 200KB, publicaciones 500KB, lado más largo 1920px. Presets rápidos y exportación local sin subidas. Útil para redes sociales, blogs y formularios.',
  alternates: { canonical: '/guides/es-limites-de-imagenes-plataformas', languages: { es: '/guides/es-limites-de-imagenes-plataformas', en: '/guides/platform-image-limits' } },
};

export default function ESPlatformLimits() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Límites de imágenes por plataforma (KB y dimensiones)', url: '/guides/es-limites-de-imagenes-plataformas' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Límites comunes de imágenes en plataformas (tamaño y dimensiones)</h1>
        <ul>
          <li>Avatares: ≤ 200KB; 512–1024px cuadrado</li>
          <li>Publicaciones: ≤ 500KB; lado más largo ≤ 1920px</li>
          <li>Banners: prueba JPEG vs WebP para degradados/texto</li>
        </ul>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a className="pill" href="/compress?kb=200">Preset 200KB</a>
          <a className="pill" href="/compress?kb=500">Preset 500KB</a>
          <a className="pill-ghost" href="/guides/resize-longest-side">Redimensionar 1920px</a>
        </div>
      </div>
    </div>
    </>
  );
}
