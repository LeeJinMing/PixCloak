import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comprimir para 200KB/500KB (sem upload) | PixCloak',
  description: 'Comprima para 200KB/500KB no navegador, sem uploads. Converta WebP/JPEG, redimensione para 1920px. Remove EXIF/GPS automaticamente. 100% local e privado.',
  alternates: {
    canonical: '/compress-pt',
    languages: { 'x-default': '/compress', en: '/compress', es: '/compress-es', pt: '/compress-pt', id: '/compress-id', zh: '/compress' }
  }
};

export default function CompressPT() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Comprimir imagens (local, sem upload)</h1>
        <p>Use o modo de tamanho alvo (200KB/500KB) ou qualidade fixa; tudo é processado localmente no navegador.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a className="pill" href="/compress?kb=200">200KB</a>
          <a className="pill" href="/compress?kb=500">500KB</a>
          <a className="pill-ghost" href="/guides/pt-redimensionar-lado-mais-longo">Redimensionar 1920px</a>
        </div>
      </div>
    </div>
  );
}
