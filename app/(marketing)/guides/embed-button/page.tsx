export default function GuideEmbedButton() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Embed a “Compress to KB” button</h1>
        <p className="text-muted">Add a small link or script to your blog/docs. Everything opens PixCloak (local processing, no uploads).</p>
        <h2>Link-only (safest)</h2>
        <pre><code>{`<a href="https://pixcloak.com/compress?kb=500&utm_source=embed" rel="noopener">Compress to 500KB (local)</a>`}</code></pre>
        <h2>Script-enhanced button</h2>
        <pre><code>{`<script src="https://pixcloak.com/embed/pixcloak-embed.js" async></script>
<a data-pixcloak-embed data-kb="500" data-text="Compress to 500KB (local)">Open in PixCloak</a>`}</code></pre>
        <p className="text-muted">Options: <code>data-kb</code> (e.g., 200/500/1024), <code>data-format</code> (image/webp|image/jpeg), <code>data-resize</code> (e.g., 1920), <code>data-utm-source</code> (default: embed), <code>data-text</code>.</p>
        <p className="text-muted">If you lazy‑load HTML, call <code>pixcloakEmbedInit()</code> after inserting elements.</p>
      </div>
    </div>
  );
}


