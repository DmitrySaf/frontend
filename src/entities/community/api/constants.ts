export const communityQueryKeys = {
  communities: ["communities"],
  community: (id: string) => ["communities", id],
  profile: (slug: string) => ["community-profile", slug],
  logos: ["community-logos"],
};
