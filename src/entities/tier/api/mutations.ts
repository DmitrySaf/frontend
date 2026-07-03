import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createTier, updateTier, setTierActive, deleteTier } from "./api";
import { useInvalidateTiers } from "./queries";
import type { TierInput } from "./types";

/**
 * Хук для создания тарифа
 */
export const useCreateTierMutation = (communitySlug: string) => {
  const invalidateTiers = useInvalidateTiers();

  return useMutation({
    mutationFn: (input: TierInput) => createTier(communitySlug, input),
    onSuccess: () => {
      toast.success("Тариф добавлен");
      invalidateTiers(communitySlug);
    },
    onError: (error) => {
      toast.error("Ошибка при добавлении тарифа", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для обновления тарифа
 */
export const useUpdateTierMutation = (communitySlug: string) => {
  const invalidateTiers = useInvalidateTiers();

  return useMutation({
    mutationFn: (input: { tierId: string; tier: TierInput }) =>
      updateTier(input.tierId, input.tier),
    onSuccess: () => {
      toast.success("Тариф сохранён");
      invalidateTiers(communitySlug);
    },
    onError: (error) => {
      toast.error("Ошибка при сохранении тарифа", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для включения/выключения тарифа (без success-тоста — тумблер виден сразу)
 */
export const useSetTierActiveMutation = (communitySlug: string) => {
  const invalidateTiers = useInvalidateTiers();

  return useMutation({
    mutationFn: (input: { tierId: string; isActive: boolean }) =>
      setTierActive(input.tierId, input.isActive),
    onSuccess: () => {
      invalidateTiers(communitySlug);
    },
    onError: (error) => {
      toast.error("Не удалось изменить тариф", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для удаления тарифа
 */
export const useDeleteTierMutation = (communitySlug: string) => {
  const invalidateTiers = useInvalidateTiers();

  return useMutation({
    mutationFn: (tierId: string) => deleteTier(tierId),
    onSuccess: () => {
      toast.success("Тариф удалён");
      invalidateTiers(communitySlug);
    },
    onError: (error) => {
      toast.error("Ошибка при удалении тарифа", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};
