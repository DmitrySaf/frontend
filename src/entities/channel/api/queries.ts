import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCommunityStructure, getMyChannelGrants } from "./api";
import { channelQueryKeys } from "./constants";
import { transformCommunityStructure } from "../model";

/**
 * Структура сообщества: категории с каналами.
 * Мок-хранилище живёт в localStorage, поэтому хук только клиентский.
 */
export const useCommunityStructureQuery = (communitySlug: string) => {
  return useQuery({
    queryKey: channelQueryKeys.structure(communitySlug),
    queryFn: () => getCommunityStructure(communitySlug),
    enabled: !!communitySlug,
    select: transformCommunityStructure,
  });
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
