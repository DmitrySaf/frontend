"use client";

import { useState } from "react";
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
import { CURRENT_USER_ID } from "@/entities/message";
import {
  useUpdatePostMutation,
  useTogglePinMutation,
  useToggleLikeMutation,
  useToggleBookmarkMutation,
  type Post,
  type PostFormData,
} from "@/entities/post";
import { Avatar, Dropdown, type DropdownItemConfig } from "@/shared/components";
import { cn, formatRelativeTime } from "@/shared/utils";
import { useAuthorView } from "../useAuthorView";
import { PostComments } from "./PostComments";
import { PostForm } from "./PostForm";

interface PostCardProps {
  post: Post;
  onDelete: () => void;
}

export function PostCard({ post, onDelete }: PostCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [areCommentsOpen, setAreCommentsOpen] = useState(false);

  const resolveAuthor = useAuthorView();
  const author = resolveAuthor(post.authorId);

  const updatePost = useUpdatePostMutation();
  const togglePin = useTogglePinMutation();
  const toggleLike = useToggleLikeMutation();
  const toggleBookmark = useToggleBookmarkMutation();

  // TODO(этап 11): роль из community_members; пока текущий пользователь — владелец
  const isAdmin = true;
  const isOwn = post.authorId === CURRENT_USER_ID;

  const menuItems: DropdownItemConfig[] = [
    ...(isOwn
      ? [{ icon: Pencil, label: "Редактировать", onClick: () => setIsEditing(true) }]
      : []),
    ...(isAdmin
      ? [
          {
            icon: post.pinned ? PinOff : Pin,
            label: post.pinned ? "Открепить" : "Закрепить",
            onClick: () =>
              togglePin.mutate({ postId: post.id, channelId: post.channelId, pinned: !post.pinned }),
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
    <article className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4.5 space-y-3">
        {/* Автор */}
        <div className="flex items-center gap-2.5">
          <Avatar name={author.displayName} src={author.avatarUrl} size="m" className="size-9" />
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[13px] font-semibold text-black truncate">
                {author.displayName}
              </span>
              {author.isCommunityOwner && (
                <span className="text-xs font-medium text-primary-600">· автор</span>
              )}
            </div>
            <div className="text-xs text-gray-500">{formatRelativeTime(post.createdAt)}</div>
          </div>
          {post.pinned && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#DEFCAD] text-xs font-medium text-black">
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
                  className="size-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
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
            <h2 className="text-lg font-bold text-black leading-[1.25]">{post.title}</h2>
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
        <img src={post.coverUrl} alt="" className="w-full max-h-96 object-cover" />
      )}

      {!isEditing && (
        <div
          className={cn(
            "flex items-center gap-5 px-4.5 py-3",
            post.coverUrl && "border-t border-gray-200"
          )}
        >
          <button
            type="button"
            onClick={() => toggleLike.mutate({ postId: post.id, channelId: post.channelId })}
            className={cn(
              "flex items-center gap-1.5 text-[13px] transition-colors cursor-pointer",
              post.likedByMe ? "text-danger" : "text-gray-600 hover:text-black"
            )}
          >
            <Heart className={cn("size-[17px]", post.likedByMe && "fill-current")} />
            {post.likesCount > 0 && post.likesCount}
          </button>

          <button
            type="button"
            onClick={() => setAreCommentsOpen(!areCommentsOpen)}
            className={cn(
              "flex items-center gap-1.5 text-[13px] transition-colors cursor-pointer",
              areCommentsOpen ? "text-black" : "text-gray-600 hover:text-black"
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
              "transition-colors cursor-pointer",
              post.bookmarkedByMe ? "text-black" : "text-gray-500 hover:text-black"
            )}
          >
            <Bookmark className={cn("size-[17px]", post.bookmarkedByMe && "fill-current")} />
          </button>
        </div>
      )}

      {!isEditing && areCommentsOpen && (
        <PostComments postId={post.id} channelId={post.channelId} />
      )}
    </article>
  );
}
