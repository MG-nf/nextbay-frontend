import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      '@/components': './components', // adjust path as needed
      '@/lib': './lib',
    },
  },
};

export default nextConfig;
