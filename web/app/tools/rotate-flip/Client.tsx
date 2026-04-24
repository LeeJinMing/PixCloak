'use client';

import { useState, useRef } from 'react';
import JSZip from 'jszip';

interface ProcessedImage {
  name: string;
  originalWidth: number;
  originalHeight: number;
  newWidth: number;
  newHeight: number;
  blob: Blob;
  preview: string;
}

/** Quarter turns clockwise: 0, 1, 2, 3 */
function transformImage(
  file: File,
  rot90: number,
  flipH: boolean,
  flipV: boolean
): Promise<ProcessedImage> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const r = ((rot90 % 4) + 4) % 4;
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const cw = r % 2 === 0 ? w : h;
      const ch = r % 2 === 0 ? h : w;

      const canvas = document.createElement('canvas');
      canvas.width = cw;
      canvas.height = ch;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas not supported'));
        return;
      }

      ctx.translate(cw / 2, ch / 2);
      ctx.rotate((r * Math.PI) / 2);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -w / 2, -h / 2);

      const outType =
        file.type === 'image/png' || file.name.toLowerCase().endsWith('.png')
          ? 'image/png'
          : 'image/jpeg';
      const quality = outType === 'image/jpeg' ? 0.92 : undefined;

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to create blob'));
            return;
          }
          resolve({
            name: file.name,
            originalWidth: w,
            originalHeight: h,
            newWidth: cw,
            newHeight: ch,
            blob,
            preview: canvas.toDataURL(outType === 'image/png' ? 'image/png' : 'image/jpeg', 0.85),
          });
        },
        outType,
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    reader.readAsDataURL(file);
  });
}

export default function RotateFlipClient() {
  const [images, setImages] = useState<File[]>([]);
  const [processed, setProcessed] = useState<ProcessedImage[]>([]);
  const [rot90, setRot90] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    setImages(imageFiles);
    setProcessed([]);
  };

  const bumpRotate = (delta: number) => {
    setRot90((v) => (v + delta + 4) % 4);
  };

  const handleProcess = async () => {
    setProcessing(true);
    try {
      const results = await Promise.all(
        images.map((f) => transformImage(f, rot90, flipH, flipV))
      );
      setProcessed(results);
    } catch (error) {
      console.error(error);
      alert('Error processing images. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const downloadSingle = (img: ProcessedImage) => {
    const url = URL.createObjectURL(img.blob);
    const a = document.createElement('a');
    a.href = url;
    const ext = img.blob.type === 'image/png' ? 'png' : 'jpg';
    const base = img.name.replace(/\.[^.]+$/, '');
    a.download = `${base}-rotated.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    if (processed.length === 1) {
      downloadSingle(processed[0]);
      return;
    }

    const zip = new JSZip();
    processed.forEach((img) => {
      const ext = img.blob.type === 'image/png' ? 'png' : 'jpg';
      const base = img.name.replace(/\.[^.]+$/, '');
      zip.file(`${base}-rotated.${ext}`, img.blob);
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rotated-images.zip';
    a.click();
    URL.revokeObjectURL(url);
  };

  const btn = (active: boolean) => ({
    padding: '8px 14px',
    background: active ? '#0070f3' : '#f0f0f0',
    color: active ? 'white' : 'black',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  });

  return (
    <div className="card">
      <h2>Rotate &amp; flip</h2>

      <div style={{ display: 'grid', gap: 12 }}>
        <div>
          <strong>Rotation (applies to all selected images)</strong>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            <button type="button" style={btn(false)} onClick={() => bumpRotate(-1)} title="90° counter-clockwise">
              Rotate left 90°
            </button>
            <button type="button" style={btn(false)} onClick={() => bumpRotate(1)} title="90° clockwise">
              Rotate right 90°
            </button>
            <button type="button" style={btn(false)} onClick={() => setRot90((v) => (v + 2) % 4)}>
              180°
            </button>
            <span className="text-muted" style={{ alignSelf: 'center' }}>
              Current: {rot90 * 90}° CW
            </span>
          </div>
        </div>

        <div>
          <strong>Flip</strong>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input type="checkbox" checked={flipH} onChange={(e) => setFlipH(e.target.checked)} />
              Horizontal (mirror)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input type="checkbox" checked={flipV} onChange={(e) => setFlipV(e.target.checked)} />
              Vertical
            </label>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
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
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Choose files
        </button>
        {images.length > 0 && (
          <span style={{ marginLeft: 12 }}>
            {images.length} image{images.length > 1 ? 's' : ''} selected
          </span>
        )}
      </div>

      {images.length > 0 && processed.length === 0 && (
        <button
          type="button"
          onClick={handleProcess}
          disabled={processing}
          style={{
            padding: '12px 24px',
            background: processing ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: processing ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            marginTop: 16,
          }}
        >
          {processing ? 'Processing…' : 'Apply & preview'}
        </button>
      )}

      {processed.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            <h3 style={{ margin: 0 }}>Result ({processed.length})</h3>
            <button
              type="button"
              onClick={downloadAll}
              style={{
                padding: '8px 16px',
                background: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Download {processed.length > 1 ? 'all (ZIP)' : ''}
            </button>
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            {processed.map((img, i) => (
              <div key={i} style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: 12 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={img.preview}
                    alt=""
                    style={{
                      width: 120,
                      height: 120,
                      objectFit: 'contain',
                      border: '1px solid #e0e0e0',
                      borderRadius: 4,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 160 }}>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>{img.name}</div>
                    <div className="text-muted" style={{ fontSize: 14 }}>
                      {img.originalWidth}×{img.originalHeight} → {img.newWidth}×{img.newHeight}
                    </div>
                    <div className="text-muted" style={{ fontSize: 14 }}>
                      {(img.blob.size / 1024).toFixed(0)} KB
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => downloadSingle(img)}
                    style={{
                      padding: '8px 12px',
                      background: '#f0f0f0',
                      border: 'none',
                      borderRadius: 6,
                      cursor: 'pointer',
                    }}
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
              setImages([]);
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
