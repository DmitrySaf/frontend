import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCommunity, deleteCommunity } from "./api";
import { useInvalidateCommunities } from "./queries.browser";

/**
 * Хук для создания нового проекта
 */
export const useCreateCommunityMutation = () => {
  const invalidateCommunities = useInvalidateCommunities();

  return useMutation({
    mutationFn: createCommunity,
    onSuccess: () => {
      toast.success("Проект создан успешно");
      invalidateCommunities();
    },
    onError: (error) => {
      toast.error("Ошибка при создании проекта", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для удаления проекта
 */
export const useDeleteCommunityMutation = () => {
  const invalidateCommunities = useInvalidateCommunities();

  return useMutation({
    mutationFn: deleteCommunity,
    onSuccess: () => {
      toast.success("Проект удален успешно");
      invalidateCommunities();
    },
    onError: (error) => {
      toast.error("Ошибка при удалении проекта", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};
