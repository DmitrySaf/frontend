"use client";

import { useState } from "react";
import { Loader2, SendHorizontal } from "lucide-react";
import {
  COMMENT_MAX_LENGTH,
  usePostCommentsQuery,
  useAddCommentMutation,
} from "@/entities/post";
import { useProfileQuery } from "@/entities/profile";
import { Avatar } from "@/shared/components";
import { cn, formatRelativeTime } from "@/shared/utils";
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
    <div className="border-t border-gray-200 px-4.5 py-3.5 space-y-3.5">
      {isLoading ? (
        <div className="flex justify-center py-2">
          <Loader2 className="size-4 animate-spin text-gray-500" />
        </div>
      ) : (
        comments?.map((comment) => {
          const author = resolveAuthor(comment.authorId);
          return (
            <div key={comment.id} className="flex gap-2.5">
              <Avatar name={author.displayName} src={author.avatarUrl} size="s" />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-[13px] font-semibold text-black">
                    {author.displayName}
                  </span>
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
        <div className="flex-1 flex items-center gap-2 px-3 h-10 rounded-[12px] bg-gray-100 inset-ring inset-ring-gray-200 focus-within:inset-ring-2 focus-within:inset-ring-primary-500 transition-shadow">
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
            className="flex-1 bg-transparent text-sm text-black placeholder:text-gray-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            aria-label="Отправить комментарий"
            className={cn(
              "shrink-0 transition-colors cursor-pointer",
              canSend ? "text-primary-600 hover:text-primary-500" : "text-gray-400 cursor-default"
            )}
          >
            <SendHorizontal className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
