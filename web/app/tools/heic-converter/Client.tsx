'use client';

import { useState, useRef } from 'react';
import JSZip from 'jszip';

interface ProcessedFile {
  name: string;
  blob: Blob;
  preview: string;
  originalSize: number;
  newSize: number;
}

function isHeicLike(file: File): boolean {
  const t = file.type.toLowerCase();
  if (t === 'image/heic' || t === 'image/heif') return true;
  return /\.hei[cf]$/i.test(file.name);
}

async function previewDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const u = URL.createObjectURL(blob);
    const im = new Image();
    im.onload = () => {
      try {
        const c = document.createElement('canvas');
        const maxW = 400;
        c.width = Math.min(im.naturalWidth, maxW);
        c.height = Math.max(1, Math.round((im.naturalHeight / im.naturalWidth) * c.width));
        c.getContext('2d')?.drawImage(im, 0, 0, c.width, c.height);
        resolve(c.toDataURL('image/jpeg', 0.82));
      } finally {
        URL.revokeObjectURL(u);
      }
    };
    im.onerror = () => {
      URL.revokeObjectURL(u);
      reject(new Error('preview'));
    };
    im.src = u;
  });
}

async function blobToWebp(jpegBlob: Blob, quality: number): Promise<Blob> {
  const img = new Image();
  const url = URL.createObjectURL(jpegBlob);
  try {
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Could not decode for WebP export'));
      img.src = url;
    });
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas not supported');
    ctx.drawImage(img, 0, 0);
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (b) => {
          if (!b) reject(new Error('WebP export failed'));
          else resolve(b);
        },
        'image/webp',
        quality
      );
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

export default function HeicConverterClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [processed, setProcessed] = useState<ProcessedFile[]>([]);
  const [outFormat, setOutFormat] = useState<'jpeg' | 'webp'>('jpeg');
  const [quality, setQuality] = useState(88);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    const picked = Array.from(list).filter(isHeicLike);
    setError(null);
    if (picked.length === 0) {
      setError('No HEIC/HEIF files selected. Use photos from iPhone (or files ending in .heic / .heif).');
      setFiles([]);
      setProcessed([]);
      return;
    }
    if (picked.length < list.length) {
      setError('Some files were skipped (not HEIC/HEIF). Only compatible files are listed below.');
    }
    setFiles(picked);
    setProcessed([]);
  };

  const convertOne = async (file: File): Promise<ProcessedFile> => {
    const heic2any = (await import('heic2any')).default;
    const jpegBlobs = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: quality / 100,
    });
    const jpegBlob = Array.isArray(jpegBlobs) ? jpegBlobs[0] : jpegBlobs;
    if (!jpegBlob) throw new Error('Empty conversion result');

    let outBlob: Blob = jpegBlob;
    let ext = 'jpg';
    if (outFormat === 'webp') {
      outBlob = await blobToWebp(jpegBlob, quality / 100);
      ext = 'webp';
    }

    const base = file.name.replace(/\.[^/.]+$/, '');
    const name = `${base}.${ext}`;
    let preview: string;
    try {
      preview = await previewDataUrl(outBlob);
    } catch {
      preview =
        'data:image/svg+xml,' +
        encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect fill="#eee" width="120" height="120"/><text x="60" y="60" text-anchor="middle" font-size="12">OK</text></svg>'
        );
    }

    return {
      name,
      blob: outBlob,
      preview,
      originalSize: file.size,
      newSize: outBlob.size,
    };
  };

  const handleConvert = async () => {
    setProcessing(true);
    setError(null);
    try {
      const results: ProcessedFile[] = [];
      for (const f of files) {
        try {
          results.push(await convertOne(f));
        } catch (e) {
          console.error(e);
          throw new Error(
            `Failed on "${f.name}". Try Chrome or Edge (latest), or check that the file is a valid HEIC.`
          );
        }
      }
      setProcessed(results);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion failed.');
      setProcessed([]);
    } finally {
      setProcessing(false);
    }
  };

  const downloadOne = (p: ProcessedFile) => {
    const url = URL.createObjectURL(p.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = p.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadZip = async () => {
    const zip = new JSZip();
    processed.forEach((p) => zip.file(p.name, p.blob));
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'heic-converted.zip';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card">
      <h2>HEIC → JPEG / WebP</h2>
      <p className="text-muted" style={{ fontSize: 14 }}>
        Decoder loads only when you convert (larger download on first use). Use an up-to-date desktop browser for best results.
      </p>

      {error && (
        <p style={{ color: '#b45309', marginTop: 8 }} role="alert">
          {error}
        </p>
      )}

      <div style={{ marginTop: 12, display: 'grid', gap: 12 }}>
        <div>
          <strong>Output format</strong>
          <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="radio"
                checked={outFormat === 'jpeg'}
                onChange={() => setOutFormat('jpeg')}
              />
              JPEG
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="radio"
                checked={outFormat === 'webp'}
                onChange={() => setOutFormat('webp')}
              />
              WebP
            </label>
          </div>
        </div>
        <div>
          <label>
            <strong>Quality:</strong> {quality}%
          </label>
          <input
            type="range"
            min={60}
            max={100}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            style={{ width: '100%', maxWidth: 320, display: 'block', marginTop: 6 }}
          />
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/heic,image/heif,.heic,.heif"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          style={{ display: 'none' }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
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
          Choose HEIC files
        </button>
        {files.length > 0 && (
          <span style={{ marginLeft: 12 }}>
            {files.length} file{files.length > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {files.length > 0 && processed.length === 0 && (
        <button
          type="button"
          onClick={handleConvert}
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
          {processing ? 'Converting…' : 'Convert'}
        </button>
      )}

      {processed.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <h3 style={{ margin: 0 }}>Done ({processed.length})</h3>
            <button
              type="button"
              onClick={() => (processed.length > 1 ? downloadZip() : downloadOne(processed[0]))}
              style={{
                padding: '8px 16px',
                background: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Download {processed.length > 1 ? 'ZIP' : ''}
            </button>
          </div>
          <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
            {processed.map((p, i) => (
              <div key={i} style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: 12 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={p.preview}
                    alt=""
                    style={{ width: 100, height: 100, objectFit: 'contain', border: '1px solid #eee', borderRadius: 4 }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{p.name}</div>
                    <div className="text-muted" style={{ fontSize: 14 }}>
                      {(p.originalSize / 1024).toFixed(0)} KB → {(p.newSize / 1024).toFixed(0)} KB
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => downloadOne(p)}
                    style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', background: 'white', cursor: 'pointer' }}
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setProcessed([]);
              setFiles([]);
              setError(null);
            }}
            style={{ marginTop: 16, padding: '8px 16px', borderRadius: 6, border: '1px solid #ccc', background: 'white', cursor: 'pointer' }}
          >
            Start over
          </button>
        </div>
      )}
    </div>
  );
}
