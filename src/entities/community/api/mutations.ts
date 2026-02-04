import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCommunity, deleteCommunity } from "./api";
import { useInvalidateCommunities } from "./queries.browser";

/**
 * Хук для создания нового сообщества
 */
export const useCreateCommunityMutation = () => {
  const invalidateCommunities = useInvalidateCommunities();

  return useMutation({
    mutationFn: createCommunity,
    onSuccess: () => {
      toast.success("Сообщество создано успешно");
      invalidateCommunities();
    },
    onError: (error) => {
      toast.error("Ошибка при создании сообщества", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для удаления сообщества
 */
export const useDeleteCommunityMutation = () => {
  const invalidateCommunities = useInvalidateCommunities();

  return useMutation({
    mutationFn: deleteCommunity,
    onSuccess: () => {
      toast.success("Сообщество удалено успешно");
      invalidateCommunities();
    },
    onError: (error) => {
      toast.error("Ошибка при удалении сообщества", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};
