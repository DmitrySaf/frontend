"use client";

import { Button } from "@/shared/components";
import { cn } from "@/shared/utils";
import { Settings, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProfileButton() {
  // Моки данных
  const profile = {
    avatarUrl: "/logo.svg",
    username: "@super_admin",
    displayName: "Super Admin",
  };

  return (
    <div
      className="relative overflow-visible"
    >
      <div
        className="bg-white rounded-[18px] ring ring-gray flex items-center overflow-hidden transition-all duration-300 ease-out w-15 group hover:w-[300px] h-15 hover:shadow-md p-1 gap-1.5"
      >
        {/* Аватар + Username/DisplayName - общий hover блок */}
        <div
          className="flex items-center min-w-0 flex-1 cursor-pointer transition-colors rounded-xl hover:bg-gray-hover p-1"
        >
          {/* Аватар */}
          <div className="flex-shrink-0">
            <div className="w-11 h-11 rounded-full overflow-hidden">
              <Image
                src={profile.avatarUrl}
                alt={profile.displayName}
                width={44}
                height={44}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Username и DisplayName */}
          <div
            className="flex flex-col min-w-0 flex-1 px-2 transition-opacity duration-300 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
          >
            <span className="text-sm font-semibold text-gray-900 truncate">
              {profile.displayName}
            </span>
            <span className="text-xs text-gray-500 truncate">
              {profile.username}
            </span>
          </div>
        </div>

        {/* Иконки справа */}
        <div
          className="flex items-center gap-1 flex-shrink-0 opacity-0 transition-opacity duration-0 pr-0.5 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-hover:delay-100"
        >
          <Button
            theme="ghost"
            size="l"
            Icon={MoreHorizontal}
          />

          <Button
            theme="ghost"
            size="l"
            Icon={Settings}
          />
        </div>
      </div>
    </div>
  );
}

