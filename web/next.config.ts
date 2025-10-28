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
    ];
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
