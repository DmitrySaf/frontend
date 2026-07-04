import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyMembership } from "./api";
import { memberQueryKeys } from "./constants";
import type { Membership } from "./types";

/**
 * Membership текущего пользователя. Мок-хранилище в localStorage — хук клиентский.
 */
export const useMyMembershipQuery = (communitySlug: string) => {
  return useQuery<Membership | null>({
    queryKey: memberQueryKeys.myMembership(communitySlug),
    queryFn: async () => {
      const record = await getMyMembership(communitySlug);
      return record ? { role: record.role, joinedAt: record.joined_at } : null;
    },
    enabled: !!communitySlug,
  });
};

/**
 * Хук для инвалидации membership
 */
export const useInvalidateMyMembership = () => {
  const queryClient = useQueryClient();

  return (communitySlug: string) => {
    queryClient.invalidateQueries({ queryKey: memberQueryKeys.myMembership(communitySlug) });
  };
};
