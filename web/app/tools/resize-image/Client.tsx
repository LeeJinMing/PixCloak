'use client';
import { useState, useRef } from 'react';
import JSZip from 'jszip';

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

export default function ResizeImageClient() {
  const [images, setImages] = useState<File[]>([]);
  const [processed, setProcessed] = useState<ProcessedImage[]>([]);
  const [preset, setPreset] = useState<PresetSize>('1920');
  const [customWidth, setCustomWidth] = useState(1920);
  const [customHeight, setCustomHeight] = useState(1080);
  const [fitMode, setFitMode] = useState<FitMode>('contain');
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    setImages(imageFiles);
    setProcessed([]);
  };

  const resizeImage = async (file: File): Promise<ProcessedImage> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas not supported'));
          return;
        }

        let targetWidth: number;
        let targetHeight: number;

        if (preset === 'custom') {
          targetWidth = customWidth;
          targetHeight = customHeight;
        } else {
          const maxSize = parseInt(preset);
          const aspectRatio = img.width / img.height;

          if (img.width > img.height) {
            targetWidth = maxSize;
            targetHeight = Math.round(maxSize / aspectRatio);
          } else {
            targetHeight = maxSize;
            targetWidth = Math.round(maxSize * aspectRatio);
          }
        }

        // Handle fit mode for custom dimensions
        if (preset === 'custom') {
          if (fitMode === 'stretch') {
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
          } else if (fitMode === 'contain') {
            const aspectRatio = img.width / img.height;
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
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          } else { // cover
            const aspectRatio = img.width / img.height;
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
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          }
        } else {
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        }

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to create blob'));
              return;
            }

            resolve({
              name: file.name,
              originalWidth: img.width,
              originalHeight: img.height,
              newWidth: canvas.width,
              newHeight: canvas.height,
              blob,
              preview: canvas.toDataURL('image/jpeg', 0.8),
            });
          },
          file.type === 'image/png' ? 'image/png' : 'image/jpeg',
          0.9
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      reader.readAsDataURL(file);
    });
  };

  const handleProcess = async () => {
    setProcessing(true);
    try {
      const results = await Promise.all(images.map(resizeImage));
      setProcessed(results);
    } catch (error) {
      console.error('Error processing images:', error);
      alert('Error processing images. Please try again.');
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

