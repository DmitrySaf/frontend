import { useSSRPosts } from "@/entities/post";
import { HydrationBoundary } from "@/shared/components";
import { PostList } from "@/pages/post-list";

export default async function PostsPage() {
  // Используем новый SSR хук
  const { dehydratedState } = await useSSRPosts();

  return (
    <HydrationBoundary state={dehydratedState}>
      <PostList />
    </HydrationBoundary>
  );
}
