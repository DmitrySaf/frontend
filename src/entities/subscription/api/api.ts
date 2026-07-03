import { createMockCollection } from "@/shared/utils";
import { CURRENT_USER_ID } from "@/entities/message";
import { getTiers, seedDefaultTiers, type TierRecord } from "@/entities/tier";
import type { SubscriptionRecord, TransactionRecord } from "./types";

const subscriptions = createMockCollection<SubscriptionRecord>("subscriptions");
const transactions = createMockCollection<TransactionRecord>("transactions");
const seededCommunities = createMockCollection<{ id: string }>("sales_seeded_communities");

const MONTH_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Сид-история продаж за 12 месяцев: растущее число подписок по тарифам,
 * транзакция на каждую подписку. Если тарифов нет — создаются демо-тарифы.
 */
async function seedSalesHistory(communitySlug: string): Promise<void> {
  let tiers = await getTiers(communitySlug);
  if (tiers.length === 0) {
    tiers = await seedDefaultTiers(communitySlug);
  }

  const recurringTiers = tiers.filter((tier) => tier.kind === "recurring");
  const pool: TierRecord[] = recurringTiers.length > 0 ? recurringTiers : tiers;

  const now = Date.now();
  const newSubscriptions: SubscriptionRecord[] = [];
  const newTransactions: TransactionRecord[] = [];
  let userCounter = 0;

  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    // От ~3 подписок в начале к ~14 в текущем месяце
    const count = Math.round(3 + monthIndex + Math.random() * 2);
    const monthStart = now - (11 - monthIndex) * MONTH_MS;

    for (let i = 0; i < count; i++) {
      // Распределение: чаще всего первый тариф, реже последние
      const roll = Math.random();
      const tier =
        pool[roll < 0.65 ? 0 : roll < 0.88 ? Math.min(1, pool.length - 1) : pool.length - 1];

      const startedAt = monthStart + Math.random() * MONTH_MS * 0.9;
      const periodMonths = tier.period_months ?? 1;
      const expiresAt =
        tier.kind === "one_time" ? null : startedAt + periodMonths * MONTH_MS;

      userCounter += 1;
      const userId = `seed-user-${userCounter}`;

      newSubscriptions.push({
        id: crypto.randomUUID(),
        user_id: userId,
        community_id: communitySlug,
        tier_id: tier.id,
        status: expiresAt === null || expiresAt > now ? "active" : "expired",
        started_at: new Date(startedAt).toISOString(),
        expires_at: expiresAt === null ? null : new Date(expiresAt).toISOString(),
      });

      newTransactions.push({
        id: crypto.randomUUID(),
        user_id: userId,
        community_id: communitySlug,
        type: "subscription",
        amount_kopeks: tier.price_kopeks,
        status: "succeeded",
        metadata: { tier_id: tier.id, tier_name: tier.name },
        created_at: new Date(startedAt).toISOString(),
      });
    }
  }

  await subscriptions.insertMany(newSubscriptions);
  await transactions.insertMany(newTransactions);
  await seededCommunities.insert({ id: communitySlug });
}

export interface CommunitySales {
  subscriptions: SubscriptionRecord[];
  transactions: TransactionRecord[];
  tiers: TierRecord[];
}

/**
 * Продажи сообщества (подписки + транзакции + тарифы); при первом обращении сидируются
 */
export const getCommunitySales = async (communitySlug: string): Promise<CommunitySales> => {
  const seeded = await seededCommunities.list();
  const [allSubscriptions, allTransactions] = await Promise.all([
    subscriptions.list(),
    transactions.list(),
  ]);

  const communitySubscriptions = allSubscriptions.filter(
    (record) => record.community_id === communitySlug
  );

  if (
    communitySubscriptions.length === 0 &&
    !seeded.some((record) => record.id === communitySlug)
  ) {
    await seedSalesHistory(communitySlug);
    return getCommunitySales(communitySlug);
  }

  return {
    subscriptions: communitySubscriptions,
    transactions: allTransactions.filter(
      (record) => record.community_id === communitySlug && record.type === "subscription"
    ),
    tiers: await getTiers(communitySlug),
  };
};

/**
 * Симуляция покупки текущим пользователем (для витрины, этап 9):
 * подписка + транзакция создаются мгновенно
 */
export const purchaseTier = async (
  communitySlug: string,
  tier: { id: string; kind: string; priceKopeks: number; periodMonths: number | null; name: string }
): Promise<void> => {
  const now = Date.now();
  const expiresAt =
    tier.kind === "one_time" || tier.periodMonths == null
      ? null
      : new Date(now + tier.periodMonths * MONTH_MS).toISOString();

  await subscriptions.insert({
    user_id: CURRENT_USER_ID,
    community_id: communitySlug,
    tier_id: tier.id,
    status: "active",
    started_at: new Date(now).toISOString(),
    expires_at: expiresAt,
  });

  await transactions.insert({
    user_id: CURRENT_USER_ID,
    community_id: communitySlug,
    type: "subscription",
    amount_kopeks: tier.priceKopeks,
    status: "succeeded",
    metadata: { tier_id: tier.id, tier_name: tier.name },
    created_at: new Date(now).toISOString(),
  });
};
