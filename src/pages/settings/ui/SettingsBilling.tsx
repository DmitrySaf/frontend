"use client";

import { useCommunitiesQuery } from "@/entities/community";
import { type TransactionItem, useMyTransactionsQuery } from "@/entities/subscription";
import { SegmentedControl, Skeleton } from "@/shared/components";
import { useSessionUserId } from "@/shared/composables";
import { cn, formatRelativeTime } from "@/shared/utils";
import { ArrowDownLeftBold16, ArrowUpRightBold16, ReceiptBold24 } from "@frosted-ui/icons";
import { useMemo, useState } from "react";

type Filter = "all" | "income" | "payouts";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "income", label: "Поступления" },
  { value: "payouts", label: "Выводы" },
];

function TransactionRow({ item }: { item: TransactionItem }) {
  const Icon = item.isIncoming ? ArrowDownLeftBold16 : ArrowUpRightBold16;
  const rubles = Math.round(item.amountKopeks / 100).toLocaleString("ru-RU");

  return (
    <div className="flex items-center gap-3.5 py-3.5 border-b border-gray-200">
      <div className="size-9 shrink-0 rounded-[10px] border border-gray-200 bg-gray-100 flex items-center justify-center">
        <Icon className="size-4 text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-ink truncate">{item.title}</p>
        <p className="text-xs text-gray-600">{formatRelativeTime(item.createdAt)}</p>
      </div>
      <span className="px-2.5 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
        {item.statusLabel}
      </span>
      <span className="text-sm font-semibold font-mono text-ink whitespace-nowrap">
        {item.isIncoming ? "+" : "−"} ₽ {rubles}
      </span>
    </div>
  );
}

export function SettingsBilling() {
  const [filter, setFilter] = useState<Filter>("all");

  const { data: communities, isLoading: isCommunitiesLoading } = useCommunitiesQuery();
  const myUserId = useSessionUserId();
  const ownedSlugs = useMemo(
    () =>
      (communities ?? [])
        .filter((community) => community.ownerId === myUserId)
        .map((community) => community.name),
    [communities, myUserId]
  );

  const { data: transactions, isLoading } = useMyTransactionsQuery(
    ownedSlugs,
    !isCommunitiesLoading
  );

  const filtered = (transactions ?? []).filter((item) => {
    if (filter === "income") return item.isIncoming;
    if (filter === "payouts") return !item.isIncoming;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Транзакции</h2>
        <p className="text-sm text-gray-600">История платежей и выплат.</p>
      </div>

      <SegmentedControl options={FILTERS} value={filter} onChange={setFilter} size="s" />

      {isLoading || isCommunitiesLoading ? (
        <div className="space-y-3">
          <Skeleton height={56} radius={12} />
          <Skeleton height={56} radius={12} />
          <Skeleton height={56} radius={12} />
        </div>
      ) : filtered.length > 0 ? (
        <div>
          {filtered.map((item) => (
            <TransactionRow key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <div className="size-14 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
            <ReceiptBold24 className="size-6 text-gray-500" />
          </div>
          <p className="text-[15px] font-semibold text-ink">Пока нет транзакций</p>
          <p className="text-sm text-gray-600 max-w-56">
            Здесь появятся платежи и выплаты после первой продажи.
          </p>
        </div>
      )}
    </div>
  );
}
