import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-gallery-domain.com', // Replace with your actual gallery/image domain
      },
    ],
  },
};

export default nextConfig;