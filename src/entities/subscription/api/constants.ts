// Query keys для типизированного кэширования
export const subscriptionQueryKeys = {
  communitySales: (communitySlug: string) => ["community-sales", communitySlug],
};
