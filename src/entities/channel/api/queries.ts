import { useQuery, useQueryClient } from "@tanstack/react-query";
import { transformCommunityStructure } from "../model";
import { getCommunityStructure, getMyChannelGrants } from "./api";
import { channelQueryKeys } from "./constants";

/**
 * Структура сообщества: категории с каналами.
 * Мок-хранилище живёт в localStorage, поэтому хук только клиентский.
 */
export const useCommunityStructureQuery = (communitySlug: string) => {
  return useQuery({
    queryKey: channelQueryKeys.structure(communitySlug),
    queryFn: () => getCommunityStructure(communitySlug),
    enabled: !!communitySlug,
    // Структура меняется редко и всегда инвалидируется мутациями каналов
    // (useInvalidateCommunityStructure) — держим свежей 5 минут
    staleTime: 1000 * 60 * 5,
    select: transformCommunityStructure,
  });
};

/**
 * Префетч структуры сообщества (наводка на плитку сообщества в рейле)
 */
export const usePrefetchCommunityStructure = () => {
  const queryClient = useQueryClient();

  return (communitySlug: string) => {
    if (!communitySlug) return;
    queryClient.prefetchQuery({
      queryKey: channelQueryKeys.structure(communitySlug),
      queryFn: () => getCommunityStructure(communitySlug),
      staleTime: 1000 * 60 * 5,
    });
  };
};

/**
 * Гранты текущего пользователя на private/secret-каналы
 */
export const useMyChannelGrantsQuery = () => {
  return useQuery({
    queryKey: channelQueryKeys.myGrants,
    queryFn: getMyChannelGrants,
    select: (ids) => new Set(ids),
  });
};

/**
 * Хук для инвалидации структуры сообщества
 */
export const useInvalidateCommunityStructure = () => {
  const queryClient = useQueryClient();

  return (communitySlug: string) => {
    queryClient.invalidateQueries({ queryKey: channelQueryKeys.structure(communitySlug) });
    queryClient.invalidateQueries({ queryKey: channelQueryKeys.myGrants });
  };
};
