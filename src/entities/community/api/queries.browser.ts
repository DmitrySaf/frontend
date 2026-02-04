import { useQueryClient } from "@tanstack/react-query";
import { communityQueryKeys } from "./constants";
import { getCommunities, getCommunity } from "./api";
import { useBrowserQuery } from "@/shared/composables";
import { transformCommunity } from "../model";

/**
 * Хук для получения списка сообществ
 */
export const useCommunitiesQuery = () => {
  return useBrowserQuery({
    queryKey: communityQueryKeys.communities,
    queryFn: (client) => getCommunities(client),
    staleTime: 1000 * 60 * 5, // 5 минут
    select: (data) => data.map(transformCommunity),
  });
};

/**
 * Хук для получения единичного сообществф
 */
export const useCommunityQuery = (name: string) => {
  return useBrowserQuery({
    queryKey: communityQueryKeys.community(name),
    queryFn: (client) => getCommunity(client, name),
    enabled: !!name, // Запрос выполняется только если есть name
    staleTime: 1000 * 60 * 10, // 10 минут
    select: transformCommunity,
  });
};

/**
 * Хук для инвалидации кэша сообществ
 */
export const useInvalidateCommunities = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: communityQueryKeys.communities });
  };
};
