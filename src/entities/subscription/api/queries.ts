import { useQuery, useQueryClient } from "@tanstack/react-query";
import { transformCommunityStats, transformTransactions } from "../model/mappers";
import { getCommunityMembersCount, getCommunitySales, getMyTransactions } from "./api";
import { subscriptionQueryKeys } from "./constants";

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
 * История транзакций текущего пользователя (поступления + выводы)
 */
export const useMyTransactionsQuery = (ownedCommunitySlugs: string[], enabled: boolean) => {
  return useQuery({
    queryKey: [...subscriptionQueryKeys.myTransactions, ...ownedCommunitySlugs],
    queryFn: () => getMyTransactions(ownedCommunitySlugs),
    enabled,
    select: transformTransactions,
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
