import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStorefront, getStorefrontView } from "./api";
import { storefrontQueryKeys } from "./constants";
import type { Storefront } from "./types";

/**
 * Контент витрины для редактора (админ)
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
 * Публичная витрина (null → единый 404: hidden или не существует)
 */
export const useStorefrontViewQuery = (slug: string, inviteCode: string | null) => {
  return useQuery({
    queryKey: storefrontQueryKeys.view(slug, inviteCode),
    queryFn: () => getStorefrontView(slug, inviteCode),
    enabled: !!slug,
  });
};

/**
 * Хук для инвалидации витрины
 */
export const useInvalidateStorefront = () => {
  const queryClient = useQueryClient();

  return (communitySlug: string) => {
    queryClient.invalidateQueries({ queryKey: storefrontQueryKeys.storefront(communitySlug) });
    queryClient.invalidateQueries({ queryKey: ["storefront-view", communitySlug] });
  };
};
