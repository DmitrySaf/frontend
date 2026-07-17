import { createServerClient } from "@/api/server-client";
import {
  LAST_VISITED_COMMUNITY_COOKIE,
  getMyCommunitySlugs,
} from "@/entities/community/api/server";
import { CommunityListPage } from "@/pages/community-list";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface CommunitiesPageProps {
  searchParams: Promise<{ create?: string }>;
}

/**
 * Резолвер входа: сразу редиректит в последнее посещённое (по cookie) или первое
 * сообщество — серверно, одним переходом, без клиентских спиннеров. Валидируем
 * cookie по актуальному членству (анти-петля: cookie может указывать на покинутое
 * сообщество). Пустое членство или ?create=community → экран создания.
 */
export default async function CommunitiesPage({ searchParams }: CommunitiesPageProps) {
  const { create } = await searchParams;

  // Открыта модалка создания — редирект съел бы параметр
  if (create === "community") {
    return <CommunityListPage />;
  }

  const client = await createServerClient();
  const slugs = await getMyCommunitySlugs(client);

  if (slugs.length === 0) {
    return <CommunityListPage />;
  }

  const cookieStore = await cookies();
  const lastVisited = cookieStore.get(LAST_VISITED_COMMUNITY_COOKIE)?.value;
  const target = lastVisited && slugs.includes(lastVisited) ? lastVisited : slugs[0];

  redirect(`/communities/${target}`);
}
