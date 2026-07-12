"use client";

import {
  type CommunityVisibility,
  clearLastVisitedCommunity,
  useCommunityProfileQuery,
  useDeleteCommunityMutation,
  useUpdateCommunityProfileMutation,
} from "@/entities/community";
import {
  type Tier,
  type TierInput,
  formatTierPrice,
  useCreateTierMutation,
  useDeleteTierMutation,
  useSetTierActiveMutation,
  useTiersQuery,
  useUpdateTierMutation,
} from "@/entities/tier";
import { Button, DeleteDialog, Input, Switch, Textarea } from "@/shared/components";
import { REQUIRED_MESSAGE } from "@/shared/constants";
import { cn } from "@/shared/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOff, Globe, Link2, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { AdminShell } from "../AdminShell";
import { TierFormModal } from "./TierFormModal";

const settingsSchema = z.object({
  displayName: z.string().min(1, REQUIRED_MESSAGE),
  description: z.string(),
  slug: z.string(),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

const VISIBILITY_OPTIONS: {
  value: CommunityVisibility;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}[] = [
  {
    value: "hidden",
    icon: EyeOff,
    title: "Скрытое",
    description: "По прямой ссылке — 404, вход только по приглашению",
  },
  {
    value: "unlisted",
    icon: Link2,
    title: "По ссылке",
    description: "Витрину видит любой, у кого есть ссылка",
  },
  {
    value: "live",
    icon: Globe,
    title: "Открытое",
    description: "Витрина доступна всем",
  },
];

export function CommunitySettingsPage({ slug }: { slug: string }) {
  const router = useRouter();
  const { data: profile, isLoading } = useCommunityProfileQuery(slug);
  const { data: tiers } = useTiersQuery(slug);

  const updateProfile = useUpdateCommunityProfileMutation();
  const deleteCommunity = useDeleteCommunityMutation();
  const createTier = useCreateTierMutation(slug);
  const updateTier = useUpdateTierMutation(slug);
  const setTierActive = useSetTierActiveMutation(slug);
  const deleteTier = useDeleteTierMutation(slug);

  const methods = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { displayName: "", description: "", slug },
  });
  const {
    formState: { errors, isDirty: isFormDirty },
    reset,
    handleSubmit,
  } = methods;

  const [visibility, setVisibility] = useState<CommunityVisibility>("hidden");

  const [tierModal, setTierModal] = useState<{ open: boolean; tier: Tier | null }>({
    open: false,
    tier: null,
  });
  const [deletingTierId, setDeletingTierId] = useState<string | null>(null);
  const [isDeleteCommunityOpen, setIsDeleteCommunityOpen] = useState(false);

  useEffect(() => {
    if (profile) {
      reset({ displayName: profile.displayName, description: profile.description, slug });
      setVisibility(profile.visibility);
    }
  }, [profile, reset, slug]);

  const isDirty = isFormDirty || (!!profile && visibility !== profile.visibility);

  const handleSave = handleSubmit(async (data) => {
    await updateProfile.mutateAsync({
      slug,
      displayName: data.displayName,
      description: data.description,
      visibility,
    });
    reset(data);
  });

  const handleTierSubmit = async (input: TierInput) => {
    if (tierModal.tier) {
      await updateTier.mutateAsync({ tierId: tierModal.tier.id, tier: input });
    } else {
      await createTier.mutateAsync(input);
    }
  };

  const handleDeleteCommunity = async () => {
    await deleteCommunity.mutateAsync(slug);
    clearLastVisitedCommunity();
    router.push("/communities");
  };

  return (
    <AdminShell
      slug={slug}
      title="Настройки сообщества"
      subtitle="Название, доступ и тарифы"
      actions={
        <Button
          theme="primary"
          size="s"
          onClick={handleSave}
          isDisabled={!isDirty}
          isLoading={updateProfile.isPending}
        >
          Сохранить
        </Button>
      }
    >
      {isLoading || !profile ? (
        <div className="h-full flex items-center justify-center">
          <Loader2 className="size-6 animate-spin text-gray-500" />
        </div>
      ) : (
        <FormProvider {...methods}>
          <div className="p-4 md:p-6 max-w-2xl space-y-6">
            <Input
              name="displayName"
              size="m"
              label="Название сообщества"
              error={errors.displayName?.message}
            />

            <Textarea
              name="description"
              size="m"
              label="Описание"
              placeholder="Расскажите, о чём ваше сообщество"
              rows={3}
              error={errors.description?.message}
            />

            <Input
              name="slug"
              size="m"
              label="Публичный адрес"
              prefix="bean.com/"
              isDisabled
              description="Изменение адреса станет доступно позже"
            />

            {/* Видимость */}
            <div className="space-y-2">
              <span className="text-sm font-medium text-black">Видимость</span>
              <div className="flex gap-2.5">
                {VISIBILITY_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  const isSelected = visibility === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setVisibility(option.value)}
                      className={cn(
                        "flex-1 flex gap-3 p-3.5 rounded-lg border text-left transition-colors cursor-pointer",
                        isSelected
                          ? "border-gray-400 bg-gray-100 inset-ring inset-ring-gray-400"
                          : "border-gray-200 bg-white hover:bg-gray-50"
                      )}
                    >
                      <Icon className="size-[18px] shrink-0 mt-0.5 text-gray-600" />
                      <span>
                        <span className="block text-sm font-semibold text-black">
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

            {/* Тарифы подписки */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-black">Тарифы подписки</span>
                <Button
                  theme="ghost"
                  size="s"
                  onClick={() => setTierModal({ open: true, tier: null })}
                >
                  <Plus className="size-3.5" />
                  Добавить тариф
                </Button>
              </div>

              {tiers && tiers.length > 0 ? (
                <div className="space-y-2.5">
                  {tiers.map((tier) => (
                    <div
                      key={tier.id}
                      className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-gray-200 bg-white shadow-sm"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-black truncate">
                            {tier.name}
                          </span>
                          {tier.discountPercent != null && (
                            <span className="px-2 py-0.5 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                              −{tier.discountPercent}%
                            </span>
                          )}
                        </div>
                        <span className="text-[13px] font-mono text-gray-600">
                          {formatTierPrice(tier)}
                        </span>
                      </div>
                      <Switch
                        checked={tier.isActive}
                        onCheckedChange={(checked) =>
                          setTierActive.mutate({ tierId: tier.id, isActive: checked })
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setTierModal({ open: true, tier })}
                        aria-label="Изменить тариф"
                        className="text-gray-500 hover:text-black transition-colors cursor-pointer"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingTierId(tier.id)}
                        aria-label="Удалить тариф"
                        className="text-gray-500 hover:text-danger transition-colors cursor-pointer"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  Тарифов нет — вступление в сообщество бесплатное.
                </p>
              )}
            </div>

            {/* Danger-зона */}
            <div className="rounded-2xl border border-danger/30 p-5 space-y-2">
              <p className="text-sm font-semibold text-black">Удалить сообщество</p>
              <p className="text-[13px] text-gray-600">
                Сообщество, его контент и подписки будут удалены безвозвратно.
              </p>
              <Button theme="destructive" size="s" onClick={() => setIsDeleteCommunityOpen(true)}>
                Удалить сообщество
              </Button>
            </div>
          </div>
        </FormProvider>
      )}

      <TierFormModal
        isOpen={tierModal.open}
        tier={tierModal.tier}
        onClose={() => setTierModal({ open: false, tier: null })}
        onSubmit={handleTierSubmit}
      />

      <DeleteDialog
        isOpen={deletingTierId !== null}
        onClose={() => setDeletingTierId(null)}
        onDelete={async () => {
          if (deletingTierId) {
            await deleteTier.mutateAsync(deletingTierId);
          }
        }}
        title="Удалить тариф?"
        description="Новые участники не смогут его выбрать. Текущие подписки сохранятся до конца оплаченного периода."
      />

      <DeleteDialog
        isOpen={isDeleteCommunityOpen}
        onClose={() => setIsDeleteCommunityOpen(false)}
        onDelete={handleDeleteCommunity}
        title={`Удалить «${profile?.displayName ?? slug}»?`}
        description="Все табы, посты, курсы и подписки будут удалены безвозвратно. Это действие нельзя отменить."
        confirmText="Удалить навсегда"
      />
    </AdminShell>
  );
}
