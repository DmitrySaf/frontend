import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCommunity, deleteCommunity, updateCommunityProfile } from "./api";
import { useInvalidateCommunities, useInvalidateCommunityProfile } from "./queries.browser";

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
 * Хук для обновления профиля сообщества (название, описание, оформление, видимость)
 */
export const useUpdateCommunityProfileMutation = () => {
  const invalidateProfile = useInvalidateCommunityProfile();

  return useMutation({
    mutationFn: updateCommunityProfile,
    onSuccess: (_, variables) => {
      toast.success("Изменения сохранены");
      invalidateProfile(variables.slug);
    },
    onError: (error) => {
      toast.error("Ошибка при сохранении", {
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
