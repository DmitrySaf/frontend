import { createMockCollection } from "@/shared/utils";
import { CURRENT_USER_ID } from "@/entities/message";
import type { MemberRecord, MemberRole } from "./types";

const members = createMockCollection<MemberRecord>("community_members");

/**
 * Membership текущего пользователя в сообществе
 */
export const getMyMembership = async (communitySlug: string): Promise<MemberRecord | null> => {
  const all = await members.list();
  return (
    all.find(
      (record) => record.community_id === communitySlug && record.user_id === CURRENT_USER_ID
    ) ?? null
  );
};

/**
 * Вступление текущего пользователя (бесплатно или после симуляции оплаты)
 */
export const joinCommunity = async (
  communitySlug: string,
  role: MemberRole = "member"
): Promise<MemberRecord> => {
  const existing = await getMyMembership(communitySlug);
  if (existing) return existing;

  return members.insert({
    community_id: communitySlug,
    user_id: CURRENT_USER_ID,
    role,
    joined_at: new Date().toISOString(),
  });
};

/**
 * Покинуть сообщество
 */
export const leaveCommunity = async (communitySlug: string): Promise<void> => {
  const existing = await getMyMembership(communitySlug);
  if (existing) {
    await members.remove(existing.id);
  }
};
