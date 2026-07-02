import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createChannel, deleteChannel } from "./api";
import { useInvalidateCommunityStructure } from "./queries";
import type { CreateChannelInput } from "./types";

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
