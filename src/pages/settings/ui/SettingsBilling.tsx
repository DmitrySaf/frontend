"use client";

import { useMemo, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Loader2, ReceiptText } from "lucide-react";
import { useCommunitiesQuery } from "@/entities/community";
import { useMyTransactionsQuery, type TransactionItem } from "@/entities/subscription";
import { cn, formatRelativeTime } from "@/shared/utils";

type Filter = "all" | "income" | "payouts";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "income", label: "Поступления" },
  { value: "payouts", label: "Выводы" },
];

function TransactionRow({ item }: { item: TransactionItem }) {
  const Icon = item.isIncoming ? ArrowDownLeft : ArrowUpRight;
  const rubles = Math.round(item.amountKopeks / 100).toLocaleString("ru-RU");

  return (
    <div className="flex items-center gap-3.5 py-3.5 border-b border-gray-200">
      <div className="size-9 shrink-0 rounded-[10px] border border-gray-200 bg-gray-100 flex items-center justify-center">
        <Icon className="size-4 text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-black truncate">{item.title}</p>
        <p className="text-xs text-gray-600">{formatRelativeTime(item.createdAt)}</p>
      </div>
      <span className="px-2.5 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
        {item.statusLabel}
      </span>
      <span className="text-sm font-semibold font-mono text-black whitespace-nowrap">
        {item.isIncoming ? "+" : "−"} ₽ {rubles}
      </span>
    </div>
  );
}

export function SettingsBilling() {
  const [filter, setFilter] = useState<Filter>("all");

  const { data: communities, isLoading: isCommunitiesLoading } = useCommunitiesQuery();
  const ownedSlugs = useMemo(
    () => (communities ?? []).map((community) => community.name),
    [communities]
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

      <div className="flex gap-2">
        {FILTERS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setFilter(option.value)}
            className={cn(
              "px-3.5 h-8 rounded-full text-[13px] font-medium border transition-colors cursor-pointer",
              filter === option.value
                ? "bg-gray-100 border-gray-400 text-black"
                : "bg-white border-gray-200 text-gray-600 hover:text-black"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {isLoading || isCommunitiesLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="size-6 animate-spin text-gray-500" />
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
            <ReceiptText className="size-6 text-gray-500" />
          </div>
          <p className="text-[15px] font-semibold text-black">Пока нет транзакций</p>
          <p className="text-sm text-gray-600 max-w-56">
            Здесь появятся платежи и выплаты после первой продажи.
          </p>
        </div>
      )}
    </div>
  );
}
