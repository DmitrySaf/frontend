"use client";

import { CHANNEL_TYPE_META, type Channel } from "@/entities/channel";
import { Dropdown, type DropdownItemConfig } from "@/shared/components";
import { cn } from "@/shared/utils";
import { Link2, Lock, MoreHorizontal, Settings2, Trash2 } from "lucide-react";
import Link from "next/link";

interface ChannelRowProps {
  channel: Channel;
  communitySlug: string;
  isActive: boolean;
  /** Участник без гранта на private-канал — замок, клик ведёт на экран «нужен доступ» */
  isLockedForViewer: boolean;
  isAdmin: boolean;
  onOpenSettings: () => void;
  onOpenInvite: () => void;
  onDelete: () => void;
}

export default function ChannelRow({
  channel,
  communitySlug,
  isActive,
  isLockedForViewer,
  isAdmin,
  onOpenSettings,
  onOpenInvite,
  onDelete,
}: ChannelRowProps) {
  const Icon = CHANNEL_TYPE_META[channel.type].icon;

  const adminItems: DropdownItemConfig[] = [
    { icon: Settings2, label: "Настройки таба", onClick: onOpenSettings },
    ...(channel.access !== "open"
      ? [{ icon: Link2, label: "Ссылка-приглашение", onClick: onOpenInvite }]
      : []),
    { icon: Trash2, label: "Удалить таб", onClick: onDelete, variant: "danger" as const },
  ];

  return (
    <div className="group relative">
      <Link
        href={`/communities/${communitySlug}/${channel.slug}`}
        className={cn(
          "flex items-center gap-2 px-2.5 py-[7px] rounded-[9px] transition-colors",
          isActive ? "bg-[#D3D3D340] inset-ring inset-ring-[#D3D3D3]" : "hover:bg-[#D3D3D325]",
          isLockedForViewer && "opacity-70"
        )}
      >
        <Icon className={cn("size-[17px] shrink-0", isActive ? "text-black" : "text-gray-500")} />
        <span
          className={cn(
            "flex-1 min-w-0 truncate text-sm",
            isActive ? "font-semibold text-black" : "font-medium text-gray-600"
          )}
        >
          {channel.name}
        </span>
        {(isLockedForViewer || (isAdmin && channel.access !== "open")) && (
          <Lock className="size-3 shrink-0 text-gray-500" />
        )}
      </Link>

      {isAdmin && (
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Dropdown
            trigger={
              <button
                type="button"
                aria-label="Действия с табом"
                className="size-6 flex items-center justify-center rounded-md bg-white border border-gray-200 shadow-sm text-gray-500 hover:text-black cursor-pointer"
              >
                <MoreHorizontal className="size-3.5" />
              </button>
            }
            items={adminItems}
            align="start"
          />
        </div>
      )}
    </div>
  );
}
