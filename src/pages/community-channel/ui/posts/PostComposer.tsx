"use client";

import { type PostFormData, useCreatePostMutation } from "@/entities/post";
import { useProfileQuery } from "@/entities/profile";
import { Avatar, Button } from "@/shared/components";
import { useState } from "react";
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
    <div className="bg-surface rounded-2xl border border-gray-200 shadow-sm p-3.5">
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
            className="flex-1 min-w-0 h-11 px-3.5 flex items-center rounded-[12px] bg-gray-100 inset-ring inset-ring-gray-200 text-base text-gray-500 text-left hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <span className="truncate">Написать пост для сообщества…</span>
          </button>
          {/* На мобиле кнопка дублирует пилл (оба раскрывают форму) и распирала строку —
              плейсхолдер вылезал из пилла тремя строками */}
          <Button
            theme="primary"
            size="md"
            onClick={() => setIsExpanded(true)}
            className="hidden md:inline-flex"
          >
            Опубликовать
          </Button>
        </div>
      )}
    </div>
  );
}
