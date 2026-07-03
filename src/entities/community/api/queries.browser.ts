import { useQuery, useQueryClient } from "@tanstack/react-query";
import { communityQueryKeys } from "./constants";
import {
  getCommunities,
  getCommunity,
  getCommunityProfile,
  getAllCommunityExtras,
} from "./api";
import { useBrowserQuery, useBrowserClient } from "@/shared/composables";
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
 * Полный профиль сообщества (Supabase + mock extras): описание, обложка,
 * логотип, видимость
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
 * Карта slug → логотип для rail (mock extras всех сообществ)
 */
export const useCommunityLogosQuery = () => {
  return useQuery({
    queryKey: communityQueryKeys.logos,
    queryFn: getAllCommunityExtras,
    select: (records) =>
      Object.fromEntries(records.map((record) => [record.id, record.logo_url])),
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
 * Хук для инвалидации профиля сообщества (+ карта логотипов)
 */
export const useInvalidateCommunityProfile = () => {
  const queryClient = useQueryClient();

  return (slug: string) => {
    queryClient.invalidateQueries({ queryKey: communityQueryKeys.profile(slug) });
    queryClient.invalidateQueries({ queryKey: communityQueryKeys.logos });
    queryClient.invalidateQueries({ queryKey: communityQueryKeys.community(slug) });
    queryClient.invalidateQueries({ queryKey: communityQueryKeys.communities });
  };
};
