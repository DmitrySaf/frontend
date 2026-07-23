"use client";

import type { Channel } from "@/entities/channel";
import { useCommunityRole } from "@/entities/member";
import {
  type Message,
  useDeleteMessageMutation,
  useMessagesQuery,
  useMessagesRealtime,
  useSendMessageMutation,
  useUpdateMessageMutation,
} from "@/entities/message";
import { ContentErrorState, DeleteDialog, Skeleton } from "@/shared/components";
import { useSessionUserId } from "@/shared/composables";
import { dayKey, formatDayLabel } from "@/shared/utils";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuthorView } from "../useAuthorView";
import { ChatComposer } from "./ChatComposer";
import { ChatMessageItem } from "./ChatMessageItem";

// Сообщения одного автора в пределах 5 минут собираются в группу (Discord-style)
const GROUP_WINDOW_MS = 5 * 60 * 1000;

interface DayGroup {
  key: string;
  label: string;
  messages: (Message & { isGroupStart: boolean })[];
}

function groupByDay(messages: Message[]): DayGroup[] {
  const days: DayGroup[] = [];

  for (const message of messages) {
    const key = dayKey(message.createdAt);
    let day = days[days.length - 1];

    if (!day || day.key !== key) {
      day = { key, label: formatDayLabel(message.createdAt), messages: [] };
      days.push(day);
    }

    const previous = day.messages[day.messages.length - 1];
    const isGroupStart =
      !previous ||
      previous.authorId !== message.authorId ||
      new Date(message.createdAt).getTime() - new Date(previous.createdAt).getTime() >
        GROUP_WINDOW_MS;

    day.messages.push({ ...message, isGroupStart });
  }

  return days;
}

function DayDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 px-4 md:px-6 pt-4 pb-1">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-xs text-gray-500">{label}</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

// Скелетон истории: ряды «аватар + пузырь» разной ширины (Discord-style)
const CHAT_SKELETON_ROWS = [
  { id: "a", width: 220 },
  { id: "b", width: 320 },
  { id: "c", width: 180 },
  { id: "d", width: 280 },
  { id: "e", width: 150 },
];

function ChatSkeleton() {
  return (
    <div className="px-4 pt-4 space-y-5">
      {CHAT_SKELETON_ROWS.map((row) => (
        <div key={row.id} className="flex gap-3">
          <Skeleton circle width={36} className="shrink-0" />
          <div className="space-y-1.5">
            <Skeleton width={120} height={12} radius={6} />
            <Skeleton width={row.width} height={14} radius={6} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChatScreen({ channel }: { channel: Channel }) {
  const { data: messages, isLoading, isError, refetch } = useMessagesQuery(channel.id);
  useMessagesRealtime(channel.id);
  const resolveAuthor = useAuthorView();
  const myUserId = useSessionUserId();

  const sendMessage = useSendMessageMutation();
  const updateMessage = useUpdateMessageMutation();
  const deleteMessage = useDeleteMessageMutation();

  const [deletingMessageId, setDeletingMessageId] = useState<string | null>(null);

  const params = useParams();
  const { isAdmin } = useCommunityRole((params?.slug as string) ?? "");

  const scrollRef = useRef<HTMLDivElement>(null);
  const days = useMemo(() => groupByDay(messages ?? []), [messages]);

  // После первичного рендера истории контейнер помечается data-live:
  // только новые сообщения получают анимацию появления (см. .content-appear)
  const [isLive, setIsLive] = useState(false);
  const isLiveRef = useRef(false);
  isLiveRef.current = isLive;

  // biome-ignore lint/correctness/useExhaustiveDependencies: channel.id — триггер сброса
  useEffect(() => {
    setIsLive(false);
  }, [channel.id]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setIsLive(true), 80);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const messagesCount = messages?.length ?? 0;
  // biome-ignore lint/correctness/useExhaustiveDependencies: messagesCount и channel.id — намеренные триггеры автоскролла к низу
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: isLiveRef.current ? "smooth" : "auto",
      });
    }
  }, [messagesCount, channel.id]);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div ref={scrollRef} data-live={isLive} className="flex-1 min-h-0 overflow-y-auto pb-3">
        {isError && !messages ? (
          <ContentErrorState onRetry={() => refetch()} />
        ) : isLoading ? (
          <ChatSkeleton />
        ) : (
          days.map((day) => (
            <div key={day.key}>
              <DayDivider label={day.label} />
              {day.messages.map((message) => {
                const isOwn = myUserId !== null && message.authorId === myUserId;
                return (
                  <ChatMessageItem
                    key={message.id}
                    message={message}
                    author={resolveAuthor(message.authorId, message.author)}
                    isGroupStart={message.isGroupStart}
                    canEdit={isOwn}
                    canDelete={isOwn || isAdmin}
                    onEdit={(content) =>
                      updateMessage.mutateAsync({
                        messageId: message.id,
                        channelId: channel.id,
                        content,
                      })
                    }
                    onDelete={() => setDeletingMessageId(message.id)}
                  />
                );
              })}
            </div>
          ))
        )}
      </div>

      <ChatComposer
        channelName={channel.name}
        isSending={sendMessage.isPending}
        onSend={(content) => sendMessage.mutateAsync({ channelId: channel.id, content })}
      />

      <DeleteDialog
        isOpen={deletingMessageId !== null}
        onClose={() => setDeletingMessageId(null)}
        onDelete={async () => {
          if (deletingMessageId) {
            await deleteMessage.mutateAsync({
              messageId: deletingMessageId,
              channelId: channel.id,
            });
          }
        }}
        title="Удалить сообщение?"
        description="Сообщение будет удалено для всех участников. Это действие нельзя отменить."
      />
    </div>
  );
}
