import { createBrowserClient } from "@/api/browser-client";
import { getCommunityIdBySlug } from "@/entities/community";
import type { TierRecord, TierKind, TierInput } from "./types";

const TIER_FIELDS =
  "id, community_id, name, kind, is_hidden, price_kopeks, period_months, discount_percent, is_active, position, created_at";

/**
 * Тарифы сообщества (по позиции). Админ видит все, участник/гость — активные нескрытые.
 */
export const getTiers = async (communitySlug: string): Promise<TierRecord[]> => {
  const client = createBrowserClient();
  const communityId = await getCommunityIdBySlug(communitySlug);

  const { data, error } = await client
    .from("pricing_tiers")
    .select(TIER_FIELDS)
    .eq("community_id", communityId)
    .order("position");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((tier) => ({ ...tier, kind: tier.kind as TierKind }));
};

export const createTier = async (
  communitySlug: string,
  input: TierInput
): Promise<TierRecord> => {
  const client = createBrowserClient();
  const communityId = await getCommunityIdBySlug(communitySlug);
  const siblings = await getTiers(communitySlug);

  const { data, error } = await client
    .from("pricing_tiers")
    .insert({
      community_id: communityId,
      name: input.name,
      kind: input.kind,
      price_kopeks: input.priceKopeks,
      period_months: input.kind === "recurring" ? input.periodMonths : null,
      discount_percent: input.discountPercent,
      position: siblings.length,
    })
    .select(TIER_FIELDS)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as TierRecord;
};

export const updateTier = async (tierId: string, input: TierInput): Promise<void> => {
  const client = createBrowserClient();

  const { error } = await client
    .from("pricing_tiers")
    .update({
      name: input.name,
      kind: input.kind,
      price_kopeks: input.priceKopeks,
      period_months: input.kind === "recurring" ? input.periodMonths : null,
      discount_percent: input.discountPercent,
    })
    .eq("id", tierId);

  if (error) {
    throw new Error(error.message);
  }
};

export const setTierActive = async (tierId: string, isActive: boolean): Promise<void> => {
  const client = createBrowserClient();

  const { error } = await client
    .from("pricing_tiers")
    .update({ is_active: isActive })
    .eq("id", tierId);

  if (error) {
    throw new Error(error.message);
  }
};

export const deleteTier = async (tierId: string): Promise<void> => {
  const client = createBrowserClient();
  const { error } = await client.from("pricing_tiers").delete().eq("id", tierId);

  if (error) {
    throw new Error(error.message);
  }
};
