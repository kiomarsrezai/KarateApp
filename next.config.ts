import type { NextConfig } from "next";

console.log({ env: process.env.NEXT_PUBLIC_API_URL });
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "**" }],
  },
};

export default nextConfig;
