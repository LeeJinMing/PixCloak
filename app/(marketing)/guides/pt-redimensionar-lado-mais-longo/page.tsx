export default function PTResizeLongest() {
  return (
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
  );
}
