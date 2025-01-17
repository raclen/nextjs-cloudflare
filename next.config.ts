import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 跳过 ESLint 检查
  },
  /* config options here */
};

export default nextConfig;
