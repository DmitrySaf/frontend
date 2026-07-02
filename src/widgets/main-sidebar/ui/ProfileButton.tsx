"use client";

import { useRouter } from "next/navigation";
import { Settings, MoreHorizontal, LogOut } from "lucide-react";
import { Avatar, Button, Dropdown } from "@/shared/components";
import { useProfileQuery } from "@/entities/profile";
import { createBrowserClient } from "@/api/browser-client";

export default function ProfileButton() {
  const router = useRouter();
  const supabase = createBrowserClient();
  const { data: profile } = useProfileQuery();

  const displayName = profile?.displayName ?? "Профиль";
  const username = profile?.username ? `@${profile.username}` : "";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="relative overflow-visible">
      <div className="bg-white rounded-[18px] ring ring-gray-200 flex items-center overflow-hidden transition-all duration-300 ease-out w-15 group hover:w-[300px] h-15 hover:shadow-md p-1 gap-1.5">
        {/* Аватар + имя/ник — переход в настройки профиля */}
        <button
          type="button"
          onClick={() => router.push("/settings/profile")}
          className="flex items-center min-w-0 flex-1 cursor-pointer transition-colors rounded-xl hover:bg-gray-100 p-1"
        >
          <Avatar
            name={displayName}
            src={profile?.avatarUrl}
            size="l"
            shape="circle"
            className="flex-shrink-0 size-11"
          />

          <div className="flex flex-col items-start min-w-0 flex-1 px-2 transition-opacity duration-300 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
            <span className="text-sm font-semibold text-gray-900 truncate">{displayName}</span>
            {username && <span className="text-xs text-gray-500 truncate">{username}</span>}
          </div>
        </button>

        {/* Иконки справа */}
        <div className="flex items-center gap-1 flex-shrink-0 opacity-0 transition-opacity duration-0 pr-0.5 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-hover:delay-100">
          <Dropdown
            trigger={<Button theme="ghost" size="l" Icon={MoreHorizontal} />}
            side="top"
            items={[
              {
                icon: LogOut,
                label: "Выйти из аккаунта",
                onClick: handleLogout,
                variant: "danger",
              },
            ]}
          />

          <Button
            theme="ghost"
            size="l"
            Icon={Settings}
            onClick={() => router.push("/settings/profile")}
          />
        </div>
      </div>
    </div>
  );
}
