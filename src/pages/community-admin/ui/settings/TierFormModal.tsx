"use client";

import {
  TIER_NAME_MAX_LENGTH,
  type Tier,
  type TierFormData,
  type TierInput,
  type TierKind,
  tierFormSchema,
} from "@/entities/tier";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  Input,
  SegmentedControl,
} from "@/shared/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface TierFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: TierInput) => Promise<unknown>;
  /** null — создание нового тарифа */
  tier: Tier | null;
}

function toFormValues(tier: Tier | null): TierFormData {
  return {
    name: tier?.name ?? "",
    kind: tier?.kind ?? "recurring",
    priceRubles: tier ? String(Math.round(tier.priceKopeks / 100)) : "",
    periodMonths: tier?.periodMonths != null ? String(tier.periodMonths) : "1",
    discountPercent: tier?.discountPercent != null ? String(tier.discountPercent) : "",
  };
}

export function TierFormModal({ isOpen, onClose, onSubmit, tier }: TierFormModalProps) {
  const methods = useForm<TierFormData>({
    resolver: zodResolver(tierFormSchema),
    defaultValues: toFormValues(tier),
  });

  const {
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = methods;

  const kind = watch("kind");

  useEffect(() => {
    if (isOpen) {
      reset(toFormValues(tier));
    }
  }, [isOpen, tier, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async (data: TierFormData) => {
    await onSubmit({
      name: data.name,
      kind: data.kind,
      priceKopeks: Number(data.priceRubles) * 100,
      periodMonths: data.kind === "recurring" ? Number(data.periodMonths) : null,
      discountPercent: data.discountPercent === "" ? null : Number(data.discountPercent),
    });
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{tier ? "Изменить тариф" : "Новый тариф"}</DialogTitle>
        </DialogHeader>

        <Form methods={methods} onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            size="m"
            label="Название"
            placeholder="Например, Месячный"
            maxLength={TIER_NAME_MAX_LENGTH}
            error={errors.name?.message}
          />

          <div className="space-y-2">
            <span className="text-sm font-medium text-ink">Тип оплаты</span>
            <SegmentedControl<TierKind>
              value={kind}
              onChange={(value) => setValue("kind", value, { shouldValidate: true })}
              options={[
                { value: "recurring", label: "Подписка" },
                { value: "one_time", label: "Разовый платёж" },
              ]}
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                name="priceRubles"
                size="m"
                label="Цена, ₽"
                placeholder="990"
                error={errors.priceRubles?.message}
              />
            </div>
            {kind === "recurring" && (
              <div className="flex-1">
                <Input
                  name="periodMonths"
                  size="m"
                  label="Период, мес"
                  placeholder="1"
                  error={errors.periodMonths?.message}
                />
              </div>
            )}
            <div className="flex-1">
              <Input
                name="discountPercent"
                size="m"
                label="Скидка, %"
                placeholder="—"
                description="Необязательно"
                error={errors.discountPercent?.message}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" theme="ghost" size="m" onClick={handleClose}>
              Отмена
            </Button>
            <Button type="submit" theme="primary" size="m" isLoading={isSubmitting}>
              {tier ? "Сохранить" : "Создать"}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
