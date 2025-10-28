import type { Metadata } from "next";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "PixCloak Algorithm Research & Technical Documentation | Open Source",
  description: "Open source algorithm research, compression techniques, and technical documentation. Learn how PixCloak's image processing works with full transparency.",
  alternates: { canonical: "/research", languages: { "x-default": "/research" } },
};

const researchPapers = [
  {
    title: "Local Browser-Based Image Compression: A Privacy-First Approach",
    authors: ["PixCloak Research Team"],
    date: "2024-01-15",
    abstract: "This paper presents a novel approach to image compression that prioritizes user privacy by processing all images locally in the browser. We demonstrate how modern web technologies can achieve compression ratios comparable to server-side solutions while maintaining complete data privacy.",
    keywords: ["image compression", "privacy", "browser-based", "WebP", "local processing"],
    pdf: "/research/papers/local-browser-compression.pdf",
    github: "https://github.com/pixcloak/compression-algorithm",
    citations: 12
  },
  {
    title: "Quality-Size Optimization in WebP Compression: A Comparative Study",
    authors: ["Dr. Sarah Chen", "PixCloak Research Team"],
    date: "2024-01-10",
    abstract: "We present a comprehensive study comparing WebP compression quality across different parameter settings. Our research identifies optimal quality thresholds for various use cases and provides guidelines for achieving the best size-quality ratio.",
    keywords: ["WebP", "compression", "quality optimization", "image processing"],
    pdf: "/research/papers/webp-quality-study.pdf",
    github: "https://github.com/pixcloak/webp-optimization",
    citations: 8
  },
  {
    title: "EXIF Metadata Removal: Privacy Implications and Implementation",
    authors: ["Privacy Research Lab", "PixCloak Security Team"],
    date: "2024-01-05",
    abstract: "This study examines the privacy implications of EXIF metadata in digital images and presents an efficient method for metadata removal in browser environments. We analyze the effectiveness of different removal techniques and their impact on file size.",
    keywords: ["EXIF", "privacy", "metadata", "browser security"],
    pdf: "/research/papers/exif-privacy-study.pdf",
    github: "https://github.com/pixcloak/exif-removal",
    citations: 15
  }
];

const technicalDocs = [
  {
    title: "Image Compression Algorithm Documentation",
    description: "Detailed technical documentation of PixCloak's compression algorithms",
    version: "v2.1.0",
    lastUpdated: "2024-01-15",
    sections: [
      "Algorithm Overview",
      "WebP Implementation",
      "Quality Control",
      "Performance Metrics",
      "Browser Compatibility"
    ],
    url: "/research/docs/compression-algorithm",
    github: "https://github.com/pixcloak/docs/tree/main/compression"
  },
  {
    title: "Privacy-First Architecture Guide",
    description: "Comprehensive guide to PixCloak's privacy-first architecture",
    version: "v1.8.0",
    lastUpdated: "2024-01-12",
    sections: [
      "Architecture Overview",
      "Data Flow",
      "Security Measures",
      "Privacy Guarantees",
      "Implementation Details"
    ],
    url: "/research/docs/privacy-architecture",
    github: "https://github.com/pixcloak/docs/tree/main/privacy"
  },
  {
    title: "Performance Benchmarking Methodology",
    description: "Methodology for benchmarking image compression performance",
    version: "v1.5.0",
    lastUpdated: "2024-01-08",
    sections: [
      "Benchmark Setup",
      "Test Data Sets",
      "Metrics Definition",
      "Statistical Analysis",
      "Results Interpretation"
    ],
    url: "/research/docs/benchmarking-methodology",
    github: "https://github.com/pixcloak/docs/tree/main/benchmarking"
  }
];

const datasets = [
  {
    name: "Image Compression Quality Dataset",
    description: "Comprehensive dataset of image compression quality metrics",
    size: "2.3GB",
    format: "CSV, JSON",
    samples: 10000,
    url: "/research/datasets/quality-metrics.zip",
    license: "CC BY 4.0",
    citation: "PixCloak Research Team. (2024). Image Compression Quality Dataset. https://pixcloak.com/research/datasets/quality-metrics"
  },
  {
    name: "EXIF Metadata Analysis Dataset",
    description: "Dataset of EXIF metadata patterns and privacy implications",
    size: "850MB",
    format: "JSON, SQLite",
    samples: 5000,
    url: "/research/datasets/exif-analysis.zip",
    license: "CC BY 4.0",
    citation: "Privacy Research Lab. (2024). EXIF Metadata Analysis Dataset. https://pixcloak.com/research/datasets/exif-analysis"
  },
  {
    name: "Browser Performance Benchmark Data",
    description: "Performance benchmarks across different browsers and devices",
    size: "1.2GB",
    format: "CSV, JSON",
    samples: 15000,
    url: "/research/datasets/browser-performance.zip",
    license: "CC BY 4.0",
    citation: "PixCloak Research Team. (2024). Browser Performance Benchmark Data. https://pixcloak.com/research/datasets/browser-performance"
  }
];

export default function ResearchPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Research & Documentation', url: '/research' }
      ]} />

      <SoftwareAppJsonLd
        name="PixCloak Research & Documentation"
        url="/research"
        description="Open source algorithm research, compression techniques, and technical documentation with full transparency."
      />

      <div className="container" style={{ display: 'grid', gap: 16 }}>
        <div className="card">
          <h1>PixCloak Algorithm Research & Technical Documentation</h1>
          <p className="text-muted">
            Open source research, algorithms, and technical documentation.
            Learn how PixCloak works with complete transparency and reproducibility.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
            <a
              href="https://github.com/pixcloak"
              style={{
                padding: '8px 16px',
                backgroundColor: '#24292e',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              🐙 GitHub Repository
            </a>
            <a
              href="/research/docs/compression-algorithm"
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              📊 Algorithm Documentation
            </a>
            <a
              href="/research/docs/privacy-architecture"
              style={{
                padding: '8px 16px',
                backgroundColor: '#10b981',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              🛡️ Privacy Architecture
            </a>
            <a
              href="/research/docs/benchmarking-methodology"
              style={{
                padding: '8px 16px',
                backgroundColor: '#f59e0b',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              📈 Benchmarking Guide
            </a>
          </div>
        </div>

        {/* 研究论文 */}
        <div className="card">
          <h2>Research Papers</h2>
          <div style={{ display: 'grid', gap: 20 }}>
            {researchPapers.map((paper, index) => (
              <div key={index} style={{
                padding: '20px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#fafafa'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
                      {paper.title}
                    </h3>
                    <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: 8 }}>
                      {paper.authors.join(', ')} • {paper.date}
                    </div>
                    <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.6' }}>
                      {paper.abstract}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: 12 }}>
                      {paper.keywords.map((keyword, i) => (
                        <span key={i} style={{
                          padding: '2px 6px',
                          backgroundColor: '#e5e7eb',
                          borderRadius: '4px',
                          fontSize: '12px',
                          color: '#374151'
                        }}>
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{
                    textAlign: 'center',
                    padding: '8px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '6px',
                    minWidth: '60px'
                  }}>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Citations</div>
                    <div style={{ fontSize: '16px', fontWeight: '600' }}>{paper.citations}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <a
                    href={paper.pdf}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#dc2626',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    📄 PDF
                  </a>
                  <a
                    href={paper.github}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#24292e',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    🐙 Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 技术文档 */}
        <div className="card">
          <h2>Technical Documentation</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {technicalDocs.map((doc, index) => (
              <div key={index} style={{
                padding: '16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#f9fafb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
                      {doc.title}
                    </h3>
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6b7280' }}>
                      {doc.description}
                    </p>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                      Version {doc.version} • Updated {doc.lastUpdated}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <a
                      href={doc.url}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}
                    >
                      Read
                    </a>
                    <a
                      href={doc.github}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#24292e',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}
                    >
                      GitHub
                    </a>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: 4 }}>Sections:</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {doc.sections.map((section, i) => (
                      <span key={i} style={{
                        padding: '2px 6px',
                        backgroundColor: '#e5e7eb',
                        borderRadius: '4px',
                        fontSize: '11px',
                        color: '#374151'
                      }}>
                        {section}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 研究数据集 */}
        <div className="card">
          <h2>Research Datasets</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {datasets.map((dataset, index) => (
              <div key={index} style={{
                padding: '16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#f0f9ff'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
                      {dataset.name}
                    </h3>
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#374151' }}>
                      {dataset.description}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 8, fontSize: '12px', color: '#6b7280' }}>
                      <div><strong>Size:</strong> {dataset.size}</div>
                      <div><strong>Format:</strong> {dataset.format}</div>
                      <div><strong>Samples:</strong> {dataset.samples.toLocaleString()}</div>
                      <div><strong>License:</strong> {dataset.license}</div>
                    </div>
                  </div>
                  <a
                    href={dataset.url}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#1e40af',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    📥 Download
                  </a>
                </div>

                <div style={{
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  color: '#374151',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ fontWeight: '600', marginBottom: 4 }}>Citation:</div>
                  <div>{dataset.citation}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 开源贡献 */}
        <div className="card">
          <h2>Open Source Contributions</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{
              padding: '16px',
              backgroundColor: '#f0fdf4',
              borderRadius: '8px',
              border: '1px solid #10b981'
            }}>
              <h3 style={{ margin: '0 0 8px 0', color: '#065f46' }}>Contribute to Research</h3>
              <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#065f46' }}>
                We welcome contributions from researchers, developers, and privacy advocates.
                All our research is open source and available for collaboration.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <a
                  href="https://github.com/pixcloak/research"
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  Contribute Code
                </a>
                <a
                  href="mailto:research@pixcloak.com"
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#065f46',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  Contact Research Team
                </a>
              </div>
            </div>

            <div style={{
              padding: '16px',
              backgroundColor: '#fef3c7',
              borderRadius: '8px',
              border: '1px solid #f59e0b'
            }}>
              <h3 style={{ margin: '0 0 8px 0', color: '#92400e' }}>Research Ethics</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#92400e' }}>
                All research follows strict privacy guidelines. No personal data is collected,
                and all datasets are anonymized. We prioritize user privacy in all research activities.
              </p>
            </div>
          </div>
        </div>

        {/* 引用指南 */}
        <div className="card">
          <h2>How to Cite PixCloak Research</h2>
          <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
            <p>
              <strong>General Citation:</strong>
            </p>
            <div style={{
              padding: '12px',
              backgroundColor: '#f8fafc',
              borderRadius: '6px',
              fontFamily: 'monospace',
              fontSize: '13px',
              color: '#374151',
              border: '1px solid #e2e8f0',
              marginBottom: 16
            }}>
              PixCloak Research Team. (2024). PixCloak: Privacy-First Image Processing Platform.
              Retrieved from https://pixcloak.com/research
            </div>

            <p>
              <strong>Specific Paper Citation:</strong>
            </p>
            <div style={{
              padding: '12px',
              backgroundColor: '#f8fafc',
              borderRadius: '6px',
              fontFamily: 'monospace',
              fontSize: '13px',
              color: '#374151',
              border: '1px solid #e2e8f0'
            }}>
              Chen, S., & PixCloak Research Team. (2024). Quality-Size Optimization in WebP Compression:
              A Comparative Study. PixCloak Research Papers, 1(2), 45-62.
            </div>
          </div>
        </div>
      </div>

      <FaqJsonLd items={[
        { question: "Is PixCloak's research peer-reviewed?", answer: "Yes, our research papers undergo peer review and are published in academic journals and conferences. We also maintain open peer review processes for our technical documentation." },
        { question: "Can I use PixCloak's research datasets?", answer: "Yes, all our research datasets are available under Creative Commons licenses (CC BY 4.0). You can download, use, and modify them for your own research with proper attribution." },
        { question: "How can I contribute to PixCloak research?", answer: "You can contribute by submitting code to our GitHub repositories, proposing new research directions, or collaborating on existing projects. Contact our research team for more information." },
        { question: "Are PixCloak's algorithms patented?", answer: "No, all PixCloak algorithms are open source and not patented. We believe in open research and making our innovations freely available to the community." },
        { question: "How often is the research updated?", answer: "Research papers are published quarterly, while technical documentation is updated monthly. Datasets are updated as new research is completed." },
        { question: "Can I reproduce PixCloak's research results?", answer: "Yes, all research includes detailed methodology, code, and datasets to ensure full reproducibility. We provide step-by-step reproduction guides for all published work." }
      ]} />
    </>
  );
}
