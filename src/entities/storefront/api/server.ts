import "server-only";

import type { TypedSupabaseClient } from "@/api";
import { mapStorefrontView } from "../model/mappers";
import type { StorefrontView } from "./types";

/**
 * Серверный резолв публичной витрины (RPC get_storefront) для SSR/SEO. Клиент
 * передаётся параметром (createServerClient с куками зрителя — viewer.isMember/isOwner
 * заполняются корректно; для анонимного краулера — публичный вид). Приватность
 * (hidden без валидного инвайта → found=false → null) обеспечивает сама RPC.
 */
export async function getStorefrontViewServer(
  client: TypedSupabaseClient,
  slug: string,
  inviteCode: string | null
): Promise<StorefrontView | null> {
  const { data, error } = await client.rpc("get_storefront", {
    p_slug: slug,
    ...(inviteCode ? { p_invite_code: inviteCode } : {}),
  });

  if (error) throw new Error(error.message);

  return mapStorefrontView(data as Record<string, unknown> | null);
}
