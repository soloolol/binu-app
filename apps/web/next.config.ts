import type { NextConfig } from "next";
import path from "path";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL 환경변수가 설정되지 않았습니다.");
}

const nextConfig: NextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@ui": path.resolve(__dirname, "../../packages/ui"),
      "@": path.resolve(__dirname, "./src"),
    };
    return config;
  },
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
