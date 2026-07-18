import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/shared/components";
import { QueryProvider, ThemeProvider } from "@/shared/config";
import { NuqsAdapter } from "nuqs/adapters/next/app";

// Шрифты самохостятся через @font-face в globals.css (public/fonts/*.woff2):
// next/font/google не работал — сеть окружения флапает, Google Fonts не скачивался,
// а @theme плодил хрупкую индирекцию var(--font-sans)→var(--font-onest).

export const metadata: Metadata = {
  title: "Bean",
  description: "Платформа для авторов: платные сообщества, курсы и посты",
};

// viewport-fit=cover: страница заходит под чёлку/home-индикатор iPhone,
// отступы возвращают safe-area-утилиты (pb-safe-* и др. в globals.css) —
// без cover env(safe-area-inset-*) всегда нулевые и утилиты мертвы.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <NuqsAdapter>
            <QueryProvider>
              {children}
              <Toaster />
            </QueryProvider>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
