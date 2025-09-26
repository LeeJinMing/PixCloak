import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Removed root redirect to allow indexable homepage
};

export default nextConfig;
