import type { Tier, TierRecord } from "../api/types";

export const transformTier = (record: TierRecord): Tier => {
  return {
    id: record.id,
    name: record.name,
    kind: record.kind,
    priceKopeks: record.price_kopeks,
    periodMonths: record.period_months,
    discountPercent: record.discount_percent,
    isActive: record.is_active,
    position: record.position,
  };
};

export const transformTiers = (records: TierRecord[]): Tier[] => {
  return records.map(transformTier);
};

/**
 * Подпись цены: «₽ 990 / мес», «₽ 4 990 / 6 мес», «₽ 15 000 разово»
 */
export const formatTierPrice = (tier: Tier): string => {
  const rubles = Math.round(tier.priceKopeks / 100).toLocaleString("ru-RU");

  if (tier.kind === "one_time") {
    return `₽ ${rubles} разово`;
  }
  if (tier.periodMonths === 1) {
    return `₽ ${rubles} / мес`;
  }
  if (tier.periodMonths === 12) {
    return `₽ ${rubles} / год`;
  }
  return `₽ ${rubles} / ${tier.periodMonths} мес`;
};
