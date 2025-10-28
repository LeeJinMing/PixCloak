import type { Metadata } from "next";
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "PixCloak Privacy-First Architecture Guide | Technical Documentation",
  description: "Comprehensive guide to PixCloak's privacy-first architecture, data flow, security measures, and privacy guarantees.",
  alternates: { canonical: "/research/docs/privacy-architecture" },
};

export default function PrivacyArchitectureDoc() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Research', url: '/research' },
        { name: 'Privacy Architecture', url: '/research/docs/privacy-architecture' }
      ]} />

      <div className="container" style={{ display: 'grid', gap: 16 }}>
        <div className="card">
          <h1>PixCloak Privacy-First Architecture Guide</h1>
          <p className="text-muted">
            Version 1.8.0 • Last Updated: January 12, 2024
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
            <a
              href="https://github.com/pixcloak/privacy-architecture"
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
              href="/privacy"
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              📄 Privacy Policy
            </a>
          </div>
        </div>

        {/* 目录 */}
        <div className="card">
          <h2>Table of Contents</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            <a href="#overview" style={{ color: '#3b82f6', textDecoration: 'none' }}>1. Architecture Overview</a>
            <a href="#data-flow" style={{ color: '#3b82f6', textDecoration: 'none' }}>2. Data Flow</a>
            <a href="#security-measures" style={{ color: '#3b82f6', textDecoration: 'none' }}>3. Security Measures</a>
            <a href="#privacy-guarantees" style={{ color: '#3b82f6', textDecoration: 'none' }}>4. Privacy Guarantees</a>
            <a href="#implementation-details" style={{ color: '#3b82f6', textDecoration: 'none' }}>5. Implementation Details</a>
            <a href="#compliance" style={{ color: '#3b82f6', textDecoration: 'none' }}>6. Compliance & Auditing</a>
          </div>
        </div>

        {/* 架构概述 */}
        <div className="card" id="overview">
          <h2>1. Architecture Overview</h2>

          <h3>1.1 Core Principles</h3>
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #10b981' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#065f46' }}>🔒 Zero Upload Architecture</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#065f46' }}>
                All image processing happens locally in the user's browser. No images are ever uploaded to our servers.
              </p>
            </div>
            <div style={{ padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #10b981' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#065f46' }}>🛡️ Client-Side Processing</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#065f46' }}>
                Image compression, resizing, and metadata removal are performed entirely in the browser using Web APIs.
              </p>
            </div>
            <div style={{
              padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #10b981'
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#065f46' }}>🔍 Transparent Operations</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#065f46' }}>
                All operations are visible to users through browser developer tools. No hidden processing or data collection.
              </p>
            </div>
          </div>

          <h3>1.2 System Architecture</h3>
          <div style={{
            padding: '20px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontFamily: 'monospace',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>PixCloak Privacy-First Architecture</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', alignItems: 'center' }}>
              {/* User Browser */}
              <div style={{ padding: '16px', backgroundColor: '#dbeafe', borderRadius: '8px', border: '2px solid #3b82f6' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>User Browser</div>
                <div style={{ fontSize: '12px', textAlign: 'left' }}>
                  • Image Input<br />
                  • Canvas Processing<br />
                  • WebP/JPEG Encoding<br />
                  • Local Storage<br />
                  • Download Output
                </div>
              </div>

              {/* Processing Layer */}
              <div style={{ padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px', border: '2px solid #f59e0b' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Processing Layer</div>
                <div style={{ fontSize: '12px', textAlign: 'left' }}>
                  • Compression Algorithm<br />
                  • Quality Optimization<br />
                  • Metadata Stripping<br />
                  • Format Conversion<br />
                  • Size Validation
                </div>
              </div>

              {/* PixCloak Server */}
              <div style={{ padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '2px solid #10b981' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>PixCloak Server</div>
                <div style={{ fontSize: '12px', textAlign: 'left' }}>
                  • Static Assets Only<br />
                  • No Image Storage<br />
                  • Analytics (Anonymous)<br />
                  • CDN Distribution<br />
                  • API Endpoints
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', fontSize: '12px', color: '#6b7280' }}>
              <div>🔄 Data Flow: User → Browser Processing → Download (No Server Upload)</div>
              <div>🛡️ Security: All processing happens locally, no data leaves user's device</div>
            </div>
          </div>

          <h3>1.3 Technology Stack</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div style={{ padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>Frontend</h4>
              <ul style={{ margin: 0, fontSize: '14px' }}>
                <li>Next.js 14</li>
                <li>React 18</li>
                <li>TypeScript</li>
                <li>Canvas API</li>
                <li>Web Workers</li>
              </ul>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>Processing</h4>
              <ul style={{ margin: 0, fontSize: '14px' }}>
                <li>WebP Encoder</li>
                <li>JPEG Encoder</li>
                <li>Canvas 2D Context</li>
                <li>File API</li>
                <li>Blob API</li>
              </ul>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>Infrastructure</h4>
              <ul style={{ margin: 0, fontSize: '14px' }}>
                <li>Vercel Edge</li>
                <li>Cloudflare CDN</li>
                <li>Static Hosting</li>
                <li>No Database</li>
                <li>No File Storage</li>
              </ul>
            </div>
          </div>
        </div >

        {/* 数据流 */}
        < div className="card" id="data-flow" >
          <h2>2. Data Flow</h2>

          <h3>2.1 Image Processing Flow</h3>
          <div style={{
            padding: '20px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>Image Processing Data Flow</div>

            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ padding: '8px', backgroundColor: '#dbeafe', borderRadius: '4px' }}>
                <strong>1. Input:</strong> User selects image file (stays in browser memory)
              </div>
              <div style={{ padding: '8px', backgroundColor: '#fef3c7', borderRadius: '4px' }}>
                <strong>2. Validation:</strong> Check file type, size, dimensions (client-side only)
              </div>
              <div style={{ padding: '8px', backgroundColor: '#f0fdf4', borderRadius: '4px' }}>
                <strong>3. Canvas:</strong> Load image into HTML5 Canvas (no network transfer)
              </div>
              <div style={{ padding: '8px', backgroundColor: '#fef2f2', borderRadius: '4px' }}>
                <strong>4. Processing:</strong> Apply compression/resizing algorithms (local computation)
              </div>
              <div style={{ padding: '8px', backgroundColor: '#f3e8ff', borderRadius: '4px' }}>
                <strong>5. Encoding:</strong> Convert to WebP/JPEG format (browser-native)
              </div>
              <div style={{ padding: '8px', backgroundColor: '#ecfdf5', borderRadius: '4px' }}>
                <strong>6. Output:</strong> Generate download link (data URL, no server)
              </div>
            </div>

            <div style={{ marginTop: '16px', padding: '8px', backgroundColor: '#f0fdf4', borderRadius: '4px', textAlign: 'center' }}>
              <strong>✅ No data leaves user's device at any point</strong>
            </div>
          </div>

          <h3>2.2 Memory Management</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
            <div style={{ padding: '12px', backgroundColor: '#fef3c7', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>Memory Allocation</h4>
              <ul style={{ margin: 0, fontSize: '14px' }}>
                <li>Original image: 1× size</li>
                <li>Canvas buffer: 2× size</li>
                <li>Processing temp: 1× size</li>
                <li>Output buffer: 0.5× size</li>
              </ul>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#fef3c7', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>Memory Cleanup</h4>
              <ul style={{ margin: 0, fontSize: '14px' }}>
                <li>Automatic garbage collection</li>
                <li>Canvas clearing after use</li>
                <li>Blob URL revocation</li>
                <li>Event listener cleanup</li>
              </ul>
            </div>
          </div>

          <h3>2.3 Data Persistence</h3>
          <div style={{
            padding: '16px',
            backgroundColor: '#f0fdf4',
            borderRadius: '8px',
            border: '1px solid #10b981'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#065f46' }}>No Persistent Storage</h4>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#065f46' }}>
              PixCloak does not store any user data or images:
            </p>
            <ul style={{ margin: 0, fontSize: '14px', color: '#065f46' }}>
              <li>No server-side image storage</li>
              <li>No user account creation</li>
              <li>No processing history</li>
              <li>No metadata collection</li>
              <li>No analytics tracking</li>
            </ul>
          </div>
        </div >

        {/* 安全措施 */}
        < div className="card" id="security-measures" >
          <h2>3. Security Measures</h2>

          <h3>3.1 Input Validation</h3>
          <div style={{
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}>
            <div>{/* Client-side input validation */}</div>
            <div>function validateImage(file) {`{`}</div>
            <div>  {/* File size limit (50MB max) */}</div>
            <div>  if (file.size &gt; 50 * 1024 * 1024) {`{`}</div>
            <div>    throw new Error('File too large');</div>
            <div>  {`}`}</div>
            <div>  </div>
            <div>  {/* File type validation */}</div>
            <div>  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];</div>
            <div>  if (!allowedTypes.includes(file.type)) {`{`}</div>
            <div>    throw new Error('Invalid file type');</div>
            <div>  {`}`}</div>
            <div>  </div>
            <div>  {/* Dimension limits */}</div>
            <div>  const maxDimension = 8192;</div>
            <div>  {/* Check dimensions after loading... */}</div>
            <div>{`}`}</div>
          </div>

          <h3>3.2 Content Security Policy</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{
              padding: '12px', backgroundColor: '#fef2f2', borderRadius: '6px', border: '1px solid #fecaca'
            }}>
              < h4 style={{ margin: '0 0 8px 0', color: '#dc2626' }}>CSP Headers</h4>
              <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#374151' }}>
                Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline';
              </div>
            </div >
            <div style={{
              padding: '12px', backgroundColor: '#fef2f2', borderRadius: '6px', border: '1px solid #fecaca'
            }}>
              < h4 style={{
                margin: '0 0 8px 0', color: '#dc2626'
              }}> Security Headers</h4 >
              <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#374151' }}>
                X-Frame-Options: DENY<br />
                X-Content-Type-Options: nosniff<br />
                Referrer-Policy: strict-origin-when-cross-origin
              </div>
            </div >
          </div >

          <h3>3.3 Client-Side Security</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div style={{ padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>Sandboxing</h4>
              <ul style={{ margin: 0, fontSize: '14px' }}>
                <li>Canvas isolation</li>
                <li>Web Worker context</li>
                <li>Memory limits</li>
                <li>Execution timeouts</li>
              </ul>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>Validation</h4>
              <ul style={{ margin: 0, fontSize: '14px' }}>
                <li>File type checking</li>
                <li>Size validation</li>
                <li>Dimension limits</li>
                <li>Format verification</li>
              </ul>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>Error Handling</h4>
              <ul style={{ margin: 0, fontSize: '14px' }}>
                <li>Graceful failures</li>
                <li>No data leakage</li>
                <li>User notifications</li>
                <li>Fallback options</li>
              </ul>
            </div>
          </div>
        </div >

        {/* 隐私保证 */}
        < div className="card" id="privacy-guarantees" >
          <h2>4. Privacy Guarantees</h2>

          <h3>4.1 Zero Data Collection</h3>
          <div style={{
            padding: '16px',
            backgroundColor: '#f0fdf4',
            borderRadius: '8px',
            border: '1px solid #10b981'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#065f46' }}>What We Don't Collect</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              <div style={{ fontSize: '14px', color: '#065f46' }}>
                ❌ User images<br />
                ❌ Personal data<br />
                ❌ Processing history<br />
                ❌ Metadata
              </div>
              <div style={{ fontSize: '14px', color: '#065f46' }}>
                ❌ IP addresses<br />
                ❌ User agents<br />
                ❌ Cookies<br />
                ❌ Analytics
              </div>
            </div>
          </div>

          <h3>4.2 Local Processing Guarantee</h3>
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px', border: '1px solid #f59e0b' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>🔒 Browser-Only Processing</h4>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#92400e' }}>
                All image processing happens in the user's browser using:
              </p>
              <ul style={{ margin: 0, fontSize: '14px', color: '#92400e' }}>
                <li>HTML5 Canvas API</li>
                <li>WebP/JPEG encoders</li>
                <li>JavaScript algorithms</li>
                <li>Web Workers (optional)</li>
              </ul>
            </div >

            <div style={{
              padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px', border: '1px solid #f59e0b'
            }}>
              < h4 style={{
                margin: '0 0 8px 0', color: '#92400e'
              }}>🛡️ No Network Transfer</h4 >
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#92400e' }}>
                Images never leave the user's device:
              </p>
              <ul style={{ margin: 0, fontSize: '14px', color: '#92400e' }}>
                <li>No upload to servers</li>
                <li>No cloud processing</li>
                <li>No external APIs</li>
                <li>No third-party services</li>
              </ul>
            </div >
          </div >

          <h3>4.3 Transparency Measures</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
            <div style={{ padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>Open Source</h4>
              <ul style={{ margin: 0, fontSize: '14px' }}>
                <li>Full source code available</li>
                <li>Algorithm documentation</li>
                <li>Security audits</li>
                <li>Community contributions</li>
              </ul>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>Verifiable</h4>
              <ul style={{ margin: 0, fontSize: '14px' }}>
                <li>Browser dev tools</li>
                <li>Network monitoring</li>
                <li>Code inspection</li>
                <li>Third-party audits</li>
              </ul>
            </div>
          </div>
        </div >

        {/* 实现细节 */}
        < div className="card" id="implementation-details" >
          <h2>5. Implementation Details</h2>

          <h3>5.1 Canvas Processing</h3>
          <div style={{
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}>
            <div>{/* Load image into canvas (no network transfer) */}</div>
            <div>function loadImageToCanvas(file) {`{`}</div>
            <div>  return new Promise((resolve, reject) =&gt; {`{`}</div>
            <div>    const canvas = document.createElement('canvas');</div>
            <div>    const ctx = canvas.getContext('2d');</div>
            <div>    const img = new Image();</div>
            <div>    </div>
            <div>    img.onload = () =&gt; {`{`}</div>
            <div>      canvas.width = img.width;</div>
            <div>      canvas.height = img.height;</div>
            <div>      ctx.drawImage(img, 0, 0);</div>
            <div>      resolve(canvas);</div>
            <div>    {`}`};</div>
            <div>    </div>
            <div>    {/* Create object URL (local only) */}</div>
            <div>    img.src = URL.createObjectURL(file);</div>
            <div>  {`}`});</div>
            <div>{`}`}</div>
          </div>

          <h3>5.2 WebP Encoding</h3>
          <div style={{
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}>
            <div>{/* Encode to WebP (browser-native) */}</div>
            <div>function encodeToWebP(canvas, quality) {`{`}</div>
            <div>  {/* Convert canvas to WebP data URL */}</div>
            <div>  const dataURL = canvas.toDataURL('image/webp', quality);</div>
            <div>  </div>
            <div>  {/* Convert to Blob for download */}</div>
            <div>  const base64 = dataURL.split(',')[1];</div>
            <div>  const binary = atob(base64);</div>
            <div>  const bytes = new Uint8Array(binary.length);</div>
            <div>  </div>
            <div>  for (let i = 0; i &lt; binary.length; i++) {`{`}</div>
            <div>    bytes[i] = binary.charCodeAt(i);</div>
            <div>  {`}`}</div>
            <div>  </div>
            <div>  return new Blob([bytes], {`{`} type: 'image/webp' {`}`});</div>
            <div>{`}`}</div>
          </div>

          <h3>5.3 Memory Management</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{
              padding: '12px', backgroundColor: '#fef2f2', borderRadius: '6px', border: '1px solid #fecaca'
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#dc2626' }}>Cleanup Functions</h4>
              <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#374151' }}>
                {/* Clean up resources after processing */}<br />
                function cleanup() {`{`}<br />
                &nbsp;&nbsp;URL.revokeObjectURL(objectURL);<br />
                &nbsp;&nbsp;canvas.width = 0;<br />
                &nbsp;&nbsp;canvas.height = 0;<br />
                &nbsp;&nbsp;ctx.clearRect(0, 0, canvas.width, canvas.height);<br />
                {`}`}
              </div>
            </div >
          </div >
        </div >

        {/* 合规审计 */}
        < div className="card" id="compliance" >
          <h2>6. Compliance & Auditing</h2>

          <h3>6.1 Privacy Regulations</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div style={{ padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>GDPR Compliance</h4>
              <ul style={{ margin: 0, fontSize: '14px' }}>
                <li>No personal data collection</li>
                <li>No consent required</li>
                <li>No data processing</li>
                <li>No data retention</li>
              </ul>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>CCPA Compliance</h4>
              <ul style={{ margin: 0, fontSize: '14px' }}>
                <li>No data collection</li>
                <li>No data sharing</li>
                <li>No data selling</li>
                <li>No opt-out needed</li>
              </ul>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>PIPEDA Compliance</h4>
              <ul style={{ margin: 0, fontSize: '14px' }}>
                <li>No data collection</li>
                <li>No data use</li>
                <li>No data disclosure</li>
                <li>No data retention</li>
              </ul>
            </div>
          </div>

          <h3>6.2 Security Audits</h3>
          <div style={{
            padding: '16px',
            backgroundColor: '#f0fdf4',
            borderRadius: '8px',
            border: '1px solid #10b981'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#065f46' }}>Audit Schedule</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              <div style={{ fontSize: '14px', color: '#065f46' }}>
                <strong>Quarterly:</strong><br />
                • Code security review<br />
                • Dependency updates<br />
                • Vulnerability scanning
              </div>
              <div style={{ fontSize: '14px', color: '#065f46' }}>
                <strong>Annually:</strong><br />
                • Third-party audit<br />
                • Penetration testing<br />
                • Compliance review
              </div>
            </div>
          </div>

          <h3>6.3 Transparency Reports</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ padding: '12px', backgroundColor: '#fef3c7', borderRadius: '6px', border: '1px solid #f59e0b' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>Public Reports</h4>
              <ul style={{ margin: 0, fontSize: '14px', color: '#92400e' }}>
                <li>Security audit results</li>
                <li>Privacy compliance status</li>
                <li>Code review findings</li>
                <li>Vulnerability disclosures</li>
              </ul>
            </div >
          </div >
        </div >

        {/* 结论 */}
        < div className="card" >
          <h2>Conclusion</h2>
          <p>
            PixCloak's privacy-first architecture represents a fundamental shift in how image processing can be done online.
            By eliminating data collection and server-side processing, we provide:
          </p>
          <ul>
            <li><strong>Complete Privacy:</strong> No data collection, no uploads, no tracking</li>
            <li><strong>Full Transparency:</strong> Open source code, verifiable operations</li>
            <li><strong>Regulatory Compliance:</strong> Meets GDPR, CCPA, PIPEDA requirements</li>
            <li><strong>User Control:</strong> All processing happens locally under user control</li>
          </ul>

          <div style={{
            padding: '16px',
            backgroundColor: '#f0fdf4',
            borderRadius: '8px',
            border: '1px solid #10b981',
            marginTop: 16
          }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#065f46' }}>Privacy by Design</h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#065f46' }}>
              This architecture implements privacy by design principles, ensuring that privacy is not an afterthought
              but a fundamental requirement built into every aspect of the system.
            </p>
          </div>
        </div >
      </div >
    </>
  );
}
