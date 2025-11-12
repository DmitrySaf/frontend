import { type TypedSupabaseClient } from "../types";
import { type UpdateAuthUserData } from "./types";

/**
 * Update auth user (email, phone, password)
 */
export async function updateAuthUser(
  client: TypedSupabaseClient,
  data: UpdateAuthUserData
): Promise<{ data: any, error: any }> {
  return client.auth.updateUser(data);
}

/**
 * Get current auth user
 */
export async function getAuthUser(client: TypedSupabaseClient): Promise<{ data: any, error: any }> {
  return client.auth.getUser();
}

