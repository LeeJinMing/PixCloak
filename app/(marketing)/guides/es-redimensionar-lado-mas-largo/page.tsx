export default function ESResizeLongest() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Redimensionar por el lado más largo (p. ej., 1920px)</h1>
        <ol>
          <li>Abrir <a href="/compress">/compress</a></li>
          <li>Elegir Resize = Longest side y fijar el valor (1920)</li>
          <li>Comprimir con calidad o tamaño objetivo</li>
        </ol>
        <p className="text-muted">Reducir antes de comprimir baja mucho el tamaño con mínima pérdida visual.</p>
      </div>
    </div>
  );
}
