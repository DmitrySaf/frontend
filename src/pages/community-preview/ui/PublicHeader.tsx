"use client";

import Image from "next/image";
import Link from "next/link";
import { useProfileQuery } from "@/entities/profile";
import { User } from "lucide-react";

export const PublicHeader = () => {
  const { data: profile, isLoading } = useProfileQuery();

  console.log(profile)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        </Link>

        <div className="flex items-center">
          {!isLoading && profile?.avatarUrl && (
            <Link href="/profile" className="relative size-9 overflow-hidden rounded-full">
              <Image
                src={profile.avatarUrl}
                alt={profile.displayName || "Profile"}
                fill
                className="object-cover"
              />
            </Link>
          )}
          {!isLoading && profile && !profile.avatarUrl && (
            <Link
              href="/profile"
              className="flex size-9 items-center justify-center rounded-full bg-gray-100"
            >
              <User className="size-5 text-gray-500" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
