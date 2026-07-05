// Спецификация приватности (2026-07-04): hidden — 404 по прямой ссылке,
// unlisted — витрина по ссылке, live — открыта. Default: hidden.
export type CommunityVisibility = "hidden" | "unlisted" | "live";

// Доменный тип сообщества (для rail и списков)
export interface Community {
  id: string;
  name: string;
  displayName: string;
  ownerId: string;
  logoUrl: string | null;
}

/** Полный профиль сообщества: описание, оформление, видимость */
export interface CommunityProfile {
  id: string;
  name: string;
  displayName: string;
  ownerId: string;
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
