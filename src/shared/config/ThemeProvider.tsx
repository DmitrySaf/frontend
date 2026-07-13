"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Провайдер темы (next-themes): переключает класс .dark на <html>.
 * attribute="class" — работает с @custom-variant dark в globals.css;
 * disableTransitionOnChange — без «протекания» transition при смене темы.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
