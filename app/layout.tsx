import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/shared/components";
import { QueryProvider } from "@/shared/config";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
// import { StagewiseToolbar } from "@stagewise/toolbar-next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const stagewiseConfig = {
  plugins: [],
};

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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NuqsAdapter>
          <QueryProvider>
            {children}
            <Toaster />
            {/* {process.env.NODE_ENV === "development" && <StagewiseToolbar config={stagewiseConfig} />} */}
          </QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
