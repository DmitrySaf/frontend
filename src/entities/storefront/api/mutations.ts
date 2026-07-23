import { toast } from "@/shared/components";
import { useMutation } from "@tanstack/react-query";
import { updateStorefront } from "./api";
import { useInvalidateStorefront } from "./queries";
import type { Storefront } from "./types";

/**
 * Хук для сохранения витрины
 */
export const useUpdateStorefrontMutation = (communitySlug: string) => {
  const invalidateStorefront = useInvalidateStorefront();

  return useMutation({
    mutationFn: (data: Storefront) => updateStorefront(communitySlug, data),
    onSuccess: () => {
      toast.success("Витрина сохранена");
      invalidateStorefront(communitySlug);
    },
    onError: (error) => {
      toast.error("Ошибка при сохранении витрины", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};
