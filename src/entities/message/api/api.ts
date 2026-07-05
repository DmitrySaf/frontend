import { getSessionUserId } from "@/api/auth";
import { createBrowserClient } from "@/api/browser-client";
import type { MessageRecord, SendMessageInput, UpdateMessageInput } from "./types";

const MESSAGE_FIELDS = `
  id, channel_id, author_id, content, attachments, created_at, updated_at, deleted_at,
  author:profiles (display_name, username, avatar_url)
`;

/**
 * Сообщения канала (по возрастанию времени, без удалённых)
 */
export const getMessages = async (channelId: string): Promise<MessageRecord[]> => {
  const client = createBrowserClient();

  const { data, error } = await client
    .from("messages")
    .select(MESSAGE_FIELDS)
    .eq("channel_id", channelId)
    .is("deleted_at", null)
    .order("created_at");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as unknown as MessageRecord[];
};

/**
 * Отправка сообщения от текущего пользователя
 */
export const sendMessage = async (input: SendMessageInput): Promise<MessageRecord> => {
  const client = createBrowserClient();
  const userId = await getSessionUserId(client);

  const { data, error } = await client
    .from("messages")
    .insert({
      channel_id: input.channelId,
      author_id: userId,
      content: input.content,
    })
    .select(MESSAGE_FIELDS)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as unknown as MessageRecord;
};

/**
 * Редактирование своего сообщения (updated_at — метка «изменено»)
 */
export const updateMessage = async (input: UpdateMessageInput): Promise<MessageRecord> => {
  const client = createBrowserClient();

  const { data, error } = await client
    .from("messages")
    .update({
      content: input.content,
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.messageId)
    .select(MESSAGE_FIELDS)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as unknown as MessageRecord;
};

/**
 * Удаление сообщения (soft delete, как в схеме)
 */
export const deleteMessage = async (messageId: string): Promise<void> => {
  const client = createBrowserClient();

  const { error } = await client
    .from("messages")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", messageId);

  if (error) {
    throw new Error(error.message);
  }
};
