"use client";

import { Button, LogoLockup } from "@/shared/components";
import Link from "next/link";

interface PublicHeaderProps {
  isAuthed: boolean;
}

export function PublicHeader({ isAuthed }: PublicHeaderProps) {
  return (
    <header className="shrink-0 h-15 bg-surface border-b border-gray-200 px-4 md:px-6 flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <LogoLockup height={30} />
      </Link>

      {isAuthed ? (
        <Button theme="outline" size="l" href="/communities">
          Открыть приложение
        </Button>
      ) : (
        <Button theme="outline" size="l" href="/login">
          Войти
        </Button>
      )}
    </header>
  );
}
