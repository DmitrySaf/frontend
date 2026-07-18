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
  // Редирект /settings → /settings/profile удалён (этап 17.7): на мобиле корень
  // настроек — экран-список (iOS-паттерн), десктоп редиректит клиентски.
};

export default nextConfig;
