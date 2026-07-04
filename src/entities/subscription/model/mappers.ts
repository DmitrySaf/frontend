import { transformTier, formatTierPrice } from "@/entities/tier";
import type { CommunitySales } from "../api/api";
import type { CommunityStats, MonthPoint, StatCard } from "../api/types";

const MONTH_LABELS = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
const DAY_MS = 24 * 60 * 60 * 1000;

function formatRub(kopeks: number): string {
  const rubles = Math.round(kopeks / 100);
  if (rubles >= 1_000_000) return `₽ ${(rubles / 1_000_000).toFixed(1).replace(".", ",")}M`;
  if (rubles >= 10_000) return `₽ ${Math.round(rubles / 1000)}K`;
  return `₽ ${rubles.toLocaleString("ru-RU")}`;
}

/** Последние 12 календарных месяцев: [{year, month}] от старого к новому */
function lastTwelveMonths(): { year: number; month: number }[] {
  const result: { year: number; month: number }[] = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    result.push({ year: date.getFullYear(), month: date.getMonth() });
  }
  return result;
}

/**
 * Статистика дашборда из продаж: стат-карточки, доход по месяцам,
 * рост участников, разбивка по тарифам
 */
export const transformCommunityStats = (sales: CommunitySales): CommunityStats => {
  const months = lastTwelveMonths();
  const now = Date.now();

  const monthlyRevenue: MonthPoint[] = months.map(({ year, month }) => ({
    label: MONTH_LABELS[month],
    value: sales.transactions
      .filter((tx) => {
        const date = new Date(tx.created_at);
        return (
          tx.status === "succeeded" &&
          date.getFullYear() === year &&
          date.getMonth() === month
        );
      })
      .reduce((sum, tx) => sum + tx.amount_kopeks, 0),
  }));

  // Накопительный рост участников по месяцам
  const memberGrowth: MonthPoint[] = months.map(({ year, month }) => {
    const monthEnd = new Date(year, month + 1, 1).getTime();
    return {
      label: MONTH_LABELS[month],
      value: sales.subscriptions.filter(
        (sub) => new Date(sub.started_at).getTime() < monthEnd
      ).length,
    };
  });

  // Карточки: доход за 30 дней, участники, активные подписки — с дельтами
  const revenueLast30 = sales.transactions
    .filter((tx) => tx.status === "succeeded" && now - new Date(tx.created_at).getTime() < 30 * DAY_MS)
    .reduce((sum, tx) => sum + tx.amount_kopeks, 0);
  const revenuePrev30 = sales.transactions
    .filter((tx) => {
      const age = now - new Date(tx.created_at).getTime();
      return tx.status === "succeeded" && age >= 30 * DAY_MS && age < 60 * DAY_MS;
    })
    .reduce((sum, tx) => sum + tx.amount_kopeks, 0);
  const revenueDeltaPercent =
    revenuePrev30 > 0 ? Math.round(((revenueLast30 - revenuePrev30) / revenuePrev30) * 100) : 0;

  const membersTotal = sales.subscriptions.length;
  const membersLast30 = sales.subscriptions.filter(
    (sub) => now - new Date(sub.started_at).getTime() < 30 * DAY_MS
  ).length;

  const activeSubscriptions = sales.subscriptions.filter((sub) => sub.status === "active").length;

  const cards: StatCard[] = [
    {
      label: "Доход за 30 дней",
      value: formatRub(revenueLast30),
      trend: `${revenueDeltaPercent >= 0 ? "+" : ""}${revenueDeltaPercent}% к прошлому месяцу`,
      isUp: revenueDeltaPercent >= 0,
    },
    {
      label: "Участников",
      value: membersTotal.toLocaleString("ru-RU"),
      trend: `+${membersLast30} за месяц`,
      isUp: membersLast30 >= 0,
    },
    {
      label: "Активных подписок",
      value: activeSubscriptions.toLocaleString("ru-RU"),
      trend: `${membersTotal > 0 ? Math.round((activeSubscriptions / membersTotal) * 100) : 0}% от всех`,
      isUp: true,
    },
  ];

  const tierStats = sales.tiers.map((tierRecord) => {
    const tier = transformTier(tierRecord);
    return {
      tierId: tier.id,
      name: tier.name,
      priceLabel: formatTierPrice(tier),
      subscribers: sales.subscriptions.filter((sub) => sub.tier_id === tier.id).length,
      revenueKopeks: sales.transactions
        .filter((tx) => tx.status === "succeeded" && tx.metadata?.tier_id === tier.id)
        .reduce((sum, tx) => sum + tx.amount_kopeks, 0),
    };
  });

  return { cards, monthlyRevenue, memberGrowth, tierStats };
};

export { formatRub };

export interface TransactionItem {
  id: string;
  type: "subscription" | "payout";
  title: string;
  createdAt: string;
  amountKopeks: number;
  /** true — деньги пришли, false — ушли */
  isIncoming: boolean;
  statusLabel: string;
}

const STATUS_LABELS: Record<string, string> = {
  succeeded: "Завершено",
  pending: "В обработке",
  failed: "Ошибка",
};

export const transformTransactions = (
  records: import("../api/types").TransactionRecord[]
): TransactionItem[] => {
  return records.map((record) => ({
    id: record.id,
    type: record.type,
    title:
      record.type === "payout"
        ? "Вывод средств на карту"
        : `Подписка — ${String(record.metadata?.tier_name ?? "тариф")}`,
    createdAt: record.created_at,
    amountKopeks: record.amount_kopeks,
    isIncoming: record.type === "subscription",
    statusLabel: STATUS_LABELS[record.status] ?? record.status,
  }));
};
