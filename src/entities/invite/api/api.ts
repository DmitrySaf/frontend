import { getSessionUserId } from "@/api/auth";
import { createBrowserClient } from "@/api/browser-client";
import { getCommunityIdBySlug } from "@/entities/community";
import type { InviteRecord } from "./types";

const INVITE_FIELDS =
  "id, community_id, channel_id, code, created_by, created_at, expires_at, max_uses, uses, revoked_at";

const CODE_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const CODE_LENGTH = 16;
const DEFAULT_TTL_DAYS = 7;

/** Криптослучайный непрозрачный код приглашения */
function generateInviteCode(): string {
  const bytes = new Uint8Array(CODE_LENGTH);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => CODE_ALPHABET[byte % CODE_ALPHABET.length]).join("");
}

function isInviteUsable(invite: InviteRecord): boolean {
  if (invite.revoked_at) return false;
  if (invite.expires_at && new Date(invite.expires_at).getTime() < Date.now()) return false;
  if (invite.max_uses != null && invite.uses >= invite.max_uses) return false;
  return true;
}

/**
 * Действующая ссылка сообщества или канала: возвращает живую или создаёт новую.
 * channelId — инвайт на private/secret-канал (membership + грант одним действием).
 */
export const getOrCreateInvite = async (
  communitySlug: string,
  channelId: string | null = null
): Promise<InviteRecord> => {
  const client = createBrowserClient();
  const userId = await getSessionUserId(client);
  const communityId = await getCommunityIdBySlug(communitySlug);

  let query = client
    .from("community_invites")
    .select(INVITE_FIELDS)
    .eq("community_id", communityId)
    .is("revoked_at", null);

  query = channelId ? query.eq("channel_id", channelId) : query.is("channel_id", null);

  const { data: existing, error: selectError } = await query;

  if (selectError) {
    throw new Error(selectError.message);
  }

  const usable = ((existing ?? []) as InviteRecord[]).find(isInviteUsable);
  if (usable) return usable;

  const { data, error } = await client
    .from("community_invites")
    .insert({
      community_id: communityId,
      channel_id: channelId,
      code: generateInviteCode(),
      created_by: userId,
      expires_at: new Date(Date.now() + DEFAULT_TTL_DAYS * 24 * 60 * 60 * 1000).toISOString(),
    })
    .select(INVITE_FIELDS)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as InviteRecord;
};

/**
 * Отзыв ссылки — блокирует её мгновенно
 */
export const revokeInvite = async (inviteId: string): Promise<void> => {
  const client = createBrowserClient();

  const { error } = await client
    .from("community_invites")
    .update({ revoked_at: new Date().toISOString() })
    .eq("id", inviteId);

  if (error) {
    throw new Error(error.message);
  }
};

export interface ConsumeInviteResult {
  communityId: string;
  channelId: string | null;
}

/**
 * Переход по инвайту: атомарная серверная проверка срока/лимита,
 * membership (для бесплатных сообществ) + грант канала одним действием.
 * Платное сообщество без membership → ошибка PAYMENT_REQUIRED.
 */
export const consumeInvite = async (code: string): Promise<ConsumeInviteResult> => {
  const client = createBrowserClient();
  await getSessionUserId(client);

  const { data, error } = await client.rpc("consume_invite", { p_code: code });

  if (error) {
    throw new Error(error.message);
  }

  const result = data as { community_id: string; channel_id: string | null };
  return { communityId: result.community_id, channelId: result.channel_id };
};
