import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Comprimir para KB alvo (200KB/500KB) | PixCloak',
  description: 'Atinga limites de 200KB/500KB sem upload. Use Target (KB), redimensione para 1920px e exporte WebP/JPEG. Processamento local no navegador; download em ZIP.',
  alternates: { canonical: '/guides/pt-comprimir-para-kb-alvo', languages: { pt: '/guides/pt-comprimir-para-kb-alvo', en: '/guides/compress-to-target-kb' } },
};

export default function PTCompressTargetKB() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Comprimir para KB alvo (200KB/500KB)', url: '/guides/pt-comprimir-para-kb-alvo' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Comprimir imagens para um tamanho alvo (200KB/500KB)</h1>
        <ol>
          <li>Abrir <a href="/compress?kb=200">/compress?kb=200</a> ou <a href="/compress?kb=500">/compress?kb=500</a></li>
          <li>Arraste várias imagens e clique em Compress.</li>
          <li>Baixe tudo em ZIP.</li>
        </ol>
        <p className="text-muted">Busca binária de qualidade; processamento local no navegador.</p>
      </div>
    </div>
    </>
  );
}
