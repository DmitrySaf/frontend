import "server-only";

import type { TypedSupabaseClient } from "@/api";

// Ре-экспорт имени cookie: серверные страницы резолва входа берут его отсюда,
// не притягивая клиентский barrel сообщества. Источник имени — model/lastVisited.
export { LAST_VISITED_COMMUNITY_COOKIE } from "../model/lastVisited";

/**
 * Слаги сообществ текущего пользователя (по членству, в порядке вступления) —
 * серверный аналог getCommunities без браузерного клиента и лишних полей.
 * userId берём из getClaims (локально валидированный JWT), фильтр по user_id
 * нужен, т.к. RLS может отдавать и других участников общих сообществ.
 */
export async function getMyCommunitySlugs(client: TypedSupabaseClient): Promise<string[]> {
  const { data: claimsData } = await client.auth.getClaims();
  const userId = claimsData?.claims.sub;
  if (!userId) return [];

  const { data, error } = await client
    .from("community_members")
    .select("joined_at, community:communities (name)")
    .eq("user_id", userId)
    .order("joined_at");

  if (error) throw new Error(error.message);

  return (data ?? [])
    .map((row) => (row.community as unknown as { name: string } | null)?.name)
    .filter((name): name is string => !!name);
}
