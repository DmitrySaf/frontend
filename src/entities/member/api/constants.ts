// Query keys для типизированного кэширования
export const memberQueryKeys = {
  myMembership: (communitySlug: string) => ["my-membership", communitySlug],
};
