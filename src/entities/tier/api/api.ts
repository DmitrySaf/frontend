import { createMockCollection } from "@/shared/utils";
import type { TierRecord, TierInput } from "./types";

const tiers = createMockCollection<TierRecord>("pricing_tiers");

/**
 * Тарифы сообщества (по позиции)
 */
export const getTiers = async (communitySlug: string): Promise<TierRecord[]> => {
  const all = await tiers.list();
  return all
    .filter((tier) => tier.community_id === communitySlug)
    .sort((a, b) => a.position - b.position);
};

export const createTier = async (
  communitySlug: string,
  input: TierInput
): Promise<TierRecord> => {
  const siblings = await getTiers(communitySlug);

  return tiers.insert({
    community_id: communitySlug,
    name: input.name,
    kind: input.kind,
    price_kopeks: input.priceKopeks,
    period_months: input.kind === "recurring" ? input.periodMonths : null,
    discount_percent: input.discountPercent,
    is_active: true,
    position: siblings.length,
    created_at: new Date().toISOString(),
  });
};

export const updateTier = async (tierId: string, input: TierInput): Promise<TierRecord> => {
  return tiers.update(tierId, {
    name: input.name,
    kind: input.kind,
    price_kopeks: input.priceKopeks,
    period_months: input.kind === "recurring" ? input.periodMonths : null,
    discount_percent: input.discountPercent,
  });
};

export const setTierActive = async (tierId: string, isActive: boolean): Promise<TierRecord> => {
  return tiers.update(tierId, { is_active: isActive });
};

export const deleteTier = async (tierId: string): Promise<void> => {
  await tiers.remove(tierId);
};

/**
 * Сид демо-тарифов (вызывается сидом продаж, если тарифов ещё нет)
 */
export const seedDefaultTiers = async (communitySlug: string): Promise<TierRecord[]> => {
  const now = new Date().toISOString();
  const defaults: TierRecord[] = [
    {
      id: crypto.randomUUID(),
      community_id: communitySlug,
      name: "Месячный",
      kind: "recurring",
      price_kopeks: 99_000,
      period_months: 1,
      discount_percent: null,
      is_active: true,
      position: 0,
      created_at: now,
    },
    {
      id: crypto.randomUUID(),
      community_id: communitySlug,
      name: "6 месяцев",
      kind: "recurring",
      price_kopeks: 499_000,
      period_months: 6,
      discount_percent: 15,
      is_active: true,
      position: 1,
      created_at: now,
    },
    {
      id: crypto.randomUUID(),
      community_id: communitySlug,
      name: "Годовой",
      kind: "recurring",
      price_kopeks: 899_000,
      period_months: 12,
      discount_percent: 24,
      is_active: true,
      position: 2,
      created_at: now,
    },
  ];

  await tiers.insertMany(defaults);
  return defaults;
};
