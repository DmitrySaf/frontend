export interface Community {
  displayName: string;
  name: string;
}

// Расширенные поля сообщества из docs/db-schema.md (описание, оформление, видимость).
// В мок-режиме живут в localStorage (id записи = slug); при подключении БД
// переезжают в саму таблицу communities.
// Спецификация приватности (2026-07-04): hidden — 404 по прямой ссылке,
// unlisted — витрина по ссылке, live — открыта. Default: hidden.
export type CommunityVisibility = "hidden" | "unlisted" | "live";

export interface CommunityExtrasRecord {
  /** slug сообщества */
  id: string;
  description: string;
  cover_url: string | null;
  logo_url: string | null;
  visibility: CommunityVisibility;
}

/** Полный профиль сообщества: базовые поля (Supabase) + расширенные (mock) */
export interface CommunityProfile {
  name: string;
  displayName: string;
  description: string;
  coverUrl: string | null;
  logoUrl: string | null;
  visibility: CommunityVisibility;
}

export interface UpdateCommunityProfileInput {
  slug: string;
  displayName?: string;
  description?: string;
  coverUrl?: string | null;
  logoUrl?: string | null;
  visibility?: CommunityVisibility;
}
