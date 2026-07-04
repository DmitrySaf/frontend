import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStorefront } from "./api";
import { storefrontQueryKeys } from "./constants";
import type { Storefront } from "./types";

/**
 * Контент витрины. Мок-хранилище в localStorage — хук клиентский.
 */
export const useStorefrontQuery = (communitySlug: string) => {
  return useQuery<Storefront>({
    queryKey: storefrontQueryKeys.storefront(communitySlug),
    queryFn: async () => {
      const record = await getStorefront(communitySlug);
      return {
        description: record.description,
        media: record.media,
        features: record.features,
      };
    },
    enabled: !!communitySlug,
  });
};

/**
 * Хук для инвалидации витрины
 */
export const useInvalidateStorefront = () => {
  const queryClient = useQueryClient();

  return (communitySlug: string) => {
    queryClient.invalidateQueries({ queryKey: storefrontQueryKeys.storefront(communitySlug) });
  };
};
