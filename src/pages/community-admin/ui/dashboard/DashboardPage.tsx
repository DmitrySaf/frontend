"use client";

import { useCommunityQuery } from "@/entities/community";
import { type StatCard, formatRub, useCommunityStatsQuery } from "@/entities/subscription";
import { Loader2, TrendingDown, TrendingUp } from "lucide-react";
import { AdminShell } from "../AdminShell";
import { MembersLineChart, RevenueBarChart } from "./charts";

function StatCardItem({ card, index }: { card: StatCard; index: number }) {
  const TrendIcon = card.isUp ? TrendingUp : TrendingDown;
  return (
    <div
      style={{ animationDelay: `${index * 60}ms` }}
      className="flex-1 rounded-2xl border border-gray-200 bg-white shadow-sm p-4.5 flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-400 ease-out-quart"
    >
      <span className="text-[13px] text-gray-600">{card.label}</span>
      <span className="text-2xl font-bold font-mono text-black">{card.value}</span>
      <span className="flex items-center gap-1.5 text-xs text-gray-600">
        <TrendIcon className="size-3.5" />
        {card.trend}
      </span>
    </div>
  );
}

export function DashboardPage({ slug }: { slug: string }) {
  const { data: community } = useCommunityQuery(slug);
  const { data: stats, isLoading } = useCommunityStatsQuery(slug);

  return (
    <AdminShell slug={slug} title="Дашборд" subtitle={community?.displayName}>
      {isLoading || !stats ? (
        <div className="h-full flex items-center justify-center">
          <Loader2 className="size-6 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="p-4 md:p-6 space-y-5 max-w-5xl">
          {/* Стат-карточки */}
          <div className="flex flex-col sm:flex-row gap-3.5">
            {stats.cards.map((card, index) => (
              <StatCardItem key={card.label} card={card} index={index} />
            ))}
          </div>

          {/* Графики */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-[2] min-w-0 rounded-2xl border border-gray-200 bg-white shadow-sm p-4.5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[15px] font-bold text-black">Доход</span>
                <span className="px-2.5 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                  12 месяцев
                </span>
              </div>
              <RevenueBarChart data={stats.monthlyRevenue} />
            </div>

            <div className="flex-1 min-w-0 rounded-2xl border border-gray-200 bg-white shadow-sm p-4.5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[15px] font-bold text-black">Рост участников</span>
              </div>
              <MembersLineChart data={stats.memberGrowth} />
            </div>
          </div>

          {/* Тарифы */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4.5">
            <span className="text-[15px] font-bold text-black">Тарифы</span>
            {stats.tierStats.length > 0 ? (
              <div className="mt-3 overflow-x-auto">
                <div className="min-w-[480px] flex gap-3.5 pb-2 text-[11px] uppercase tracking-[.04em] text-gray-500">
                  <span className="flex-1">Тариф</span>
                  <span className="w-28">Цена</span>
                  <span className="w-28">Подписчики</span>
                  <span className="w-24 text-right">Доход</span>
                </div>
                {stats.tierStats.map((tier) => (
                  <div
                    key={tier.tierId}
                    className="min-w-[480px] flex items-center gap-3.5 py-3 border-t border-gray-200 -mx-2 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                  >
                    <span className="flex-1 text-sm font-semibold text-black truncate">
                      {tier.name}
                    </span>
                    <span className="w-28 text-[13px] font-mono text-gray-600">
                      {tier.priceLabel}
                    </span>
                    <span className="w-28 text-[13px] text-gray-600">{tier.subscribers} чел.</span>
                    <span className="w-24 text-right text-sm font-semibold font-mono text-black">
                      {formatRub(tier.revenueKopeks)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-gray-600">
                Тарифов пока нет — добавьте их в настройках сообщества.
              </p>
            )}
          </div>
        </div>
      )}
    </AdminShell>
  );
}
