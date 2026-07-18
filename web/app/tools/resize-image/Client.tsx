'use client';
import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import JSZip from 'jszip';
import {
  loadOrientedBitmap,
  getSourceSize,
  runWithConcurrency,
  getLargeFileNames,
  LARGE_FILE_WARNING_BYTES,
  canvasToBlob,
  verifyImageBlob,
} from '@/lib/image';
import { batchCountBucket, durationBucket, emitProductEvent, fileSizeBucket } from '@/lib/productEvents';

type PresetSize = '1920' | '1080' | '800' | 'custom';
type FitMode = 'contain' | 'cover' | 'stretch';

interface ProcessedImage {
  name: string;
  originalWidth: number;
  originalHeight: number;
  newWidth: number;
  newHeight: number;
  blob: Blob;
  preview: string;
}

function ResizeImageInner() {
  const searchParams = useSearchParams();
  const [images, setImages] = useState<File[]>([]);
  const [processed, setProcessed] = useState<ProcessedImage[]>([]);
  const [preset, setPreset] = useState<PresetSize>('1920');
  const [customWidth, setCustomWidth] = useState(1920);
  const [customHeight, setCustomHeight] = useState(1080);
  const [longestSide, setLongestSide] = useState<number | null>(null);
  const [fitMode, setFitMode] = useState<FitMode>('contain');
  const [processing, setProcessing] = useState(false);
  const [largeFileWarning, setLargeFileWarning] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emitProductEvent('tool_view', { tool: '/tools/resize-image' });
  }, []);

  useEffect(() => {
    const w = searchParams.get('width');
    const h = searchParams.get('height');
    if (w && h) {
      const nw = Math.max(1, parseInt(w, 10) || 1920);
      const nh = Math.max(1, parseInt(h, 10) || 1080);
      setPreset('custom');
      setCustomWidth(nw);
      setCustomHeight(nh);
      setLongestSide(null);
    } else if (w) {
      const n = Math.max(1, parseInt(w, 10) || 1920);
      if (n === 1920) setPreset('1920');
      else if (n === 1080) setPreset('1080');
      else if (n === 800) setPreset('800');
      else {
        setPreset('custom');
        setLongestSide(n);
      }
    }
  }, [searchParams]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    setImages(imageFiles);
    setProcessed([]);
    const large = getLargeFileNames(imageFiles, LARGE_FILE_WARNING_BYTES);
    setLargeFileWarning(
      large.length ? `Large file(s): ${large.slice(0, 2).join(', ')}${large.length > 2 ? '…' : ''}` : ''
    );
  };

  const resizeImage = async (file: File): Promise<ProcessedImage> => {
    const source = await loadOrientedBitmap(file);
    const { width: imgW, height: imgH } = getSourceSize(source);
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Canvas not supported');
        }

        let targetWidth: number;
        let targetHeight: number;

        if (longestSide) {
          const maxSize = longestSide;
          const aspectRatio = imgW / imgH;
          if (imgW > imgH) {
            targetWidth = maxSize;
            targetHeight = Math.round(maxSize / aspectRatio);
          } else {
            targetHeight = maxSize;
            targetWidth = Math.round(maxSize * aspectRatio);
          }
        } else if (preset === 'custom') {
          targetWidth = customWidth;
          targetHeight = customHeight;
        } else {
          const maxSize = parseInt(preset);
          const aspectRatio = imgW / imgH;

          if (imgW > imgH) {
            targetWidth = maxSize;
            targetHeight = Math.round(maxSize / aspectRatio);
          } else {
            targetHeight = maxSize;
            targetWidth = Math.round(maxSize * aspectRatio);
          }
        }

        // Handle fit mode for custom dimensions
        if (preset === 'custom' && !longestSide) {
          if (fitMode === 'stretch') {
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            ctx.drawImage(source, 0, 0, targetWidth, targetHeight);
          } else if (fitMode === 'contain') {
            const aspectRatio = imgW / imgH;
            const targetAspect = targetWidth / targetHeight;

            let drawWidth = targetWidth;
            let drawHeight = targetHeight;
            let offsetX = 0;
            let offsetY = 0;

            if (aspectRatio > targetAspect) {
              drawHeight = targetWidth / aspectRatio;
              offsetY = (targetHeight - drawHeight) / 2;
            } else {
              drawWidth = targetHeight * aspectRatio;
              offsetX = (targetWidth - drawWidth) / 2;
            }

            canvas.width = targetWidth;
            canvas.height = targetHeight;
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, targetWidth, targetHeight);
            ctx.drawImage(source, offsetX, offsetY, drawWidth, drawHeight);
          } else {
            const aspectRatio = imgW / imgH;
            const targetAspect = targetWidth / targetHeight;

            let drawWidth = targetWidth;
            let drawHeight = targetHeight;
            let offsetX = 0;
            let offsetY = 0;

            if (aspectRatio > targetAspect) {
              drawWidth = targetHeight * aspectRatio;
              offsetX = (targetWidth - drawWidth) / 2;
            } else {
              drawHeight = targetWidth / aspectRatio;
              offsetY = (targetHeight - drawHeight) / 2;
            }

            canvas.width = targetWidth;
            canvas.height = targetHeight;
            ctx.drawImage(source, offsetX, offsetY, drawWidth, drawHeight);
          }
        } else {
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          ctx.drawImage(source, 0, 0, targetWidth, targetHeight);
        }

        const outputFormat = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const blob = await canvasToBlob(canvas, outputFormat, 0.9);
        await verifyImageBlob(blob);

        return {
          name: file.name,
          originalWidth: imgW,
          originalHeight: imgH,
          newWidth: canvas.width,
          newHeight: canvas.height,
          blob,
          preview: canvas.toDataURL('image/jpeg', 0.8),
        };
    } finally {
      if (source instanceof ImageBitmap) source.close();
    }
  };

  const handleProcess = async () => {
    const startedAt = performance.now();
    emitProductEvent(images.length > 1 ? 'batch_started' : 'process_started', {
      tool: '/tools/resize-image',
      input_format: images.length === 1 ? images[0].type : 'mixed',
      output_format: images.length === 1 && images[0].type === 'image/png' ? 'png' : images.length === 1 ? 'jpeg' : 'mixed',
      file_size_bucket: fileSizeBucket(images.reduce((total, file) => total + file.size, 0)),
      batch_count_bucket: batchCountBucket(images.length),
    });
    setProcessing(true);
    try {
      const results = await runWithConcurrency(images, 3, (file) => resizeImage(file));
      setProcessed(results);
      emitProductEvent('process_succeeded', {
        tool: '/tools/resize-image', output_format: results.length === 1 ? results[0].blob.type : 'mixed',
        batch_count_bucket: batchCountBucket(results.length), duration_bucket: durationBucket(performance.now() - startedAt),
      });
    } catch (error) {
      console.error('Error processing images:', error);
      alert('Error processing images. Please try again.');
      emitProductEvent('process_failed', {
        tool: '/tools/resize-image', batch_count_bucket: batchCountBucket(images.length),
        duration_bucket: durationBucket(performance.now() - startedAt), error_code: 'decode_failed',
      });
    } finally {
      setProcessing(false);
    }
  };

  const downloadSingle = (img: ProcessedImage) => {
    const url = URL.createObjectURL(img.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resized-${img.name}`;
    a.click();
    URL.revokeObjectURL(url);
    emitProductEvent('download_completed', { tool: '/tools/resize-image', output_format: img.blob.type, batch_count_bucket: '1' });
  };

  const downloadAll = async () => {
    if (processed.length === 1) {
      downloadSingle(processed[0]);
      return;
    }

    const zip = new JSZip();
    processed.forEach((img) => {
      zip.file(`resized-${img.name}`, img.blob);
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resized-images.zip';
    a.click();
    URL.revokeObjectURL(url);
    emitProductEvent('download_completed', { tool: '/tools/resize-image', output_format: 'mixed', batch_count_bucket: batchCountBucket(processed.length) });
  };

  return (
    <div className="card">
      <h2>Resize Tool</h2>

      {/* Preset Selection */}
      <div style={{ display: 'grid', gap: 8 }}>
        <label>
          <strong>Choose Size:</strong>
        </label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            onClick={() => setPreset('1920')}
            style={{
              padding: '8px 16px',
              background: preset === '1920' ? '#0070f3' : '#f0f0f0',
              color: preset === '1920' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            1920px (Web)
          </button>
          <button
            onClick={() => setPreset('1080')}
            style={{
              padding: '8px 16px',
              background: preset === '1080' ? '#0070f3' : '#f0f0f0',
              color: preset === '1080' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            1080px (Mobile)
          </button>
          <button
            onClick={() => setPreset('800')}
            style={{
              padding: '8px 16px',
              background: preset === '800' ? '#0070f3' : '#f0f0f0',
              color: preset === '800' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            800px (Email)
          </button>
          <button
            onClick={() => setPreset('custom')}
            style={{
              padding: '8px 16px',
              background: preset === 'custom' ? '#0070f3' : '#f0f0f0',
              color: preset === 'custom' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Custom
          </button>
        </div>

        {preset === 'custom' && (
          <>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="number"
                value={customWidth}
                onChange={(e) => setCustomWidth(parseInt(e.target.value) || 1920)}
                style={{ width: '100px', padding: '8px' }}
                placeholder="Width"
              />
              <span>×</span>
              <input
                type="number"
                value={customHeight}
                onChange={(e) => setCustomHeight(parseInt(e.target.value) || 1080)}
                style={{ width: '100px', padding: '8px' }}
                placeholder="Height"
              />
              <span className="text-muted">pixels</span>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                  type="radio"
                  checked={fitMode === 'contain'}
                  onChange={() => setFitMode('contain')}
                />
                Contain (fit inside, add padding)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                  type="radio"
                  checked={fitMode === 'cover'}
                  onChange={() => setFitMode('cover')}
                />
                Cover (fill exactly, crop edges)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                  type="radio"
                  checked={fitMode === 'stretch'}
                  onChange={() => setFitMode('stretch')}
                />
                Stretch (force dimensions)
              </label>
            </div>
          </>
        )}
      </div>

      {/* File Upload */}
      <div style={{ marginTop: '16px' }}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          style={{ display: 'none' }}
        />
        <button
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
          Choose Files
        </button>
        {images.length > 0 && (
          <span style={{ marginLeft: '12px' }}>
            {images.length} image{images.length > 1 ? 's' : ''} selected
          </span>
        )}
        {largeFileWarning && (
          <div style={{ fontSize: 12, color: '#b45309', marginTop: 8 }}>{largeFileWarning}</div>
        )}
      </div>

      {/* Process Button */}
      {images.length > 0 && processed.length === 0 && (
        <button
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
            marginTop: '16px',
          }}
        >
          {processing ? 'Processing...' : 'Resize Images'}
        </button>
      )}

      {/* Results */}
      {processed.length > 0 && (
        <div style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3>Resized Images ({processed.length})</h3>
            <button
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
              Download {processed.length > 1 ? 'All (ZIP)' : ''}
            </button>
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            {processed.map((img, i) => (
              <div key={i} style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '12px' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <img
                    src={img.preview}
                    alt={img.name}
                    style={{ width: '120px', height: '120px', objectFit: 'contain', border: '1px solid #e0e0e0', borderRadius: '4px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>{img.name}</div>
                    <div className="text-muted" style={{ fontSize: '14px' }}>
                      {img.originalWidth}×{img.originalHeight} → {img.newWidth}×{img.newHeight}
                    </div>
                    <div className="text-muted" style={{ fontSize: '14px' }}>
                      {(img.blob.size / 1024).toFixed(0)} KB
                    </div>
                  </div>
                  {processed.length > 1 && (
                    <button
                      onClick={() => downloadSingle(img)}
                      style={{
                        padding: '6px 12px',
                        background: '#f0f0f0',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Download
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResizeImageClient() {
  return (
    <Suspense fallback={<div className="card">Loading…</div>}>
      <ResizeImageInner />
    </Suspense>
  );
}

