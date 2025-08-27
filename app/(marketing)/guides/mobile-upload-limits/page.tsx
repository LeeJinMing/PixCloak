export default function GuideMobileLimits() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Mobile Upload Limits: Prepare Images Fast</h1>
        <ul>
          <li>Common limits: 2–5MB or 200–500KB in some forms</li>
          <li>Use Target (KB) to hit exact limits: try 200KB/500KB presets</li>
          <li>Downscale longest side (e.g., 1920px) for huge camera photos</li>
        </ul>
        <p>Open <a href="/compress?kb=500">/compress?kb=500</a> to start with 500KB.</p>
      </div>
    </div>
  );
}


