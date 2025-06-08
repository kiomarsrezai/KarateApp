import "./src/env.js";

import type { NextConfig } from "next";
import { env } from "./src/env.js";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: new URL(env.NEXT_PUBLIC_API_URL).hostname },
    ],
  },
};

export default nextConfig;
