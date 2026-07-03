import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createPost,
  updatePost,
  deletePost,
  togglePinPost,
  toggleLike,
  toggleBookmark,
  addComment,
} from "./api";
import { useInvalidatePosts } from "./queries";
import type { CreatePostInput, UpdatePostInput } from "./types";

/**
 * Хук для публикации поста
 */
export const useCreatePostMutation = () => {
  const invalidatePosts = useInvalidatePosts();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (_, variables: CreatePostInput) => {
      toast.success("Пост опубликован");
      invalidatePosts(variables.channelId);
    },
    onError: (error) => {
      toast.error("Ошибка при публикации поста", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для редактирования поста
 */
export const useUpdatePostMutation = () => {
  const invalidatePosts = useInvalidatePosts();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (_, variables: UpdatePostInput) => {
      toast.success("Пост обновлён");
      invalidatePosts(variables.channelId);
    },
    onError: (error) => {
      toast.error("Ошибка при сохранении поста", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для удаления поста
 */
export const useDeletePostMutation = () => {
  const invalidatePosts = useInvalidatePosts();

  return useMutation({
    mutationFn: (input: { postId: string; channelId: string }) => deletePost(input.postId),
    onSuccess: (_, variables) => {
      toast.success("Пост удалён");
      invalidatePosts(variables.channelId);
    },
    onError: (error) => {
      toast.error("Ошибка при удалении поста", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для закрепления/открепления поста
 */
export const useTogglePinMutation = () => {
  const invalidatePosts = useInvalidatePosts();

  return useMutation({
    mutationFn: (input: { postId: string; channelId: string; pinned: boolean }) =>
      togglePinPost(input.postId, input.pinned),
    onSuccess: (_, variables) => {
      toast.success(variables.pinned ? "Пост закреплён" : "Пост откреплён");
      invalidatePosts(variables.channelId);
    },
    onError: (error) => {
      toast.error("Не удалось изменить закрепление", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

// Лайки/закладки/комментарии не показывают success-тосты:
// мгновенное изменение счётчика на карточке само является подтверждением

/**
 * Хук для лайка
 */
export const useToggleLikeMutation = () => {
  const invalidatePosts = useInvalidatePosts();

  return useMutation({
    mutationFn: (input: { postId: string; channelId: string }) => toggleLike(input.postId),
    onSuccess: (_, variables) => {
      invalidatePosts(variables.channelId);
    },
    onError: (error) => {
      toast.error("Не удалось поставить лайк", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для закладки
 */
export const useToggleBookmarkMutation = () => {
  const invalidatePosts = useInvalidatePosts();

  return useMutation({
    mutationFn: (input: { postId: string; channelId: string }) => toggleBookmark(input.postId),
    onSuccess: (_, variables) => {
      invalidatePosts(variables.channelId);
    },
    onError: (error) => {
      toast.error("Не удалось сохранить закладку", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для добавления комментария
 */
export const useAddCommentMutation = () => {
  const invalidatePosts = useInvalidatePosts();

  return useMutation({
    mutationFn: (input: { postId: string; channelId: string; content: string }) =>
      addComment(input.postId, input.content),
    onSuccess: (_, variables) => {
      invalidatePosts(variables.channelId);
    },
    onError: (error) => {
      toast.error("Не удалось отправить комментарий", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};
