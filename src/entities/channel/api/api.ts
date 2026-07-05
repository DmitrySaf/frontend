import { createMockCollection, transliterate } from "@/shared/utils";
import { CURRENT_USER_ID } from "@/entities/message";
import type {
  CategoryRecord,
  ChannelRecord,
  ChannelGrantRecord,
  CreateChannelInput,
  UpdateChannelInput,
} from "./types";

const categories = createMockCollection<CategoryRecord>("community_categories");
const channels = createMockCollection<ChannelRecord>("community_channels");
const grants = createMockCollection<ChannelGrantRecord>("channel_grants");

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
    access: "open",
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

  return {
    categories: communityCategories,
    channels: communityChannels.map((channel) => ({
      ...channel,
      access: channel.access ?? "open",
    })),
  };
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
    access: input.access,
    position: siblings.length,
    created_at: now,
  });
};

/**
 * Настройки таба: имя, категория (с созданием новой), доступ.
 * Смена доступа неретроактивна — выданные гранты не отзываются.
 */
export const updateChannel = async (input: UpdateChannelInput): Promise<ChannelRecord> => {
  const { categories: communityCategories } = await getCommunityStructure(input.communitySlug);

  let categoryId = input.categoryId ?? null;
  if (!categoryId && input.newCategoryName) {
    const category = await categories.insert({
      community_id: input.communitySlug,
      name: input.newCategoryName,
      position: communityCategories.length,
      created_at: new Date().toISOString(),
    });
    categoryId = category.id;
  }

  return channels.update(input.channelId, {
    name: input.name,
    access: input.access,
    ...(categoryId ? { category_id: categoryId } : {}),
  });
};

/**
 * Гранты текущего пользователя (доступ к private/secret-каналам)
 */
export const getMyChannelGrants = async (): Promise<string[]> => {
  const all = await grants.list();
  return all
    .filter((grant) => grant.user_id === CURRENT_USER_ID)
    .map((grant) => grant.channel_id);
};

/**
 * Выдача гранта текущему пользователю (переход по инвайт-ссылке канала)
 */
export const grantChannelAccess = async (channelId: string): Promise<void> => {
  const mine = await getMyChannelGrants();
  if (!mine.includes(channelId)) {
    await grants.insert({
      channel_id: channelId,
      user_id: CURRENT_USER_ID,
      granted_at: new Date().toISOString(),
    });
  }
};

/**
 * Удаление таба
 */
export const deleteChannel = async (channelId: string): Promise<void> => {
  await channels.remove(channelId);
};
