"use client";

import { createBrowserClient } from "@/api/browser-client";
import { Tabs } from "@/shared/components";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { SETTINGS_SECTIONS } from "../model";

export function SettingsSidebar() {
  const router = useRouter();
  const supabase = createBrowserClient();

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
    <div className="max-w-[230px]">
      {/* User Profile */}
      <div className="p-10">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-2xl">🐼</span>
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Arkadiy</h2>
            <p className="text-sm text-gray-500">@arkadiyparovozov</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1">
        <Tabs items={tabs} className="space-y-1" />
      </div>
      <div className="h-px bg-gray-300 rounded-xl ml-3 mr-4 my-2" />

      <button
        onClick={handleLogout}
        className="text-[#D8400C] hover:bg-[#D8400C13] active:bg-[#D8400C33] w-full flex items-center space-x-2.5 pl-3 pr-4 py-2.5 rounded-lg text-left transition-colors cursor-pointer font-semibold"
      >
        <LogOut className="size-5 flex-shrink-0" />
        <span>Выйти из аккаунта</span>
      </button>
    </div>
  );
}
