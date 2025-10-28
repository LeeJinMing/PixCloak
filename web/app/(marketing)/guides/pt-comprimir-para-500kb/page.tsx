import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Comprimir imagens para 500KB (alta qualidade) | PixCloak',
  description: 'Comprima para 500KB—ideal para blogs, e-mail, formulários. Redimensione para 1920px, escolha WebP/JPEG. Local no navegador, sem uploads. Baixe em ZIP.',
  alternates: {
    canonical: '/guides/pt-comprimir-para-500kb',
    languages: {
      en: '/guides/compress-to-500kb',
    },
  },
};

export default function PtComprimir500KB() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Comprimir imagens para 500KB (alta qualidade)', url: '/guides/pt-comprimir-para-500kb' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>Comprimir imagens para 500KB</h1>
          <ol>
            <li>Abra <a href="/compress?kb=500">/compress?kb=500</a></li>
            <li>Defina o lado mais longo para 1920px se necessário</li>
            <li>Baixe como ZIP para lotes</li>
          </ol>
          <p className="text-muted">Processamento local, sem upload. WebP geralmente gera arquivos menores.</p>
        </div>
      </div>
    </>
  );
}


