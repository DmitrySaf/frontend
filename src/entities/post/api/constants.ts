// Query keys для типизированного кэширования
export const postQueryKeys = {
  posts: (channelId: string) => ["posts", channelId],
  comments: (postId: string) => ["post-comments", postId],
};
