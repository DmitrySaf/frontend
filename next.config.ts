import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { dev }) => {
    // Ensure stagewise is only included in development builds
    if (!dev) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@stagewise/toolbar-next": false,
      };
    }
    return config;
  },
};

export default nextConfig;
