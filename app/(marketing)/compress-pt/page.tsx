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
