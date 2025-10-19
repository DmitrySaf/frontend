// Query keys для постов
export const postQueryKeys = {
  posts: ["posts"] as const,
  post: (id: string) => ["posts", id] as const,
} as const;
