"use client"

import { SettingsSidebar } from "@/widgets/settings-sidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 bg-gray-50 min-h-screen flex flex-col">
      <div className="flex rounded-3xl bg-white border border-solid border-gray-200 flex-1">
        <SettingsSidebar />
        <div className="flex-1">
          <div className="p-8 max-w-4xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 