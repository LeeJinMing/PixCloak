"use client";
import JSZip from "jszip";
import { useRef, useState } from "react";

function pad(num: number, width: number) {
  return num.toString().padStart(width, '0');
}

export default function Client() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [pattern, setPattern] = useState('image-{n3}');
  const [start, setStart] = useState(1);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files ? Array.from(e.target.files) : [];
    setFiles(list);
  }

  async function onZip() {
    if (files.length === 0) return;
    const zip = new JSZip();
    let i = start;
    for (const f of files) {
      const m = pattern.match(/\{n(\d+)\}/); const w = m ? parseInt(m[1]) : 2; const base = pattern.replace(/\{n\d+\}/, pad(i++, w));
      const ext = f.name.split('.').pop() || 'jpg';
      zip.file(`${base}.${ext}`, await f.arrayBuffer());
    }
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content); const a = document.createElement('a'); a.href = url; a.download = 'renamed.zip'; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Batch Rename & ZIP</h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input ref={inputRef} type="file" accept="image/*" multiple onChange={onPick} className="input" />
          <label>Pattern<input className="input" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="image-{n3}" /></label>
          <label>Start<input className="input" type="number" value={start} onChange={(e) => setStart(parseInt(e.target.value) || 1)} style={{ width: 96 }} /></label>
          <button className="button button-success" onClick={onZip} disabled={files.length === 0}>Download ZIP</button>
        </div>
        <div className="text-muted" style={{ marginTop: 6 }}>Use {`{n2}`} / {`{n3}`} / {`{n4}`} to control zero padding.</div>
      </div>
      {files.length > 0 && (
        <div className="card">
          <h2 style={{ marginBottom: 8 }}>Preview</h2>
          <ul style={{ paddingLeft: 18 }}>
            {files.slice(0, 10).map((f, idx) => {
              const m = pattern.match(/\{n(\d+)\}/); const w = m ? parseInt(m[1]) : 2; const name = pattern.replace(/\{n\d+\}/, pad(start + idx, w));
              const ext = f.name.split('.').pop();
              return <li key={idx}>{f.name} → {name}.{ext}</li>;
            })}
          </ul>
        </div>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Batch Rename & ZIP', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: '/tools/batch-rename' }) }} />
    </div>
  );
}


