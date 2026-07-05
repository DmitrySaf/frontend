"use client";

import { useSupabaseRealtime } from "@/shared/composables";
import { messageQueryKeys } from "./constants";

/**
 * Realtime-подписка на сообщения открытого канала:
 * insert/update/delete инвалидируют кэш ленты
 */
export const useMessagesRealtime = (channelId: string) => {
  useSupabaseRealtime({
    table: "messages",
    filter: channelId ? `channel_id=eq.${channelId}` : undefined,
    enabled: !!channelId,
    queryKeys: [messageQueryKeys.messages(channelId)],
  });
};
