"use client";

import { type Tier, formatTierPrice } from "@/entities/tier";
import { Button } from "@/shared/components";
import { cn } from "@/shared/utils";
import { Users } from "lucide-react";

interface PricingCardProps {
  tiers: Tier[];
  selectedTierId: string | null;
  onSelectTier: (tierId: string) => void;
  isMember: boolean;
  membersCount: number;
  onJoin: () => void;
  onOpenCommunity: () => void;
  isJoining: boolean;
}

export function PricingCard({
  tiers,
  selectedTierId,
  onSelectTier,
  isMember,
  membersCount,
  onJoin,
  onOpenCommunity,
  isJoining,
}: PricingCardProps) {
  const isFree = tiers.length === 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4.5 space-y-3.5">
      {!isMember && !isFree && (
        <div className="space-y-2">
          {tiers.map((tier) => {
            const isSelected = tier.id === selectedTierId;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => onSelectTier(tier.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-[14px] border text-left transition-colors cursor-pointer",
                  isSelected
                    ? "border-primary-600 border-2 bg-primary-600/5"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                )}
              >
                <span
                  className={cn(
                    "size-4 shrink-0 rounded-full border-2 transition-colors",
                    isSelected
                      ? "border-primary-600 bg-primary-600 shadow-[inset_0_0_0_3px_#fff]"
                      : "border-gray-300 bg-white"
                  )}
                />
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-semibold text-black truncate">
                    {tier.name}
                  </span>
                  <span className="block text-[13px] font-mono text-gray-600">
                    {formatTierPrice(tier)}
                  </span>
                </span>
                {tier.discountPercent != null && (
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                    −{tier.discountPercent}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {isMember ? (
        <Button theme="primary" size="l" fluid onClick={onOpenCommunity}>
          Открыть сообщество
        </Button>
      ) : (
        <Button theme="primary" size="l" fluid onClick={onJoin} isLoading={isJoining}>
          {isFree ? "Присоединиться бесплатно" : "Присоединиться"}
        </Button>
      )}

      {membersCount > 0 && (
        <p className="flex items-center justify-center gap-1.5 text-[13px] text-gray-600">
          <Users className="size-[15px]" />
          {membersCount.toLocaleString("ru-RU")}{" "}
          {membersCount % 10 === 1 && membersCount % 100 !== 11
            ? "участник"
            : membersCount % 10 >= 2 &&
                membersCount % 10 <= 4 &&
                (membersCount % 100 < 12 || membersCount % 100 > 14)
              ? "участника"
              : "участников"}
        </p>
      )}
    </div>
  );
}
