"use client";

import { Button } from "@/shared/components";
import Image from "next/image";
import Link from "next/link";

interface PublicHeaderProps {
  isAuthed: boolean;
}

export function PublicHeader({ isAuthed }: PublicHeaderProps) {
  return (
    <header className="shrink-0 h-15 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2.5">
        <Image src="/logo.svg" alt="Bean" width={32} height={32} />
        <span className="text-lg font-bold tracking-[-0.02em] text-black">Bean</span>
      </Link>

      {isAuthed ? (
        <Button theme="outline" size="m" href="/communities">
          Открыть приложение
        </Button>
      ) : (
        <Button theme="outline" size="m" href="/login">
          Войти
        </Button>
      )}
    </header>
  );
}
