'use client';

import { useState } from 'react';

interface AnswerCardProps {
  question: string;
  answer: string;
  steps?: string[];
  table?: { headers: string[]; rows: string[][] };
  tips?: string[];
  relatedTools?: { name: string; url: string; description: string }[];
}

export default function AnswerCard({
  question,
  answer,
  steps,
  table,
  tips,
  relatedTools
}: AnswerCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      marginBottom: '24px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      backgroundColor: '#f9fafb',
      overflow: 'hidden'
    }}>
      {/* Question Header */}
      <div style={{
        padding: '16px 20px',
        backgroundColor: '#f3f4f6',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <h2 style={{
          margin: '0',
          fontSize: '18px',
          fontWeight: '600',
          color: '#1f2937'
        }}>
          {question}
        </h2>
      </div>

      {/* Quick Answer */}
      <div style={{ padding: '20px' }}>
        <div style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: '#374151',
          marginBottom: '16px'
        }}>
          {answer}
        </div>

        {/* Steps */}
        {steps && steps.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{
              margin: '0 0 12px 0',
              fontSize: '16px',
              fontWeight: '600',
              color: '#1f2937'
            }}>
              Step-by-Step:
            </h3>
            <ol style={{
              margin: '0',
              paddingLeft: '20px',
              lineHeight: '1.6',
              fontSize: '14px'
            }}>
              {steps.map((step, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Table */}
        {table && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '14px',
                backgroundColor: 'white',
                borderRadius: '6px',
                overflow: 'hidden',
                border: '1px solid #e5e7eb'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f5f5' }}>
                    {table.headers.map((header, index) => (
                      <th key={index} style={{
                        padding: '12px',
                        textAlign: 'left',
                        borderBottom: '1px solid #e5e7eb',
                        fontWeight: '600'
                      }}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} style={{
                          padding: '12px',
                          borderBottom: '1px solid #f3f4f6'
                        }}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Expandable Content */}
        {(tips || relatedTools) && (
          <div>
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer',
                marginBottom: expanded ? '16px' : '0'
              }}
            >
              {expanded ? 'Show Less' : 'Show More Details'}
            </button>

            {expanded && (
              <div>
                {/* Tips */}
                {tips && tips.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <h3 style={{
                      margin: '0 0 12px 0',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1f2937'
                    }}>
                      💡 Pro Tips:
                    </h3>
                    <ul style={{
                      margin: '0',
                      paddingLeft: '20px',
                      lineHeight: '1.6',
                      fontSize: '14px'
                    }}>
                      {tips.map((tip, index) => (
                        <li key={index} style={{ marginBottom: '6px' }}>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related Tools */}
                {relatedTools && relatedTools.length > 0 && (
                  <div>
                    <h3 style={{
                      margin: '0 0 12px 0',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1f2937'
                    }}>
                      🔧 Related Tools:
                    </h3>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      {relatedTools.map((tool, index) => (
                        <a
                          key={index}
                          href={tool.url}
                          style={{
                            display: 'block',
                            padding: '12px',
                            backgroundColor: 'white',
                            borderRadius: '6px',
                            border: '1px solid #e5e7eb',
                            textDecoration: 'none',
                            color: '#374151',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f0f9ff';
                            e.currentTarget.style.borderColor = '#3b82f6';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.borderColor = '#e5e7eb';
                          }}
                        >
                          <div style={{ fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>
                            {tool.name}
                          </div>
                          <div style={{ fontSize: '13px', color: '#6b7280' }}>
                            {tool.description}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// 预设的常见问题答案卡片
export const CommonAnswerCards = {
  compressTo200KB: {
    question: "How to compress image to exactly 200KB?",
    answer: "Use our compressor with target size set to 200KB. The tool automatically adjusts quality to hit the exact file size while maintaining visual quality.",
    steps: [
      "Upload your image to our compressor",
      "Set target size to 200KB",
      "Choose WebP format for best compression",
      "Click compress and download"
    ],
    table: {
      headers: ["Platform", "Recommended Size", "Format", "Quality"],
      rows: [
        ["LinkedIn Profile", "200KB", "JPG", "90%"],
        ["Resume Photo", "150KB", "JPG", "95%"],
        ["Email Attachment", "200KB", "JPG", "85%"],
        ["Website Thumbnail", "100KB", "WebP", "80%"]
      ]
    },
    tips: [
      "WebP format typically achieves 20-30% smaller files than JPEG",
      "Resize to 400x400px before compressing for profile photos",
      "Remove EXIF data to save additional space",
      "Use batch processing for multiple images"
    ],
    relatedTools: [
      { name: "LinkedIn Profile Compressor", url: "/compress?kb=200&size=400x400&format=jpg", description: "Pre-configured for LinkedIn profile pictures" },
      { name: "Resume Photo Tool", url: "/compress?kb=150&size=300x300&format=jpg", description: "Optimized for professional headshots" },
      { name: "Batch Compressor", url: "/batch", description: "Process multiple images at once" }
    ]
  },

  removeEXIF: {
    question: "How to remove EXIF data from photos?",
    answer: "Our privacy tool automatically strips EXIF metadata including GPS location, camera settings, and personal information when you export images.",
    steps: [
      "Upload your photo to our privacy tool",
      "Choose export format (JPEG/WebP/PNG)",
      "Click export to download clean image",
      "Verify EXIF removal using our checker tool"
    ],
    tips: [
      "EXIF data can reveal your location and camera model",
      "Always remove EXIF before sharing photos online",
      "PNG format doesn't support EXIF metadata",
      "Use our EXIF checker to verify removal"
    ],
    relatedTools: [
      { name: "Privacy Tool", url: "/redact", description: "Remove EXIF and redact sensitive content" },
      { name: "EXIF Checker", url: "/tools/exif-checker", description: "Verify if images contain metadata" },
      { name: "Compress Tool", url: "/compress", description: "Compress while removing EXIF" }
    ]
  },

  socialMediaSizes: {
    question: "What are the correct image sizes for social media?",
    answer: "Each platform has specific size requirements. Instagram feed posts should be 1080x1080px, Facebook posts 1200x630px, and LinkedIn profiles 400x400px.",
    table: {
      headers: ["Platform", "Dimensions", "Max Size", "Format"],
      rows: [
        ["Instagram Feed", "1080x1080", "500KB", "JPG/WebP"],
        ["Instagram Story", "1080x1920", "800KB", "JPG/WebP"],
        ["Facebook Post", "1200x630", "500KB", "JPG/WebP"],
        ["LinkedIn Profile", "400x400", "200KB", "JPG/PNG"],
        ["Twitter Post", "1200x675", "400KB", "JPG/WebP"],
        ["YouTube Thumbnail", "1280x720", "2MB", "JPG/PNG"]
      ]
    },
    tips: [
      "Use our platform presets for instant correct sizing",
      "WebP format provides better compression than JPEG",
      "Always test images on mobile devices",
      "Keep important content in the center of images"
    ],
    relatedTools: [
      { name: "Platform Presets", url: "/scenarios", description: "Get instant presets for all platforms" },
      { name: "Instagram Compressor", url: "/compress?preset=instagram", description: "Pre-configured for Instagram posts" },
      { name: "Facebook Compressor", url: "/compress?preset=facebook", description: "Optimized for Facebook posts" }
    ]
  }
};
