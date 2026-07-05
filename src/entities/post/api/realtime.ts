"use client";

import { useSupabaseRealtime } from "@/shared/composables";
import { postQueryKeys } from "./constants";

/**
 * Realtime-подписка на посты и комментарии открытого канала.
 * Комментарии инвалидируют тот же кэш постов (лента и счётчики — один запрос).
 */
export const usePostsRealtime = (channelId: string) => {
  useSupabaseRealtime({
    table: "posts",
    filter: channelId ? `channel_id=eq.${channelId}` : undefined,
    enabled: !!channelId,
    queryKeys: [postQueryKeys.posts(channelId)],
  });

  useSupabaseRealtime({
    table: "post_comments",
    enabled: !!channelId,
    queryKeys: [postQueryKeys.posts(channelId)],
  });
};
