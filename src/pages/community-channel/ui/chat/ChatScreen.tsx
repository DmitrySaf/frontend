"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  CURRENT_USER_ID,
  getMockMember,
  useMessagesQuery,
  useSendMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
  type Message,
} from "@/entities/message";
import { useProfileQuery } from "@/entities/profile";
import type { Channel } from "@/entities/channel";
import { DeleteDialog } from "@/shared/components";
import { dayKey, formatDayLabel } from "@/shared/utils";
import { ChatComposer } from "./ChatComposer";
import { ChatMessageItem, type MessageAuthorView } from "./ChatMessageItem";

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
    <div className="flex items-center gap-2.5 px-6 pt-4 pb-1">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-xs text-gray-500">{label}</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

export function ChatScreen({ channel }: { channel: Channel }) {
  const { data: messages, isLoading } = useMessagesQuery(channel.id);
  const { data: profile } = useProfileQuery();

  const sendMessage = useSendMessageMutation();
  const updateMessage = useUpdateMessageMutation();
  const deleteMessage = useDeleteMessageMutation();

  const [deletingMessageId, setDeletingMessageId] = useState<string | null>(null);

  // TODO(этап 11): роль из community_members; пока текущий пользователь — владелец
  const isAdmin = true;

  const scrollRef = useRef<HTMLDivElement>(null);
  const days = useMemo(() => groupByDay(messages ?? []), [messages]);

  const messagesCount = messages?.length ?? 0;
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messagesCount, channel.id]);

  const resolveAuthor = (authorId: string): MessageAuthorView => {
    if (authorId === CURRENT_USER_ID) {
      return {
        displayName: profile?.displayName ?? "Вы",
        avatarUrl: profile?.avatarUrl,
        isCommunityOwner: true,
      };
    }
    const member = getMockMember(authorId);
    return {
      displayName: member?.displayName ?? "Участник",
      isCommunityOwner: false,
    };
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto pb-3">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="size-6 animate-spin text-gray-500" />
          </div>
        ) : (
          days.map((day) => (
            <div key={day.key}>
              <DayDivider label={day.label} />
              {day.messages.map((message) => {
                const isOwn = message.authorId === CURRENT_USER_ID;
                return (
                  <ChatMessageItem
                    key={message.id}
                    message={message}
                    author={resolveAuthor(message.authorId)}
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
