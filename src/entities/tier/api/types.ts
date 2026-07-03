// Форма повторяет docs/db-schema.md (pricing_tiers).
// В мок-режиме community_id хранит slug сообщества.

export type TierKind = "recurring" | "one_time";

export interface TierRecord {
  id: string;
  community_id: string;
  name: string;
  kind: TierKind;
  price_kopeks: number;
  period_months: number | null;
  discount_percent: number | null;
  is_active: boolean;
  position: number;
  created_at: string;
}

// Доменный тип (для UI)
export interface Tier {
  id: string;
  name: string;
  kind: TierKind;
  priceKopeks: number;
  periodMonths: number | null;
  discountPercent: number | null;
  isActive: boolean;
  position: number;
}

export interface TierInput {
  name: string;
  kind: TierKind;
  priceKopeks: number;
  periodMonths: number | null;
  discountPercent: number | null;
}
