import { useQuery, useQueryClient } from "@tanstack/react-query";
import { transformMessages } from "../model/mappers";
import { getMessages } from "./api";
import { messageQueryKeys } from "./constants";

/**
 * Сообщения канала. Мок-хранилище в localStorage — хук только клиентский.
 */
export const useMessagesQuery = (channelId: string) => {
  return useQuery({
    queryKey: messageQueryKeys.messages(channelId),
    queryFn: () => getMessages(channelId),
    enabled: !!channelId,
    select: transformMessages,
  });
};

/**
 * Префетч сообщений канала (наводка/тач по строке канала)
 */
export const usePrefetchMessages = () => {
  const queryClient = useQueryClient();

  return (channelId: string) => {
    if (!channelId) return;
    queryClient.prefetchQuery({
      queryKey: messageQueryKeys.messages(channelId),
      queryFn: () => getMessages(channelId),
      staleTime: 60 * 1000,
    });
  };
};

/**
 * Хук для инвалидации сообщений канала
 */
export const useInvalidateMessages = () => {
  const queryClient = useQueryClient();

  return (channelId: string) => {
    queryClient.invalidateQueries({ queryKey: messageQueryKeys.messages(channelId) });
  };
};
