import { toast } from "@/shared/components";
import { useMutation } from "@tanstack/react-query";
import { deleteMessage, sendMessage, updateMessage } from "./api";
import { useInvalidateMessages } from "./queries";
import type { DeleteMessageInput, SendMessageInput, UpdateMessageInput } from "./types";

// Успешные действия в чате не показывают toast — мгновенное обновление ленты
// само по себе является подтверждением (как в Discord). Ошибки — показывают.

/**
 * Хук для отправки сообщения
 */
export const useSendMessageMutation = () => {
  const invalidateMessages = useInvalidateMessages();

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (_, variables: SendMessageInput) => {
      invalidateMessages(variables.channelId);
    },
    onError: (error) => {
      toast.error("Не удалось отправить сообщение", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для редактирования сообщения
 */
export const useUpdateMessageMutation = () => {
  const invalidateMessages = useInvalidateMessages();

  return useMutation({
    mutationFn: updateMessage,
    onSuccess: (_, variables: UpdateMessageInput) => {
      invalidateMessages(variables.channelId);
    },
    onError: (error) => {
      toast.error("Не удалось сохранить изменения", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для удаления сообщения
 */
export const useDeleteMessageMutation = () => {
  const invalidateMessages = useInvalidateMessages();

  return useMutation({
    mutationFn: (input: DeleteMessageInput) => deleteMessage(input.messageId),
    onSuccess: (_, variables: DeleteMessageInput) => {
      invalidateMessages(variables.channelId);
    },
    onError: (error) => {
      toast.error("Не удалось удалить сообщение", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};
