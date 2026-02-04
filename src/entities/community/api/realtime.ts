"use client";

import { useSupabaseRealtime } from "@/shared/composables";
import { communityQueryKeys } from "./constants";
import type { Community } from "./types";

// TODO: для сообществ не нужно использовать realtime, но для примера оставил
/**
 * Хук для realtime подписки на изменения в таблице сообществ
 * Автоматически инвалидирует кэш сообществ при изменениях
 */
export const useCommunitiesRealtime = () => {
  useSupabaseRealtime<Community>({
    table: "communities",
    queryKeys: [communityQueryKeys.communities],
  });
};
