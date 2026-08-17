import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Fix workspace root detection when there's a lockfile in a parent directory
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "www.reality-proradost.cz", pathname: "/**" },
    ],
  },
};

export default nextConfig;
