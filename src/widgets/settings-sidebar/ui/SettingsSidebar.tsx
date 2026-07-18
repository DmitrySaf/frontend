"use client";

import { createBrowserClient } from "@/api/browser-client";
import { useProfileQuery } from "@/entities/profile";
import { useMyVerificationQuery } from "@/entities/verification";
import { Avatar, Tabs } from "@/shared/components";
import { BadgeCheck, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { SETTINGS_SECTIONS } from "../model";

export function SettingsSidebar() {
  const router = useRouter();
  const supabase = createBrowserClient();
  const { data: profile } = useProfileQuery();
  const { data: verification } = useMyVerificationQuery();
  const isVerified = verification?.status === "approved";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const tabs = SETTINGS_SECTIONS.map((section) => ({
    id: section.id,
    name: section.name,
    href: `/settings/${section.id}`,
    icon: section.icon,
  }));

  return (
    <>
      {/* Мобильной навигации здесь больше нет: <md корень /settings — экран-список
          (SettingsHome), «‹ Настройки» секций рендерит layout. */}

      {/* Десктопный сайдбар */}
      <div className="hidden md:block max-w-[230px]">
        {/* Профиль (реальные данные сессии) */}
        <div className="p-10">
          <div className="flex flex-col items-center text-center space-y-3">
            <Avatar
              name={profile?.displayName ?? ""}
              src={profile?.avatarUrl}
              size="l"
              shape="circle"
              className="size-16"
            />
            {/* w-full + min-w-0 — граница усечения; без них flex-детям некуда «сжаться»
                и длинное имя/ник выезжали за рамки сайдбара вместо троеточия */}
            <div className="w-full min-w-0">
              <h2 className="flex items-center justify-center gap-1 font-bold text-gray-900">
                <span className="min-w-0 truncate">{profile?.displayName ?? "…"}</span>
                {isVerified && <BadgeCheck className="size-4 shrink-0 text-primary-600" />}
              </h2>
              {profile?.username && (
                <p className="truncate text-sm text-gray-500">@{profile.username}</p>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1">
          <Tabs items={tabs} className="space-y-1" />
        </div>
        <div className="h-px bg-gray-300 rounded-xl ml-3 mr-4 my-2" />

        <button
          type="button"
          onClick={handleLogout}
          className="text-danger hover:bg-danger/10 active:bg-danger/15 w-full flex items-center space-x-2.5 pl-3 pr-4 py-2.5 rounded-lg text-left transition-colors duration-150 cursor-pointer font-semibold"
        >
          <LogOut className="size-5 flex-shrink-0" />
          <span>Выйти из аккаунта</span>
        </button>
      </div>
    </>
  );
}
