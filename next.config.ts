import type { NextConfig } from "next";
import { env } from "./env";


const backendUrl = process.env.NEXT_PUBLIC_API_URL || env.BACKEND_BASE_URL

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${backendUrl}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
