// Query keys для типизированного кэширования
export const inviteQueryKeys = {
  communityInvite: (communitySlug: string, channelId: string | null = null) => [
    "community-invite",
    communitySlug,
    channelId ?? "community",
  ],
  validation: (communitySlug: string, code: string) => ["invite-validation", communitySlug, code],
};
