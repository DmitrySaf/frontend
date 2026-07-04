import {
  getCommunities as _getCommunities,
  getCommunity as _getCommunity,
  createCommunity as _createCommunity,
  updateCommunity as _updateCommunity,
  deleteCommunity as _deleteCommunity,
  type Community as CommunityRecord,
} from "@/api/communities";
import { getAuthUser } from "@/api/auth";
import { type TypedSupabaseClient } from "@/api";
import { createBrowserClient } from "@/api/browser-client";
import { createMockCollection } from "@/shared/utils";
import type { CreateCommunityData } from "../model";
import type {
  CommunityExtrasRecord,
  CommunityProfile,
  UpdateCommunityProfileInput,
} from "./types";

// Расширенные поля сообщества (описание, оформление, видимость) — mock до этапа БД
const communityExtras = createMockCollection<CommunityExtrasRecord>("communities_extras");

const DEFAULT_EXTRAS: Omit<CommunityExtrasRecord, "id"> = {
  description: "",
  cover_url: null,
  logo_url: null,
  visibility: "hidden",
};

/** Миграция значений старой модели видимости (public/private → live/hidden) */
function normalizeVisibility(value: string): CommunityExtrasRecord["visibility"] {
  if (value === "public") return "live";
  if (value === "private") return "hidden";
  if (value === "unlisted" || value === "live") return value;
  return "hidden";
}

export const getCommunityExtras = async (slug: string): Promise<CommunityExtrasRecord> => {
  const all = await communityExtras.list();
  const found = all.find((record) => record.id === slug);
  if (!found) return { id: slug, ...DEFAULT_EXTRAS };
  return { ...found, visibility: normalizeVisibility(found.visibility) };
};

/** Карта slug → extras для всех сообществ (логотипы в rail) */
export const getAllCommunityExtras = async (): Promise<CommunityExtrasRecord[]> => {
  return communityExtras.list();
};

/**
 * Полный профиль сообщества: базовые поля из Supabase + расширенные из mock
 */
export const getCommunityProfile = async (
  client: TypedSupabaseClient,
  slug: string
): Promise<CommunityProfile> => {
  const [community, extras] = await Promise.all([
    getCommunity(client, slug),
    getCommunityExtras(slug),
  ]);

  return {
    name: community.name,
    displayName: community.display_name,
    description: extras.description,
    coverUrl: extras.cover_url,
    logoUrl: extras.logo_url,
    visibility: extras.visibility,
  };
};

/**
 * Обновление профиля сообщества: display_name — в Supabase, остальное — в mock extras
 */
export const updateCommunityProfile = async (
  input: UpdateCommunityProfileInput
): Promise<void> => {
  const client = createBrowserClient();

  if (input.displayName !== undefined) {
    const { error } = await _updateCommunity(client, input.slug, {
      display_name: input.displayName,
    });
    if (error) {
      throw new Error(error.message || "Ошибка при сохранении названия");
    }
  }

  const current = await getCommunityExtras(input.slug);
  const next: CommunityExtrasRecord = {
    ...current,
    description: input.description ?? current.description,
    cover_url: input.coverUrl !== undefined ? input.coverUrl : current.cover_url,
    logo_url: input.logoUrl !== undefined ? input.logoUrl : current.logo_url,
    visibility: input.visibility ?? current.visibility,
  };

  const all = await communityExtras.list();
  if (all.some((record) => record.id === input.slug)) {
    await communityExtras.update(input.slug, next);
  } else {
    await communityExtras.insert(next);
  }
};

/**
 * Получение списка сообществ
 */
export const getCommunities = async (client: TypedSupabaseClient): Promise<CommunityRecord[]> => {
  const { data, error } = await _getCommunities(client);

  return data || [];
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

  return data;
};

/**
 * Создание нового сообщества
 */
export const createCommunity = async (data: CreateCommunityData): Promise<void> => {
  const client = createBrowserClient();

  // Получаем текущего пользователя
  const { data: userData, error: userError } = await getAuthUser(client);

  if (userError || !userData?.user) {
    throw new Error("Необходимо войти в систему для создания сообщества");
  }

  const { data: communityData, error } = await _createCommunity(client, {
    name: data.name,
    display_name: data.displayName,
    owner_id: userData.user.id,
  });

  if (error) {
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
};
