"use client";

import { usePrefetchCommunityStructure } from "@/entities/channel";
import { usePrefetchCommunity } from "@/entities/community";
import { Avatar, Tooltip } from "@/shared/components";
import { useHoverIntent } from "@/shared/composables";
import Link from "next/link";

interface CommunityRailTileProps {
  slug: string;
  displayName: string;
  logoUrl?: string | null;
  isActive: boolean;
}

/**
 * Плитка сообщества в рейле. По намерению (наведение/тач) префетчит структуру и
 * профиль сообщества — к моменту клика сайдбар и шапка берут данные из кэша.
 */
export function CommunityRailTile({
  slug,
  displayName,
  logoUrl,
  isActive,
}: CommunityRailTileProps) {
  const prefetchCommunity = usePrefetchCommunity();
  const prefetchStructure = usePrefetchCommunityStructure();

  const handlers = useHoverIntent(() => {
    prefetchStructure(slug);
    prefetchCommunity(slug);
  });

  return (
    <Tooltip content={displayName} side="right">
      <Link
        href={`/communities/${slug}`}
        {...handlers}
        className="relative block transition-transform duration-150 ease-out-quart hover:scale-[1.04] active:scale-95"
      >
        <Avatar name={displayName} src={logoUrl} size="l" shape="square" className="shadow-sm" />
        {isActive && (
          <div className="absolute -right-[6px] top-1/2 -translate-y-1/2 w-[3px] h-3.5 bg-ink rounded-r-[4px] animate-in fade-in zoom-in-50 duration-200 ease-out-quart" />
        )}
      </Link>
    </Tooltip>
  );
}
