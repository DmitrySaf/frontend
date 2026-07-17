import type { StorefrontView, StorefrontViewTier } from "../api/types";

/**
 * Маппинг ответа RPC get_storefront → StorefrontView. Чистая функция — общая для
 * браузерного (getStorefrontView) и серверного (getStorefrontViewServer) путей,
 * чтобы SSR и клиент строили одну и ту же форму. `null` при found=false (hidden без
 * доступа или не существует — единый 404).
 */
// biome-ignore lint/suspicious/noExplicitAny: сырой ответ RPC — динамический JSON
export function mapStorefrontView(data: Record<string, any> | null): StorefrontView | null {
  const raw = data;
  if (!raw || !raw.found) {
    return null;
  }

  return {
    community: {
      id: raw.community.id,
      name: raw.community.name,
      displayName: raw.community.display_name,
      description: raw.community.description ?? "",
      coverUrl: raw.community.cover_url ?? null,
      logoUrl: raw.community.logo_url ?? null,
      visibility: raw.community.visibility,
    },
    storefront: {
      description: raw.storefront?.description ?? "",
      media: raw.storefront?.media ?? [],
      features: raw.storefront?.features ?? [],
    },
    owner: raw.owner
      ? {
          displayName: raw.owner.display_name,
          username: raw.owner.username,
          avatarUrl: raw.owner.avatar_url ?? null,
          bio: raw.owner.bio ?? null,
        }
      : null,
    membersCount: raw.members_count ?? 0,
    // biome-ignore lint/suspicious/noExplicitAny: элементы массива тарифов — сырой JSON
    tiers: ((raw.tiers ?? []) as Record<string, any>[]).map(
      (tier): StorefrontViewTier => ({
        id: tier.id,
        name: tier.name,
        kind: tier.kind,
        isHidden: tier.is_hidden,
        priceKopeks: tier.price_kopeks,
        periodMonths: tier.period_months ?? null,
        discountPercent: tier.discount_percent ?? null,
        position: tier.position,
      })
    ),
    invite: raw.invite
      ? {
          code: raw.invite.code,
          channelId: raw.invite.channel_id ?? null,
          valid: raw.invite.valid,
        }
      : null,
    viewer: {
      isMember: raw.viewer?.is_member ?? false,
      isOwner: raw.viewer?.is_owner ?? false,
    },
  };
}
