import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Корень Turbopack: в домашней директории есть посторонний package-lock.json,
  // из-за которого Turbopack иначе выбирает неверный root (см. build-warning Next 16)
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/settings",
        destination: "/settings/profile",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
