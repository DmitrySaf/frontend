import { getSessionUserId, getSessionUserIdOrNull } from "@/api/auth";
import { createBrowserClient } from "@/api/browser-client";
import { getCommunityIdBySlug } from "@/entities/community";
import { type TierRecord, getTiers } from "@/entities/tier";
import type {
  SubscriptionRecord,
  SubscriptionStatus,
  TransactionRecord,
  TransactionStatus,
  TransactionType,
} from "./types";

const SUBSCRIPTION_FIELDS = "id, user_id, community_id, tier_id, status, started_at, expires_at";
const TRANSACTION_FIELDS =
  "id, user_id, community_id, type, amount_kopeks, status, metadata, created_at";

function castSubscription(record: Record<string, unknown>): SubscriptionRecord {
  return { ...record, status: record.status as SubscriptionStatus } as SubscriptionRecord;
}

function castTransaction(record: Record<string, unknown>): TransactionRecord {
  return {
    ...record,
    type: record.type as TransactionType,
    status: record.status as TransactionStatus,
  } as TransactionRecord;
}

/**
 * Число участников сообщества (для витрины считается на сервере в get_storefront)
 */
export const getCommunityMembersCount = async (communitySlug: string): Promise<number> => {
  const client = createBrowserClient();
  const communityId = await getCommunityIdBySlug(communitySlug);

  const { count, error } = await client
    .from("community_members")
    .select("id", { count: "exact", head: true })
    .eq("community_id", communityId);

  if (error) {
    throw new Error(error.message);
  }

  return count ?? 0;
};

/**
 * Транзакции текущего пользователя: поступления по его сообществам + его выплаты
 */
export const getMyTransactions = async (
  ownedCommunitySlugs: string[]
): Promise<TransactionRecord[]> => {
  const client = createBrowserClient();
  const userId = await getSessionUserIdOrNull(client);
  if (!userId) return [];

  const communityIds = await Promise.all(ownedCommunitySlugs.map(getCommunityIdBySlug));

  const [payoutsResult, incomeResult] = await Promise.all([
    client
      .from("transactions")
      .select(TRANSACTION_FIELDS)
      .eq("user_id", userId)
      .eq("type", "payout"),
    communityIds.length > 0
      ? client
          .from("transactions")
          .select(TRANSACTION_FIELDS)
          .eq("type", "subscription")
          .in("community_id", communityIds)
      : Promise.resolve({ data: [], error: null }),
  ]);

  if (payoutsResult.error) {
    throw new Error(payoutsResult.error.message);
  }
  if (incomeResult.error) {
    throw new Error(incomeResult.error.message);
  }

  return [...(payoutsResult.data ?? []), ...(incomeResult.data ?? [])]
    .map(castTransaction)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
};

export interface CommunitySales {
  subscriptions: SubscriptionRecord[];
  transactions: TransactionRecord[];
  tiers: TierRecord[];
}

/**
 * Продажи сообщества для дашборда (RLS: видит только админ)
 */
export const getCommunitySales = async (communitySlug: string): Promise<CommunitySales> => {
  const client = createBrowserClient();
  const communityId = await getCommunityIdBySlug(communitySlug);

  const [subscriptionsResult, transactionsResult, tiers] = await Promise.all([
    client.from("subscriptions").select(SUBSCRIPTION_FIELDS).eq("community_id", communityId),
    client
      .from("transactions")
      .select(TRANSACTION_FIELDS)
      .eq("community_id", communityId)
      .eq("type", "subscription"),
    getTiers(communitySlug),
  ]);

  if (subscriptionsResult.error) {
    throw new Error(subscriptionsResult.error.message);
  }
  if (transactionsResult.error) {
    throw new Error(transactionsResult.error.message);
  }

  return {
    subscriptions: (subscriptionsResult.data ?? []).map(castSubscription),
    transactions: (transactionsResult.data ?? []).map(castTransaction),
    tiers,
  };
};

/**
 * Симуляция покупки: подписка + транзакция + membership создаются
 * атомарно на сервере (RPC simulate_purchase); инвайт тратится там же
 */
export const purchaseTier = async (
  communitySlug: string,
  tier: {
    id: string;
    kind: string;
    priceKopeks: number;
    periodMonths: number | null;
    name: string;
  },
  inviteCode?: string | null
): Promise<void> => {
  const client = createBrowserClient();
  await getSessionUserId(client);

  const { error } = await client.rpc("simulate_purchase", {
    p_tier_id: tier.id,
    ...(inviteCode ? { p_invite_code: inviteCode } : {}),
  });

  if (error) {
    throw new Error(error.message);
  }
};
