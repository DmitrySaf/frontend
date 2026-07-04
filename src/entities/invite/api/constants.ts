// Query keys для типизированного кэширования
export const inviteQueryKeys = {
  communityInvite: (communitySlug: string) => ["community-invite", communitySlug],
  validation: (communitySlug: string, code: string) => ["invite-validation", communitySlug, code],
};
