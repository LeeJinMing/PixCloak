"use client";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState, Suspense } from "react";

type OutputFormat = "image/jpeg" | "image/webp" | "image/png";
type ResizeMode = "none" | "longest" | "exact";

const label: React.CSSProperties = { fontSize: 13, color: "#6b7280" };

export default function EmbedCompressClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmbedCompressContent />
    </Suspense>
  );
}

function EmbedCompressContent() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [results, setResults] = useState<{ name: string; url: string; size: number }[]>([]);
  const [quality, setQuality] = useState<number>(0.8);
  const [targetKb, setTargetKb] = useState<number | "">("");
  const [resizeMode, setResizeMode] = useState<ResizeMode>("none");
  const [resizeA, setResizeA] = useState<number | "">("");
  const [resizeB, setResizeB] = useState<number | "">("");
  const [busy, setBusy] = useState<boolean>(false);
  const [progressCount, setProgressCount] = useState<number>(0);
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [showPresetInfo, setShowPresetInfo] = useState<string>("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const kb = searchParams.get("kb");
    if (kb && !Number.isNaN(Number(kb))) {
      const v = Math.max(1, Math.floor(Number(kb)));
      setTargetKb(v);
    }

    const size = searchParams.get("size");
    if (size) {
      const [width, height] = size.split('x').map(Number);
      if (width && height) {
        setResizeMode("exact");
        setResizeA(width);
        setResizeB(height);
      }
    }

    const formatParam = searchParams.get("format");
    if (formatParam) {
      switch (formatParam.toLowerCase()) {
        case 'jpg':
        case 'jpeg':
          setFormat("image/jpeg");
          break;
        case 'png':
          setFormat("image/png");
          break;
        case 'webp':
          setFormat("image/webp");
          break;
      }
    }

    const preset = searchParams.get("preset");
    if (preset) {
      setShowPresetInfo(`Preset: ${decodeURIComponent(preset)}`);
    }
  }, [searchParams]);

  function handleFiles(list: FileList) {
    const arr = Array.from(list).filter((f) => f.type.startsWith("image/"));
    setFiles(arr);
    setPreviews([]);
    setResults([]);
    setSuccessMsg("");

    arr.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }

  const processImage = useCallback(
    (file: File, index: number): Promise<{ name: string; url: string; size: number }> => {
      return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
          let { width, height } = img;

          if (resizeMode === "longest") {
            const max = Math.max(resizeA as number, resizeB as number);
            if (width > height) {
              height = (height * max) / width;
              width = max;
            } else {
              width = (width * max) / height;
              height = max;
            }
          } else if (resizeMode === "exact") {
            width = resizeA as number;
            height = resizeB as number;
          }

          canvas.width = width;
          canvas.height = height;

          ctx?.drawImage(img, 0, 0, width, height);

          const targetBytes = targetKb ? (targetKb as number) * 1024 : null;
          let currentQuality = quality;

          const tryCompress = () => {
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  resolve({ name: file.name, url: "", size: 0 });
                  return;
                }

                if (targetBytes && blob.size > targetBytes && currentQuality > 0.1) {
                  currentQuality -= 0.1;
                  tryCompress();
                } else {
                  const url = URL.createObjectURL(blob);
                  resolve({ name: file.name, url, size: blob.size });
                }
              },
              format,
              currentQuality
            );
          };

          tryCompress();
        };

        img.src = URL.createObjectURL(file);
      });
    },
    [quality, targetKb, resizeMode, resizeA, resizeB, format]
  );

  const processAll = async () => {
    if (files.length === 0) return;

    setBusy(true);
    setProgressCount(0);
    setResults([]);

    for (let i = 0; i < files.length; i++) {
      const result = await processImage(files[i], i);
      setResults((prev) => [...prev, result]);
      setProgressCount(i + 1);
    }

    setBusy(false);
    setSuccessMsg(`Successfully processed ${files.length} image${files.length > 1 ? "s" : ""}!`);
  };

  const downloadAll = () => {
    results.forEach((result) => {
      const a = document.createElement("a");
      a.href = result.url;
      a.download = result.name.replace(/\.[^/.]+$/, "") + `-compressed.${format.split("/")[1]}`;
      a.click();
    });
  };

  const downloadSingle = (result: { name: string; url: string; size: number }) => {
    const a = document.createElement("a");
    a.href = result.url;
    a.download = result.name.replace(/\.[^/.]+$/, "") + `-compressed.${format.split("/")[1]}`;
    a.click();
  };

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#ffffff',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <h1 style={{
          margin: '0 0 8px 0',
          fontSize: '24px',
          fontWeight: '600',
          color: '#1f2937'
        }}>
          PixCloak Image Compressor
        </h1>
        {showPresetInfo && (
          <div style={{
            fontSize: '14px',
            color: '#3b82f6',
            fontWeight: '500'
          }}>
            {showPresetInfo}
          </div>
        )}
        <p style={{
          margin: '8px 0 0 0',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          Compress images locally in your browser - no uploads required
        </p>
      </div>

      {/* File Upload */}
      <div style={{
        marginBottom: '24px',
        padding: '20px',
        border: '2px dashed #d1d5db',
        borderRadius: '8px',
        textAlign: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          style={{ display: 'none' }}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '8px'
          }}
        >
          Choose Images
        </button>
        <div style={{ fontSize: '14px', color: '#6b7280' }}>
          Drag and drop images here or click to browse
        </div>
      </div>

      {/* Settings */}
      {files.length > 0 && (
        <div style={{
          marginBottom: '24px',
          padding: '20px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: '#fafafa'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>Compression Settings</h3>

          <div style={{ display: 'grid', gap: '16px' }}>
            {/* Quality */}
            <div>
              <label style={label}>Quality: {Math.round(quality * 100)}%</label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                style={{ width: '100%', marginTop: '4px' }}
              />
            </div>

            {/* Target Size */}
            <div>
              <label style={label}>Target Size (KB):</label>
              <input
                type="number"
                value={targetKb}
                onChange={(e) => setTargetKb(e.target.value ? Number(e.target.value) : "")}
                placeholder="Auto"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  marginTop: '4px'
                }}
              />
            </div>

            {/* Resize */}
            <div>
              <label style={label}>Resize:</label>
              <select
                value={resizeMode}
                onChange={(e) => setResizeMode(e.target.value as ResizeMode)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  marginTop: '4px'
                }}
              >
                <option value="none">No resize</option>
                <option value="longest">Longest side</option>
                <option value="exact">Exact dimensions</option>
              </select>
            </div>

            {(resizeMode === "longest" || resizeMode === "exact") && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={label}>Width:</label>
                  <input
                    type="number"
                    value={resizeA}
                    onChange={(e) => setResizeA(e.target.value ? Number(e.target.value) : "")}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      marginTop: '4px'
                    }}
                  />
                </div>
                <div>
                  <label style={label}>Height:</label>
                  <input
                    type="number"
                    value={resizeB}
                    onChange={(e) => setResizeB(e.target.value ? Number(e.target.value) : "")}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      marginTop: '4px'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Format */}
            <div>
              <label style={label}>Output Format:</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as OutputFormat)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  marginTop: '4px'
                }}
              >
                <option value="image/jpeg">JPEG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WebP</option>
              </select>
            </div>
          </div>

          <button
            onClick={processAll}
            disabled={busy}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: busy ? '#9ca3af' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: busy ? 'not-allowed' : 'pointer',
              marginTop: '16px'
            }}
          >
            {busy ? `Processing... ${progressCount}/${files.length}` : 'Compress Images'}
          </button>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div style={{
          marginBottom: '24px',
          padding: '20px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: '#f0fdf4'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: '0', fontSize: '18px' }}>Results</h3>
            <button
              onClick={downloadAll}
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Download All
            </button>
          </div>

          <div style={{ display: 'grid', gap: '12px' }}>
            {results.map((result, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '6px',
                border: '1px solid #d1d5db'
              }}>
                <div>
                  <div style={{ fontWeight: '500', fontSize: '14px' }}>{result.name}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    {(result.size / 1024).toFixed(1)} KB
                  </div>
                </div>
                <button
                  onClick={() => downloadSingle(result)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Message */}
      {successMsg && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#d1fae5',
          color: '#065f46',
          borderRadius: '6px',
          fontSize: '14px',
          textAlign: 'center',
          marginBottom: '16px'
        }}>
          {successMsg}
        </div>
      )}

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        paddingTop: '16px',
        borderTop: '1px solid #e5e7eb',
        fontSize: '12px',
        color: '#6b7280'
      }}>
        <p style={{ margin: '0 0 4px 0' }}>
          Powered by <strong>PixCloak</strong> - Privacy-first image processing
        </p>
        <p style={{ margin: '0' }}>
          All processing happens locally in your browser
        </p>
      </div>
    </div>
  );
}
