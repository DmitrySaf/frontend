import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "./api";
import { postQueryKeys } from "./constants";
import { transformPosts, transformComments } from "../model";

/**
 * Посты канала. Мок-хранилище в localStorage — хук только клиентский.
 */
export const usePostsQuery = (channelId: string) => {
  return useQuery({
    queryKey: postQueryKeys.posts(channelId),
    queryFn: () => getPosts(channelId),
    enabled: !!channelId,
    select: transformPosts,
  });
};

/**
 * Комментарии поста — берутся из того же запроса постов канала (в моках всё в одном ответе)
 */
export const usePostCommentsQuery = (channelId: string, postId: string, enabled: boolean) => {
  return useQuery({
    queryKey: postQueryKeys.posts(channelId),
    queryFn: () => getPosts(channelId),
    enabled: !!channelId && enabled,
    select: (data) =>
      transformComments(data.comments.filter((comment) => comment.post_id === postId)),
  });
};

/**
 * Хук для инвалидации постов канала
 */
export const useInvalidatePosts = () => {
  const queryClient = useQueryClient();

  return (channelId: string) => {
    queryClient.invalidateQueries({ queryKey: postQueryKeys.posts(channelId) });
  };
};
