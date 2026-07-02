// Формы записей повторяют docs/db-schema.md (community_categories, community_channels).
// В мок-режиме community_id хранит slug сообщества; при подключении БД станет uuid.

export type ChannelType = "chat" | "posts" | "course";

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
  position: number;
  created_at: string;
}

// Доменные типы (для UI)
export interface Channel {
  id: string;
  categoryId: string | null;
  type: ChannelType;
  name: string;
  slug: string;
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
  categoryId?: string;
  newCategoryName?: string;
}
