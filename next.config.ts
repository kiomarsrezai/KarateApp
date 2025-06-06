import "./src/env.js";

import type { NextConfig } from "next";
import { env } from "./src/env.js";

const nextConfig: NextConfig = {
  /* config options here */
  images: { remotePatterns: [{ hostname: "images.unsplash.com" }] },
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: `${env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
