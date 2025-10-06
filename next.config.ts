import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
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
