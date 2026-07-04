// Форма повторяет docs/db-schema.md (community_members).
// В мок-режиме community_id — slug, user_id — «me».

export type MemberRole = "owner" | "admin" | "member";

export interface MemberRecord {
  id: string;
  community_id: string;
  user_id: string;
  role: MemberRole;
  joined_at: string;
}

export interface Membership {
  role: MemberRole;
  joinedAt: string;
}
