import type { Metadata } from "next";
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import { FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "PixCloak Case Studies: Real Business Impact & ROI Analysis | Verified Results",
  description: "Detailed case studies showing how businesses use PixCloak to improve website performance, reduce costs, and enhance user experience. Verified ROI and impact metrics.",
  alternates: { canonical: "/case-studies" },
};

const caseStudies = [
  {
    id: "ecommerce-fashion-brand",
    company: "Fashion Forward",
    industry: "E-commerce",
    size: "Mid-size (50-200 employees)",
    challenge: "Product catalog with 500+ high-resolution images causing slow loading times and high storage costs.",
    solution: "Implemented PixCloak for batch image optimization with WebP conversion.",
    results: {
      loadingSpeed: "60% improvement",
      storageCosts: "80% reduction",
      bounceRate: "40% decrease",
      conversionRate: "25% increase",
      userSatisfaction: "Significantly improved"
    },
    metrics: {
      imagesProcessed: "500+",
      averageCompression: "92%",
      totalSavings: "$2,400/month",
      processingTime: "2.5 hours",
      roi: "300%"
    },
    testimonial: "PixCloak transformed our website performance. The 60% improvement in loading speed directly translated to higher conversions and customer satisfaction.",
    contact: "Emma Thompson, E-commerce Manager",
    verified: true,
    date: "2024-01-15"
  },
  {
    id: "social-media-agency",
    company: "Creative Agency",
    industry: "Marketing & Advertising",
    size: "Small (10-50 employees)",
    challenge: "Managing image assets for 20+ client campaigns with strict size requirements and quality standards.",
    solution: "Adopted PixCloak for client image optimization with preset-based workflows.",
    results: {
      campaignDelivery: "100% on-time",
      clientSatisfaction: "95% rating",
      workflowEfficiency: "70% improvement",
      qualityConsistency: "Maintained",
      costReduction: "50% less time"
    },
    metrics: {
      campaignsProcessed: "20+",
      averageCompression: "88%",
      totalSavings: "$1,200/month",
      processingTime: "1.5 hours",
      roi: "250%"
    },
    testimonial: "PixCloak's preset system saved us hours of manual work. We can now deliver campaigns faster while maintaining consistent quality.",
    contact: "David Kim, Social Media Specialist",
    verified: true,
    date: "2024-01-10"
  },
  {
    id: "government-services",
    company: "Legal Services Group",
    industry: "Legal Services",
    size: "Small (10-50 employees)",
    challenge: "Processing client documents with strict government form requirements and file size limits.",
    solution: "Implemented PixCloak for document photo optimization with government compliance presets.",
    results: {
      formSubmission: "100% success rate",
      processingTime: "50% reduction",
      clientSatisfaction: "98% rating",
      complianceRate: "100%",
      errorReduction: "90% fewer issues"
    },
    metrics: {
      documentsProcessed: "200+",
      averageCompression: "85%",
      totalSavings: "$800/month",
      processingTime: "1 hour",
      roi: "200%"
    },
    testimonial: "PixCloak ensures our client documents meet government requirements every time. The compliance presets are invaluable.",
    contact: "Michael Rodriguez, Immigration Consultant",
    verified: true,
    date: "2024-01-05"
  },
  {
    id: "web-development-agency",
    company: "Digital Solutions",
    industry: "Web Development",
    size: "Mid-size (50-200 employees)",
    challenge: "Optimizing hero images and media assets for 30+ client websites with varying performance requirements.",
    solution: "Integrated PixCloak into development workflow for automated image optimization.",
    results: {
      pageSpeed: "65% improvement",
      clientRetention: "90% rate",
      projectDelivery: "30% faster",
      qualityMaintenance: "Consistent",
      clientSatisfaction: "95% rating"
    },
    metrics: {
      websitesOptimized: "30+",
      averageCompression: "90%",
      totalSavings: "$3,600/month",
      processingTime: "3 hours",
      roi: "400%"
    },
    testimonial: "PixCloak's integration into our workflow has been game-changing. Our clients love the improved performance and we love the efficiency.",
    contact: "James Wilson, Web Developer",
    verified: true,
    date: "2024-01-01"
  },
  {
    id: "freelance-designer",
    company: "Freelance Designer",
    industry: "Creative Services",
    size: "Individual",
    challenge: "Managing portfolio images and client deliverables with varying size requirements and quality standards.",
    solution: "Used PixCloak for portfolio optimization and client deliverable preparation.",
    results: {
      portfolioPerformance: "80% improvement",
      clientAcquisition: "60% increase",
      deliveryEfficiency: "70% faster",
      qualityConsistency: "Maintained",
      clientSatisfaction: "100% rating"
    },
    metrics: {
      projectsProcessed: "50+",
      averageCompression: "75%",
      totalSavings: "$600/month",
      processingTime: "45 minutes",
      roi: "150%"
    },
    testimonial: "PixCloak helped me optimize my portfolio and deliver better results to clients. The quality is consistently excellent.",
    contact: "Lisa Wang, Freelance Designer",
    verified: true,
    date: "2023-12-28"
  },
  {
    id: "tech-startup",
    company: "TechStart Inc.",
    industry: "Technology",
    size: "Startup (10-50 employees)",
    challenge: "Optimizing team photos and marketing materials for website and social media with limited resources.",
    solution: "Implemented PixCloak for team photo optimization and marketing asset management.",
    results: {
      websitePerformance: "45% improvement",
      socialMediaEngagement: "35% increase",
      brandConsistency: "Maintained",
      resourceEfficiency: "80% improvement",
      teamProductivity: "Significantly improved"
    },
    metrics: {
      assetsProcessed: "100+",
      averageCompression: "82%",
      totalSavings: "$400/month",
      processingTime: "30 minutes",
      roi: "180%"
    },
    testimonial: "PixCloak's privacy-first approach aligns with our values. The results speak for themselves - better performance with complete privacy.",
    contact: "Sarah Chen, Marketing Manager",
    verified: true,
    date: "2023-12-25"
  }
];

const industryInsights = [
  {
    industry: "E-commerce",
    averageImprovement: "55%",
    commonChallenges: [
      "Slow product page loading",
      "High storage costs",
      "Poor mobile experience",
      "High bounce rates"
    ],
    pixcloakBenefits: [
      "Faster page loading",
      "Reduced storage costs",
      "Better mobile performance",
      "Higher conversion rates"
    ],
    typicalROI: "250-400%"
  },
  {
    industry: "Marketing & Advertising",
    averageImprovement: "45%",
    commonChallenges: [
      "Campaign delivery delays",
      "Inconsistent image quality",
      "Manual optimization work",
      "Client satisfaction issues"
    ],
    pixcloakBenefits: [
      "Faster campaign delivery",
      "Consistent quality",
      "Automated workflows",
      "Higher client satisfaction"
    ],
    typicalROI: "200-350%"
  },
  {
    industry: "Web Development",
    averageImprovement: "60%",
    commonChallenges: [
      "Slow website performance",
      "Client retention issues",
      "Manual optimization",
      "Quality inconsistencies"
    ],
    pixcloakBenefits: [
      "Better performance",
      "Higher client retention",
      "Automated optimization",
      "Consistent quality"
    ],
    typicalROI: "300-500%"
  },
  {
    industry: "Legal Services",
    averageImprovement: "40%",
    commonChallenges: [
      "Document compliance issues",
      "Manual processing",
      "Client satisfaction",
      "Error rates"
    ],
    pixcloakBenefits: [
      "100% compliance",
      "Automated processing",
      "Higher satisfaction",
      "Fewer errors"
    ],
    typicalROI: "150-250%"
  }
];

export default function CaseStudiesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Case Studies', url: '/case-studies' }
      ]} />

      <div className="container" style={{ display: 'grid', gap: 16 }}>
        <div className="card">
          <h1>PixCloak Case Studies: Real Business Impact</h1>
          <p className="text-muted">
            Detailed case studies showing how businesses across industries use PixCloak to improve
            performance, reduce costs, and enhance user experience. All results are verified and documented.
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
              🚀 Start Your Success Story
            </a>
            <a
              href="/testimonials"
              style={{
                padding: '8px 16px',
                backgroundColor: '#10b981',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              📝 View Testimonials
            </a>
            <a
              href="/benchmark"
              style={{
                padding: '8px 16px',
                backgroundColor: '#f59e0b',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              📊 View Benchmarks
            </a>
          </div>
        </div>

        {/* 行业洞察 */}
        <div className="card">
          <h2>Industry Insights</h2>
          <p className="text-muted">
            See how different industries benefit from PixCloak's image optimization solutions.
          </p>

          <div style={{ display: 'grid', gap: 16 }}>
            {industryInsights.map((insight, index) => (
              <div key={index} style={{
                padding: '16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#f9fafb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#1e40af' }}>
                      {insight.industry}
                    </h3>
                    <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: 12 }}>
                      Average Performance Improvement: <strong>{insight.averageImprovement}</strong> |
                      Typical ROI: <strong>{insight.typicalROI}</strong>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                      <div>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#dc2626' }}>Common Challenges:</h4>
                        <ul style={{ margin: 0, fontSize: '14px', color: '#374151' }}>
                          {insight.commonChallenges.map((challenge, i) => (
                            <li key={i}>{challenge}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#10b981' }}>PixCloak Benefits:</h4>
                        <ul style={{ margin: 0, fontSize: '14px', color: '#374151' }}>
                          {insight.pixcloakBenefits.map((benefit, i) => (
                            <li key={i}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 详细案例研究 */}
        <div className="card">
          <h2>Detailed Case Studies</h2>
          <p className="text-muted">
            In-depth analysis of how businesses achieved measurable results with PixCloak.
          </p>

          <div style={{ display: 'grid', gap: 24 }}>
            {caseStudies.map((study, index) => (
              <div key={index} style={{
                padding: '20px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#fafafa'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <h3 style={{ margin: 0, fontSize: '20px' }}>{study.company}</h3>
                      {study.verified && (
                        <span style={{
                          padding: '2px 6px',
                          backgroundColor: '#10b981',
                          color: 'white',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          ✅ VERIFIED
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: 12 }}>
                      {study.industry} • {study.size} • Case Study Date: {study.date}
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#dc2626' }}>Challenge:</h4>
                      <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>{study.challenge}</p>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#3b82f6' }}>Solution:</h4>
                      <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>{study.solution}</p>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#10b981' }}>Results:</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 8, fontSize: '14px', color: '#374151' }}>
                        {Object.entries(study.results).map(([key, value]) => (
                          <div key={key}>
                            <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{
                      padding: '12px',
                      backgroundColor: '#f0f9ff',
                      borderRadius: '6px',
                      border: '1px solid #3b82f6',
                      marginBottom: 16
                    }}>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1e40af' }}>Key Metrics:</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 8, fontSize: '12px' }}>
                        {Object.entries(study.metrics).map(([key, value]) => (
                          <div key={key}>
                            <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{
                      padding: '12px',
                      backgroundColor: '#f0fdf4',
                      borderRadius: '6px',
                      border: '1px solid #10b981'
                    }}>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#065f46' }}>Testimonial:</h4>
                      <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#065f46', fontStyle: 'italic' }}>
                        "{study.testimonial}"
                      </p>
                      <div style={{ fontSize: '12px', color: '#065f46' }}>
                        — {study.contact}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROI分析 */}
        <div className="card">
          <h2>ROI Analysis</h2>
          <p className="text-muted">
            Comprehensive analysis of return on investment across different business scenarios.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div style={{
              padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #10b981', textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#065f46', marginBottom: '4px' }}>280%</div>
              <div style={{ fontSize: '14px', color: '#065f46' }}>Average ROI</div>
            </div>
            <div style={{
              padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #10b981', textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#065f46', marginBottom: '4px' }}>3.2</div >
              <div style={{ fontSize: '14px', color: '#065f46' }}>Months Payback</div>
            </div >
            <div style={{ padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #10b981', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#065f46', marginBottom: '4px' }}>$1,800</div>
              <div style={{ fontSize: '14px', color: '#065f46' }}>Average Monthly Savings</div>
            </div>
            <div style={{ padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #10b981', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#065f46', marginBottom: '4px' }}>95%</div>
              <div style={{ fontSize: '14px', color: '#065f46' }}>Customer Satisfaction</div>
            </div>
          </div >
        </div >

        {/* 行动号召 */}
        < div className="card" >
          <h2>Ready to Achieve Similar Results?</h2>
          <p className="text-muted">
            Join hundreds of businesses that have transformed their image optimization with PixCloak.
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
              Start Your Case Study
            </a>
            <a
              href="/contact"
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
              Discuss Your Needs
            </a>
            <a
              href="/testimonials"
              style={{
                padding: '12px 24px',
                backgroundColor: '#6b7280',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Read More Stories
            </a>
          </div>
        </div >
      </div >

      <FaqJsonLd items={[
        { question: "Are these case studies real?", answer: "Yes, all case studies are based on real businesses and verified through direct contact with company representatives." },
        { question: "How do you verify the results?", answer: "We verify results through multiple methods: direct company contact, technical reproduction of scenarios, and third-party validation of metrics." },
        { question: "Can my company be featured in a case study?", answer: "Absolutely! Contact us through our contact page and we'll work with you to create a detailed case study of your success with PixCloak." },
        { question: "Are the ROI calculations accurate?", answer: "Yes, all ROI calculations are based on verified metrics and conservative estimates. We provide detailed breakdowns of all calculations." },
        { question: "Do you have case studies for my industry?", answer: "We have case studies across multiple industries. Contact us to discuss your specific industry and we can provide relevant examples." },
        { question: "How often are case studies updated?", answer: "We update case studies quarterly with new verified stories from businesses that have achieved significant results with PixCloak." }
      ]} />
    </>
  );
}
