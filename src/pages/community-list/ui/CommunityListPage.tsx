"use client";

import { getLastVisitedCommunity, useCommunitiesQuery } from "@/entities/community";
import { Button } from "@/shared/components";
import { Loader2 } from "lucide-react";
import Image from "next/image";
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
  const [, setCreateParam] = useQueryState("create");

  const hasCommunities = !!communities && communities.length > 0;

  useEffect(() => {
    if (isLoading || !communities) return;
    if (communities.length === 0) return;

    const lastVisited = getLastVisitedCommunity();
    const target =
      communities.find((community) => community.name === lastVisited) ?? communities[0];

    router.replace(`/communities/${target.name}`);
  }, [isLoading, communities, router]);

  if (isLoading || hasCommunities) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="size-6 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 max-w-sm text-center px-6">
        <Image src="/logo.svg" alt="Bean" width={56} height={56} />
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold text-black">Создайте своё сообщество</h1>
          <p className="text-base text-gray-600">
            Публикуйте посты, ведите курсы и общайтесь с участниками — всё в одном месте.
          </p>
        </div>
        <Button theme="primary" size="l" onClick={() => setCreateParam("community")}>
          Создать сообщество
        </Button>
      </div>
    </div>
  );
}
