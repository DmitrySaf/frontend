"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronDown, LogOut, UserPlus } from "lucide-react";
import { Button, Dropdown, type DropdownItemConfig } from "@/shared/components";
import { cn } from "@/shared/utils";

interface CommunityBannerProps {
  name: string;
  description?: string;
  previewUrl?: string;
  logoUrl?: string;
  className?: string;
}

export default function CommunityBanner({
  name,
  description,
  previewUrl,
  logoUrl = "/lightbulb.svg",
  className,
}: CommunityBannerProps) {
  const handleInvite = () => {
    console.log("Invite to community");
  };

  const handleLeave = () => {
    console.log("Leave community");
  };

  const dropdownItems: (DropdownItemConfig | "separator")[] = [
    {
      icon: UserPlus,
      label: "Пригласить в сообщество",
      onClick: handleInvite,
    },
    {
      icon: LogOut,
      label: "Покинуть сообщество",
      onClick: handleLeave,
      variant: "danger",
    },
  ];

  // Variant with preview image
  if (previewUrl) {
    return (
      <div className={cn("relative h-40", className)}>
        {/* Preview Image */}
        <div className="absolute inset-0">
          <Image
            src={previewUrl}
            alt={name}
            fill
            className="object-cover"
          />
          {/* Darkening overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-1.5">
          <div className="flex items-end justify-between">
            <div className="flex items-center space-x-3">
              {/* Logo */}
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                🐼
                {/* <Image src={logoUrl} alt={name} width={28} height={28} /> */}
              </div>

              {/* Name & Description */}
              <div className="flex-1 min-w-0">
                <h1 className="font-bold text-white text-base truncate drop-shadow-md">
                  {name}
                </h1>
              </div>
            </div>

            {/* Dropdown */}
            <Dropdown
              trigger={
                <Button
                  theme="ghost"
                  size="s"
                  Icon={ChevronDown}
                  aria-label="Меню сообщества"
                />
              }
              items={dropdownItems}
              align="end"
            />
          </div>
        </div>
      </div>
    );
  }

  // Variant without preview (simple header)
  return (
    <div className={cn("h-15 bg-white border-b border-gray-200", className)}>
      <div className="h-full flex items-center justify-between px-1.5">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {/* Logo */}
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
            🐼
          {/* <Image src={logoUrl} alt={name} width={28} height={28} /> */}
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-gray-900 text-base truncate">{name}</h1>
          </div>
        </div>

        {/* Dropdown */}
        <Dropdown
          trigger={
            <Button
              theme="ghost"
              size="s"
              Icon={ChevronDown}
              aria-label="Меню сообщества"
            />
          }
          items={dropdownItems}
          align="end"
        />
      </div>
    </div>
  );
}
