"use client";

import { createBrowserClient } from "@/api/browser-client";
import { useProfileQuery } from "@/entities/profile";
import { useMyVerificationQuery } from "@/entities/verification";
import { Avatar, Tabs } from "@/shared/components";
import { cn } from "@/shared/utils";
import { ArrowLeft, BadgeCheck, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SETTINGS_SECTIONS } from "../model";

export function SettingsSidebar() {
  const router = useRouter();
  const pathname = usePathname();
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
      {/* Мобильная навигация: горизонтальные пиллы */}
      <div className="md:hidden border-b border-gray-200 bg-surface">
        <div className="flex items-center gap-1.5 px-3 py-2.5 overflow-x-auto">
          <Link
            href="/communities"
            aria-label="Назад к сообществам"
            className="shrink-0 size-8 flex items-center justify-center rounded-[10px] text-gray-600 hover:bg-gray-100 active:scale-90 transition-[background-color,transform] duration-150 ease-out-quart"
          >
            <ArrowLeft className="size-4" />
          </Link>
          {SETTINGS_SECTIONS.map((section) => {
            const href = `/settings/${section.id}`;
            const isActive = pathname === href;
            return (
              <Link
                key={section.id}
                href={href}
                className={cn(
                  "shrink-0 px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors",
                  isActive ? "bg-ink text-surface" : "bg-gray-100 text-gray-600 hover:text-ink"
                )}
              >
                {section.name}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Выйти из аккаунта"
            className="shrink-0 size-8 flex items-center justify-center rounded-[10px] text-danger hover:bg-danger/10 active:scale-90 transition-[background-color,transform] duration-150 ease-out-quart cursor-pointer"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>

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
            <div>
              <h2 className="flex items-center justify-center gap-1 font-bold text-gray-900">
                {profile?.displayName ?? "…"}
                {isVerified && <BadgeCheck className="size-4 shrink-0 text-primary-600" />}
              </h2>
              {profile?.username && <p className="text-sm text-gray-500">@{profile.username}</p>}
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
