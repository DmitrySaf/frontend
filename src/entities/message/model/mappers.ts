import type { Message, MessageRecord } from "../api/types";

export const transformMessage = (record: MessageRecord): Message => {
  return {
    id: record.id,
    channelId: record.channel_id,
    authorId: record.author_id,
    content: record.content,
    createdAt: record.created_at,
    editedAt: record.updated_at,
  };
};

export const transformMessages = (records: MessageRecord[]): Message[] => {
  return records.map(transformMessage);
};
