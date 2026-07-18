"use client";

import {
  useAddPayoutMethodMutation,
  useMyPayoutMethodsQuery,
  useRemovePayoutMethodMutation,
  useSetDefaultPayoutMethodMutation,
} from "@/entities/payout";
import { useMyVerificationQuery } from "@/entities/verification";
import {
  Button,
  DeleteDialog,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  Input,
  Skeleton,
} from "@/shared/components";
import { REQUIRED_MESSAGE } from "@/shared/constants";
import { cn } from "@/shared/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeCheck, Check, CreditCard, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const addCardSchema = z.object({
  lastName: z.string().min(1, REQUIRED_MESSAGE),
  firstName: z.string().min(1, REQUIRED_MESSAGE),
  middleName: z.string(),
  cardNumber: z
    .string()
    .refine((value) => value.replace(/\D/g, "").length === 16, "16 цифр номера карты"),
});

type AddCardFormData = z.infer<typeof addCardSchema>;

function AddCardModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddCardFormData) => Promise<unknown>;
}) {
  const methods = useForm<AddCardFormData>({
    resolver: zodResolver(addCardSchema),
    defaultValues: { lastName: "", firstName: "", middleName: "", cardNumber: "" },
  });
  const {
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = methods;

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async (data: AddCardFormData) => {
    await onSubmit(data);
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {/* Форма: заполненную не закрыть случайным кликом снаружи — только явной «Отменой» */}
      <DialogContent
        className="sm:max-w-md"
        aria-describedby={undefined}
        dismissOnOutside={!isDirty}
      >
        <DialogHeader>
          <DialogTitle>Добавить карту</DialogTitle>
        </DialogHeader>

        <Form methods={methods} onSubmit={handleSubmit} className="space-y-3.5">
          <Input
            name="lastName"
            size="l"
            label="Фамилия"
            placeholder="Паровозов"
            error={errors.lastName?.message}
          />
          <Input
            name="firstName"
            size="l"
            label="Имя"
            placeholder="Аркадий"
            error={errors.firstName?.message}
          />
          <Input
            name="middleName"
            size="l"
            label="Отчество"
            placeholder="Петрович"
            error={errors.middleName?.message}
          />
          <Input
            name="cardNumber"
            size="l"
            label="Номер карты"
            placeholder="0000 0000 0000 0000"
            mask="0000 0000 0000 0000"
            error={errors.cardNumber?.message}
          />

          <DialogFooter>
            <Button type="button" theme="secondary" size="l" onClick={handleClose}>
              Отмена
            </Button>
            <Button type="submit" theme="primary" size="l" isLoading={isSubmitting}>
              Добавить
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function SettingsPayment() {
  const { data: cards, isLoading } = useMyPayoutMethodsQuery();
  const { data: verification } = useMyVerificationQuery();
  const addCard = useAddPayoutMethodMutation();
  const setDefault = useSetDefaultPayoutMethodMutation();
  const removeCard = useRemovePayoutMethodMutation();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deletingCardId, setDeletingCardId] = useState<string | null>(null);

  const isVerified = verification?.status === "approved";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Вывод средств</h2>
        <p className="text-sm text-gray-600">Выплаты приходят автоматически на выбранную карту.</p>
      </div>

      {!isVerified && (
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-100 px-4 py-3">
          <BadgeCheck className="size-[18px] shrink-0 text-gray-600" />
          <p className="flex-1 text-sm text-gray-700">
            Чтобы получать выплаты,{" "}
            <Link
              href="/settings/verification"
              className="font-semibold text-primary-600 hover:underline"
            >
              пройдите верификацию
            </Link>
            .
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink">Добавленные карты</span>
        <Button theme="outline" size="m" Icon={Plus} onClick={() => setIsAddOpen(true)}>
          Добавить карту
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton height={64} radius={12} />
          <Skeleton height={64} radius={12} />
        </div>
      ) : cards && cards.length > 0 ? (
        <div className="space-y-2.5">
          {cards.map((card) => (
            <div
              key={card.id}
              className={cn(
                "flex items-center gap-3.5 p-4 rounded-2xl border bg-surface",
                card.isDefault
                  ? "border-gray-400 inset-ring inset-ring-gray-400"
                  : "border-gray-200"
              )}
            >
              <button
                type="button"
                onClick={() => setDefault.mutate(card.id)}
                aria-label="Выбрать для выплат"
                className="touch-hit size-5 shrink-0 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer"
              >
                {card.isDefault && <span className="size-2.5 rounded-full bg-primary-500" />}
              </button>

              <div className="w-11 h-[30px] shrink-0 rounded-[8px] border border-gray-200 bg-gray-100 flex items-center justify-center">
                <CreditCard className="size-[18px] text-gray-600" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold font-mono text-ink">
                  {card.brand} •••• {card.last4}
                </p>
                <p className="text-xs text-gray-600 truncate">{card.holderName}</p>
              </div>

              {/* Пилл-подпись скрыта на узких (её роль дублирует рамка-ring карточки),
                  иначе она сжимала имя владельца и налезала на корзину */}
              {card.isDefault && (
                <span className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                  <Check className="size-3" />
                  Выбрана для выплат
                </span>
              )}

              <button
                type="button"
                onClick={() => setDeletingCardId(card.id)}
                aria-label="Удалить карту"
                className="touch-hit shrink-0 text-gray-500 hover:text-danger transition-colors cursor-pointer"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <div className="size-14 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
            <CreditCard className="size-6 text-gray-500" />
          </div>
          <p className="text-[15px] font-semibold text-ink">Нет привязанных карт</p>
          <p className="text-sm text-gray-600 max-w-56">
            Добавьте карту, чтобы получать выплаты с продаж.
          </p>
          <Button theme="primary" size="l" Icon={Plus} onClick={() => setIsAddOpen(true)}>
            Добавить карту
          </Button>
        </div>
      )}

      <AddCardModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={(data) => addCard.mutateAsync(data)}
      />

      <DeleteDialog
        isOpen={deletingCardId !== null}
        onClose={() => setDeletingCardId(null)}
        onDelete={async () => {
          if (deletingCardId) {
            await removeCard.mutateAsync(deletingCardId);
          }
        }}
        title="Удалить карту?"
        description="Выплаты на эту карту приходить не будут. Привязать её снова можно в любой момент."
      />
    </div>
  );
}
