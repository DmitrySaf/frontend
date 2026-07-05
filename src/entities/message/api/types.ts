// Форма повторяет docs/db-schema.md (messages) + джойн профиля автора.

export interface AuthorProfileRecord {
  display_name: string;
  username: string;
  avatar_url: string | null;
}

export interface MessageRecord {
  id: string;
  channel_id: string;
  author_id: string;
  content: string;
  attachments: unknown;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  author: AuthorProfileRecord | null;
}

// Доменные типы (для UI)
export interface MessageAuthor {
  displayName: string;
  username: string;
  avatarUrl: string | null;
}

export interface Message {
  id: string;
  channelId: string;
  authorId: string;
  content: string;
  createdAt: string;
  /** Заполнено, если сообщение редактировали */
  editedAt: string | null;
  author: MessageAuthor | null;
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
