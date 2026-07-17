import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вход — Bean",
  description: "Войдите или создайте аккаунт, чтобы открыть возможности для заработка.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
