"use client";

import { SettingsSidebar } from "@/widgets/settings-sidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row w-full h-full">
        <div className="shrink-0 md:flex md:flex-col md:items-end md:flex-1 md:basis-[230px] md:pr-8">
          <SettingsSidebar />
        </div>
        <div className="flex-1 min-w-0 pt-4 md:pt-10 px-4 md:px-0 md:pl-8 md:basis-[672px] overflow-y-auto">
          <div className="w-full max-w-2xl h-full pb-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
