import { createMockCollection } from "@/shared/utils";
import { CURRENT_USER_ID, MOCK_MEMBERS } from "@/entities/message";
import type {
  PostRecord,
  PostLikeRecord,
  PostBookmarkRecord,
  PostCommentRecord,
  CreatePostInput,
  UpdatePostInput,
} from "./types";

const posts = createMockCollection<PostRecord>("posts");
const likes = createMockCollection<PostLikeRecord>("post_likes");
const bookmarks = createMockCollection<PostBookmarkRecord>("post_bookmarks");
const comments = createMockCollection<PostCommentRecord>("post_comments");
const seededChannels = createMockCollection<{ id: string }>("posts_seeded_channels");

const SEED_COVER_URL =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1280&q=80";

/**
 * Первое открытие таба постов — демо-контент: закреплённый пост владельца
 * с обложкой + текстовый пост участника с лайками и комментариями
 */
async function seedPosts(channelId: string): Promise<void> {
  const now = Date.now();
  const hourMs = 60 * 60 * 1000;

  const pinnedPost: PostRecord = {
    id: crypto.randomUUID(),
    channel_id: channelId,
    author_id: CURRENT_USER_ID,
    title: "Запуск нового потока курса уже на этой неделе",
    content:
      "Мы открываем набор на новый поток. Внутри — обновлённые уроки, живые разборы и чат с обратной связью. Места ограничены, поэтому не откладывайте.",
    cover_url: SEED_COVER_URL,
    pinned: true,
    created_at: new Date(now - 3 * hourMs).toISOString(),
    updated_at: null,
  };

  const textPost: PostRecord = {
    id: crypto.randomUUID(),
    channel_id: channelId,
    author_id: MOCK_MEMBERS[0].id,
    title: "Делюсь конспектом с прошлого вебинара",
    content:
      "Собрала главные тезисы в один документ: позиционирование, контент-план и частые ошибки. Пишите в комментариях, что добавить.",
    cover_url: null,
    pinned: false,
    created_at: new Date(now - 26 * hourMs).toISOString(),
    updated_at: null,
  };

  await posts.insertMany([pinnedPost, textPost]);

  await likes.insertMany([
    ...MOCK_MEMBERS.map((member) => ({
      id: crypto.randomUUID(),
      post_id: pinnedPost.id,
      user_id: member.id,
    })),
    {
      id: crypto.randomUUID(),
      post_id: textPost.id,
      user_id: MOCK_MEMBERS[1].id,
    },
  ]);

  await comments.insertMany([
    {
      id: crypto.randomUUID(),
      post_id: textPost.id,
      author_id: MOCK_MEMBERS[2].id,
      content: "Спасибо, очень вовремя!",
      created_at: new Date(now - 20 * hourMs).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      post_id: textPost.id,
      author_id: MOCK_MEMBERS[1].id,
      content: "Добавьте, пожалуйста, раздел про сторис.",
      created_at: new Date(now - 5 * hourMs).toISOString(),
    },
  ]);

  await seededChannels.insert({ id: channelId });
}

export interface PostsWithMeta {
  posts: PostRecord[];
  likes: PostLikeRecord[];
  bookmarks: PostBookmarkRecord[];
  comments: PostCommentRecord[];
}

/**
 * Посты канала со связанными лайками/закладками/комментариями
 */
export const getPosts = async (channelId: string): Promise<PostsWithMeta> => {
  const [allPosts, seeded] = await Promise.all([posts.list(), seededChannels.list()]);

  const channelPosts = allPosts.filter((post) => post.channel_id === channelId);
  const alreadySeeded = seeded.some((record) => record.id === channelId);

  if (channelPosts.length === 0 && !alreadySeeded) {
    await seedPosts(channelId);
    return getPosts(channelId);
  }

  const [allLikes, allBookmarks, allComments] = await Promise.all([
    likes.list(),
    bookmarks.list(),
    comments.list(),
  ]);
  const postIds = new Set(channelPosts.map((post) => post.id));

  return {
    posts: channelPosts,
    likes: allLikes.filter((like) => postIds.has(like.post_id)),
    bookmarks: allBookmarks.filter((bookmark) => postIds.has(bookmark.post_id)),
    comments: allComments.filter((comment) => postIds.has(comment.post_id)),
  };
};

/**
 * Публикация поста от текущего пользователя
 */
export const createPost = async (input: CreatePostInput): Promise<PostRecord> => {
  return posts.insert({
    channel_id: input.channelId,
    author_id: CURRENT_USER_ID,
    title: input.title,
    content: input.content,
    cover_url: input.coverUrl ?? null,
    pinned: false,
    created_at: new Date().toISOString(),
    updated_at: null,
  });
};

/**
 * Редактирование поста
 */
export const updatePost = async (input: UpdatePostInput): Promise<PostRecord> => {
  return posts.update(input.postId, {
    title: input.title,
    content: input.content,
    cover_url: input.coverUrl ?? null,
    updated_at: new Date().toISOString(),
  });
};

/**
 * Удаление поста вместе с реакциями и комментариями
 */
export const deletePost = async (postId: string): Promise<void> => {
  const [allLikes, allBookmarks, allComments] = await Promise.all([
    likes.list(),
    bookmarks.list(),
    comments.list(),
  ]);

  await posts.remove(postId);
  await Promise.all([
    ...allLikes.filter((like) => like.post_id === postId).map((like) => likes.remove(like.id)),
    ...allBookmarks
      .filter((bookmark) => bookmark.post_id === postId)
      .map((bookmark) => bookmarks.remove(bookmark.id)),
    ...allComments
      .filter((comment) => comment.post_id === postId)
      .map((comment) => comments.remove(comment.id)),
  ]);
};

/**
 * Закрепить/открепить пост
 */
export const togglePinPost = async (postId: string, pinned: boolean): Promise<PostRecord> => {
  return posts.update(postId, { pinned });
};

/**
 * Лайк текущего пользователя (toggle)
 */
export const toggleLike = async (postId: string): Promise<void> => {
  const allLikes = await likes.list();
  const existing = allLikes.find(
    (like) => like.post_id === postId && like.user_id === CURRENT_USER_ID
  );

  if (existing) {
    await likes.remove(existing.id);
  } else {
    await likes.insert({ post_id: postId, user_id: CURRENT_USER_ID });
  }
};

/**
 * Закладка текущего пользователя (toggle)
 */
export const toggleBookmark = async (postId: string): Promise<void> => {
  const allBookmarks = await bookmarks.list();
  const existing = allBookmarks.find(
    (bookmark) => bookmark.post_id === postId && bookmark.user_id === CURRENT_USER_ID
  );

  if (existing) {
    await bookmarks.remove(existing.id);
  } else {
    await bookmarks.insert({ post_id: postId, user_id: CURRENT_USER_ID });
  }
};

/**
 * Комментарий от текущего пользователя
 */
export const addComment = async (postId: string, content: string): Promise<PostCommentRecord> => {
  return comments.insert({
    post_id: postId,
    author_id: CURRENT_USER_ID,
    content,
    created_at: new Date().toISOString(),
  });
};
