'use client';
import { useState, useRef } from 'react';
import JSZip from 'jszip';

type ConversionDirection = 'png-to-jpg' | 'jpg-to-png';

interface ProcessedImage {
  name: string;
  blob: Blob;
  preview: string;
  originalSize: number;
  newSize: number;
}

export default function PngJpgConverterClient() {
  const [images, setImages] = useState<File[]>([]);
  const [processed, setProcessed] = useState<ProcessedImage[]>([]);
  const [direction, setDirection] = useState<ConversionDirection>('png-to-jpg');
  const [quality, setQuality] = useState(85);
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    setImages(imageFiles);
    setProcessed([]);
  };

  const convertImage = async (file: File): Promise<ProcessedImage> => {
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

        canvas.width = img.width;
        canvas.height = img.height;

        // Fill background for PNG to JPG (JPG doesn't support transparency)
        if (direction === 'png-to-jpg') {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        const outputFormat = direction === 'png-to-jpg' ? 'image/jpeg' : 'image/png';
        const outputQuality = direction === 'png-to-jpg' ? quality / 100 : 1.0;

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to create blob'));
              return;
            }

            const newExtension = direction === 'png-to-jpg' ? '.jpg' : '.png';
            const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');

            resolve({
              name: `${nameWithoutExt}${newExtension}`,
              blob,
              preview: canvas.toDataURL(outputFormat, outputQuality),
              originalSize: file.size,
              newSize: blob.size,
            });
          },
          outputFormat,
          outputQuality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      reader.readAsDataURL(file);
    });
  };

  const handleConvert = async () => {
    setProcessing(true);
    try {
      const results = await Promise.all(images.map(convertImage));
      setProcessed(results);
    } catch (error) {
      console.error('Error converting images:', error);
      alert('Error converting images. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const downloadSingle = (img: ProcessedImage) => {
    const url = URL.createObjectURL(img.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = img.name;
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
      zip.file(img.name, img.blob);
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted-images-${direction}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card">
      <h2>PNG ↔ JPG Converter</h2>

      {/* Direction Selection */}
      <div style={{ display: 'grid', gap: 8 }}>
        <label>
          <strong>Conversion Direction:</strong>
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => {
              setDirection('png-to-jpg');
              setImages([]);
              setProcessed([]);
            }}
            style={{
              padding: '12px 24px',
              background: direction === 'png-to-jpg' ? '#0070f3' : '#f0f0f0',
              color: direction === 'png-to-jpg' ? 'white' : 'black',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              flex: 1,
            }}
          >
            PNG → JPG
            <div style={{ fontSize: '12px', fontWeight: 400, marginTop: '4px' }}>
              (Reduce file size)
            </div>
          </button>
          <button
            onClick={() => {
              setDirection('jpg-to-png');
              setImages([]);
              setProcessed([]);
            }}
            style={{
              padding: '12px 24px',
              background: direction === 'jpg-to-png' ? '#0070f3' : '#f0f0f0',
              color: direction === 'jpg-to-png' ? 'white' : 'black',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              flex: 1,
            }}
          >
            JPG → PNG
            <div style={{ fontSize: '12px', fontWeight: 400, marginTop: '4px' }}>
              (For editing/transparency)
            </div>
          </button>
        </div>
      </div>

      {/* Quality Slider (PNG to JPG only) */}
      {direction === 'png-to-jpg' && (
        <div style={{ marginTop: '16px', display: 'grid', gap: 8 }}>
          <label>
            <strong>Quality: {quality}%</strong>
            <span className="text-muted" style={{ marginLeft: '8px', fontSize: '14px' }}>
              (80-85% recommended)
            </span>
          </label>
          <input
            type="range"
            min="60"
            max="100"
            value={quality}
            onChange={(e) => setQuality(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
          <div className="text-muted" style={{ fontSize: '14px' }}>
            Higher quality = larger file size, better image quality
          </div>
        </div>
      )}

      {/* Background Color (PNG to JPG only) */}
      {direction === 'png-to-jpg' && (
        <div style={{ marginTop: '16px', display: 'grid', gap: 8 }}>
          <label>
            <strong>Background Color:</strong>
            <span className="text-muted" style={{ marginLeft: '8px', fontSize: '14px' }}>
              (for transparent PNGs)
            </span>
          </label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              onClick={() => setBgColor('#FFFFFF')}
              style={{
                padding: '8px 16px',
                background: bgColor === '#FFFFFF' ? '#0070f3' : '#f0f0f0',
                color: bgColor === '#FFFFFF' ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              White
            </button>
            <button
              onClick={() => setBgColor('#000000')}
              style={{
                padding: '8px 16px',
                background: bgColor === '#000000' ? '#0070f3' : '#f0f0f0',
                color: bgColor === '#000000' ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Black
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                style={{ width: '40px', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              />
              <span className="text-muted" style={{ fontSize: '14px' }}>Custom</span>
            </div>
          </div>
        </div>
      )}

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
          Choose {direction === 'png-to-jpg' ? 'PNG' : 'JPG'} Files
        </button>
        {images.length > 0 && (
          <span style={{ marginLeft: '12px' }}>
            {images.length} image{images.length > 1 ? 's' : ''} selected
          </span>
        )}
      </div>

      {/* Convert Button */}
      {images.length > 0 && processed.length === 0 && (
        <button
          onClick={handleConvert}
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
          {processing ? 'Converting...' : 'Convert Images'}
        </button>
      )}

      {/* Results */}
      {processed.length > 0 && (
        <div style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0 }}>Converted Images ({processed.length})</h3>
              <div className="text-muted" style={{ fontSize: '14px', marginTop: '4px' }}>
                Total size: {(processed.reduce((sum, img) => sum + img.originalSize, 0) / 1024 / 1024).toFixed(2)} MB → {' '}
                {(processed.reduce((sum, img) => sum + img.newSize, 0) / 1024 / 1024).toFixed(2)} MB
                {direction === 'png-to-jpg' && (
                  <span style={{ color: '#0070f3', marginLeft: '8px' }}>
                    ({Math.round((1 - processed.reduce((sum, img) => sum + img.newSize, 0) / processed.reduce((sum, img) => sum + img.originalSize, 0)) * 100)}% smaller)
                  </span>
                )}
              </div>
            </div>
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
                      {(img.originalSize / 1024).toFixed(0)} KB → {(img.newSize / 1024).toFixed(0)} KB
                      {direction === 'png-to-jpg' && (
                        <span style={{ color: '#0070f3', marginLeft: '8px' }}>
                          ({Math.round((1 - img.newSize / img.originalSize) * 100)}% smaller)
                        </span>
                      )}
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

