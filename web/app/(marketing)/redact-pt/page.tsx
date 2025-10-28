import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ocultar em fotos (borrão/EXIF) | PixCloak',
  description: 'Borre rostos, placas e texto; remova EXIF/GPS na exportação. 100% local, sem upload. Works locally in your browser, no uploads.',
  alternates: {
    canonical: '/redact-pt',
    languages: { 'x-default': '/redact', en: '/redact', es: '/redact-es', pt: '/redact-pt', id: '/redact-id', zh: '/redact' }
  }
};

export default function RedactPT() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Redação de imagens (local)</h1>
        <p>Desenhe caixas para cobrir áreas sensíveis (sólido/pixelizado). A exportação remove EXIF/GPS. Tudo local.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a className="pill" href="/redact">Abrir ferramenta</a>
          <a className="pill-ghost" href="/guides/pt-exportar-sem-metadados">Sem metadados</a>
        </div>
      </div>
    </div>
  );
}
