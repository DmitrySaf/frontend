import type { TypedSupabaseClient } from "../types";
import type { UpdateAuthUserData } from "./types";

/**
 * Update auth user (email, phone, password)
 */
export async function updateAuthUser(
  client: TypedSupabaseClient,
  data: UpdateAuthUserData
): Promise<{ data: any; error: any }> {
  return client.auth.updateUser(data);
}

/**
 * Get current auth user
 */
export async function getAuthUser(client: TypedSupabaseClient): Promise<{ data: any; error: any }> {
  return client.auth.getUser();
}

/**
 * Id текущего пользователя из локальной сессии (без сетевого запроса).
 * Бросает ошибку, если сессии нет — вызывается только в авторизованных флоу.
 */
export async function getSessionUserId(client: TypedSupabaseClient): Promise<string> {
  const { data } = await client.auth.getSession();
  const userId = data.session?.user.id;
  if (!userId) {
    throw new Error("Требуется авторизация");
  }
  return userId;
}

/** Id текущего пользователя или null для гостя */
export async function getSessionUserIdOrNull(client: TypedSupabaseClient): Promise<string | null> {
  const { data } = await client.auth.getSession();
  return data.session?.user.id ?? null;
}
