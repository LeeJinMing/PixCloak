import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Limites de imagens por plataforma (KB e dimensões) | PixCloak',
  description: 'Avatares 200KB, publicações 500KB, lado mais longo 1920px. Presets rápidos e exportação local sem upload. Útil para redes sociais, blogs e formulários.',
  alternates: { canonical: '/guides/pt-limites-de-imagens-plataformas', languages: { pt: '/guides/pt-limites-de-imagens-plataformas', en: '/guides/platform-image-limits' } },
};

export default function PTPlatformLimits() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Limites de imagens por plataforma (KB e dimensões)', url: '/guides/pt-limites-de-imagens-plataformas' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Limites comuns de imagens em plataformas (tamanho e dimensões)</h1>
        <ul>
          <li>Avatares: ≤ 200KB; 512–1024px quadrado</li>
          <li>Publicações: ≤ 500KB; lado mais longo ≤ 1920px</li>
          <li>Banners: teste JPEG vs WebP para degradês/texto</li>
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
