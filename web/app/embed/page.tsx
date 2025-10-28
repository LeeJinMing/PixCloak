import type { Metadata } from "next";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';
import CopyButton from './CopyButton';

export const metadata: Metadata = {
  title: "Embed PixCloak Tools - Free Image Compression Widget | PixCloak",
  description: "Embed our image compression tools directly in your website or blog. Free iframe widget with customizable presets. No API key required, works offline.",
  alternates: { canonical: "/embed", languages: { "x-default": "/embed" } },
};

const embedOptions = [
  {
    name: "Basic Compressor",
    description: "Simple image compression with quality slider",
    iframe: '<iframe src="https://pixcloak.com/embed/compress" width="100%" height="600" frameborder="0" style="border-radius: 8px;"></iframe>',
    jsSnippet: `<!-- PixCloak Image Compressor Widget -->
<div id="pixcloak-compress-widget"></div>
<script>
  (function() {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://pixcloak.com/embed/compress';
    iframe.width = '100%';
    iframe.height = '600';
    iframe.frameBorder = '0';
    iframe.style.borderRadius = '8px';
    document.getElementById('pixcloak-compress-widget').appendChild(iframe);
  })();
</script>`
  },
  {
    name: "LinkedIn Profile Preset",
    description: "Pre-configured for LinkedIn profile pictures (400x400px, 200KB)",
    iframe: '<iframe src="https://pixcloak.com/embed/compress?preset=linkedin" width="100%" height="500" frameborder="0" style="border-radius: 8px;"></iframe>',
    jsSnippet: `<!-- PixCloak LinkedIn Profile Compressor -->
<div id="pixcloak-linkedin-widget"></div>
<script>
  (function() {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://pixcloak.com/embed/compress?preset=linkedin';
    iframe.width = '100%';
    iframe.height = '500';
    iframe.frameBorder = '0';
    iframe.style.borderRadius = '8px';
    document.getElementById('pixcloak-linkedin-widget').appendChild(iframe);
  })();
</script>`
  },
  {
    name: "Instagram Post Preset",
    description: "Pre-configured for Instagram posts (1080x1080px, 500KB)",
    iframe: '<iframe src="https://pixcloak.com/embed/compress?preset=instagram" width="100%" height="500" frameborder="0" style="border-radius: 8px;"></iframe>',
    jsSnippet: `<!-- PixCloak Instagram Post Compressor -->
<div id="pixcloak-instagram-widget"></div>
<script>
  (function() {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://pixcloak.com/embed/compress?preset=instagram';
    iframe.width = '100%';
    iframe.height = '500';
    iframe.frameBorder = '0';
    iframe.style.borderRadius = '8px';
    document.getElementById('pixcloak-instagram-widget').appendChild(iframe);
  })();
</script>`
  },
  {
    name: "Custom Preset Generator",
    description: "Generate your own preset with custom parameters",
    iframe: '<iframe src="https://pixcloak.com/embed/compress?kb=300&size=800x600&format=webp" width="100%" height="500" frameborder="0" style="border-radius: 8px;"></iframe>',
    jsSnippet: `<!-- PixCloak Custom Preset Compressor -->
<div id="pixcloak-custom-widget"></div>
<script>
  (function() {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://pixcloak.com/embed/compress?kb=300&size=800x600&format=webp';
    iframe.width = '100%';
    iframe.height = '500';
    iframe.frameBorder = '0';
    iframe.style.borderRadius = '8px';
    document.getElementById('pixcloak-custom-widget').appendChild(iframe);
  })();
</script>`
  }
];

export default function EmbedPage() {
  return (
    <>
      <SoftwareAppJsonLd
        name="PixCloak Embeddable Widgets"
        url="/embed"
        description="Embed our image compression tools directly in your website or blog. Free iframe widget with customizable presets."
      />

      <div className="container" style={{ display: 'grid', gap: 16 }}>
        <div className="card">
          <h1>Embed PixCloak Tools</h1>
          <p className="text-muted">
            Add our image compression tools directly to your website, blog, or documentation.
            All processing happens locally in the user's browser - no uploads, no API keys required.
          </p>
        </div>

        <div className="card">
          <h2>Available Widgets</h2>
          <div style={{ display: 'grid', gap: 20 }}>
            {embedOptions.map((option, index) => (
              <div key={index} style={{
                padding: '20px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#fafafa'
              }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
                  {option.name}
                </h3>
                <p style={{ margin: '0 0 16px 0', color: '#666' }}>
                  {option.description}
                </p>

                <div style={{ display: 'grid', gap: '12px' }}>
                  <div>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>
                      Preview:
                    </h4>
                    <div style={{
                      border: '2px dashed #d1d5db',
                      borderRadius: '8px',
                      padding: '20px',
                      textAlign: 'center',
                      backgroundColor: '#f9fafb'
                    }}>
                      <div style={{ color: '#6b7280', fontSize: '14px' }}>
                        Widget Preview - {option.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
                        Actual widget will be interactive
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>
                      HTML iframe Code:
                    </h4>
                    <textarea
                      value={option.iframe}
                      readOnly
                      style={{
                        width: '100%',
                        height: '80px',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontFamily: 'monospace',
                        backgroundColor: '#f8f9fa'
                      }}
                    />
                    <CopyButton
                      text={option.iframe}
                      style={{
                        marginTop: '8px',
                        padding: '6px 12px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Copy iframe Code
                    </CopyButton>
                  </div>

                  <div>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>
                      JavaScript Embed Code:
                    </h4>
                    <textarea
                      value={option.jsSnippet}
                      readOnly
                      style={{
                        width: '100%',
                        height: '120px',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontFamily: 'monospace',
                        backgroundColor: '#f8f9fa'
                      }}
                    />
                    <CopyButton
                      text={option.jsSnippet}
                      style={{
                        marginTop: '8px',
                        padding: '6px 12px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Copy JS Code
                    </CopyButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>Customization Options</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <h3>URL Parameters</h3>
              <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <p>Customize the widget behavior using URL parameters:</p>
                <ul style={{ marginLeft: '20px' }}>
                  <li><code>kb=200</code> - Set target file size in KB</li>
                  <li><code>size=800x600</code> - Set target dimensions</li>
                  <li><code>format=webp</code> - Set output format (jpg, png, webp)</li>
                  <li><code>preset=linkedin</code> - Use predefined preset</li>
                  <li><code>theme=dark</code> - Dark theme (coming soon)</li>
                </ul>
              </div>
            </div>

            <div>
              <h3>Styling Options</h3>
              <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <p>Customize the appearance with CSS:</p>
                <pre style={{
                  backgroundColor: '#f3f4f6',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  overflow: 'auto'
                }}>
                  {`/* Custom styling for embedded widget */
iframe[src*="pixcloak.com/embed"] {
  border-radius: 12px !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
  transition: box-shadow 0.3s ease !important;
}

iframe[src*="pixcloak.com/embed"]:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Integration Examples</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <h3>WordPress</h3>
              <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                Add to your WordPress posts or pages using HTML blocks:
              </p>
              <pre style={{
                backgroundColor: '#f3f4f6',
                padding: '12px',
                borderRadius: '4px',
                fontSize: '12px',
                overflow: 'auto'
              }}>
                {`<!-- In WordPress HTML block -->
<iframe src="https://pixcloak.com/embed/compress?preset=instagram" 
        width="100%" height="500" frameborder="0" 
        style="border-radius: 8px;"></iframe>`}
              </pre>
            </div>

            <div>
              <h3>React/Next.js</h3>
              <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                Use as a React component:
              </p>
              <pre style={{
                backgroundColor: '#f3f4f6',
                padding: '12px',
                borderRadius: '4px',
                fontSize: '12px',
                overflow: 'auto'
              }}>
                {`import React from 'react';

const PixCloakWidget = ({ preset = 'basic' }) => {
  return (
    <iframe 
      src={\`https://pixcloak.com/embed/compress?preset=\${preset}\`}
      width="100%" 
      height="500" 
      frameBorder="0"
      style={{ borderRadius: '8px' }}
    />
  );
};

export default PixCloakWidget;`}
              </pre>
            </div>

            <div>
              <h3>Documentation Sites</h3>
              <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                Perfect for documentation sites like GitBook, Notion, or custom docs:
              </p>
              <pre style={{
                backgroundColor: '#f3f4f6',
                padding: '12px',
                borderRadius: '4px',
                fontSize: '12px',
                overflow: 'auto'
              }}>
                {`<!-- In documentation -->
<div class="tool-widget">
  <h4>Compress Images for Your Blog</h4>
  <iframe src="https://pixcloak.com/embed/compress?kb=300&format=webp" 
          width="100%" height="400" frameborder="0"></iframe>
</div>`}
              </pre>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Benefits of Embedding</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div>
              <h3>🚀 No API Keys</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Embed directly without registration or API keys. Just copy and paste the code.
              </p>
            </div>
            <div>
              <h3>🔒 Privacy First</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>
                All processing happens locally in the user's browser. No uploads, no data collection.
              </p>
            </div>
            <div>
              <h3>📱 Responsive</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Widgets automatically adapt to different screen sizes and devices.
              </p>
            </div>
            <div>
              <h3>⚡ Fast Loading</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Lightweight widgets load quickly and don't slow down your website.
              </p>
            </div>
          </div>
        </div>
      </div>

      <FaqJsonLd items={[
        { question: "How do I embed PixCloak tools in my website?", answer: "Copy the iframe code from our embed page and paste it into your HTML. No API keys or registration required. The widget will work immediately." },
        { question: "Is there a cost to embed PixCloak widgets?", answer: "No, embedding PixCloak widgets is completely free. There are no usage limits or hidden costs." },
        { question: "Do embedded widgets work on mobile devices?", answer: "Yes, all PixCloak widgets are fully responsive and work on mobile, tablet, and desktop devices." },
        { question: "Can I customize the appearance of embedded widgets?", answer: "Yes, you can customize the iframe styling with CSS, including border radius, shadows, and hover effects." },
        { question: "Do embedded widgets require JavaScript?", answer: "The basic iframe embed works without JavaScript. The JavaScript version provides better integration and customization options." },
        { question: "Are there any privacy concerns with embedded widgets?", answer: "No privacy concerns. All image processing happens locally in the user's browser. No images are uploaded to our servers." }
      ]} />
    </>
  );
}
