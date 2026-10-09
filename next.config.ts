import type { NextConfig } from "next";

const API_URL = process.env.API_URL ?? "http://localhost:5000";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Browser calls to /api/content, /api/stats... are forwarded to the .NET Core API.
  // (app/api/admin/login is a real Next route and takes precedence.)
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${API_URL}/api/:path*` }];
  },
};

export default nextConfig;
