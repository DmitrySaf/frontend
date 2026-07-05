// Формы записей повторяют docs/db-schema.md (community_categories, community_channels).
// В мок-режиме community_id хранит slug сообщества; при подключении БД станет uuid.

export type ChannelType = "chat" | "posts" | "course";

// Спецификация приватности (2026-07-04): open — всем участникам,
// private — виден с замком, нужен грант; secret — не виден без гранта
export type ChannelAccess = "open" | "private" | "secret";

export interface CategoryRecord {
  id: string;
  community_id: string;
  name: string;
  position: number;
  created_at: string;
}

export interface ChannelRecord {
  id: string;
  community_id: string;
  category_id: string | null;
  type: ChannelType;
  name: string;
  slug: string;
  access: ChannelAccess;
  position: number;
  created_at: string;
}

export interface ChannelGrantRecord {
  id: string;
  channel_id: string;
  user_id: string;
  granted_at: string;
}

// Доменные типы (для UI)
export interface Channel {
  id: string;
  categoryId: string | null;
  type: ChannelType;
  name: string;
  slug: string;
  access: ChannelAccess;
  position: number;
}

export interface CategoryWithChannels {
  id: string;
  name: string;
  position: number;
  channels: Channel[];
}

export interface CommunityStructure {
  categories: CategoryWithChannels[];
  /** Каналы вне категорий (category_id = null) */
  uncategorized: Channel[];
}

export interface CreateChannelInput {
  communitySlug: string;
  type: ChannelType;
  name: string;
  access: ChannelAccess;
  categoryId?: string;
  newCategoryName?: string;
}

export interface UpdateChannelInput {
  channelId: string;
  communitySlug: string;
  name: string;
  access: ChannelAccess;
  categoryId?: string;
  newCategoryName?: string;
}
