"use client";

import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { SETTINGS_SECTIONS } from "@/pages/settings";
import { Tab, Button } from "@/shared/components";
import { createBrowserClient } from "@/api/browser-client";

export function SettingsSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createBrowserClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-end flex-1 flex-shrink-0 basis-[288px]">
      <div className="max-w-[288px]">

        
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
        <nav className="space-y-1">
          {SETTINGS_SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <Tab
                key={section.id}
                text={section.name}
                isActive={pathname === `/settings/${section.id}`}
                onClick={() => router.push(`/settings/${section.id}`)}
                Icon={Icon}
              />
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="">
        {/* <Tab text="Выйти" isNegative={true} onClick={handleLogout} Icon={LogOut} /> */}
      </div>
      </div>
    </div>
  );
}
