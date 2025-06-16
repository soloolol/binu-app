import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@ui": path.resolve(__dirname, "../../packages/ui"),
      "@": path.resolve(__dirname, "./src"),
    };
    return config;
  },
  devIndicators: false,
};

export default nextConfig;
