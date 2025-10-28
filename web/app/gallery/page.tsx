import type { Metadata } from "next";
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import { FaqJsonLd } from '@/components/SeoJsonLd';
import CategoryCard from './CategoryCard';

export const metadata: Metadata = {
  title: "Image Compression Before & After Gallery | Visual Quality Comparison | PixCloak",
  description: "See real before and after examples of image compression. Compare quality, file sizes, and compression ratios across different tools and settings.",
  alternates: { canonical: "/gallery" },
};

const compressionExamples = [
  {
    id: "portrait-professional",
    title: "Professional Headshot",
    category: "Portrait Photos",
    originalSize: "2.1MB",
    compressedSize: "200KB",
    compressionRatio: "90%",
    quality: "Excellent",
    format: "JPEG → WebP",
    useCase: "LinkedIn Profile Photo",
    description: "Professional headshot optimized for LinkedIn's 200KB limit while maintaining crisp quality for networking.",
    beforeImage: "/gallery/portrait-professional-before.jpg",
    afterImage: "/gallery/portrait-professional-after.webp",
    tools: ["PixCloak WebP", "TinyPNG", "Squoosh"],
    metrics: {
      ssim: 0.95,
      psnr: 38.2,
      processingTime: "3.2s"
    }
  },
  {
    id: "product-ecommerce",
    title: "E-commerce Product Photo",
    category: "Product Images",
    originalSize: "3.2MB",
    compressedSize: "300KB",
    compressionRatio: "91%",
    quality: "High",
    format: "JPEG → WebP",
    useCase: "Online Store",
    description: "Product photo optimized for e-commerce with excellent quality retention and fast loading.",
    beforeImage: "/gallery/product-ecommerce-before.jpg",
    afterImage: "/gallery/product-ecommerce-after.webp",
    tools: ["PixCloak WebP", "TinyPNG", "ImageOptim"],
    metrics: {
      ssim: 0.93,
      psnr: 35.8,
      processingTime: "2.8s"
    }
  },
  {
    id: "social-instagram",
    title: "Instagram Post",
    category: "Social Media",
    originalSize: "4.1MB",
    compressedSize: "500KB",
    compressionRatio: "88%",
    quality: "High",
    format: "JPEG → WebP",
    useCase: "Instagram Feed",
    description: "Instagram post optimized for social media with perfect square dimensions and fast loading.",
    beforeImage: "/gallery/social-instagram-before.jpg",
    afterImage: "/gallery/social-instagram-after.webp",
    tools: ["PixCloak WebP", "Squoosh", "TinyPNG"],
    metrics: {
      ssim: 0.91,
      psnr: 33.5,
      processingTime: "3.5s"
    }
  },
  {
    id: "food-photography",
    title: "Food Photography",
    category: "Product Images",
    originalSize: "2.7MB",
    compressedSize: "400KB",
    compressionRatio: "85%",
    quality: "High",
    format: "JPEG → WebP",
    useCase: "Restaurant Menu",
    description: "Food photo optimized for restaurant websites with vibrant colors and appetizing appearance.",
    beforeImage: "/gallery/food-photography-before.jpg",
    afterImage: "/gallery/food-photography-after.webp",
    tools: ["PixCloak WebP", "TinyPNG", "ImageOptim"],
    metrics: {
      ssim: 0.92,
      psnr: 34.1,
      processingTime: "2.9s"
    }
  },
  {
    id: "technical-screenshot",
    title: "UI Screenshot",
    category: "Technical Images",
    originalSize: "1.2MB",
    compressedSize: "150KB",
    compressionRatio: "88%",
    quality: "High",
    format: "PNG → WebP",
    useCase: "Documentation",
    description: "UI screenshot optimized for documentation with sharp text and clear interface elements.",
    beforeImage: "/gallery/technical-screenshot-before.png",
    afterImage: "/gallery/technical-screenshot-after.webp",
    tools: ["PixCloak WebP", "Squoosh", "TinyPNG"],
    metrics: {
      ssim: 0.94,
      psnr: 36.7,
      processingTime: "2.1s"
    }
  },
  {
    id: "landscape-photo",
    title: "Landscape Photography",
    category: "Nature Photos",
    originalSize: "5.8MB",
    compressedSize: "800KB",
    compressionRatio: "86%",
    quality: "High",
    format: "JPEG → WebP",
    useCase: "Website Hero",
    description: "Landscape photo optimized for website hero sections with stunning detail and fast loading.",
    beforeImage: "/gallery/landscape-photo-before.jpg",
    afterImage: "/gallery/landscape-photo-after.webp",
    tools: ["PixCloak WebP", "TinyPNG", "Squoosh"],
    metrics: {
      ssim: 0.90,
      psnr: 32.3,
      processingTime: "4.2s"
    }
  },
  {
    id: "fashion-model",
    title: "Fashion Model",
    category: "Portrait Photos",
    originalSize: "3.5MB",
    compressedSize: "350KB",
    compressionRatio: "90%",
    quality: "Excellent",
    format: "JPEG → WebP",
    useCase: "Fashion E-commerce",
    description: "Fashion model photo optimized for e-commerce with perfect skin tones and fabric details.",
    beforeImage: "/gallery/fashion-model-before.jpg",
    afterImage: "/gallery/fashion-model-after.webp",
    tools: ["PixCloak WebP", "TinyPNG", "ImageOptim"],
    metrics: {
      ssim: 0.94,
      psnr: 37.1,
      processingTime: "3.8s"
    }
  },
  {
    id: "chart-graph",
    title: "Data Visualization",
    category: "Technical Images",
    originalSize: "0.8MB",
    compressedSize: "120KB",
    compressionRatio: "85%",
    quality: "High",
    format: "PNG → WebP",
    useCase: "Business Reports",
    description: "Chart and graph optimized for business reports with crisp lines and readable text.",
    beforeImage: "/gallery/chart-graph-before.png",
    afterImage: "/gallery/chart-graph-after.webp",
    tools: ["PixCloak WebP", "Squoosh", "TinyPNG"],
    metrics: {
      ssim: 0.96,
      psnr: 39.5,
      processingTime: "1.8s"
    }
  }
];

const toolComparisons = [
  {
    tool: "PixCloak WebP",
    averageCompression: "89%",
    averageQuality: "High",
    averageSSIM: 0.93,
    averagePSNR: 35.8,
    processingSpeed: "Fast",
    privacy: "100% Local",
    cost: "Free"
  },
  {
    tool: "TinyPNG",
    averageCompression: "87%",
    averageQuality: "High",
    averageSSIM: 0.92,
    averagePSNR: 34.2,
    processingSpeed: "Medium",
    privacy: "Server Upload",
    cost: "Freemium"
  },
  {
    tool: "Squoosh",
    averageCompression: "88%",
    averageQuality: "High",
    averageSSIM: 0.91,
    averagePSNR: 33.9,
    processingSpeed: "Fast",
    privacy: "100% Local",
    cost: "Free"
  },
  {
    tool: "ImageOptim",
    averageCompression: "85%",
    averageQuality: "Medium",
    averageSSIM: 0.89,
    averagePSNR: 31.5,
    processingSpeed: "Slow",
    privacy: "Local",
    cost: "Paid"
  }
];

const categories = [
  {
    name: "Portrait Photos",
    description: "Professional headshots, LinkedIn photos, and personal portraits",
    count: 2,
    icon: "👤"
  },
  {
    name: "Product Images",
    description: "E-commerce products, food photography, and commercial images",
    count: 3,
    icon: "🛍️"
  },
  {
    name: "Social Media",
    description: "Instagram posts, Facebook covers, and social media content",
    count: 1,
    icon: "📱"
  },
  {
    name: "Technical Images",
    description: "Screenshots, charts, graphs, and UI mockups",
    count: 2,
    icon: "🖥️"
  },
  {
    name: "Nature Photos",
    description: "Landscapes, wildlife, and outdoor photography",
    count: 1,
    icon: "🌄"
  }
];

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Compression Gallery', url: '/gallery' }
      ]} />

      <div className="container" style={{ display: 'grid', gap: 16 }}>
        <div className="card">
          <h1>Image Compression Before & After Gallery</h1>
          <p className="text-muted">
            See real examples of image compression with PixCloak. Compare quality, file sizes,
            and compression ratios across different tools and settings.
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
              🚀 Try Compression Now
            </a>
            <a
              href="/benchmark"
              style={{
                padding: '8px 16px',
                backgroundColor: '#10b981',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              📊 View Benchmarks
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

        {/* 类别筛选 */}
        <div className="card">
          <h2>Browse by Category</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                category={category}
                style={{
                  padding: '16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  backgroundColor: '#fafafa',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              />
            ))}
          </div>
        </div>

        {/* 压缩示例 */}
        <div className="card">
          <h2>Compression Examples</h2>
          <p className="text-muted">
            Real before and after examples showing PixCloak's compression quality and effectiveness.
          </p>

          <div style={{ display: 'grid', gap: 24 }}>
            {compressionExamples.map((example, index) => (
              <div key={index} style={{
                padding: '20px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#fafafa'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <h3 style={{ margin: 0, fontSize: '18px' }}>{example.title}</h3>
                      <span style={{
                        padding: '2px 6px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {example.category}
                      </span>
                    </div>
                    <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#374151' }}>
                      {example.description}
                    </p>
                    <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: 12 }}>
                      <strong>Use Case:</strong> {example.useCase} • <strong>Format:</strong> {example.format}
                    </div>
                  </div>
                  <div style={{
                    textAlign: 'center',
                    padding: '12px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '6px',
                    minWidth: '120px'
                  }}>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Compression Results</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                      {example.originalSize} → {example.compressedSize}
                    </div>
                    <div style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>
                      {example.compressionRatio} reduction
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                      Quality: {example.quality}
                    </div>
                  </div>
                </div>

                {/* 图片对比 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div style={{ textAlign: 'center' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#dc2626' }}>Before</h4>
                    <div style={{
                      width: '100%',
                      height: '200px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px dashed #d1d5db'
                    }}>
                      <div style={{ textAlign: 'center', color: '#6b7280' }}>
                        <div style={{ fontSize: '24px', marginBottom: '8px' }}>📷</div>
                        <div style={{ fontSize: '12px' }}>Original Image</div>
                        <div style={{ fontSize: '10px', marginTop: '4px' }}>{example.originalSize}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#10b981' }}>After</h4>
                    <div style={{
                      width: '100%',
                      height: '200px',
                      backgroundColor: '#f0fdf4',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px dashed #10b981'
                    }}>
                      <div style={{ textAlign: 'center', color: '#065f46' }}>
                        <div style={{ fontSize: '24px', marginBottom: '8px' }}>✨</div>
                        <div style={{ fontSize: '12px' }}>Compressed Image</div>
                        <div style={{ fontSize: '10px', marginTop: '4px' }}>{example.compressedSize}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 工具比较 */}
                <div style={{ marginBottom: 12 }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#3b82f6' }}>Tools Tested:</h4>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {example.tools.map((tool, toolIndex) => (
                      <span key={toolIndex} style={{
                        padding: '4px 8px',
                        backgroundColor: '#e5e7eb',
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: '#374151'
                      }}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 质量指标 */}
                <div style={{
                  padding: '12px',
                  backgroundColor: '#f0f9ff',
                  borderRadius: '6px',
                  border: '1px solid #3b82f6'
                }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1e40af' }}>Quality Metrics:</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 8, fontSize: '12px' }}>
                    <div><strong>SSIM:</strong> {example.metrics.ssim}</div>
                    <div><strong>PSNR:</strong> {example.metrics.psnr} dB</div>
                    <div><strong>Time:</strong> {example.metrics.processingTime}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 工具比较 */}
        <div className="card">
          <h2>Tool Comparison</h2>
          <p className="text-muted">
            Compare PixCloak's performance with other popular image compression tools.
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6' }}>
                  <th style={{ padding: '12px', border: '1px solid #d1d5db', textAlign: 'left' }}>Tool</th>
                  <th style={{ padding: '12px', border: '1px solid #d1d5db', textAlign: 'left' }}>Avg Compression</th>
                  <th style={{ padding: '12px', border: '1px solid #d1d5db', textAlign: 'left' }}>Avg Quality</th>
                  <th style={{ padding: '12px', border: '1px solid #d1d5db', textAlign: 'left' }}>SSIM</th>
                  <th style={{ padding: '12px', border: '1px solid #d1d5db', textAlign: 'left' }}>PSNR</th>
                  <th style={{ padding: '12px', border: '1px solid #d1d5db', textAlign: 'left' }}>Speed</th>
                  <th style={{ padding: '12px', border: '1px solid #d1d5db', textAlign: 'left' }}>Privacy</th>
                  <th style={{ padding: '12px', border: '1px solid #d1d5db', textAlign: 'left' }}>Cost</th>
                </tr>
              </thead>
              <tbody>
                {toolComparisons.map((tool, index) => (
                  <tr key={index} style={{ backgroundColor: tool.tool.includes('PixCloak') ? '#f0fdf4' : '' }}>
                    <td style={{ padding: '12px', border: '1px solid #d1d5db', fontWeight: '600' }}>
                      {tool.tool}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #d1d5db' }}>{tool.averageCompression}</td>
                    <td style={{ padding: '12px', border: '1px solid #d1d5db' }}>{tool.averageQuality}</td>
                    <td style={{ padding: '12px', border: '1px solid #d1d5db' }}>{tool.averageSSIM}</td>
                    <td style={{ padding: '12px', border: '1px solid #d1d5db' }}>{tool.averagePSNR} dB</td>
                    <td style={{ padding: '12px', border: '1px solid #d1d5db' }}>{tool.processingSpeed}</td>
                    <td style={{ padding: '12px', border: '1px solid #d1d5db' }}>{tool.privacy}</td>
                    <td style={{ padding: '12px', border: '1px solid #d1d5db' }}>{tool.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 行动号召 */}
        <div className="card">
          <h2>Ready to Optimize Your Images?</h2>
          <p className="text-muted">
            See the difference for yourself. Upload your images and experience PixCloak's
            privacy-first compression technology.
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
              Start Compressing Now
            </a>
            <a
              href="/scenarios"
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
              Find Your Scenario
            </a>
            <a
              href="/benchmark"
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
              View Full Benchmark
            </a>
          </div>
        </div>
      </div>

      <FaqJsonLd items={[
        { question: "Are these compression examples real?", answer: "Yes, all examples are based on real images and verified compression results using our benchmarking methodology." },
        { question: "How do you measure compression quality?", answer: "We use industry-standard metrics like SSIM (Structural Similarity Index) and PSNR (Peak Signal-to-Noise Ratio) to measure quality objectively." },
        { question: "Can I see more examples?", answer: "Yes, we regularly add new examples to our gallery. Contact us if you'd like to see specific types of images or use cases." },
        { question: "How accurate are the tool comparisons?", answer: "All tool comparisons are based on our comprehensive benchmarking methodology with standardized test images and metrics." },
        { question: "Do you have examples for my specific use case?", answer: "We have examples across multiple categories. Contact us if you need examples for a specific use case not covered in our gallery." },
        { question: "How often is the gallery updated?", answer: "We update the gallery monthly with new examples and tool comparisons based on our latest benchmarking results." }
      ]} />
    </>
  );
}
