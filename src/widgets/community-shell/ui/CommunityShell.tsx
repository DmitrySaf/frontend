"use client";

import { useCommunityQuery } from "@/entities/community";
import { CommunitySidebar } from "@/widgets/community-sidebar";
import { MainSidebar } from "@/widgets/main-sidebar";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface CommunityShellProps {
  slug: string;
  children: React.ReactNode;
}

/**
 * Каркас сообщества: на десктопе сайдбар слева, на мобиле (<768px) —
 * Discord-style drawer (rail сообществ + каналы) и топ-бар с бургером.
 */
export function CommunityShell({ slug, children }: CommunityShellProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  const { data: community } = useCommunityQuery(slug);

  // Переход по любой ссылке закрывает drawer
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname — триггер закрытия
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  return (
    <div className="flex w-full h-full">
      {/* Десктопный сайдбар */}
      <div className="hidden md:flex h-full">
        <CommunitySidebar slug={slug} />
      </div>

      {/* Мобильный drawer: rail + каналы */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Закрыть меню"
            onClick={() => setIsDrawerOpen(false)}
            className="absolute inset-0 bg-black/40 animate-in fade-in duration-200"
          />
          <div className="absolute inset-y-0 left-0 flex w-[85vw] max-w-[340px] bg-[#F5F5F5] py-2 pl-1 shadow-xl animate-in slide-in-from-left duration-200">
            <MainSidebar withCreateModal={false} />
            <div className="flex-1 min-w-0 rounded-l-md overflow-hidden border-l border-y border-gray-200">
              <CommunitySidebar slug={slug} className="w-full border-r-0" />
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Мобильный топ-бар */}
        <div className="md:hidden shrink-0 flex items-center gap-2.5 px-3 py-2 border-b border-gray-200 bg-white">
          <button
            type="button"
            aria-label="Открыть меню"
            onClick={() => setIsDrawerOpen(true)}
            className="size-9 flex items-center justify-center rounded-lg text-gray-600 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <Menu className="size-5" />
          </button>
          <span className="text-[15px] font-bold text-black truncate">
            {community?.displayName ?? ""}
          </span>
        </div>

        {children}
      </div>
    </div>
  );
}
