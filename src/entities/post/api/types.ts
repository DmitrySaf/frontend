// Формы записей повторяют docs/db-schema.md (posts, post_likes, post_bookmarks, post_comments)
// + джойн профиля автора.

export interface PostAuthorRecord {
  display_name: string;
  username: string;
  avatar_url: string | null;
}

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
  author: PostAuthorRecord | null;
}

export interface PostLikeRecord {
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
  author: PostAuthorRecord | null;
}

// Доменные типы (для UI)
export interface PostAuthor {
  displayName: string;
  username: string;
  avatarUrl: string | null;
}

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
  author: PostAuthor | null;
}

export interface PostComment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
  author: PostAuthor | null;
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
