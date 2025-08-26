import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      // 明确当前项目作为 turbopack 根目录，避免多 lockfile 警告
      root: __dirname,
    },
  },
};

export default nextConfig;
