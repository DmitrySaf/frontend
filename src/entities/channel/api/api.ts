import { createBrowserClient } from "@/api/browser-client";
import { getSessionUserIdOrNull } from "@/api/auth";
import { getCommunityIdBySlug } from "@/entities/community";
import { transliterate } from "@/shared/utils";
import type {
  CategoryRecord,
  ChannelRecord,
  ChannelAccess,
  ChannelType,
  CreateChannelInput,
  UpdateChannelInput,
} from "./types";

const CATEGORY_FIELDS = "id, community_id, name, position, created_at";
const CHANNEL_FIELDS = "id, community_id, category_id, type, name, slug, access, position, created_at";

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
 * Структура сообщества: категории + каналы.
 * Дефолтная структура («Начало» + #общий-чат) создаётся триггером при создании сообщества.
 * RLS сам скрывает secret-каналы у участников без гранта.
 */
export const getCommunityStructure = async (
  communitySlug: string
): Promise<{ categories: CategoryRecord[]; channels: ChannelRecord[] }> => {
  const client = createBrowserClient();
  const communityId = await getCommunityIdBySlug(communitySlug);

  const [categoriesResult, channelsResult] = await Promise.all([
    client
      .from("community_categories")
      .select(CATEGORY_FIELDS)
      .eq("community_id", communityId)
      .order("position"),
    client
      .from("community_channels")
      .select(CHANNEL_FIELDS)
      .eq("community_id", communityId)
      .order("position"),
  ]);

  if (categoriesResult.error) {
    throw new Error(categoriesResult.error.message);
  }
  if (channelsResult.error) {
    throw new Error(channelsResult.error.message);
  }

  return {
    categories: (categoriesResult.data ?? []) as CategoryRecord[],
    channels: (channelsResult.data ?? []).map((channel) => ({
      ...channel,
      type: channel.type as ChannelType,
      access: channel.access as ChannelAccess,
    })),
  };
};

async function resolveCategoryId(
  communityId: string,
  categoriesCount: number,
  categoryId: string | undefined,
  newCategoryName: string | undefined
): Promise<string | null> {
  if (categoryId) return categoryId;
  if (!newCategoryName) return null;

  const client = createBrowserClient();
  const { data, error } = await client
    .from("community_categories")
    .insert({
      community_id: communityId,
      name: newCategoryName,
      position: categoriesCount,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data.id;
}

/**
 * Создание таба (при необходимости — вместе с новой категорией).
 * Для таба-курса сразу создаётся пустой курс 1:1.
 */
export const createChannel = async (input: CreateChannelInput): Promise<ChannelRecord> => {
  const client = createBrowserClient();
  const communityId = await getCommunityIdBySlug(input.communitySlug);
  const { categories, channels } = await getCommunityStructure(input.communitySlug);

  const categoryId = await resolveCategoryId(
    communityId,
    categories.length,
    input.categoryId,
    input.newCategoryName
  );

  if (!categoryId) {
    throw new Error("Выберите категорию");
  }

  const siblings = channels.filter((channel) => channel.category_id === categoryId);

  const { data, error } = await client
    .from("community_channels")
    .insert({
      community_id: communityId,
      category_id: categoryId,
      type: input.type,
      name: input.name,
      slug: buildChannelSlug(input.name, channels),
      access: input.access,
      position: siblings.length,
    })
    .select(CHANNEL_FIELDS)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const channel = data as ChannelRecord;

  if (channel.type === "course") {
    const { error: courseError } = await client
      .from("courses")
      .insert({ channel_id: channel.id, title: channel.name });

    if (courseError) {
      throw new Error(courseError.message);
    }
  }

  return channel;
};

/**
 * Настройки таба: имя, категория (с созданием новой), доступ.
 * Смена доступа неретроактивна — выданные гранты не отзываются.
 */
export const updateChannel = async (input: UpdateChannelInput): Promise<ChannelRecord> => {
  const client = createBrowserClient();
  const communityId = await getCommunityIdBySlug(input.communitySlug);
  const { categories } = await getCommunityStructure(input.communitySlug);

  const categoryId = await resolveCategoryId(
    communityId,
    categories.length,
    input.categoryId,
    input.newCategoryName
  );

  const { data, error } = await client
    .from("community_channels")
    .update({
      name: input.name,
      access: input.access,
      ...(categoryId ? { category_id: categoryId } : {}),
    })
    .eq("id", input.channelId)
    .select(CHANNEL_FIELDS)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as ChannelRecord;
};

/**
 * Гранты текущего пользователя (доступ к private/secret-каналам)
 */
export const getMyChannelGrants = async (): Promise<string[]> => {
  const client = createBrowserClient();
  const userId = await getSessionUserIdOrNull(client);
  if (!userId) return [];

  const { data, error } = await client
    .from("channel_grants")
    .select("channel_id")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((grant) => grant.channel_id);
};

/**
 * Удаление таба (контент удаляется каскадом в БД)
 */
export const deleteChannel = async (channelId: string): Promise<void> => {
  const client = createBrowserClient();
  const { error } = await client.from("community_channels").delete().eq("id", channelId);

  if (error) {
    throw new Error(error.message);
  }
};
