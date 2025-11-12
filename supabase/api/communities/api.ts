import { type TypedSupabaseClient } from "../types";
import { type Community } from "./types";

const COMMUNITIES_TABLE = 'communities';

export async function getCommunities(client: TypedSupabaseClient): Promise<{ data: Community[] | null, error: any }> {
  return client
    .from(COMMUNITIES_TABLE)
    .select('display_name, name, created_at, updated_at')
    .order('created_at', { ascending: false });
}

export async function getCommunity(client: TypedSupabaseClient, name: string): Promise<{ data: Community | null, error: any }> {
  return client
    .from(COMMUNITIES_TABLE)
    .select('display_name, name, created_at, updated_at')
    .eq('name', name)
    .single();
}

export async function deleteCommunity(client: TypedSupabaseClient, name: string): Promise<{ data: Community | null, error: any }> {
  return client
    .from(COMMUNITIES_TABLE)
    .delete()
    .eq('name', name)
}
