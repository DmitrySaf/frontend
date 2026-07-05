import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrCreateInvite, validateInviteCode } from "./api";
import { inviteQueryKeys } from "./constants";
import type { Invite } from "./types";

/**
 * Действующая инвайт-ссылка сообщества (создаётся при первом запросе)
 */
export const useCommunityInviteQuery = (
  communitySlug: string,
  enabled: boolean,
  channelId: string | null = null
) => {
  return useQuery<Invite>({
    queryKey: inviteQueryKeys.communityInvite(communitySlug, channelId),
    queryFn: async () => {
      const record = await getOrCreateInvite(communitySlug, channelId);
      return {
        id: record.id,
        channelId: record.channel_id ?? null,
        code: record.code,
        expiresAt: record.expires_at,
        maxUses: record.max_uses,
        uses: record.uses,
      };
    },
    enabled: !!communitySlug && enabled,
  });
};

/**
 * Валидация кода из URL витрины
 */
export const useInviteValidationQuery = (communitySlug: string, code: string | null) => {
  return useQuery({
    queryKey: inviteQueryKeys.validation(communitySlug, code ?? ""),
    queryFn: async () => {
      if (!code) return null;
      return validateInviteCode(communitySlug, code);
    },
    enabled: !!communitySlug && code !== undefined,
  });
};

/**
 * Хук для инвалидации инвайта сообщества
 */
export const useInvalidateCommunityInvite = () => {
  const queryClient = useQueryClient();

  return (communitySlug: string) => {
    queryClient.invalidateQueries({ queryKey: ["community-invite", communitySlug] });
  };
};
