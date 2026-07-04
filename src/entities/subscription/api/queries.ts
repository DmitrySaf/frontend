import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCommunitySales, getCommunityMembersCount } from "./api";
import { subscriptionQueryKeys } from "./constants";
import { transformCommunityStats } from "../model/mappers";

/**
 * Статистика дашборда сообщества. Мок-хранилище в localStorage — хук клиентский.
 */
export const useCommunityStatsQuery = (communitySlug: string) => {
  return useQuery({
    queryKey: subscriptionQueryKeys.communitySales(communitySlug),
    queryFn: () => getCommunitySales(communitySlug),
    enabled: !!communitySlug,
    select: transformCommunityStats,
  });
};

/**
 * Число участников для витрины (без сида продаж)
 */
export const useCommunityMembersCountQuery = (communitySlug: string) => {
  return useQuery({
    queryKey: subscriptionQueryKeys.membersCount(communitySlug),
    queryFn: () => getCommunityMembersCount(communitySlug),
    enabled: !!communitySlug,
  });
};

/**
 * Хук для инвалидации продаж сообщества
 */
export const useInvalidateCommunitySales = () => {
  const queryClient = useQueryClient();

  return (communitySlug: string) => {
    queryClient.invalidateQueries({
      queryKey: subscriptionQueryKeys.communitySales(communitySlug),
    });
    queryClient.invalidateQueries({
      queryKey: subscriptionQueryKeys.membersCount(communitySlug),
    });
  };
};
