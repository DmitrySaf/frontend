// Query keys для типизированного кэширования
export const subscriptionQueryKeys = {
  communitySales: (communitySlug: string) => ["community-sales", communitySlug],
  membersCount: (communitySlug: string) => ["community-members-count", communitySlug],
  myTransactions: ["my-transactions"],
};
