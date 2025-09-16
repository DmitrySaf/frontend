"use client";

import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/features/auth";
import { SETTINGS_SECTIONS } from "@/pages/settings";

export function SettingsSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="w-64 border-r border-gray-200 flex flex-col">
      {/* User Profile */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🐼</span>
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Arkadiy</h2>
            <p className="text-sm text-gray-500">@arkadiyparovozov</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-1">
          {SETTINGS_SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => router.push(`/settings/${section.id}`)}
                className={`w-full flex space-x-3 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                  pathname === `/settings/${section.id}`
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-6 h-6 flex-shrink-0" />
                <span className="font-medium">{section.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-left text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Выйти</span>
        </button>
      </div>
    </div>
  );
}
