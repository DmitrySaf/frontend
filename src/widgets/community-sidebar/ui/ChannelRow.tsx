"use client";

import Link from "next/link";
import { CHANNEL_TYPE_META, type Channel } from "@/entities/channel";
import { cn } from "@/shared/utils";

interface ChannelRowProps {
  channel: Channel;
  communitySlug: string;
  isActive: boolean;
}

export default function ChannelRow({ channel, communitySlug, isActive }: ChannelRowProps) {
  const Icon = CHANNEL_TYPE_META[channel.type].icon;

  return (
    <Link
      href={`/communities/${communitySlug}/${channel.slug}`}
      className={cn(
        "flex items-center gap-2 px-2.5 py-[7px] rounded-[9px] transition-colors",
        isActive
          ? "bg-[#D3D3D340] inset-ring inset-ring-[#D3D3D3]"
          : "hover:bg-[#D3D3D325]"
      )}
    >
      <Icon
        className={cn("size-[17px] shrink-0", isActive ? "text-black" : "text-gray-500")}
      />
      <span
        className={cn(
          "flex-1 min-w-0 truncate text-sm",
          isActive ? "font-semibold text-black" : "font-medium text-gray-600"
        )}
      >
        {channel.name}
      </span>
    </Link>
  );
}
