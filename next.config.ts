import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons/**",
      },
    ],
  },
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
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/settings',
        destination: '/settings/general',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
