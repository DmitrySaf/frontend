"use client";

import { COMMENT_MAX_LENGTH, useAddCommentMutation, usePostCommentsQuery } from "@/entities/post";
import { useProfileQuery } from "@/entities/profile";
import { Avatar, Skeleton } from "@/shared/components";
import { cn, formatRelativeTime } from "@/shared/utils";
import { PaperAirplaneRightBold16 } from "@frosted-ui/icons";
import { useState } from "react";
import { useAuthorView } from "../useAuthorView";

interface PostCommentsProps {
  postId: string;
  channelId: string;
}

/**
 * Раскрывающаяся лента комментариев под постом (один уровень)
 */
export function PostComments({ postId, channelId }: PostCommentsProps) {
  const [value, setValue] = useState("");
  const { data: comments, isLoading } = usePostCommentsQuery(channelId, postId, true);
  const { data: profile } = useProfileQuery();
  const addComment = useAddCommentMutation();
  const resolveAuthor = useAuthorView();

  const canSend = value.trim().length > 0 && !addComment.isPending;

  const handleSend = async () => {
    const content = value.trim();
    if (!content || addComment.isPending) return;

    setValue("");
    try {
      await addComment.mutateAsync({ postId, channelId, content });
    } catch {
      setValue(content);
    }
  };

  return (
    <div data-live={!isLoading} className="border-t border-gray-200 px-5 py-3.5 space-y-3.5">
      {isLoading ? (
        [0, 1].map((i) => (
          <div key={i} className="flex gap-2.5">
            <Skeleton circle width={32} />
            <div className="flex-1 space-y-2 pt-1">
              <Skeleton width={100} height={11} radius={4} />
              <Skeleton height={13} radius={4} />
            </div>
          </div>
        ))
      ) : (
        comments?.map((comment) => {
          const author = resolveAuthor(comment.authorId, comment.author);
          return (
            <div key={comment.id} className="content-appear flex gap-2.5">
              <Avatar name={author.displayName} src={author.avatarUrl} size="s" />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-[13px] font-semibold text-ink">{author.displayName}</span>
                  {author.isCommunityOwner && (
                    <span className="text-xs font-medium text-primary-600">автор</span>
                  )}
                  <span className="text-xs text-gray-500">
                    {formatRelativeTime(comment.createdAt)}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-gray-800 leading-[1.45] whitespace-pre-wrap break-words">
                  {comment.content}
                </p>
              </div>
            </div>
          );
        })
      )}

      <div className="flex items-center gap-2.5">
        <Avatar name={profile?.displayName ?? "Вы"} src={profile?.avatarUrl} size="s" />
        <div className="flex-1 flex items-center gap-2 px-3 h-9 rounded-[10px] bg-gray-100 inset-ring inset-ring-gray-200 focus-within:inset-ring-2 focus-within:inset-ring-primary-500 transition-shadow">
          <input
            value={value}
            maxLength={COMMENT_MAX_LENGTH}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSend();
              }
            }}
            placeholder="Написать комментарий…"
            className="flex-1 bg-transparent text-base text-ink placeholder:text-gray-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            aria-label="Отправить комментарий"
            className={cn(
              "shrink-0 transition-[color,transform,opacity] duration-150 ease-out-quart cursor-pointer",
              canSend
                ? "text-primary-600 hover:text-primary-500 active:scale-90"
                : "text-gray-400 opacity-70 cursor-default"
            )}
          >
            <PaperAirplaneRightBold16 className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
