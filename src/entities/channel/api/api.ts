import { createMockCollection, transliterate } from "@/shared/utils";
import type {
  CategoryRecord,
  ChannelRecord,
  CreateChannelInput,
} from "./types";

const categories = createMockCollection<CategoryRecord>("community_categories");
const channels = createMockCollection<ChannelRecord>("community_channels");

/**
 * Уникальный slug таба внутри сообщества: транслитерация + числовой суффикс при коллизии
 */
function buildChannelSlug(name: string, existing: ChannelRecord[]): string {
  const base = transliterate(name) || "tab";
  const taken = new Set(existing.map((channel) => channel.slug));

  if (!taken.has(base)) return base;

  let counter = 2;
  while (taken.has(`${base}-${counter}`)) {
    counter++;
  }
  return `${base}-${counter}`;
}

/**
 * Первый заход в сообщество — создаём структуру по умолчанию: «Начало» + #общий-чат
 */
async function seedDefaultStructure(communitySlug: string): Promise<{
  categories: CategoryRecord[];
  channels: ChannelRecord[];
}> {
  const now = new Date().toISOString();

  const category: CategoryRecord = {
    id: crypto.randomUUID(),
    community_id: communitySlug,
    name: "Начало",
    position: 0,
    created_at: now,
  };

  const channel: ChannelRecord = {
    id: crypto.randomUUID(),
    community_id: communitySlug,
    category_id: category.id,
    type: "chat",
    name: "общий-чат",
    slug: "obschiy-chat",
    position: 0,
    created_at: now,
  };

  await categories.insert(category);
  await channels.insert(channel);

  return { categories: [category], channels: [channel] };
}

/**
 * Структура сообщества: категории + каналы
 */
export const getCommunityStructure = async (
  communitySlug: string
): Promise<{ categories: CategoryRecord[]; channels: ChannelRecord[] }> => {
  const [allCategories, allChannels] = await Promise.all([
    categories.list(),
    channels.list(),
  ]);

  const communityCategories = allCategories.filter(
    (category) => category.community_id === communitySlug
  );
  const communityChannels = allChannels.filter(
    (channel) => channel.community_id === communitySlug
  );

  if (communityCategories.length === 0 && communityChannels.length === 0) {
    return seedDefaultStructure(communitySlug);
  }

  return { categories: communityCategories, channels: communityChannels };
};

/**
 * Создание таба (при необходимости — вместе с новой категорией)
 */
export const createChannel = async (input: CreateChannelInput): Promise<ChannelRecord> => {
  const now = new Date().toISOString();
  const { categories: communityCategories, channels: communityChannels } =
    await getCommunityStructure(input.communitySlug);

  let categoryId = input.categoryId ?? null;

  if (!categoryId && input.newCategoryName) {
    const category = await categories.insert({
      community_id: input.communitySlug,
      name: input.newCategoryName,
      position: communityCategories.length,
      created_at: now,
    });
    categoryId = category.id;
  }

  if (!categoryId) {
    throw new Error("Выберите категорию");
  }

  const siblings = communityChannels.filter((channel) => channel.category_id === categoryId);

  return channels.insert({
    community_id: input.communitySlug,
    category_id: categoryId,
    type: input.type,
    name: input.name,
    slug: buildChannelSlug(input.name, communityChannels),
    position: siblings.length,
    created_at: now,
  });
};

/**
 * Удаление таба
 */
export const deleteChannel = async (channelId: string): Promise<void> => {
  await channels.remove(channelId);
};
