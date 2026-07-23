"use client";

import { SettingsSidebar } from "@/widgets/settings-sidebar";
import { ChevronLeftBold20 } from "@frosted-ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Корень /settings на мобиле — экран-список со своим «назад»;
  // «‹ Настройки» нужна только внутри секций
  const isSection = pathname !== "/settings";

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row w-full h-full">
        <div className="shrink-0 md:flex md:flex-col md:items-end md:flex-1 md:basis-[230px] md:pr-8">
          <SettingsSidebar />
        </div>
        <div className="flex-1 min-w-0 pt-3 md:pt-10 px-4 md:px-0 md:pl-8 md:basis-[672px] overflow-y-auto">
          <div className="w-full max-w-2xl h-full pb-10">
            {isSection && (
              <Link
                href="/settings"
                className="md:hidden -ml-1.5 mb-2 inline-flex items-center gap-0.5 min-h-11 pr-2 text-[15px] font-medium text-primary-600 active:opacity-60 transition-opacity"
              >
                <ChevronLeftBold20 className="size-5" />
                Настройки
              </Link>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
