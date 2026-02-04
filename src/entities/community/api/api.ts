import {
  getCommunities as _getCommunities,
  getCommunity as _getCommunity,
  createCommunity as _createCommunity,
  deleteCommunity as _deleteCommunity,
  type CommunityResponse,
} from "@/api/communities";
import { getAuthUser } from "@/api/auth";
import { type TypedSupabaseClient } from "@/api";
import { createBrowserClient } from "@/api/browser-client";
import type { CreateCommunityData } from "../model";

/**
 * Получение списка сообществ
 */
export const getCommunities = async (client: TypedSupabaseClient): Promise<CommunityResponse[]> => {
  const { data, error } = await _getCommunities(client);

  return data || [];
};

/**
 * Получение единичного сообщества
 */
export const getCommunity = async (
  client: TypedSupabaseClient,
  name: string
): Promise<CommunityResponse> => {
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
