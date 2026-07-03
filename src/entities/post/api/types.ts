// Формы записей повторяют docs/db-schema.md (posts, post_likes, post_bookmarks, post_comments).
// В мок-режиме author_id/user_id — CURRENT_USER_ID («me») либо id вымышленного участника.

export interface PostRecord {
  id: string;
  channel_id: string;
  author_id: string;
  title: string;
  content: string;
  cover_url: string | null;
  pinned: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface PostLikeRecord {
  id: string;
  post_id: string;
  user_id: string;
}

export interface PostBookmarkRecord {
  id: string;
  post_id: string;
  user_id: string;
}

export interface PostCommentRecord {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
}

// Доменные типы (для UI)
export interface Post {
  id: string;
  channelId: string;
  authorId: string;
  title: string;
  content: string;
  coverUrl: string | null;
  pinned: boolean;
  createdAt: string;
  editedAt: string | null;
  likesCount: number;
  commentsCount: number;
  likedByMe: boolean;
  bookmarkedByMe: boolean;
}

export interface PostComment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface CreatePostInput {
  channelId: string;
  title: string;
  content: string;
  coverUrl?: string | null;
}

export interface UpdatePostInput {
  postId: string;
  channelId: string;
  title: string;
  content: string;
  coverUrl?: string | null;
}
