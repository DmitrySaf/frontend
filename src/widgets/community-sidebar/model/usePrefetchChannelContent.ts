"use client";

import { type Channel, usePrefetchCommunityStructure } from "@/entities/channel";
import { usePrefetchCourse } from "@/entities/course";
import { usePrefetchMessages } from "@/entities/message";
import { usePrefetchPosts } from "@/entities/post";

/**
 * Префетч контента канала по его типу (наводка/тач по строке в сайдбаре).
 * Заблокированные для зрителя каналы не префетчим — их контент недоступен.
 * Дедуп и пропуск свежих данных — на стороне TanStack (staleTime 60с).
 */
export function usePrefetchChannelContent() {
  const prefetchPosts = usePrefetchPosts();
  const prefetchMessages = usePrefetchMessages();
  const prefetchCourse = usePrefetchCourse();

  return (channel: Channel, isLocked: boolean) => {
    if (isLocked) return;

    switch (channel.type) {
      case "chat":
        prefetchMessages(channel.id);
        break;
      case "posts":
        prefetchPosts(channel.id);
        break;
      case "course":
        prefetchCourse(channel.id, channel.name);
        break;
    }
  };
}

/**
 * Префетч структуры сообщества (наводка на плитку в рейле)
 */
export { usePrefetchCommunityStructure };
