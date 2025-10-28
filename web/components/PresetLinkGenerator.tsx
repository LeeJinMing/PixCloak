'use client';

import { useState } from 'react';

interface PresetConfig {
  name: string;
  kb: number;
  size: string;
  format: 'jpg' | 'png' | 'webp';
  description: string;
}

const presets: PresetConfig[] = [
  { name: 'LinkedIn Profile', kb: 200, size: '400x400', format: 'jpg', description: 'Professional headshot' },
  { name: 'Instagram Post', kb: 500, size: '1080x1080', format: 'webp', description: 'Square social media post' },
  { name: 'Instagram Story', kb: 800, size: '1080x1920', format: 'webp', description: 'Vertical story content' },
  { name: 'Facebook Post', kb: 500, size: '1200x630', format: 'webp', description: 'Facebook timeline post' },
  { name: 'Twitter Post', kb: 400, size: '1200x675', format: 'webp', description: 'Twitter/X timeline post' },
  { name: 'Resume Photo', kb: 150, size: '300x300', format: 'jpg', description: 'Professional CV photo' },
  { name: 'Email Attachment', kb: 200, size: '800x600', format: 'jpg', description: 'Email newsletter image' },
  { name: 'Website Hero', kb: 800, size: '1920x1080', format: 'webp', description: 'Website banner image' },
  { name: 'Product Photo', kb: 400, size: '1000x1000', format: 'webp', description: 'E-commerce product image' },
  { name: 'Thumbnail', kb: 100, size: '300x300', format: 'webp', description: 'Gallery thumbnail' },
  { name: 'Government ID', kb: 500, size: '600x600', format: 'jpg', description: 'Official ID photo' },
  { name: 'Blog Post', kb: 300, size: '1200x800', format: 'webp', description: 'Article featured image' }
];

export default function PresetLinkGenerator() {
  const [selectedPreset, setSelectedPreset] = useState<PresetConfig | null>(null);
  const [customKb, setCustomKb] = useState<number>(200);
  const [customSize, setCustomSize] = useState<string>('800x600');
  const [customFormat, setCustomFormat] = useState<'jpg' | 'png' | 'webp'>('jpg');

  const generateLink = (preset: PresetConfig) => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/compress?kb=${preset.kb}&size=${preset.size}&format=${preset.format}&preset=${encodeURIComponent(preset.name)}`;
  };

  const generateCustomLink = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/compress?kb=${customKb}&size=${customSize}&format=${customFormat}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Quick Preset Links</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Generate direct links to our compressor with pre-configured settings for common use cases.
      </p>

      <div style={{ display: 'grid', gap: '12px', marginBottom: '30px' }}>
        {presets.map((preset, index) => {
          const link = generateLink(preset);
          return (
            <div key={index} style={{
              padding: '16px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              display: 'grid',
              gridTemplateColumns: '1fr auto auto',
              gap: '12px',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{preset.name}</h3>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {preset.size} • {preset.kb}KB • {preset.format.toUpperCase()}
                </div>
                <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>
                  {preset.description}
                </div>
              </div>
              <a
                href={link}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  textAlign: 'center'
                }}
              >
                Use Preset
              </a>
              <button
                onClick={() => copyToClipboard(link)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Copy Link
              </button>
            </div>
          );
        })}
      </div>

      <div style={{
        padding: '20px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <h3>Custom Preset Generator</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
              File Size (KB)
            </label>
            <input
              type="number"
              value={customKb}
              onChange={(e) => setCustomKb(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
              Dimensions
            </label>
            <input
              type="text"
              value={customSize}
              onChange={(e) => setCustomSize(e.target.value)}
              placeholder="800x600"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
              Format
            </label>
            <select
              value={customFormat}
              onChange={(e) => setCustomFormat(e.target.value as 'jpg' | 'png' | 'webp')}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              <option value="jpg">JPG</option>
              <option value="png">PNG</option>
              <option value="webp">WebP</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a
            href={generateCustomLink()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#10b981',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Generate Custom Link
          </a>
          <button
            onClick={() => copyToClipboard(generateCustomLink())}
            style={{
              padding: '10px 16px',
              backgroundColor: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Copy Custom Link
          </button>
        </div>

        <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
          <div style={{ fontSize: '13px', color: '#1e40af', fontWeight: '500', marginBottom: '4px' }}>
            Generated Link:
          </div>
          <code style={{ fontSize: '12px', color: '#374151', wordBreak: 'break-all' }}>
            {generateCustomLink()}
          </code>
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>💡 Pro Tips:</h4>
        <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '14px', color: '#92400e' }}>
          <li>Use these links in documentation, tutorials, or share with team members</li>
          <li>Each preset includes UTM parameters for tracking usage</li>
          <li>Links work on any device - mobile, tablet, or desktop</li>
          <li>All processing happens locally - no uploads required</li>
        </ul>
      </div>
    </div>
  );
}
