import { CURRENT_USER_ID } from "@/entities/message";
import type { PostsWithMeta } from "../api/api";
import type { Post, PostComment, PostCommentRecord } from "../api/types";

export const transformComment = (record: PostCommentRecord): PostComment => {
  return {
    id: record.id,
    postId: record.post_id,
    authorId: record.author_id,
    content: record.content,
    createdAt: record.created_at,
  };
};

/**
 * Посты со счётчиками и флагами текущего пользователя.
 * Порядок: закреплённые выше, дальше — по убыванию даты.
 */
export const transformPosts = (data: PostsWithMeta): Post[] => {
  return data.posts
    .map((record): Post => {
      const postLikes = data.likes.filter((like) => like.post_id === record.id);
      const postBookmarks = data.bookmarks.filter(
        (bookmark) => bookmark.post_id === record.id
      );
      const postComments = data.comments.filter((comment) => comment.post_id === record.id);

      return {
        id: record.id,
        channelId: record.channel_id,
        authorId: record.author_id,
        title: record.title,
        content: record.content,
        coverUrl: record.cover_url,
        pinned: record.pinned,
        createdAt: record.created_at,
        editedAt: record.updated_at,
        likesCount: postLikes.length,
        commentsCount: postComments.length,
        likedByMe: postLikes.some((like) => like.user_id === CURRENT_USER_ID),
        bookmarkedByMe: postBookmarks.some(
          (bookmark) => bookmark.user_id === CURRENT_USER_ID
        ),
      };
    })
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return b.createdAt.localeCompare(a.createdAt);
    });
};

export const transformComments = (records: PostCommentRecord[]): PostComment[] => {
  return records
    .map(transformComment)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
};
