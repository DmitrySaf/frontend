"use client";

import { getLastVisitedCommunity, useCommunitiesQuery } from "@/entities/community";
import { Button, LogoTile, Skeleton } from "@/shared/components";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

/**
 * Резолвер после входа: последнее посещённое сообщество → первое из списка →
 * пустое состояние с предложением создать сообщество.
 */
export function CommunityListPage() {
  const router = useRouter();
  const { data: communities, isLoading } = useCommunitiesQuery();
  const [createParam, setCreateParam] = useQueryState("create");

  const hasCommunities = !!communities && communities.length > 0;

  useEffect(() => {
    if (isLoading || !communities) return;
    if (communities.length === 0) return;
    // Открыта модалка создания (?create=community) — редирект съел бы параметр
    if (createParam === "community") return;

    const lastVisited = getLastVisitedCommunity();
    const target =
      communities.find((community) => community.name === lastVisited) ?? communities[0];

    router.replace(`/communities/${target.name}`);
  }, [isLoading, communities, router, createParam]);

  // Пока грузится список / готовится редирект в сообщество — нейтральный каркас
  // (в блоке D резолв уедет на сервер и эта ветка почти исчезнет)
  if (isLoading || hasCommunities) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <div className="shrink-0 flex items-center gap-2 px-4 md:px-6 h-12 border-b border-gray-200 bg-surface">
          <Skeleton circle width={19} />
          <Skeleton width={160} height={14} radius={6} />
        </div>
        <div className="flex-1 p-4 md:p-6 space-y-4">
          <Skeleton height={72} radius={14} />
          <Skeleton height={120} radius={14} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 max-w-sm text-center px-6 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-400 ease-out-quart">
        <LogoTile size={56} />
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold text-ink">Создайте своё сообщество</h1>
          <p className="text-base text-gray-600">
            Публикуйте посты, ведите курсы и общайтесь с участниками — всё в одном месте.
          </p>
        </div>
        <Button theme="primary" size="xl" onClick={() => setCreateParam("community")}>
          Создать сообщество
        </Button>
      </div>
    </div>
  );
}
