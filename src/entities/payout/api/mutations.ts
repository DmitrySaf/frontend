import { toast } from "@/shared/components";
import { useMutation } from "@tanstack/react-query";
import { addPayoutMethod, removePayoutMethod, setDefaultPayoutMethod } from "./api";
import { useInvalidateMyPayoutMethods } from "./queries";
import type { AddCardInput } from "./types";

/**
 * Хук для привязки карты
 */
export const useAddPayoutMethodMutation = () => {
  const invalidate = useInvalidateMyPayoutMethods();

  return useMutation({
    mutationFn: (input: AddCardInput) => addPayoutMethod(input),
    onSuccess: () => {
      toast.success("Карта добавлена");
      invalidate();
    },
    onError: (error) => {
      toast.error("Не удалось добавить карту", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для выбора карты выплат (без success-тоста — радио видно сразу)
 */
export const useSetDefaultPayoutMethodMutation = () => {
  const invalidate = useInvalidateMyPayoutMethods();

  return useMutation({
    mutationFn: (methodId: string) => setDefaultPayoutMethod(methodId),
    onSuccess: () => {
      invalidate();
    },
    onError: (error) => {
      toast.error("Не удалось выбрать карту", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для удаления карты
 */
export const useRemovePayoutMethodMutation = () => {
  const invalidate = useInvalidateMyPayoutMethods();

  return useMutation({
    mutationFn: (methodId: string) => removePayoutMethod(methodId),
    onSuccess: () => {
      toast.success("Карта удалена");
      invalidate();
    },
    onError: (error) => {
      toast.error("Не удалось удалить карту", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};
