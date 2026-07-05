import { createMockCollection } from "@/shared/utils";
import { CURRENT_USER_ID } from "@/entities/message";
import type { InviteRecord } from "./types";

const invites = createMockCollection<InviteRecord>("community_invites");

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
  const all = await invites.list();
  const usable = all.find(
    (invite) =>
      invite.community_id === communitySlug &&
      (invite.channel_id ?? null) === channelId &&
      isInviteUsable(invite)
  );
  if (usable) return usable;

  return invites.insert({
    community_id: communitySlug,
    channel_id: channelId,
    code: generateInviteCode(),
    created_by: CURRENT_USER_ID,
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + DEFAULT_TTL_DAYS * 24 * 60 * 60 * 1000).toISOString(),
    max_uses: null,
    uses: 0,
    revoked_at: null,
  });
};

/**
 * Отзыв ссылки — блокирует её мгновенно
 */
export const revokeInvite = async (inviteId: string): Promise<void> => {
  await invites.update(inviteId, { revoked_at: new Date().toISOString() });
};

/**
 * Проверка кода в момент перехода (в мок-режиме — клиентская;
 * на этапе БД станет server-side и атомарной)
 */
export const validateInviteCode = async (
  communitySlug: string,
  code: string
): Promise<InviteRecord | null> => {
  const all = await invites.list();
  const invite = all.find(
    (record) => record.community_id === communitySlug && record.code === code
  );
  return invite && isInviteUsable(invite) ? invite : null;
};

/**
 * Трата использования при вступлении новичка (действующий участник uses не тратит)
 */
export const consumeInvite = async (inviteId: string): Promise<void> => {
  const all = await invites.list();
  const invite = all.find((record) => record.id === inviteId);
  if (invite) {
    await invites.update(inviteId, { uses: invite.uses + 1 });
  }
};
