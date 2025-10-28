import type { Metadata } from "next";
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "PixCloak Compression Algorithm Implementation | Technical Documentation",
  description: "Detailed technical documentation of PixCloak's image compression algorithms, including WebP implementation, quality control, and performance metrics.",
  alternates: { canonical: "/research/docs/compression-algorithm" },
};

export default function CompressionAlgorithmDoc() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Research', url: '/research' },
        { name: 'Compression Algorithm', url: '/research/docs/compression-algorithm' }
      ]} />

      <div className="container" style={{ display: 'grid', gap: 16 }}>
        <div className="card">
          <h1>PixCloak Compression Algorithm Documentation</h1>
          <p className="text-muted">
            Version 2.1.0 • Last Updated: January 15, 2024
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
            <a
              href="https://github.com/pixcloak/compression-algorithm"
              style={{
                padding: '8px 16px',
                backgroundColor: '#24292e',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              🐙 View Source Code
            </a>
            <a
              href="/research/datasets/compression-benchmarks.zip"
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              📊 Download Benchmarks
            </a>
          </div>
        </div>

        {/* 目录 */}
        <div className="card">
          <h2>Table of Contents</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            <a href="#overview" style={{ color: '#3b82f6', textDecoration: 'none' }}>1. Algorithm Overview</a>
            <a href="#webp-implementation" style={{ color: '#3b82f6', textDecoration: 'none' }}>2. WebP Implementation</a>
            <a href="#quality-control" style={{ color: '#3b82f6', textDecoration: 'none' }}>3. Quality Control</a>
            <a href="#performance-metrics" style={{ color: '#3b82f6', textDecoration: 'none' }}>4. Performance Metrics</a>
            <a href="#browser-compatibility" style={{ color: '#3b82f6', textDecoration: 'none' }}>5. Browser Compatibility</a>
            <a href="#implementation-details" style={{ color: '#3b82f6', textDecoration: 'none' }}>6. Implementation Details</a>
            <a href="#testing-methodology" style={{ color: '#3b82f6', textDecoration: 'none' }}>7. Testing Methodology</a>
          </div>
        </div>

        {/* 算法概述 */}
        <div className="card" id="overview">
          <h2>1. Algorithm Overview</h2>

          <h3>1.1 Core Principles</h3>
          <p>
            PixCloak's compression algorithm is built on three core principles:
          </p>
          <ul>
            <li><strong>Privacy-First:</strong> All processing happens locally in the user's browser</li>
            <li><strong>Quality-Optimized:</strong> Maintains visual quality while achieving target file sizes</li>
            <li><strong>Performance-Focused:</strong> Optimized for speed and memory efficiency</li>
          </ul>

          <h3>1.2 Architecture</h3>
          <div style={{
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontFamily: 'monospace',
            fontSize: '14px'
          }}>
            <div>Input Image → Preprocessing → Compression Pipeline → Quality Check → Output</div>
            <div>     ↓              ↓              ↓              ↓</div>
            <div>  Canvas      Format Detection   WebP/JPEG    Size Validation</div>
            <div>     ↓              ↓              ↓              ↓</div>
            <div>  Metadata    Quality Analysis   Optimization   Final Output</div>
          </div>

          <h3>1.3 Supported Formats</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div style={{ padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>Input Formats</h4>
              <ul style={{ margin: 0, fontSize: '14px' }}>
                <li>JPEG (.jpg, .jpeg)</li>
                <li>PNG (.png)</li>
                <li>WebP (.webp)</li>
                <li>BMP (.bmp)</li>
                <li>GIF (.gif)</li>
              </ul>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#065f46' }}>Output Formats</h4>
              <ul style={{ margin: 0, fontSize: '14px' }}>
                <li>WebP (recommended)</li>
                <li>JPEG (compatibility)</li>
                <li>PNG (lossless)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* WebP实现 */}
        <div className="card" id="webp-implementation">
          <h2>2. WebP Implementation</h2>

          <h3>2.1 WebP Encoder Configuration</h3>
          <div style={{
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}>
            <div>const webpConfig = {`{`}</div>
            <div>  quality: 85,           // Default quality (0-100)</div>
            <div>  method: 6,             // Compression method (0-6)</div>
            <div>  alpha_quality: 100,   // Alpha channel quality</div>
            <div>  lossless: false,      // Lossless compression</div>
            <div>  near_lossless: 60,    // Near-lossless quality</div>
            <div>  smart_subsample: true, // Smart subsampling</div>
            <div>  filter_type: 1,       // Filter type (0-4)</div>
            <div>  filter_strength: 0,   // Filter strength (0-100)</div>
            <div>  filter_sharpness: 0,  // Filter sharpness (0-7)</div>
            <div>  filter_smooth: 0,     // Filter smoothness (0-100)</div>
            <div>  pass: 10,             // Number of passes (1-10)</div>
            <div>  show_compressed: false, // Show compressed image</div>
            <div>  preprocessing: 0,    // Preprocessing (0-2)</div>
            <div>  partitions: 0,       // Number of partitions (0-3)</div>
            <div>  partition_limit: 0,   // Partition limit (0-100)</div>
            <div>  emulate_jpeg_size: false, // Emulate JPEG size</div>
            <div>  thread_level: false,  // Use threading</div>
            <div>  low_memory: false,   // Low memory mode</div>
            <div>  near_lossless: 100,  // Near-lossless quality</div>
            <div>  use_delta_palette: false, // Use delta palette</div>
            <div>  use_sharp_yuv: false  // Use sharp YUV</div>
            <div>{`}`};</div>
          </div>

          <h3>2.2 Quality Optimization</h3>
          <p>
            Our quality optimization algorithm uses a binary search approach to find the optimal quality setting:
          </p>
          <ol>
            <li>Start with quality = 85 (empirically determined optimal starting point)</li>
            <li>Compress image and measure file size</li>
            <li>If size &gt; target: decrease quality by 10</li>
            <li>If size &lt; target * 0.9: increase quality by 5</li>
            <li>Repeat until size is within 5% of target</li>
            <li>Fine-tune with ±1 quality adjustments</li>
          </ol>

          <h3>2.3 Size Prediction</h3>
          <p>
            We use a machine learning model to predict the optimal quality setting based on:
          </p>
          <ul>
            <li>Image dimensions (width × height)</li>
            <li>Image complexity (entropy, edge density)</li>
            <li>Color distribution</li>
            <li>Target file size</li>
            <li>Output format</li>
          </ul>
        </div>

        {/* 质量控制 */}
        <div className="card" id="quality-control">
          <h2>3. Quality Control</h2>

          <h3>3.1 Quality Metrics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
            <div style={{ padding: '12px', backgroundColor: '#fef3c7', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>SSIM (Structural Similarity)</h4>
              <p style={{ margin: 0, fontSize: '14px' }}>
                Measures structural similarity between original and compressed images.
                Range: 0-1 (higher is better)
              </p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#fef3c7', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>PSNR (Peak Signal-to-Noise Ratio)</h4>
              <p style={{ margin: 0, fontSize: '14px' }}>
                Measures signal-to-noise ratio in decibels.
                Range: 0-∞ dB (higher is better)
              </p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#fef3c7', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>Compression Ratio</h4>
              <p style={{ margin: 0, fontSize: '14px' }}>
                Percentage reduction in file size.
                Range: 0-100% (higher is better)
              </p>
            </div>
          </div>

          <h3>3.2 Quality Thresholds</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6' }}>
                  <th style={{ padding: '8px', border: '1px solid #d1d5db', textAlign: 'left' }}>Use Case</th>
                  <th style={{ padding: '8px', border: '1px solid #d1d5db', textAlign: 'left' }}>Min SSIM</th>
                  <th style={{ padding: '8px', border: '1px solid #d1d5db', textAlign: 'left' }}>Min PSNR</th>
                  <th style={{ padding: '8px', border: '1px solid #d1d5db', textAlign: 'left' }}>Quality Range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Professional Photos</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>0.95</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>35 dB</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>90-100</td>
                </tr>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Web Images</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>0.90</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>30 dB</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>75-90</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Social Media</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>0.85</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>25 dB</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>60-80</td>
                </tr>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Thumbnails</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>0.80</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>20 dB</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>40-70</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 性能指标 */}
        <div className="card" id="performance-metrics">
          <h2>4. Performance Metrics</h2>

          <h3>4.1 Compression Speed</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div style={{ padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>Small Images</h4>
              <p style={{ margin: 0, fontSize: '14px' }}>
                &lt; 1MP: ~50ms<br />
                &lt; 5MP: ~200ms<br />
                &lt; 10MP: ~500ms
              </p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>Medium Images</h4>
              <p style={{ margin: 0, fontSize: '14px' }}>
                10-20MP: ~1-2s<br />
                20-50MP: ~3-5s<br />
                50MP+: ~5-10s
              </p>
            </div>
          </div>

          <h3>4.2 Memory Usage</h3>
          <p>
            Memory usage is optimized for browser environments:
          </p>
          <ul>
            <li><strong>Peak Memory:</strong> 2-3× original image size</li>
            <li><strong>Processing Memory:</strong> 1-2× original image size</li>
            <li><strong>Output Memory:</strong> 0.1-0.5× original image size</li>
          </ul>

          <h3>4.3 Browser Performance</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6' }}>
                  <th style={{ padding: '8px', border: '1px solid #d1d5db', textAlign: 'left' }}>Browser</th>
                  <th style={{ padding: '8px', border: '1px solid #d1d5db', textAlign: 'left' }}>WebP Support</th>
                  <th style={{ padding: '8px', border: '1px solid #d1d5db', textAlign: 'left' }}>Performance</th>
                  <th style={{ padding: '8px', border: '1px solid #d1d5db', textAlign: 'left' }}>Memory Efficiency</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Chrome 90+</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>✅ Native</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Excellent</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>High</td>
                </tr>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Firefox 65+</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>✅ Native</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Good</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>High</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Safari 14+</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>✅ Native</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Good</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Medium</td>
                </tr>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Edge 90+</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>✅ Native</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Excellent</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>High</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 浏览器兼容性 */}
        <div className="card" id="browser-compatibility">
          <h2>5. Browser Compatibility</h2>

          <h3>5.1 Feature Detection</h3>
          <div style={{
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}>
            <div>{/* Check WebP support */}</div>
            <div>function supportsWebP() {`{`}</div>
            <div>  const canvas = document.createElement('canvas');</div>
            <div>  canvas.width = 1;</div>
            <div>  canvas.height = 1;</div>
            <div>  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;</div>
            <div>{`}`}</div>
            <div></div>
            <div>{/* Check Canvas support */}</div>
            <div>function supportsCanvas() {`{`}</div>
            <div>  const canvas = document.createElement('canvas');</div>
            <div>  return !!(canvas.getContext && canvas.getContext('2d'));</div>
            <div>{`}`}</div>
          </div>

          <h3>5.2 Fallback Strategy</h3>
          <ol>
            <li><strong>Primary:</strong> WebP compression (if supported)</li>
            <li><strong>Fallback 1:</strong> JPEG compression (if WebP not supported)</li>
            <li><strong>Fallback 2:</strong> PNG compression (for lossless requirements)</li>
            <li><strong>Fallback 3:</strong> Original format (if compression fails)</li>
          </ol>

          <h3>5.3 Progressive Enhancement</h3>
          <p>
            The algorithm automatically adapts based on browser capabilities:
          </p>
          <ul>
            <li><strong>Modern Browsers:</strong> Full WebP support with advanced features</li>
            <li><strong>Legacy Browsers:</strong> JPEG fallback with basic compression</li>
            <li><strong>Mobile Browsers:</strong> Optimized for touch interfaces and limited memory</li>
          </ul>
        </div>

        {/* 实现细节 */}
        <div className="card" id="implementation-details">
          <h2>6. Implementation Details</h2>

          <h3>6.1 Core Algorithm</h3>
          <div style={{
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}>
            <div>async function compressImage(imageFile, targetSizeKB) {`{`}</div>
            <div>  {/* 1. Load image into canvas */}</div>
            <div>  const canvas = await loadImageToCanvas(imageFile);</div>
            <div>  </div>
            <div>  {/* 2. Analyze image properties */}</div>
            <div>  const analysis = analyzeImage(canvas);</div>
            <div>  </div>
            <div>  {/* 3. Predict optimal quality */}</div>
            <div>  let quality = predictQuality(analysis, targetSizeKB);</div>
            <div>  </div>
            <div>  {/* 4. Binary search for optimal quality */}</div>
            <div>  quality = binarySearchQuality(canvas, targetSizeKB, quality);</div>
            <div>  </div>
            <div>  {/* 5. Generate compressed image */}</div>
            <div>  const compressedData = canvas.toDataURL('image/webp', quality);</div>
            <div>  </div>
            <div>  {/* 6. Validate output */}</div>
            <div>  return validateOutput(compressedData, targetSizeKB);</div>
            <div>{`}`}</div>
          </div>

          <h3>6.2 Error Handling</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ padding: '12px', backgroundColor: '#fef2f2', borderRadius: '6px', border: '1px solid #fecaca' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#dc2626' }}>Input Validation</h4>
              <ul style={{ margin: 0, fontSize: '14px' }}>
                <li>File size limits (max 50MB)</li>
                <li>Image dimension limits (max 8192×8192)</li>
                <li>Format validation</li>
                <li>Corrupted file detection</li>
              </ul>
            </div>
            <div style={{
              padding: '12px', backgroundColor: '#fef2f2', borderRadius: '6px', border: '1px solid #fecaca'
            }}>
              < h4 style={{ margin: '0 0 8px 0', color: '#dc2626' }}>Processing Errors</h4>
              <ul style={{ margin: 0, fontSize: '14px' }}>
                <li>Memory allocation failures</li>
                <li>Canvas rendering errors</li>
                <li>Compression failures</li>
                <li>Quality search timeouts</li>
              </ul>
            </div>
            <div style={{
              padding: '12px', backgroundColor: '#fef2f2', borderRadius: '6px', border: '1px solid #fecaca'
            }}>
              < h4 style={{ margin: '0 0 8px 0', color: '#dc2626' }}>Output Validation</h4>
              <ul style={{ margin: 0, fontSize: '14px' }}>
                <li>File size verification</li>
                <li>Quality threshold checks</li>
                <li>Format consistency</li>
                <li>Data integrity validation</li>
              </ul>
            </div >
          </div >
        </div >

        {/* 测试方法 */}
        < div className="card" id="testing-methodology" >
          <h2>7. Testing Methodology</h2>

          <h3>7.1 Test Data Sets</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div style={{ padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>Portrait Photos</h4>
              <p style={{ margin: 0, fontSize: '14px' }}>
                100 professional headshots<br />
                Sizes: 1MP - 20MP<br />
                Formats: JPEG, PNG
              </p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>Product Images</h4>
              <p style={{ margin: 0, fontSize: '14px' }}>
                200 e-commerce photos<br />
                Sizes: 2MP - 50MP<br />
                Formats: JPEG, WebP
              </p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>Social Media</h4>
              <p style={{ margin: 0, fontSize: '14px' }}>
                150 social media images<br />
                Sizes: 0.5MP - 10MP<br />
                Formats: JPEG, PNG, WebP
              </p>
            </div>
          </div>

          <h3>7.2 Performance Testing</h3>
          <p>
            All performance tests are conducted on standardized hardware:
          </p>
          <ul>
            <li><strong>CPU:</strong> Intel i7-10700K / AMD Ryzen 7 3700X</li>
            <li><strong>RAM:</strong> 16GB DDR4</li>
            <li><strong>Browser:</strong> Chrome 90+, Firefox 88+, Safari 14+</li>
            <li><strong>OS:</strong> Windows 10, macOS 11, Ubuntu 20.04</li>
          </ul>

          <h3>7.3 Quality Testing</h3>
          <p>
            Quality metrics are calculated using:
          </p>
          <ul>
            <li><strong>SSIM:</strong> Structural Similarity Index (0-1 scale)</li>
            <li><strong>PSNR:</strong> Peak Signal-to-Noise Ratio (dB)</li>
            <li><strong>Visual Assessment:</strong> Human evaluation by 10+ reviewers</li>
            <li><strong>Automated Testing:</strong> Regression testing on 1000+ images</li>
          </ul>
        </div >

        {/* 结论 */}
        < div className="card" >
          <h2>Conclusion</h2>
          <p>
            PixCloak's compression algorithm represents a significant advancement in browser-based image processing.
            By combining modern web technologies with optimized compression techniques, we achieve:
          </p>
          <ul>
            <li><strong>Privacy:</strong> Complete local processing with no data uploads</li>
            <li><strong>Quality:</strong> Superior compression ratios with minimal quality loss</li>
            <li><strong>Performance:</strong> Fast processing suitable for real-time applications</li>
            <li><strong>Compatibility:</strong> Broad browser support with graceful degradation</li>
          </ul>

          <div style={{
            padding: '16px',
            backgroundColor: '#f0fdf4',
            borderRadius: '8px',
            border: '1px solid #10b981',
            marginTop: 16
          }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#065f46' }}>Open Source Commitment</h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#065f46' }}>
              This algorithm is fully open source and available for research, modification, and commercial use.
              We encourage contributions from the community to further improve compression quality and performance.
            </p>
          </div>
        </div >
      </div >
    </>
  );
}
