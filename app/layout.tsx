import type { Metadata } from "next";
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
