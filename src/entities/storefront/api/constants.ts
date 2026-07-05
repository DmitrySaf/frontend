// Query keys для типизированного кэширования
export const storefrontQueryKeys = {
  storefront: (communitySlug: string) => ["storefront", communitySlug],
  view: (slug: string, inviteCode: string | null) => ["storefront-view", slug, inviteCode ?? ""],
};
