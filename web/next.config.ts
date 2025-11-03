import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    const isProd = process.env.NODE_ENV === "production";
    return [
      {
        source: "/:path*",
        headers: [
          // Security headers
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          { key: "X-XSS-Protection", value: "0" },
          // CSP: restrict to self + explicitly used hosts
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://va.vercel-scripts.com https://vercel.live",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://pagead2.googlesyndication.com",
              "font-src 'self' data:",
              "connect-src 'self' https://va.vercel-scripts.com",
              "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
            ].join("; "),
          },
          // Only set HSTS on production and HTTPS
          ...(isProd
            ? [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload",
                },
              ]
            : []),
          // Limit CORS: only allow same-origin by default
          { key: "Access-Control-Allow-Origin", value: "https://pixcloak.com" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Fix crawler 404 at /insights/script.js by pointing to Vercel insights
      {
        source: "/insights/script.js",
        destination: "https://va.vercel-scripts.com/v1/script.debug.js",
        permanent: false,
      },
      // Repair reported 400-499 pages to valid equivalents (SEO-friendly 301)
      { source: "/tools/png-to-jpg", destination: "/tools/png-jpg-converter", permanent: true },
      { source: "/tools/crop-image", destination: "/tools/resize-image", permanent: true },

      { source: "/guides/compress-to-100kb", destination: "/guides/compress-image-to-100kb", permanent: true },
      { source: "/guides/jpeg-vs-webp-for-websites", destination: "/guides/jpeg-vs-webp-size-quality", permanent: true },

      { source: "/guides/long-tail/job-application-500kb", destination: "/guides/prepare-images-for-job-application", permanent: true },
      { source: "/guides/long-tail/resume-200kb", destination: "/guides/compress-to-200kb", permanent: true },
      { source: "/guides/long-tail/gov-portal-200kb-cn", destination: "/guides/compress-to-target-kb-zh", permanent: true },
      { source: "/guides/long-tail/youtube-thumbnail-200kb", destination: "/guides/compress-to-200kb", permanent: true },
      { source: "/guides/long-tail/passport-scan-redact", destination: "/guides/redaction-checklist", permanent: true },
      { source: "/guides/long-tail/instagram-story-1080x1920", destination: "/guides/how-to-resize-images-for-instagram", permanent: true },
    ];
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
