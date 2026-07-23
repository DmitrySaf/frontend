import { toast } from "@/shared/components";
import { useMutation } from "@tanstack/react-query";
import { createChannel, deleteChannel, updateChannel } from "./api";
import { useInvalidateCommunityStructure } from "./queries";
import type { CreateChannelInput, UpdateChannelInput } from "./types";

/**
 * Хук для создания таба
 */
export const useCreateChannelMutation = () => {
  const invalidateStructure = useInvalidateCommunityStructure();

  return useMutation({
    mutationFn: createChannel,
    onSuccess: (_, variables: CreateChannelInput) => {
      toast.success("Таб создан");
      invalidateStructure(variables.communitySlug);
    },
    onError: (error) => {
      toast.error("Ошибка при создании таба", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для настроек таба
 */
export const useUpdateChannelMutation = () => {
  const invalidateStructure = useInvalidateCommunityStructure();

  return useMutation({
    mutationFn: updateChannel,
    onSuccess: (_, variables: UpdateChannelInput) => {
      toast.success("Таб сохранён");
      invalidateStructure(variables.communitySlug);
    },
    onError: (error) => {
      toast.error("Ошибка при сохранении таба", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для удаления таба
 */
export const useDeleteChannelMutation = (communitySlug: string) => {
  const invalidateStructure = useInvalidateCommunityStructure();

  return useMutation({
    mutationFn: deleteChannel,
    onSuccess: () => {
      toast.success("Таб удалён");
      invalidateStructure(communitySlug);
    },
    onError: (error) => {
      toast.error("Ошибка при удалении таба", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};
