"use client";

import { Button } from "@/shared/components";
import { cn } from "@/shared/utils";

interface StorefrontCtaBarProps {
  show: boolean;
  price: string | null;
  tierName: string | null;
  label: string;
  onClick: () => void;
  isJoining: boolean;
}

/**
 * Липкий CTA-бар мобильной витрины (паттерн Whop/Apple product page):
 * появляется, когда карточка тарифов ушла за скролл — цена и действие
 * всегда под большим пальцем. На lg+ его нет: там карточка sticky сама.
 */
export function StorefrontCtaBar({
  show,
  price,
  tierName,
  label,
  onClick,
  isJoining,
}: StorefrontCtaBarProps) {
  return (
    <div
      aria-hidden={!show}
      className={cn(
        "lg:hidden fixed inset-x-0 bottom-0 z-[var(--z-sticky)]",
        "bg-surface/90 backdrop-blur-lg border-t border-gray-200 px-4 pt-3 pb-safe-3",
        "transition-[transform,opacity] duration-300 ease-out-expo",
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="mx-auto flex w-full max-w-md items-center gap-4">
        {price && (
          <div className="min-w-0 shrink-0">
            {tierName && <p className="max-w-32 truncate text-xs text-gray-600">{tierName}</p>}
            <p className="whitespace-nowrap font-mono text-[15px] font-semibold text-ink">
              {price}
            </p>
          </div>
        )}
        <Button theme="primary" size="l" onClick={onClick} isLoading={isJoining} className="flex-1">
          {label}
        </Button>
      </div>
    </div>
  );
}
