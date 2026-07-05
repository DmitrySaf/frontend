import { useBrowserClient, useBrowserQuery } from "@/shared/composables";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { transformCommunity } from "../model";
import { getCommunities, getCommunity, getCommunityProfile } from "./api";
import { communityQueryKeys } from "./constants";

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
 * Хук для получения единичного сообщества
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
 * Полный профиль сообщества: описание, обложка, логотип, видимость
 */
export const useCommunityProfileQuery = (slug: string) => {
  const client = useBrowserClient();

  return useQuery({
    queryKey: communityQueryKeys.profile(slug),
    queryFn: () => getCommunityProfile(client, slug),
    enabled: !!slug,
  });
};

/**
 * Карта slug → логотип для rail (из общего списка сообществ)
 */
export const useCommunityLogosQuery = () => {
  return useBrowserQuery({
    queryKey: communityQueryKeys.communities,
    queryFn: (client) => getCommunities(client),
    staleTime: 1000 * 60 * 5,
    select: (records) =>
      Object.fromEntries(records.map((record) => [record.name, record.logo_url])),
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

/**
 * Хук для инвалидации профиля сообщества (+ список для rail)
 */
export const useInvalidateCommunityProfile = () => {
  const queryClient = useQueryClient();

  return (slug: string) => {
    queryClient.invalidateQueries({ queryKey: communityQueryKeys.profile(slug) });
    queryClient.invalidateQueries({ queryKey: communityQueryKeys.community(slug) });
    queryClient.invalidateQueries({ queryKey: communityQueryKeys.communities });
  };
};
