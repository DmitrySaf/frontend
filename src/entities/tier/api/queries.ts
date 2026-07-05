import { useQuery, useQueryClient } from "@tanstack/react-query";
import { transformTiers } from "../model/mappers";
import { getTiers } from "./api";
import { tierQueryKeys } from "./constants";

/**
 * Тарифы сообщества. Мок-хранилище в localStorage — хук только клиентский.
 */
export const useTiersQuery = (communitySlug: string) => {
  return useQuery({
    queryKey: tierQueryKeys.tiers(communitySlug),
    queryFn: () => getTiers(communitySlug),
    enabled: !!communitySlug,
    select: transformTiers,
  });
};

/**
 * Хук для инвалидации тарифов
 */
export const useInvalidateTiers = () => {
  const queryClient = useQueryClient();

  return (communitySlug: string) => {
    queryClient.invalidateQueries({ queryKey: tierQueryKeys.tiers(communitySlug) });
  };
};
