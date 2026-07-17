"use client";

import {
  Avatar,
  Button,
  Dropdown,
  type DropdownItemConfig,
  type DropdownNoteConfig,
} from "@/shared/components";
import { cn } from "@/shared/utils";
import {
  ChevronDown,
  Eye,
  LayoutDashboard,
  LogOut,
  Palette,
  Settings,
  UserPlus,
} from "lucide-react";

interface CommunityBannerProps {
  /** Slug сообщества — для href админ-разделов */
  slug: string;
  name: string;
  coverUrl?: string | null;
  logoUrl?: string | null;
  isAdmin: boolean;
  /** Фактическая роль позволяет модерировать (для пункта «Смотреть как») */
  canModerate: boolean;
  isViewingAsMember: boolean;
  onToggleViewAsMember: () => void;
  onInvite: () => void;
  onLeave: () => void;
  /** Владелец не может покинуть сообщество — пункт скрыт */
  canLeave: boolean;
  className?: string;
}

export default function CommunityBanner({
  slug,
  name,
  coverUrl,
  logoUrl,
  isAdmin,
  canModerate,
  isViewingAsMember,
  onToggleViewAsMember,
  onInvite,
  onLeave,
  canLeave,
  className,
}: CommunityBannerProps) {
  const adminItems: (DropdownItemConfig | DropdownNoteConfig | "separator")[] = isAdmin
    ? [
        { note: "только для админа" },
        {
          icon: Settings,
          label: "Настройки сообщества",
          href: `/communities/${slug}/admin/settings`,
        },
        { icon: Palette, label: "Внешний вид", href: `/communities/${slug}/admin/appearance` },
        { icon: LayoutDashboard, label: "Дашборд", href: `/communities/${slug}/admin/dashboard` },
        "separator",
      ]
    : [];

  const memberItems: (DropdownItemConfig | "separator")[] = [
    // Постоянная админ-фича: предпросмотр интерфейса глазами участника
    ...(canModerate
      ? [
          {
            icon: Eye,
            label: isViewingAsMember ? "Вернуться к виду владельца" : "Смотреть как участник",
            onClick: onToggleViewAsMember,
          },
          "separator" as const,
        ]
      : []),
    { icon: UserPlus, label: "Пригласить в сообщество", onClick: onInvite },
    ...(canLeave
      ? [
          {
            icon: LogOut,
            label: "Покинуть сообщество",
            onClick: onLeave,
            variant: "danger" as const,
          },
        ]
      : []),
  ];

  const menu = (
    <Dropdown
      trigger={
        <Button
          theme="ghost"
          size="m"
          Icon={ChevronDown}
          aria-label="Меню сообщества"
          className="[&_svg]:transition-transform [&_svg]:duration-200 [&_svg]:ease-out-quart [&[data-state=open]_svg]:rotate-180"
        />
      }
      items={[...adminItems, ...memberItems]}
      align="end"
      className="w-60"
    />
  );

  // Вариант с обложкой: 132px фото + затемнение
  if (coverUrl) {
    return (
      <div className={cn("relative h-[132px] shrink-0 border-b border-gray-200", className)}>
        {/* Обложка может быть dataURL из мок-хранилища — next/image их не поддерживает */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={coverUrl} alt={name} className="absolute inset-0 size-full object-cover" />
        {/* Градиентный скрим: затемнение сильнее у текста, фото дышит сверху */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/10" />

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <Avatar name={name} src={logoUrl} size="m" shape="square" />
            <span className="text-sm font-bold text-white truncate drop-shadow-md">{name}</span>
          </div>
          <div className="shrink-0 rounded-[10px] bg-surface">{menu}</div>
        </div>
      </div>
    );
  }

  // Плоский вариант без обложки
  return (
    <div className={cn("h-15 shrink-0 border-b border-gray-200", className)}>
      <div className="h-full flex items-center justify-between gap-2 px-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <Avatar name={name} src={logoUrl} size="m" shape="square" />
          <span className="text-sm font-bold text-ink truncate">{name}</span>
        </div>
        {menu}
      </div>
    </div>
  );
}
