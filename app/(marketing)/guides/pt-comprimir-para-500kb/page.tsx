import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/guides/pt-comprimir-para-500kb',
    languages: {
      en: '/guides/compress-to-500kb',
    },
  },
};

export default function PtComprimir500KB() {
  return (
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
  );
}


