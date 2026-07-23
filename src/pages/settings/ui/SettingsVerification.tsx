"use client";

import {
  type VerificationKind,
  approveMyVerification,
  submitVerification,
  useInvalidateMyVerification,
  useMyVerificationQuery,
} from "@/entities/verification";
import { Button, Skeleton, toast } from "@/shared/components";
import { cn } from "@/shared/utils";
import {
  BankBold20,
  ClockBold24,
  SealCheckmarkBold24,
  ShieldCheckmarkBold20,
  ShieldCheckmarkBold24,
  ShopBold20,
  UserBold20,
} from "@frosted-ui/icons";
import { useState } from "react";

const KIND_OPTIONS: {
  value: VerificationKind;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}[] = [
  { value: "passport", icon: UserBold20, title: "Паспорт", description: "Физическое лицо" },
  {
    value: "self_employed",
    icon: ShopBold20,
    title: "Самозанятый",
    description: "Налог на профдоход",
  },
  { value: "ip", icon: ShieldCheckmarkBold20, title: "ИП", description: "Индивидуальный предприниматель" },
  { value: "ooo", icon: BankBold20, title: "ООО", description: "Юридическое лицо" },
];

const KIND_LABELS: Record<VerificationKind, string> = {
  passport: "паспорт",
  self_employed: "самозанятый",
  ip: "ИП",
  ooo: "ООО",
};

function Banner({
  tone,
  icon: Icon,
  title,
  description,
  children,
}: {
  tone: "neutral" | "pending" | "passed";
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  const tones = {
    neutral: {
      bg: "bg-gray-100",
      border: "border-gray-200",
      ink: "text-ink",
      sub: "text-gray-600",
    },
    pending: {
      bg: "bg-warning-surface",
      border: "border-warning-border",
      ink: "text-warning-ink",
      sub: "text-warning-ink-muted",
    },
    passed: {
      bg: "bg-success-surface",
      border: "border-success-border",
      ink: "text-success-ink",
      sub: "text-success-ink-muted",
    },
  }[tone];

  return (
    <div className={cn("flex items-start gap-4 rounded-(--radius-card) border p-5", tones.bg, tones.border)}>
      <div
        className={cn(
          "size-[46px] shrink-0 rounded-lg bg-surface border flex items-center justify-center",
          tones.border
        )}
      >
        <Icon className={cn("size-6", tones.sub)} />
      </div>
      <div className="flex-1 min-w-0 space-y-1.5">
        <p className={cn("text-[17px] font-bold", tones.ink)}>{title}</p>
        <p className={cn("text-sm leading-[1.45]", tones.sub)}>{description}</p>
        {children}
      </div>
    </div>
  );
}

export function SettingsVerification() {
  const { data: verification, isLoading } = useMyVerificationQuery();
  const invalidate = useInvalidateMyVerification();

  const [isFlowOpen, setIsFlowOpen] = useState(false);
  const [selectedKind, setSelectedKind] = useState<VerificationKind | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedKind) return;
    setIsSubmitting(true);
    try {
      await submitVerification(selectedKind);
      invalidate();
      setIsFlowOpen(false);
      toast.success("Заявка отправлена на проверку");
    } catch (error) {
      toast.error("Не удалось отправить заявку", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSimulateApprove = async () => {
    await approveMyVerification();
    invalidate();
    toast.success("Верификация пройдена");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Верификация аккаунта</h2>
        <p className="text-sm text-gray-600">Подтвердите личность, чтобы получать выплаты.</p>
      </div>

      {isLoading || !verification ? (
        <div className="space-y-4">
          <Skeleton height={72} radius={12} />
          <Skeleton height={120} radius={16} />
        </div>
      ) : verification.status === "approved" ? (
        <Banner
          tone="passed"
          icon={SealCheckmarkBold24}
          title="Верификация пройдена"
          description="Личность подтверждена. Значок отображается в профиле, выплаты на карту доступны."
        />
      ) : verification.status === "pending" ? (
        <Banner
          tone="pending"
          icon={ClockBold24}
          title="Верификация в процессе"
          description="Документы на проверке. Обычно занимает до 2 рабочих дней — мы пришлём уведомление."
        >
          {/* Симуляция до подключения провайдера проверки */}
          <div className="pt-1.5">
            <Button theme="ghost" size="md" onClick={handleSimulateApprove}>
              Симулировать одобрение (тестовый режим)
            </Button>
          </div>
        </Banner>
      ) : (
        <>
          <Banner
            tone="neutral"
            icon={SealCheckmarkBold24}
            title="Аккаунт не верифицирован"
            description="Подтвердите личность, чтобы получать выплаты и значок рядом с именем."
          >
            {!isFlowOpen && (
              <div className="pt-1.5">
                <Button theme="primary" size="lg" onClick={() => setIsFlowOpen(true)}>
                  Пройти верификацию
                </Button>
              </div>
            )}
          </Banner>

          {isFlowOpen && (
            <div className="space-y-5">
              {/* Шаг 1 — тип */}
              <div className="space-y-2">
                <span className="text-sm font-medium text-ink">Кто вы</span>
                <div className="grid grid-cols-2 gap-2.5">
                  {KIND_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selectedKind === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setSelectedKind(option.value)}
                        className={cn(
                          "flex gap-3 p-3.5 rounded-lg border text-left transition-colors cursor-pointer",
                          isSelected
                            ? "border-gray-400 bg-gray-100 inset-ring inset-ring-gray-400"
                            : "border-gray-200 bg-surface hover:bg-gray-50"
                        )}
                      >
                        <Icon className="size-[18px] shrink-0 mt-0.5 text-gray-600" />
                        <span>
                          <span className="block text-sm font-semibold text-ink">
                            {option.title}
                          </span>
                          <span className="block mt-0.5 text-xs text-gray-600">
                            {option.description}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Шаг 2 — место встраиваемого виджета партнёра */}
              {selectedKind && (
                <div className="space-y-3">
                  <div className="h-52 rounded-lg border border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center gap-2 text-center px-6">
                    <ShieldCheckmarkBold24 className="size-6 text-gray-400" />
                    <p className="text-sm font-medium text-gray-600">
                      Здесь появится форма проверки документов ({KIND_LABELS[selectedKind]})
                    </p>
                    <p className="text-xs text-gray-500">
                      Встраиваемый виджет партнёра по верификации — подключается на этапе
                      интеграции.
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Button
                      theme="primary"
                      size="lg"
                      onClick={handleSubmit}
                      isLoading={isSubmitting}
                    >
                      Отправить на проверку
                    </Button>
                    <Button theme="ghost" size="lg" onClick={() => setIsFlowOpen(false)}>
                      Отмена
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
