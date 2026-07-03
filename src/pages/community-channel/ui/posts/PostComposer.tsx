"use client";

import { useState } from "react";
import { useProfileQuery } from "@/entities/profile";
import { useCreatePostMutation, type PostFormData } from "@/entities/post";
import { Avatar, Button } from "@/shared/components";
import { PostForm } from "./PostForm";

/**
 * Инлайн-композер: свёрнутая строка разворачивается в полную форму на месте
 */
export function PostComposer({ channelId }: { channelId: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: profile } = useProfileQuery();
  const createPost = useCreatePostMutation();

  const handleSubmit = async (data: PostFormData & { coverUrl: string | null }) => {
    await createPost.mutateAsync({
      channelId,
      title: data.title,
      content: data.content,
      coverUrl: data.coverUrl,
    });
    setIsExpanded(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3.5">
      {isExpanded ? (
        <PostForm
          submitLabel="Опубликовать"
          onSubmit={handleSubmit}
          onCancel={() => setIsExpanded(false)}
        />
      ) : (
        <div className="flex items-center gap-3">
          <Avatar name={profile?.displayName ?? "Вы"} src={profile?.avatarUrl} size="m" />
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="flex-1 h-11 px-3.5 flex items-center rounded-[12px] bg-gray-100 inset-ring inset-ring-gray-200 text-sm text-gray-500 text-left hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Написать пост для сообщества…
          </button>
          <Button theme="primary" size="s" onClick={() => setIsExpanded(true)}>
            Опубликовать
          </Button>
        </div>
      )}
    </div>
  );
}
