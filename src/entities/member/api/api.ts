import { createBrowserClient } from "@/api/browser-client";
import { getSessionUserIdOrNull, getSessionUserId } from "@/api/auth";
import { getCommunityIdBySlug } from "@/entities/community";
import type { MemberRecord } from "./types";

const MEMBER_FIELDS = "id, community_id, user_id, role, joined_at";

/**
 * Membership текущего пользователя в сообществе
 */
export const getMyMembership = async (communitySlug: string): Promise<MemberRecord | null> => {
  const client = createBrowserClient();
  const userId = await getSessionUserIdOrNull(client);
  if (!userId) return null;

  const communityId = await getCommunityIdBySlug(communitySlug);

  const { data, error } = await client
    .from("community_members")
    .select(MEMBER_FIELDS)
    .eq("community_id", communityId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as MemberRecord | null) ?? null;
};

/**
 * Бесплатное вступление текущего пользователя (атомарная проверка на сервере)
 */
export const joinCommunity = async (communitySlug: string): Promise<MemberRecord> => {
  const client = createBrowserClient();
  await getSessionUserId(client);

  const communityId = await getCommunityIdBySlug(communitySlug);

  const { error } = await client.rpc("join_free_community", {
    p_community_id: communityId,
  });

  if (error) {
    throw new Error(error.message);
  }

  const membership = await getMyMembership(communitySlug);
  if (!membership) {
    throw new Error("Не удалось вступить в сообщество");
  }
  return membership;
};

/**
 * Покинуть сообщество
 */
export const leaveCommunity = async (communitySlug: string): Promise<void> => {
  const client = createBrowserClient();
  const userId = await getSessionUserId(client);
  const communityId = await getCommunityIdBySlug(communitySlug);

  const { error } = await client
    .from("community_members")
    .delete()
    .eq("community_id", communityId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }
};
