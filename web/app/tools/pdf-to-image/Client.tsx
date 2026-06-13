'use client';

import { useState, useRef } from 'react';
import JSZip from 'jszip';
import { getPdfToImageStrings } from '@/lib/i18n/pdfToImage';

const HARD_MAX_PAGES = 50;

type Props = { locale?: 'en' | 'zh' };

export default function PdfToImageClient({ locale = 'en' }: Props) {
  const s = getPdfToImageStrings(locale);
  const [maxPages, setMaxPages] = useState(20);
  const [scale, setScale] = useState(2);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ name: string; blob: Blob }[] | null>(null);
  const [meta, setMeta] = useState<{ rendered: number; total: number } | null>(null);
  const [pickedName, setPickedName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const run = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError(s.choosePdfFirst);
      return;
    }
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setError(s.invalidPdf);
      return;
    }

    setProcessing(true);
    setError(null);
    setDone(null);
    setMeta(null);

    try {
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.mjs',
        import.meta.url
      ).toString();

      const buf = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: new Uint8Array(buf) }).promise;
      const total = pdf.numPages;
      const cap = Math.min(Math.min(maxPages, total), HARD_MAX_PAGES);

      const out: { name: string; blob: Blob }[] = [];

      for (let i = 1; i <= cap; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const task = page.render({ canvas, viewport });
        await task.promise;

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob((b) => (b ? resolve(b) : reject(new Error(s.encodeFail))), 'image/png');
        });

        out.push({
          name: `page-${String(i).padStart(3, '0')}.png`,
          blob,
        });
      }

      setDone(out);
      setMeta({ rendered: cap, total });
    } catch (e) {
      console.error(e);
      const msg = e instanceof Error ? e.message : s.errorGeneric;
      setError(msg);
    } finally {
      setProcessing(false);
    }
  };

  const downloadZip = async () => {
    if (!done?.length) return;
    const zip = new JSZip();
    done.forEach((item) => zip.file(item.name, item.blob));
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pdf-pages.zip';
    a.click();
    URL.revokeObjectURL(url);
  };

  const intro = s.intro.replace('{cap}', String(HARD_MAX_PAGES));

  return (
    <div className="card">
      <h2>{s.title}</h2>
      <p className="text-muted" style={{ fontSize: 14 }}>
        {intro}
      </p>

      {error && (
        <p style={{ color: '#b45309', marginTop: 8 }} role="alert">
          {error}
        </p>
      )}

      <div style={{ marginTop: 12, display: 'grid', gap: 12 }}>
        <div>
          <label>{s.maxPagesLabel(maxPages, HARD_MAX_PAGES)}</label>
          <input
            type="range"
            min={1}
            max={HARD_MAX_PAGES}
            value={maxPages}
            onChange={(e) => setMaxPages(Number(e.target.value))}
            style={{ width: '100%', maxWidth: 360, display: 'block', marginTop: 6 }}
          />
        </div>
        <div>
          <label>{s.scaleLabel(scale)}</label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.5}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            style={{ width: '100%', maxWidth: 360, display: 'block', marginTop: 6 }}
          />
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <input
          ref={fileRef}
          type="file"
          accept="application/pdf,.pdf"
          style={{ display: 'none' }}
          onChange={(e) => setPickedName(e.target.files?.[0]?.name ?? null)}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          style={{
            padding: '12px 24px',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          {s.choosePdf}
        </button>
        {pickedName && (
          <span style={{ marginLeft: 12 }} className="text-muted">
            {pickedName}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={run}
        disabled={processing}
        style={{
          marginTop: 16,
          padding: '12px 24px',
          background: processing ? '#ccc' : '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          cursor: processing ? 'not-allowed' : 'pointer',
          fontWeight: 600,
        }}
      >
        {processing ? s.rendering : s.convert}
      </button>

      {meta && (
        <p className="text-muted" style={{ marginTop: 12 }}>
          {s.rendered(meta.rendered, meta.total, meta.rendered < meta.total ? s.moreHint : '')}
        </p>
      )}

      {done && done.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <button
            type="button"
            onClick={downloadZip}
            style={{
              padding: '10px 18px',
              background: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {s.downloadZip(done.length)}
          </button>
          <button
            type="button"
            onClick={() => {
              setDone(null);
              setMeta(null);
              setError(null);
              if (fileRef.current) fileRef.current.value = '';
              setPickedName(null);
            }}
            style={{
              marginLeft: 8,
              padding: '10px 18px',
              borderRadius: 6,
              border: '1px solid #ccc',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            {s.startOver}
          </button>
        </div>
      )}
    </div>
  );
}
