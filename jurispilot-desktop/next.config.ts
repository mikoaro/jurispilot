import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export',
  // output: process.env.BUILD_STANDALONE === "true" ? "standalone" : "export",
  output: 'standalone',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
        port: "",
        pathname: "/image**",
      },
    ],
  },
  experimental: {
    ppr: false,
  },
};

export default nextConfig;
