export default function PTCompressTargetKB() {
  return (
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
  );
}
