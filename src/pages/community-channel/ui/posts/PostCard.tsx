"use client";

import {
  type Post,
  type PostFormData,
  useToggleBookmarkMutation,
  useToggleLikeMutation,
  useTogglePinMutation,
  useUpdatePostMutation,
} from "@/entities/post";
import { Avatar, Dropdown, type DropdownItemConfig } from "@/shared/components";
import { useSessionUserId } from "@/shared/composables";
import { cn, formatRelativeTime } from "@/shared/utils";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Pin,
  PinOff,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useAuthorView } from "../useAuthorView";
import { PostComments } from "./PostComments";
import { PostForm } from "./PostForm";

interface PostCardProps {
  post: Post;
  isAdmin: boolean;
  onDelete: () => void;
}

export function PostCard({ post, isAdmin, onDelete }: PostCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [areCommentsOpen, setAreCommentsOpen] = useState(false);

  const resolveAuthor = useAuthorView();
  const author = resolveAuthor(post.authorId, post.author);
  const myUserId = useSessionUserId();

  const updatePost = useUpdatePostMutation();
  const togglePin = useTogglePinMutation();
  const toggleLike = useToggleLikeMutation();
  const toggleBookmark = useToggleBookmarkMutation();

  const isOwn = myUserId !== null && post.authorId === myUserId;

  const menuItems: DropdownItemConfig[] = [
    ...(isOwn ? [{ icon: Pencil, label: "Редактировать", onClick: () => setIsEditing(true) }] : []),
    ...(isAdmin
      ? [
          {
            icon: post.pinned ? PinOff : Pin,
            label: post.pinned ? "Открепить" : "Закрепить",
            onClick: () =>
              togglePin.mutate({
                postId: post.id,
                channelId: post.channelId,
                pinned: !post.pinned,
              }),
          },
        ]
      : []),
    ...(isOwn || isAdmin
      ? [{ icon: Trash2, label: "Удалить", onClick: onDelete, variant: "danger" as const }]
      : []),
  ];

  const handleEditSubmit = async (data: PostFormData & { coverUrl: string | null }) => {
    await updatePost.mutateAsync({
      postId: post.id,
      channelId: post.channelId,
      title: data.title,
      content: data.content,
      coverUrl: data.coverUrl,
    });
    setIsEditing(false);
  };

  return (
    <article className="bg-surface rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 space-y-3">
        {/* Автор */}
        <div className="flex items-center gap-2.5">
          <Avatar name={author.displayName} src={author.avatarUrl} size="m" className="size-9" />
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[13px] font-semibold text-ink truncate">
                {author.displayName}
              </span>
              {author.isCommunityOwner && (
                <span className="text-xs font-medium text-primary-600">· автор</span>
              )}
            </div>
            <div className="text-xs text-gray-500">{formatRelativeTime(post.createdAt)}</div>
          </div>
          {post.pinned && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#DEFCAD] text-xs font-medium text-ink">
              <Pin className="size-3" />
              Закреплено
            </span>
          )}
          {menuItems.length > 0 && !isEditing && (
            <Dropdown
              trigger={
                <button
                  type="button"
                  aria-label="Действия с постом"
                  className="size-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-ink hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <MoreHorizontal className="size-[18px]" />
                </button>
              }
              items={menuItems}
              align="end"
            />
          )}
        </div>

        {isEditing ? (
          <PostForm
            initialValues={{ title: post.title, content: post.content, coverUrl: post.coverUrl }}
            submitLabel="Сохранить"
            onSubmit={handleEditSubmit}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <h2 className="text-lg font-bold text-ink leading-[1.25]">{post.title}</h2>
            <p className="text-sm text-gray-800 leading-[1.5] whitespace-pre-wrap break-words">
              {post.content}
              {post.editedAt && (
                <span className="ml-1.5 text-[11px] text-gray-500">(изменено)</span>
              )}
            </p>
          </>
        )}
      </div>

      {!isEditing && post.coverUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverUrl}
          alt=""
          loading="lazy"
          className="w-full max-h-96 object-cover"
        />
      )}

      {!isEditing && (
        <div
          className={cn(
            "flex items-center gap-5 px-5 py-3",
            post.coverUrl && "border-t border-gray-200"
          )}
        >
          <button
            type="button"
            onClick={() => toggleLike.mutate({ postId: post.id, channelId: post.channelId })}
            className={cn(
              "flex items-center gap-1.5 text-[13px] transition-[color,transform] duration-150 ease-out-quart active:scale-90 cursor-pointer",
              post.likedByMe ? "text-danger" : "text-gray-600 hover:text-ink"
            )}
          >
            <Heart
              key={post.likedByMe ? "liked" : "idle"}
              className={cn("size-[17px]", post.likedByMe && "fill-current animate-heart-pop")}
            />
            {post.likesCount > 0 && post.likesCount}
          </button>

          <button
            type="button"
            onClick={() => setAreCommentsOpen(!areCommentsOpen)}
            className={cn(
              "flex items-center gap-1.5 text-[13px] transition-[color,transform] duration-150 ease-out-quart active:scale-90 cursor-pointer",
              areCommentsOpen ? "text-ink" : "text-gray-600 hover:text-ink"
            )}
          >
            <MessageCircle className="size-[17px]" />
            {post.commentsCount > 0 && post.commentsCount}
          </button>

          <div className="flex-1" />

          <button
            type="button"
            onClick={() => toggleBookmark.mutate({ postId: post.id, channelId: post.channelId })}
            aria-label="В закладки"
            className={cn(
              "transition-[color,transform] duration-150 ease-out-quart active:scale-90 cursor-pointer",
              post.bookmarkedByMe ? "text-ink" : "text-gray-500 hover:text-ink"
            )}
          >
            <Bookmark className={cn("size-[17px]", post.bookmarkedByMe && "fill-current")} />
          </button>
        </div>
      )}

      {!isEditing && areCommentsOpen && (
        <div className="animate-in fade-in slide-in-from-top-1 duration-200 ease-out-quart">
          <PostComments postId={post.id} channelId={post.channelId} />
        </div>
      )}
    </article>
  );
}
