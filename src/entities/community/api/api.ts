import type { TypedSupabaseClient } from "@/api";
import { getAuthUser } from "@/api/auth";
import { createBrowserClient } from "@/api/browser-client";
import {
  type Community as CommunityRecord,
  type UpdateCommunityData,
  createCommunity as _createCommunity,
  deleteCommunity as _deleteCommunity,
  getCommunity as _getCommunity,
  updateCommunity as _updateCommunity,
} from "@/api/communities";
import { uploadDataUrlImage } from "@/shared/utils";
import type { CreateCommunityData } from "../model";
import type { CommunityProfile, CommunityVisibility, UpdateCommunityProfileInput } from "./types";

// Кэш slug → uuid: остальные entities ссылаются на сообщество по slug из URL
const communityIdCache = new Map<string, string>();

/**
 * Резолв slug → id сообщества (с кэшем на время сессии)
 */
export const getCommunityIdBySlug = async (slug: string): Promise<string> => {
  const cached = communityIdCache.get(slug);
  if (cached) return cached;

  const client = createBrowserClient();
  const { data, error } = await client
    .from("communities")
    .select("id")
    .eq("name", slug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }
  if (!data) {
    throw new Error("Сообщество не найдено");
  }

  communityIdCache.set(slug, data.id);
  return data.id;
};

/**
 * Сообщества текущего пользователя (rail): только те, где есть membership.
 * Прямой select по communities вернул бы и чужие публичные — идём через membership.
 */
export const getCommunities = async (client: TypedSupabaseClient): Promise<CommunityRecord[]> => {
  const { data: sessionData } = await client.auth.getSession();
  const userId = sessionData.session?.user.id;
  if (!userId) return [];

  const { data, error } = await client
    .from("community_members")
    .select(
      "joined_at, community:communities (id, name, display_name, owner_id, description, cover_url, logo_url, visibility, created_at, updated_at)"
    )
    .eq("user_id", userId)
    .order("joined_at");

  if (error) {
    throw new Error(error.message);
  }

  const communities = (data ?? [])
    .map((row) => row.community as unknown as CommunityRecord | null)
    .filter((community): community is CommunityRecord => community !== null);

  for (const community of communities) {
    communityIdCache.set(community.name, community.id);
  }

  return communities;
};

/**
 * Получение единичного сообщества
 */
export const getCommunity = async (
  client: TypedSupabaseClient,
  name: string
): Promise<CommunityRecord> => {
  const { data, error } = await _getCommunity(client, name);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Community not found");
  }

  communityIdCache.set(data.name, data.id);
  return data;
};

/**
 * Полный профиль сообщества (все поля теперь в таблице communities)
 */
export const getCommunityProfile = async (
  client: TypedSupabaseClient,
  slug: string
): Promise<CommunityProfile> => {
  const community = await getCommunity(client, slug);

  return {
    id: community.id,
    name: community.name,
    displayName: community.display_name,
    ownerId: community.owner_id,
    description: community.description,
    coverUrl: community.cover_url,
    logoUrl: community.logo_url,
    visibility: community.visibility as CommunityVisibility,
  };
};

/**
 * Обновление профиля сообщества; data:-обложки и лого заливаются в Storage
 */
export const updateCommunityProfile = async (input: UpdateCommunityProfileInput): Promise<void> => {
  const client = createBrowserClient();
  const communityId = await getCommunityIdBySlug(input.slug);

  const patch: UpdateCommunityData = {};

  if (input.displayName !== undefined) {
    patch.display_name = input.displayName;
  }
  if (input.description !== undefined) {
    patch.description = input.description;
  }
  if (input.visibility !== undefined) {
    patch.visibility = input.visibility;
  }
  if (input.coverUrl !== undefined) {
    patch.cover_url = input.coverUrl
      ? await uploadDataUrlImage(
          "community-covers",
          `${communityId}/cover-${Date.now()}.jpg`,
          input.coverUrl
        )
      : null;
  }
  if (input.logoUrl !== undefined) {
    patch.logo_url = input.logoUrl
      ? await uploadDataUrlImage(
          "community-logos",
          `${communityId}/logo-${Date.now()}.jpg`,
          input.logoUrl
        )
      : null;
  }

  const { error } = await _updateCommunity(client, input.slug, patch);

  if (error) {
    throw new Error(error.message || "Ошибка при сохранении");
  }
};

/**
 * Создание нового сообщества (структура по умолчанию создаётся триггером БД)
 */
export const createCommunity = async (data: CreateCommunityData): Promise<void> => {
  const client = createBrowserClient();

  const { data: userData, error: userError } = await getAuthUser(client);

  if (userError || !userData?.user) {
    throw new Error("Необходимо войти в систему для создания сообщества");
  }

  const { error } = await _createCommunity(client, {
    name: data.name,
    display_name: data.displayName,
    owner_id: userData.user.id,
  });

  if (error) {
    if (error.code === "23505") {
      throw new Error("Сообщество с таким адресом уже существует");
    }
    throw new Error(error.message || "Ошибка при создании сообщества");
  }
};

/**
 * Удаление сообщества
 */
export const deleteCommunity = async (name: string): Promise<void> => {
  const client = createBrowserClient();

  const { error } = await _deleteCommunity(client, name);

  if (error) {
    throw new Error(error.message || "Ошибка при удалении сообщества");
  }

  communityIdCache.delete(name);
};
