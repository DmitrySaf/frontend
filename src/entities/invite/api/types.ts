// Форма повторяет docs/db-schema.md (community_invites).
// Код — криптослучайный и непрозрачный; slug сообщества доступа не даёт.

export interface InviteRecord {
  id: string;
  community_id: string;
  code: string;
  created_by: string;
  created_at: string;
  expires_at: string | null;
  max_uses: number | null;
  uses: number;
  revoked_at: string | null;
}

export interface Invite {
  id: string;
  code: string;
  expiresAt: string | null;
  maxUses: number | null;
  uses: number;
}

export type InviteValidity = "valid" | "invalid";
