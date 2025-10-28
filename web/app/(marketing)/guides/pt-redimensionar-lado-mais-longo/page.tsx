import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Redimensionar pelo lado mais longo (1920px) | PixCloak',
  description: 'Reduza imagens para 1920px no lado mais longo e depois comprima para 200–800KB. Mantém proporção e melhora a velocidade. Processo local, sem upload.',
  alternates: { canonical: '/guides/pt-redimensionar-lado-mais-longo', languages: { pt: '/guides/pt-redimensionar-lado-mais-longo', en: '/guides/resize-longest-side' } },
};

export default function PTResizeLongest() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Redimensionar pelo lado mais longo (1920px)', url: '/guides/pt-redimensionar-lado-mais-longo' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Redimensionar pelo lado mais longo (ex.: 1920px)</h1>
        <ol>
          <li>Abrir <a href="/compress">/compress</a></li>
          <li>Escolher Resize = Longest side e definir valor (1920)</li>
          <li>Comprimir por qualidade ou tamanho alvo</li>
        </ol>
        <p className="text-muted">Reduzir antes de comprimir diminui muito o tamanho com pouca perda visual.</p>
      </div>
    </div>
    </>
  );
}
