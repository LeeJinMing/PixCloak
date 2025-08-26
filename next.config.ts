import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [{ source: "/", destination: "/compress", permanent: true }];
  },
};

export default nextConfig;
