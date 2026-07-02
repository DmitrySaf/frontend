"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { Button } from "@/shared/components";
import type { PricingTier } from "../model";
import { cn } from "@/shared/utils";

interface PricingCardProps {
  isFree: boolean;
  pricingTiers?: PricingTier[];
  memberCount: number;
  onJoin: (selectedTierId?: string) => void;
}

const formatInterval = (interval: PricingTier["interval"]): string => {
  switch (interval) {
    case "month":
      return "/ month";
    case "6months":
      return "/ 6 months";
    case "year":
      return "/ year";
    default:
      return "";
  }
};

const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const PricingCard = ({ isFree, pricingTiers, memberCount, onJoin }: PricingCardProps) => {
  const [selectedTierId, setSelectedTierId] = useState<string | undefined>(
    pricingTiers?.[0]?.id
  );

  const handleJoin = () => {
    onJoin(isFree ? undefined : selectedTierId);
  };

  const formatMemberCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}K`;
    }
    return count.toString();
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      {!isFree && pricingTiers && pricingTiers.length > 0 && (
        <div className="mb-4 space-y-2">
          {pricingTiers.map((tier) => (
            <label
              key={tier.id}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3 transition-colors",
                selectedTierId === tier.id
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <input
                type="radio"
                name="pricing"
                value={tier.id}
                checked={selectedTierId === tier.id}
                onChange={() => setSelectedTierId(tier.id)}
                className="size-4 accent-primary-500"
              />
              <div className="flex flex-1 items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  {formatPrice(tier.price)} {formatInterval(tier.interval)}
                </span>
                {tier.discount && (
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                    {tier.discount}% off
                  </span>
                )}
              </div>
            </label>
          ))}
        </div>
      )}

      <Button theme="primary" size="l" fluid onClick={handleJoin}>
        {isFree ? "Join for free" : "Join"}
      </Button>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
        <Users className="size-4" />
        <span>Join {formatMemberCount(memberCount)} members</span>
      </div>
    </div>
  );
};
