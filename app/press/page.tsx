export default function PressPage() {
  const assets = [
    "/press/compress-200kb.gif",
    "/press/plate-demo.gif",
    "/press/compress-demo-1.webp",
    "/press/compress-demo-2.webp",
    "/press/compress-demo-3.webp",
    "/press/plate-ui.webp",
    "/press/plate-upload.webp",
    "/press/plate-pixelate.webp",
    "/press/plate-solid.webp",
    "/press/copy.txt",
  ];
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card" style={{ background: '#eff6ff', borderColor: '#bfdbfe' }}>
        <h1>Press & Brand</h1>
        <p className="text-muted">Download assets and copy for posts. PixCloak is a privacy‑first image toolkit that runs locally (no upload).</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a className="pill" href="/">Home</a>
          <a className="pill" href="/compress">Compress</a>
          <a className="pill" href="/redact">Redact</a>
          <a className="pill" href="/guides">Guides</a>
          <a className="pill" href="https://github.com/LeeJinMing/PixCloak" target="_blank" rel="noreferrer">GitHub</a>
          <a className="pill" href="/contact">Contact</a>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: 8 }}>Assets</h2>
        <ul>
          {assets.map((a) => (
            <li key={a}><a href={a}>{a}</a></li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: 8 }}>Copy</h2>
        <p>See <a href="/press/copy.txt">/press/copy.txt</a> for EN/ZH post templates.</p>
      </div>
    </div>
  );
}


