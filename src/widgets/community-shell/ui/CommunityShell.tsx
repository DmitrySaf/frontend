"use client";

import { useCommunityQuery } from "@/entities/community";
import { CommunitySidebar } from "@/widgets/community-sidebar";
import { MainSidebar } from "@/widgets/main-sidebar";
import { Menu } from "lucide-react";
import { AnimatePresence, type PanInfo, motion, useReducedMotion } from "motion/react";
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
  const shouldReduceMotion = useReducedMotion();

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

      {/* Мобильный drawer: rail + каналы. Spring-вход/выход, свайп влево закрывает */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.button
              type="button"
              aria-label="Закрыть меню"
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.2, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-y-0 left-0 flex w-[85vw] max-w-[340px] bg-[#F5F5F5] py-2 pl-1 shadow-xl"
              initial={shouldReduceMotion ? { opacity: 0 } : { x: "-100%" }}
              animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { x: "-100%" }}
              transition={
                shouldReduceMotion
                  ? { duration: 0.15 }
                  : { type: "spring", bounce: 0, duration: 0.35 }
              }
              drag={shouldReduceMotion ? false : "x"}
              dragConstraints={{ left: -360, right: 0 }}
              dragElastic={{ left: 0.05, right: 0 }}
              onDragEnd={(_: PointerEvent, info: PanInfo) => {
                if (info.offset.x < -80 || info.velocity.x < -300) setIsDrawerOpen(false);
              }}
            >
              <MainSidebar withCreateModal={false} />
              <div className="flex-1 min-w-0 rounded-l-md overflow-hidden border-l border-y border-gray-200">
                <CommunitySidebar slug={slug} className="w-full border-r-0" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
