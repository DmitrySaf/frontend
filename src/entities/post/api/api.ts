import { getSessionUserId, getSessionUserIdOrNull } from "@/api/auth";
import { createBrowserClient } from "@/api/browser-client";
import { uploadDataUrlImage } from "@/shared/utils";
import type {
  CreatePostInput,
  PostCommentRecord,
  PostLikeRecord,
  PostRecord,
  UpdatePostInput,
} from "./types";

const POST_FIELDS = `
  id, channel_id, author_id, title, content, cover_url, pinned, created_at, updated_at,
  author:profiles (display_name, username, avatar_url)
`;

const COMMENT_FIELDS = `
  id, post_id, author_id, content, created_at,
  author:profiles (display_name, username, avatar_url)
`;

/** community_id канала — для пути обложки в Storage ({community_id}/...) */
async function getChannelCommunityId(channelId: string): Promise<string> {
  const client = createBrowserClient();
  const { data, error } = await client
    .from("community_channels")
    .select("community_id")
    .eq("id", channelId)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data.community_id;
}

async function uploadPostCover(channelId: string, coverUrl: string): Promise<string> {
  // Уже загруженный URL (не data:) не перезаливаем — иначе плодятся объекты в Storage
  if (!coverUrl.startsWith("data:")) return coverUrl;
  const communityId = await getChannelCommunityId(channelId);
  return uploadDataUrlImage("post-covers", `${communityId}/${crypto.randomUUID()}.jpg`, coverUrl);
}

export interface PostsWithMeta {
  posts: PostRecord[];
  likes: PostLikeRecord[];
  comments: PostCommentRecord[];
  /** Id текущего пользователя — для флага likedByMe */
  myUserId: string | null;
}

/**
 * Посты канала со связанными лайками/комментариями.
 */
export const getPosts = async (channelId: string): Promise<PostsWithMeta> => {
  const client = createBrowserClient();
  const myUserId = await getSessionUserIdOrNull(client);

  const { data: postsData, error: postsError } = await client
    .from("posts")
    .select(POST_FIELDS)
    .eq("channel_id", channelId)
    .order("created_at", { ascending: false });

  if (postsError) {
    throw new Error(postsError.message);
  }

  const posts = (postsData ?? []) as unknown as PostRecord[];
  const postIds = posts.map((post) => post.id);

  if (postIds.length === 0) {
    return { posts, likes: [], comments: [], myUserId };
  }

  const [likesResult, commentsResult] = await Promise.all([
    client.from("post_likes").select("id, post_id, user_id").in("post_id", postIds),
    client.from("post_comments").select(COMMENT_FIELDS).in("post_id", postIds),
  ]);

  if (likesResult.error) {
    throw new Error(likesResult.error.message);
  }
  if (commentsResult.error) {
    throw new Error(commentsResult.error.message);
  }

  return {
    posts,
    likes: (likesResult.data ?? []) as PostLikeRecord[],
    comments: (commentsResult.data ?? []) as unknown as PostCommentRecord[],
    myUserId,
  };
};

/**
 * Публикация поста (RLS: только владелец сообщества)
 */
export const createPost = async (input: CreatePostInput): Promise<PostRecord> => {
  const client = createBrowserClient();
  const userId = await getSessionUserId(client);

  const coverUrl = input.coverUrl ? await uploadPostCover(input.channelId, input.coverUrl) : null;

  const { data, error } = await client
    .from("posts")
    .insert({
      channel_id: input.channelId,
      author_id: userId,
      title: input.title,
      content: input.content,
      cover_url: coverUrl,
    })
    .select(POST_FIELDS)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as unknown as PostRecord;
};

/**
 * Редактирование поста
 */
export const updatePost = async (input: UpdatePostInput): Promise<PostRecord> => {
  const client = createBrowserClient();

  const patch: Record<string, unknown> = {
    title: input.title,
    content: input.content,
    updated_at: new Date().toISOString(),
  };
  // undefined = не трогать обложку; null = очистить; строка = заменить
  if (input.coverUrl !== undefined) {
    patch.cover_url = input.coverUrl
      ? await uploadPostCover(input.channelId, input.coverUrl)
      : null;
  }

  const { data, error } = await client
    .from("posts")
    .update(patch)
    .eq("id", input.postId)
    .select(POST_FIELDS)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as unknown as PostRecord;
};

/**
 * Удаление поста (реакции и комментарии удаляются каскадом)
 */
export const deletePost = async (postId: string): Promise<void> => {
  const client = createBrowserClient();
  const { error } = await client.from("posts").delete().eq("id", postId);

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * Закрепить/открепить пост
 */
export const togglePinPost = async (postId: string, pinned: boolean): Promise<void> => {
  const client = createBrowserClient();
  const { error } = await client.from("posts").update({ pinned }).eq("id", postId);

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * Лайк текущего пользователя (toggle)
 */
export const toggleLike = async (postId: string): Promise<void> => {
  const client = createBrowserClient();
  const userId = await getSessionUserId(client);

  const { data: existing, error: selectError } = await client
    .from("post_likes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();

  if (selectError) {
    throw new Error(selectError.message);
  }

  const { error } = existing
    ? await client.from("post_likes").delete().eq("id", existing.id)
    : await client.from("post_likes").insert({ post_id: postId, user_id: userId });

  // 23505 = дубль при быстром двойном тапе; лайк уже поставлен, ошибку не показываем
  if (error && error.code !== "23505") {
    throw new Error(error.message);
  }
};

/**
 * Комментарий от текущего пользователя
 */
export const addComment = async (postId: string, content: string): Promise<PostCommentRecord> => {
  const client = createBrowserClient();
  const userId = await getSessionUserId(client);

  const { data, error } = await client
    .from("post_comments")
    .insert({
      post_id: postId,
      author_id: userId,
      content,
    })
    .select(COMMENT_FIELDS)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as unknown as PostCommentRecord;
};
