"use server";

import { useQueryClient } from "@tanstack/react-query";
import { communityQueryKeys } from "./constants";
import { getCommunities, getCommunity } from "./api";
import { useServerQuery } from "@/shared/composables";
import { TypedSupabaseClient } from "@/api";

/**
 * Серверный хук для предзагрузки сообществ
 */
export const useCommunitiesServerQuery = async () => {
  return useServerQuery({
    queryKey: communityQueryKeys.communities,
    queryFn: getCommunities,
  });
};

/**
 * Серверный хук для предзагрузки единичного сообщества
 */
export const useCommunityServerQuery = async (name: string) => {
  return useServerQuery({
    queryKey: communityQueryKeys.community(name),
    queryFn: (serverClient) => getCommunity(serverClient, name),
  });
};
