"use client"

import { SettingsSidebar } from "@/widgets/settings-sidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
        <div className="flex w-full">
          <div className="flex flex-col items-end flex-1 flex-shrink-0 basis-[230px] pr-8">
            <SettingsSidebar />
          </div>
          <div className="flex-1 pt-10 flex-shrink-1 pl-8 basis-[672px] overflow-y-auto">
            <div className="w-2xl h-full">
              {children}
            </div>
          </div>
        </div>
    </div>
  );
} 