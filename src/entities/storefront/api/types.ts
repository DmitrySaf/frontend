// Форма повторяет docs/db-schema.md (community_storefronts).
// Витрина — самостоятельная сущность; из сообщества берутся только название и логотип.

export interface StorefrontFeature {
  /** Имя иконки из фиксированного набора */
  icon: string;
  text: string;
}

export interface StorefrontRecord {
  /** slug сообщества (1:1) */
  id: string;
  description: string;
  media: string[];
  features: StorefrontFeature[];
}

export interface Storefront {
  description: string;
  media: string[];
  features: StorefrontFeature[];
}

// ============================================================
// Публичная витрина — ответ RPC get_storefront (server-side приватность:
// hidden без валидного инвайта → found=false; скрытые тарифы — только по инвайту)
// ============================================================

export interface StorefrontViewTier {
  id: string;
  name: string;
  kind: "recurring" | "one_time";
  isHidden: boolean;
  priceKopeks: number;
  periodMonths: number | null;
  discountPercent: number | null;
  position: number;
}

export interface StorefrontView {
  community: {
    id: string;
    name: string;
    displayName: string;
    description: string;
    coverUrl: string | null;
    logoUrl: string | null;
    visibility: "hidden" | "unlisted" | "live";
  };
  storefront: Storefront;
  owner: {
    displayName: string;
    username: string;
    avatarUrl: string | null;
    bio: string | null;
  } | null;
  membersCount: number;
  tiers: StorefrontViewTier[];
  invite: {
    code: string;
    channelId: string | null;
    valid: boolean;
  } | null;
  viewer: {
    isMember: boolean;
    isOwner: boolean;
  };
}
