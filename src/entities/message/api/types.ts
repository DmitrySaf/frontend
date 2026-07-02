// Форма повторяет docs/db-schema.md (messages).
// В мок-режиме author_id — либо CURRENT_USER_ID («me»), либо id вымышленного участника.

export interface MessageRecord {
  id: string;
  channel_id: string;
  author_id: string;
  content: string;
  attachments: unknown[] | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

// Доменный тип (для UI)
export interface Message {
  id: string;
  channelId: string;
  authorId: string;
  content: string;
  createdAt: string;
  /** Заполнено, если сообщение редактировали */
  editedAt: string | null;
}

export interface SendMessageInput {
  channelId: string;
  content: string;
}

export interface UpdateMessageInput {
  messageId: string;
  channelId: string;
  content: string;
}

export interface DeleteMessageInput {
  messageId: string;
  channelId: string;
}
