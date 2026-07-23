"use client";

import { type Tier, formatTierPrice } from "@/entities/tier";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components";
import { Beaker16 } from "@frosted-ui/icons";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  communityName: string;
  tier: Tier | null;
  onConfirm: () => Promise<void>;
  isPending: boolean;
}

/**
 * Модалка-чек симуляции оплаты: тариф, сумма, плашка тестового режима
 */
export function CheckoutModal({
  isOpen,
  onClose,
  communityName,
  tier,
  onConfirm,
  isPending,
}: CheckoutModalProps) {
  if (!tier) return null;

  const rubles = Math.round(tier.priceKopeks / 100).toLocaleString("ru-RU");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Оформление подписки</DialogTitle>
          <DialogDescription>{communityName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-lg bg-gray-100 inset-ring inset-ring-gray-200">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink truncate">{tier.name}</p>
              <p className="text-[13px] font-mono text-gray-600">{formatTierPrice(tier)}</p>
            </div>
            {tier.discountPercent != null && (
              <span className="px-2 py-0.5 rounded-full bg-surface text-xs font-medium text-gray-600">
                −{tier.discountPercent}%
              </span>
            )}
          </div>

          <div className="flex items-center justify-between px-1">
            <span className="text-sm text-gray-600">Итого</span>
            <span className="text-lg font-bold font-mono text-ink">₽ {rubles}</span>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-[12px] bg-warning-surface border border-warning-border">
            <Beaker16 className="size-4 shrink-0 mt-0.5 text-warning-ink-muted" />
            <p className="text-[13px] leading-[1.45] text-warning-ink">
              Тестовый режим — деньги не списываются. Реальный платёжный провайдер будет подключён
              позже.
            </p>
          </div>

          <Button theme="primary" size="xl" fluid onClick={onConfirm} isLoading={isPending}>
            Оплатить ₽ {rubles}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
