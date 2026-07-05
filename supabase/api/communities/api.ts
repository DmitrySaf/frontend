import { type TypedSupabaseClient } from "../types";
import { type Community, type UpdateCommunityData } from "./types";

const COMMUNITIES_TABLE = 'communities';

const COMMUNITY_FIELDS =
  'id, name, display_name, owner_id, description, cover_url, logo_url, visibility, created_at, updated_at';

export async function getCommunities(client: TypedSupabaseClient): Promise<{ data: Community[] | null, error: any }> {
  return client
    .from(COMMUNITIES_TABLE)
    .select(COMMUNITY_FIELDS)
    .order('created_at', { ascending: false });
}

export async function getCommunity(client: TypedSupabaseClient, name: string): Promise<{ data: Community | null, error: any }> {
  return client
    .from(COMMUNITIES_TABLE)
    .select(COMMUNITY_FIELDS)
    .eq('name', name)
    .maybeSingle();
}

export async function createCommunity(
  client: TypedSupabaseClient,
  data: { name: string; display_name: string; owner_id: string }
): Promise<{ data: Community | null, error: any }> {
  return client
    .from(COMMUNITIES_TABLE)
    .insert({
      name: data.name,
      display_name: data.display_name,
      owner_id: data.owner_id,
    })
    .select(COMMUNITY_FIELDS)
    .single();
}

export async function updateCommunity(
  client: TypedSupabaseClient,
  name: string,
  data: UpdateCommunityData
): Promise<{ data: Community | null, error: any }> {
  return client
    .from(COMMUNITIES_TABLE)
    .update(data)
    .eq('name', name)
    .select(COMMUNITY_FIELDS)
    .single();
}

export async function deleteCommunity(client: TypedSupabaseClient, name: string): Promise<{ data: Community | null, error: any }> {
  return client
    .from(COMMUNITIES_TABLE)
    .delete()
    .eq('name', name)
}
