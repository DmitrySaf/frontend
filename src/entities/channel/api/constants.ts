// Query keys для типизированного кэширования
export const channelQueryKeys = {
  structure: (communitySlug: string) => ["community-structure", communitySlug],
  myGrants: ["my-channel-grants"],
};
