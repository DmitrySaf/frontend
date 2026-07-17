import "server-only";

import type { TypedSupabaseClient } from "@/api";
import { transformCommunityStructure } from "../model/mappers";
import { CATEGORY_FIELDS, CHANNEL_FIELDS } from "./api";
import type {
  CategoryRecord,
  ChannelAccess,
  ChannelRecord,
  ChannelType,
  CommunityStructure,
} from "./types";

/**
 * Серверный резолв структуры сообщества по slug. НЕ реюзаем getCommunityStructure —
 * она жёстко на createBrowserClient (на сервере даёт анонимный RLS-скоуп = молча
 * пусто). Здесь клиент передаётся параметром (createServerClient с куками юзера),
 * поэтому RLS видит те же каналы, что и клиент. Отсутствие сообщества → null
 * (страница показывает fallback, не падает и не редиректит — иначе петля).
 */
export async function getCommunityStructureServer(
  client: TypedSupabaseClient,
  slug: string
): Promise<CommunityStructure | null> {
  const { data: community, error: communityError } = await client
    .from("communities")
    .select("id")
    .eq("name", slug)
    .maybeSingle();

  if (communityError) throw new Error(communityError.message);
  if (!community) return null;

  const [categoriesResult, channelsResult] = await Promise.all([
    client
      .from("community_categories")
      .select(CATEGORY_FIELDS)
      .eq("community_id", community.id)
      .order("position"),
    client
      .from("community_channels")
      .select(CHANNEL_FIELDS)
      .eq("community_id", community.id)
      .order("position"),
  ]);

  if (categoriesResult.error) throw new Error(categoriesResult.error.message);
  if (channelsResult.error) throw new Error(channelsResult.error.message);

  return transformCommunityStructure({
    categories: (categoriesResult.data ?? []) as CategoryRecord[],
    channels: (channelsResult.data ?? []).map((channel) => ({
      ...channel,
      type: channel.type as ChannelType,
      access: channel.access as ChannelAccess,
    })) as ChannelRecord[],
  });
}
