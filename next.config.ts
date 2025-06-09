import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: new URL(process.env.NEXT_PUBLIC_API_URL).hostname },
    ],
  },
};

export default nextConfig;
