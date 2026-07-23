"use client";

import { useCommunityQuery } from "@/entities/community";
import { CommunitySidebar } from "@/widgets/community-sidebar";
import { MainSidebar } from "@/widgets/main-sidebar";
import { MenuBold20 } from "@frosted-ui/icons";
import { Drawer as HeroDrawer } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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

  // Свайп от левой кромки открывает drawer (закрытие свайпом уже есть).
  // Слушатели на контейнере, а не на оверлейной полосе: полоса поверх контента
  // крала бы тапы у бургера. Жест: старт ≤24px от края, горизонталь > вертикали.
  const edgeSwipe = useRef({ x: 0, y: 0, active: false });
  const handleTouchStart = (event: React.TouchEvent) => {
    if (window.matchMedia("(min-width: 768px)").matches) return;
    const touch = event.touches[0];
    edgeSwipe.current = { x: touch.clientX, y: touch.clientY, active: touch.clientX <= 24 };
  };
  const handleTouchMove = (event: React.TouchEvent) => {
    if (!edgeSwipe.current.active) return;
    const touch = event.touches[0];
    const dx = touch.clientX - edgeSwipe.current.x;
    const dy = Math.abs(touch.clientY - edgeSwipe.current.y);
    if (dx > 30 && dx > dy * 1.5) {
      edgeSwipe.current.active = false;
      setIsDrawerOpen(true);
    } else if (dy > 30) {
      // Вертикальный скролл — жест не наш
      edgeSwipe.current.active = false;
    }
  };

  return (
    <div className="flex w-full h-full" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
      {/* Десктопный сайдбар */}
      <div className="hidden md:flex h-full">
        <CommunitySidebar slug={slug} />
      </div>

      {/* Мобильный drawer: rail + каналы. Вход/выход и drag-to-dismiss — встроены в
          HeroUI Drawer (та же кривая --ease-drawer: cubic-bezier(0.32,0.72,0,1)).
          Открытие по свайпу от кромки остаётся снаружи (см. handleTouchMove выше) —
          у HeroUI такого триггера нет, isDrawerOpen лишь дёргает open(). */}
      <div className="md:hidden">
        <HeroDrawer.Backdrop
          isOpen={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          className="z-[var(--z-modal-backdrop)] bg-black/40"
        >
          <HeroDrawer.Content placement="left" className="z-[var(--z-modal)]">
            <HeroDrawer.Dialog className="w-[85vw] max-w-[340px] flex-row bg-gray-100 p-0 pt-2 pb-safe-2 pl-1 shadow-xl">
              <MainSidebar withCreateModal={false} />
              <div className="flex-1 min-w-0 rounded-l-md overflow-hidden border-l border-y border-gray-200">
                <CommunitySidebar slug={slug} className="w-full border-r-0" />
              </div>
            </HeroDrawer.Dialog>
          </HeroDrawer.Content>
        </HeroDrawer.Backdrop>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Мобильный топ-бар */}
        <div className="md:hidden shrink-0 flex items-center gap-2.5 px-3 h-12 border-b border-gray-200 bg-surface">
          <button
            type="button"
            aria-label="Открыть меню"
            onClick={() => setIsDrawerOpen(true)}
            className="size-9 touch-hit flex items-center justify-center rounded-lg text-gray-600 hover:text-ink hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <MenuBold20 className="size-5" />
          </button>
          <span className="text-[15px] font-bold text-ink truncate">
            {community?.displayName ?? ""}
          </span>
        </div>

        {children}
      </div>
    </div>
  );
}
