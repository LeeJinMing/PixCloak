import type { Metadata } from "next";
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import { FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Image SEO: Alt Text, File Names, Visibility | PixCloak",
  description: "Complete guide to image SEO optimization. Learn how to optimize alt text, file names, captions, and image metadata for better search engine visibility.",
  alternates: { canonical: "/guides/image-seo-optimization" },
};

export default function ImageSEOOptimizationPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides/complete-image-compression-guide' },
        { name: 'Image SEO Optimization', url: '/guides/image-seo-optimization' }
      ]} />

      <div className="container" style={{ display: 'grid', gap: 16 }}>
        <div className="card">
          <h1>Complete Image SEO Optimization Guide</h1>
          <p className="text-muted">
            Learn how to optimize your images for search engines and improve your website's visibility.
            This comprehensive guide covers alt text, file names, captions, and technical optimization.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
            <a
              href="/compress"
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              🚀 Optimize Images Now
            </a>
            <a
              href="/gallery"
              style={{
                padding: '8px 16px',
                backgroundColor: '#10b981',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              📸 View Examples
            </a>
            <a
              href="/scenarios"
              style={{
                padding: '8px 16px',
                backgroundColor: '#f59e0b',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              🎯 Find Your Scenario
            </a>
          </div>
        </div>

        {/* 目录 */}
        <div className="card">
          <h2>Table of Contents</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            <a href="#why-image-seo" style={{ color: '#3b82f6', textDecoration: 'none' }}>1. Why Image SEO Matters</a>
            <a href="#alt-text-optimization" style={{ color: '#3b82f6', textDecoration: 'none' }}>2. Alt Text Optimization</a>
            <a href="#file-naming" style={{ color: '#3b82f6', textDecoration: 'none' }}>3. File Naming Best Practices</a>
            <a href="#image-captions" style={{ color: '#3b82f6', textDecoration: 'none' }}>4. Image Captions & Descriptions</a>
            <a href="#technical-optimization" style={{ color: '#3b82f6', textDecoration: 'none' }}>5. Technical Optimization</a>
            <a href="#structured-data" style={{ color: '#3b82f6', textDecoration: 'none' }}>6. Structured Data & Schema</a>
            <a href="#image-sitemaps" style={{ color: '#3b82f6', textDecoration: 'none' }}>7. Image Sitemaps</a>
            <a href="#common-mistakes" style={{ color: '#3b82f6', textDecoration: 'none' }}>8. Common Mistakes to Avoid</a>
          </div>
        </div>

        {/* 为什么图片SEO重要 */}
        <div className="card" id="why-image-seo">
          <h2>1. Why Image SEO Matters</h2>

          <h3>1.1 Search Engine Visibility</h3>
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{
              padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #10b981'
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#065f46' }}>🔍 Image Search Traffic</h4>
              <ul style={{ margin: 0, fontSize: '14px', color: '#065f46' }}>
                <li>Images appear in Google Image Search results</li>
                <li>Can drive significant traffic to your website</li>
                <li>Images often rank higher than text content</li>
                <li>Visual content is more engaging for users</li>
              </ul>
            </div>
            <div style={{
              padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #10b981'
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#065f46' }}>📈 SEO Benefits</h4>
              <ul style={{ margin: 0, fontSize: '14px', color: '#065f46' }}>
                <li>Improves overall page SEO score</li>
                <li>Increases time on page</li>
                <li>Reduces bounce rate</li>
                <li>Enhances user experience</li>
              </ul>
            </div >
          </div >

          <h3>1.2 Accessibility Benefits</h3>
          <p>
            Image SEO optimization also improves accessibility for users with visual impairments:
          </p>
          <ul>
            <li><strong>Screen Readers:</strong> Alt text helps screen readers describe images</li>
            <li><strong>Visual Impairments:</strong> Descriptive text provides context</li>
            <li><strong>Slow Connections:</strong> Optimized images load faster</li>
            <li><strong>Mobile Users:</strong> Better experience on mobile devices</li>
          </ul>
        </div >

        {/* Alt文本优化 */}
        < div className="card" id="alt-text-optimization" >
          <h2>2. Alt Text Optimization</h2>

          <h3>2.1 What is Alt Text?</h3>
          <p>
            Alt text (alternative text) is a description of an image that appears when the image
            cannot be displayed. It's crucial for SEO and accessibility.
          </p>

          <h3>2.2 Alt Text Best Practices</h3>
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px', border: '1px solid #f59e0b' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>✅ Good Alt Text Examples</h4>
              <div style={{ fontSize: '14px', color: '#92400e' }}>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Product Image:</strong><br />
                  "Red leather handbag with gold hardware and adjustable strap"
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Portrait Photo:</strong><br />
                  "Professional headshot of smiling woman in business suit"
                </div>
                <div>
                  <strong>Infographic:</strong><br />
                  "Chart showing 2024 sales growth with 25% increase from previous year"
                </div>
              </div>
            </div >

            <div style={{
              padding: '16px', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca'
            }}>
              < h4 style={{
                margin: '0 0 8px 0', color: '#dc2626'
              }}>❌ Bad Alt Text Examples</h4 >
              <div style={{ fontSize: '14px', color: '#dc2626' }}>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Too Generic:</strong><br />
                  "image", "photo", "picture"
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Too Long:</strong><br />
                  "This is a beautiful red leather handbag that I bought from a store..."
                </div>
                <div>
                  <strong>Keyword Stuffing:</strong><br />
                  "red leather handbag buy online cheap discount sale"
                </div>
              </div>
            </div >
          </div >

          <h3>2.3 Alt Text Guidelines</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6' }}>
                  <th style={{ padding: '8px', border: '1px solid #d1d5db', textAlign: 'left' }}>Guideline</th>
                  <th style={{ padding: '8px', border: '1px solid #d1d5db', textAlign: 'left' }}>Best Practice</th>
                  <th style={{ padding: '8px', border: '1px solid #d1d5db', textAlign: 'left' }}>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Length</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>50-125 characters</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>"Red leather handbag with gold hardware"</td>
                </tr>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Keywords</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Include relevant keywords naturally</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>"Professional headshot for LinkedIn profile"</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Context</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Describe what's important for the page</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>"Chart showing quarterly sales performance"</td>
                </tr>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Decorative</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Use empty alt="" for decorative images</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>alt=""</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div >

        {/* 文件命名 */}
        < div className="card" id="file-naming" >
          <h2>3. File Naming Best Practices</h2>

          <h3>3.1 Descriptive File Names</h3>
          <p>
            Use descriptive file names that clearly indicate what the image contains.
            This helps search engines understand your content.
          </p>

          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #10b981' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#065f46' }}>✅ Good File Names</h4>
              <div style={{ fontSize: '14px', color: '#065f46', fontFamily: 'monospace' }}>
                <div>red-leather-handbag-gold-hardware.jpg</div>
                <div>professional-headshot-linkedin-profile.jpg</div>
                <div>quarterly-sales-chart-2024.png</div>
                <div>instagram-post-square-1080x1080.webp</div>
              </div>
            </div>

            <div style={{
              padding: '16px', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca'
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#dc2626' }}>❌ Bad File Names</h4>
              <div style={{ fontSize: '14px', color: '#dc2626', fontFamily: 'monospace' }}>
                <div>IMG_001.jpg</div>
                <div>photo1.png</div>
                <div>image_2024_01_15.jpg</div>
                <div>untitled-1.webp</div>
              </div>
            </div >
          </div >

          <h3>3.2 File Naming Guidelines</h3>
          <ul>
            <li><strong>Use hyphens:</strong> Separate words with hyphens (-) not underscores (_)</li>
            <li><strong>Include keywords:</strong> Use relevant keywords in your file names</li>
            <li><strong>Keep it short:</strong> Avoid overly long file names</li>
            <li><strong>Use lowercase:</strong> Stick to lowercase letters for consistency</li>
            <li><strong>Avoid special characters:</strong> Don't use spaces, symbols, or special characters</li>
          </ul>
        </div >

        {/* 图片标题和描述 */}
        < div className="card" id="image-captions" >
          <h2>4. Image Captions & Descriptions</h2>

          <h3>4.1 Image Captions</h3>
          <p>
            Captions provide additional context for your images and can improve SEO.
            They appear below or near the image and are visible to all users.
          </p>

          <h3>4.2 Caption Best Practices</h3>
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #3b82f6' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>Effective Caption Examples</h4>
              <div style={{ fontSize: '14px', color: '#1e40af' }}>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Product Image:</strong><br />
                  "Our premium red leather handbag features gold hardware and adjustable strap. Perfect for professional and casual occasions."
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Infographic:</strong><br />
                  "Sales increased by 25% in Q4 2024, driven by our new product launch and improved marketing strategies."
                </div>
                <div>
                  <strong>Team Photo:</strong><br />
                  "Our development team celebrating the successful launch of our new image compression tool."
                </div>
              </div>
            </div >
          </div >

          <h3>4.3 Image Descriptions</h3>
          <p>
            Image descriptions provide more detailed information about the image content.
            They can be used in addition to alt text and captions.
          </p>
          <ul>
            <li><strong>Context:</strong> Explain how the image relates to your content</li>
            <li><strong>Details:</strong> Provide specific details about the image</li>
            <li><strong>Keywords:</strong> Include relevant keywords naturally</li>
            <li><strong>Value:</strong> Explain why the image is important</li>
          </ul>
        </div >

        {/* 技术优化 */}
        < div className="card" id="technical-optimization" >
          <h2>5. Technical Optimization</h2>

          <h3>5.1 Image Formats</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6' }}>
                  <th style={{ padding: '8px', border: '1px solid #d1d5db', textAlign: 'left' }}>Format</th>
                  <th style={{ padding: '8px', border: '1px solid #d1d5db', textAlign: 'left' }}>Best For</th>
                  <th style={{ padding: '8px', border: '1px solid #d1d5db', textAlign: 'left' }}>SEO Benefits</th>
                  <th style={{ padding: '8px', border: '1px solid #d1d5db', textAlign: 'left' }}>File Size</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>WebP</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Modern browsers, web images</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Best compression, fast loading</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Smallest</td>
                </tr>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>JPEG</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Photos, complex images</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Universal support, good compression</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Small</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>PNG</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Graphics, logos, transparent images</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Lossless quality, transparency</td>
                  <td style={{ padding: '8px', border: '1px solid #d1d5db' }}>Larger</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>5.2 Image Dimensions</h3>
          <p>
            Optimize image dimensions for your specific use case:
          </p>
          <ul>
            <li><strong>Web Images:</strong> Use appropriate dimensions for your layout</li>
            <li><strong>Social Media:</strong> Follow platform-specific requirements</li>
            <li><strong>Responsive Design:</strong> Provide multiple sizes for different devices</li>
            <li><strong>Performance:</strong> Balance quality with file size</li>
          </ul>

          <h3>5.3 Compression Settings</h3>
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #10b981' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#065f46' }}>Compression Guidelines</h4>
              <div style={{ fontSize: '14px', color: '#065f46' }}>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Web Images:</strong> 80-90% quality for good balance
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Social Media:</strong> 85-95% quality for engagement
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>E-commerce:</strong> 90-95% quality for product details
                </div>
                <div>
                  <strong>Thumbnails:</strong> 70-80% quality for fast loading
                </div>
              </div>
            </div >
          </div >
        </div >

        {/* 结构化数据 */}
        < div className="card" id="structured-data" >
          <h2>6. Structured Data & Schema</h2>

          <h3>6.1 Image Schema Markup</h3>
          <p>
            Use structured data to help search engines understand your images better.
            This can improve visibility in search results.
          </p>

          <h3>6.2 Schema Types for Images</h3>
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #3b82f6' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>ImageObject Schema</h4>
              <div style={{
                padding: '12px',
                backgroundColor: '#f8fafc',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '12px',
                color: '#374151',
                overflowX: 'auto'
              }}>
                <div>{`{`}</div>
                <div>&nbsp;&nbsp;"@type": "ImageObject",</div>
                <div>&nbsp;&nbsp;"url": "https://example.com/image.jpg",</div>
                <div>&nbsp;&nbsp;"caption": "Red leather handbag",</div>
                <div>&nbsp;&nbsp;"description": "Premium handbag with gold hardware",</div>
                <div>&nbsp;&nbsp;"width": 800,</div>
                <div>&nbsp;&nbsp;"height": 600</div>
                <div>{`}`}</div>
              </div>
            </div >

            <div style={{
              padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #3b82f6'
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }
              } > Product Schema with Images</ h4>
              <div style={{
                padding: '12px',
                backgroundColor: '#f8fafc',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '12px',
                color: '#374151',
                overflowX: 'auto'
              }}>
                <div>{`{`}</div>
                <div>&nbsp;&nbsp;"@type": "Product",</div>
                <div>&nbsp;&nbsp;"name": "Red Leather Handbag",</div>
                <div>&nbsp;&nbsp;"image": [</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;"https://example.com/handbag-1.jpg",</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;"https://example.com/handbag-2.jpg"</div>
                <div>&nbsp;&nbsp;],</div>
                <div>&nbsp;&nbsp;"description": "Premium leather handbag"</div>
                <div>{`}`}</div>
              </div>
            </div>
          </div >
        </div >

        {/* 图片站点地图 */}
        < div className="card" id="image-sitemaps" >
          <h2>7. Image Sitemaps</h2>

          <h3>7.1 What are Image Sitemaps?</h3>
          <p>
            Image sitemaps help search engines discover and index your images more effectively.
            They provide additional information about your images that isn't available in regular sitemaps.
          </p>

          <h3>7.2 Image Sitemap Structure</h3>
          <div style={{
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#374151',
            overflowX: 'auto'
          }}>
            <div>&lt;?xml version="1.0" encoding="UTF-8"?&gt;</div>
            <div>&lt;urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"&gt;</div>
            <div>&nbsp;&nbsp;&lt;url&gt;</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;loc&gt;https://example.com/page.html&lt;/loc&gt;</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;image:image&gt;</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;image:loc&gt;https://example.com/image.jpg&lt;/image:loc&gt;</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;image:caption&gt;Red leather handbag&lt;/image:caption&gt;</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;image:title&gt;Premium Handbag&lt;/image:title&gt;</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/image:image&gt;</div>
            <div>&nbsp;&nbsp;&lt;/url&gt;</div>
            <div>&lt;/urlset&gt;</div>
          </div>

          <h3>7.3 Image Sitemap Best Practices</h3>
          <ul>
            <li><strong>Include all images:</strong> Add all important images to your sitemap</li>
            <li><strong>Use HTTPS:</strong> Ensure all image URLs use HTTPS</li>
            <li><strong>Provide captions:</strong> Include descriptive captions</li>
            <li><strong>Update regularly:</strong> Keep your sitemap current</li>
            <li><strong>Submit to Google:</strong> Submit your image sitemap to Google Search Console</li>
          </ul>
        </div >

        {/* 常见错误 */}
        < div className="card" id="common-mistakes" >
          <h2>8. Common Mistakes to Avoid</h2>

          <h3>8.1 Alt Text Mistakes</h3>
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ padding: '16px', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#dc2626' }}>❌ Common Alt Text Mistakes</h4>
              <ul style={{ margin: 0, fontSize: '14px', color: '#dc2626' }}>
                <li>Using "image of" or "picture of" in alt text</li>
                <li>Keyword stuffing with irrelevant keywords</li>
                <li>Copying alt text from similar images</li>
                <li>Using alt text for decorative images</li>
                <li>Making alt text too long or too short</li>
              </ul>
            </div >
          </div >

          <h3>8.2 Technical Mistakes</h3>
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ padding: '16px', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#dc2626' }}>❌ Technical Mistakes</h4>
              <ul style={{ margin: 0, fontSize: '14px', color: '#dc2626' }}>
                <li>Using oversized images for web display</li>
                <li>Not optimizing images for mobile devices</li>
                <li>Using outdated image formats</li>
                <li>Not providing multiple image sizes</li>
                <li>Ignoring Core Web Vitals impact</li>
              </ul>
            </div >
          </div >

          <h3>8.3 SEO Mistakes</h3>
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ padding: '16px', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#dc2626' }}>❌ SEO Mistakes</h4>
              <ul style={{ margin: 0, fontSize: '14px', color: '#dc2626' }}>
                <li>Not including images in sitemaps</li>
                <li>Missing structured data markup</li>
                <li>Not monitoring image performance</li>
                <li>Ignoring image search analytics</li>
                <li>Not updating image metadata</li>
              </ul>
            </div >
          </div >
        </div >

        {/* 行动号召 */}
        < div className="card" >
          <h2>Ready to Optimize Your Images for SEO?</h2>
          <p className="text-muted">
            Start implementing these image SEO best practices today. Use PixCloak's tools to optimize
            your images while maintaining quality and improving search visibility.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
            <a
              href="/compress"
              style={{
                padding: '12px 24px',
                backgroundColor: '#3b82f6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Optimize Images Now
            </a>
            <a
              href="/gallery"
              style={{
                padding: '12px 24px',
                backgroundColor: '#10b981',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              View Examples
            </a>
            <a
              href="/scenarios"
              style={{
                padding: '12px 24px',
                backgroundColor: '#f59e0b',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Find Your Scenario
            </a>
          </div>
        </div>
      </div>

      <FaqJsonLd items={[
        { question: "How important is image SEO for my website?", answer: "Image SEO is crucial for improving search visibility, driving traffic from image search, and enhancing overall user experience. It can significantly impact your website's performance in search results." },
        { question: "What's the ideal length for alt text?", answer: "Alt text should be 50-125 characters long. It should be descriptive enough to convey the image's content but concise enough to be easily readable." },
        { question: "Should I use keywords in alt text?", answer: "Yes, include relevant keywords naturally in your alt text, but avoid keyword stuffing. Focus on describing the image accurately while incorporating relevant terms." },
        { question: "What image format is best for SEO?", answer: "WebP is generally the best format for SEO due to its superior compression and quality. However, JPEG is still widely supported and PNG is necessary for images with transparency." },
        { question: "Do I need to create image sitemaps?", answer: "Yes, image sitemaps help search engines discover and index your images more effectively. They're especially important for websites with many images." },
        { question: "How often should I update my image SEO?", answer: "Review and update your image SEO regularly, especially when adding new images or updating existing content. Monitor your image search performance and adjust accordingly." }
      ]} />
    </>
  );
}
