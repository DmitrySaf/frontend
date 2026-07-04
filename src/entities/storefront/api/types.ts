// Форма повторяет docs/db-schema.md (community_storefronts).
// Витрина — самостоятельная сущность; из сообщества берутся только название и логотип.

export interface StorefrontFeature {
  /** Имя lucide-иконки из фиксированного набора */
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
