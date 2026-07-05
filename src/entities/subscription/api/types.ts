// Формы повторяют docs/db-schema.md (subscriptions, transactions).

export type SubscriptionStatus = "active" | "canceled" | "expired";
export type TransactionType = "subscription" | "payout";
export type TransactionStatus = "succeeded" | "pending" | "failed";

export interface SubscriptionRecord {
  id: string;
  user_id: string;
  community_id: string;
  /** null — тариф удалён (история сохраняется) */
  tier_id: string | null;
  status: SubscriptionStatus;
  started_at: string;
  /** null — бессрочно (one_time) */
  expires_at: string | null;
}

export interface TransactionRecord {
  id: string;
  user_id: string;
  community_id: string | null;
  type: TransactionType;
  amount_kopeks: number;
  status: TransactionStatus;
  metadata: Record<string, unknown>;
  created_at: string;
}

// Доменные типы дашборда
export interface MonthPoint {
  /** «янв», «фев», … */
  label: string;
  value: number;
}

export interface StatCard {
  label: string;
  value: string;
  trend: string;
  isUp: boolean;
}

export interface TierStat {
  tierId: string;
  name: string;
  priceLabel: string;
  subscribers: number;
  revenueKopeks: number;
}

export interface CommunityStats {
  cards: StatCard[];
  monthlyRevenue: MonthPoint[];
  memberGrowth: MonthPoint[];
  tierStats: TierStat[];
}
