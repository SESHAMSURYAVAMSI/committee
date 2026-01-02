import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.aoicon2026kolkata.com",
        pathname: "/assets/images/**",
      },
    ],
  },
};

export default nextConfig;
