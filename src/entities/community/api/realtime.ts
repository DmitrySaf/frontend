"use client";

import { useSupabaseRealtime } from "@/shared/composables";
import { communityQueryKeys } from "./constants";
import type { Community } from "./types";

// TODO: для проектов не нужно использовать realtime, но для примера оставил
/**
 * Хук для realtime подписки на изменения в таблице проектов
 * Автоматически инвалидирует кэш проектов при изменениях
 */
export const useCommunitiesRealtime = () => {
  useSupabaseRealtime<Community>({
    table: "communities",
    queryKeys: [communityQueryKeys.communities],
  });
};
