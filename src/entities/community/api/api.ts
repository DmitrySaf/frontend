import {
  getCommunities as _getCommunities,
  getCommunity as _getCommunity,
  type CommunityResponse,
} from "@/api/communities";
import { type TypedSupabaseClient } from "@/api";
import type { CreateCommunityData } from "../model";

/**
 * Получение списка проектов
 */
export const getCommunities = async (client: TypedSupabaseClient): Promise<CommunityResponse[]> => {
  const { data, error } = await _getCommunities(client);

  return data || [];
};

/**
 * Получение единичного проекта
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
 * Создание нового проекта
 */
export const createCommunity = async (data: CreateCommunityData): Promise<void> => {
  // TODO: Implement with Supabase
  throw new Error("Not implemented yet");
};

/**
 * Удаление проекта
 */
export const deleteCommunity = async (name: string): Promise<void> => {
  // TODO: Implement with Supabase
  throw new Error("Not implemented yet");
};
