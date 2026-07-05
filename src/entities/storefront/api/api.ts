import { createBrowserClient } from "@/api/browser-client";
import { getCommunityIdBySlug } from "@/entities/community";
import { uploadDataUrlImage } from "@/shared/utils";
import type {
  StorefrontFeature,
  StorefrontRecord,
  StorefrontView,
  StorefrontViewTier,
} from "./types";

const EMPTY_STOREFRONT: Omit<StorefrontRecord, "id"> = {
  description: "",
  media: [],
  features: [],
};

/**
 * Контент витрины для редактора (админ)
 */
export const getStorefront = async (communitySlug: string): Promise<StorefrontRecord> => {
  const client = createBrowserClient();
  const communityId = await getCommunityIdBySlug(communitySlug);

  const { data, error } = await client
    .from("community_storefronts")
    .select("description, media, features")
    .eq("community_id", communityId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return { id: communitySlug, ...EMPTY_STOREFRONT };
  }

  return {
    id: communitySlug,
    description: data.description,
    media: (data.media ?? []) as string[],
    features: (data.features ?? []) as unknown as StorefrontFeature[],
  };
};

/**
 * Сохранение витрины; data:-медиа заливаются в Storage
 */
export const updateStorefront = async (
  communitySlug: string,
  patch: Omit<StorefrontRecord, "id">
): Promise<void> => {
  const client = createBrowserClient();
  const communityId = await getCommunityIdBySlug(communitySlug);

  const media = await Promise.all(
    patch.media.map((url, index) =>
      uploadDataUrlImage(
        "community-covers",
        `${communityId}/storefront-${Date.now()}-${index}.jpg`,
        url
      )
    )
  );

  const { error } = await client.from("community_storefronts").upsert(
    {
      community_id: communityId,
      description: patch.description,
      media,
      features: patch.features as unknown as Record<string, unknown>[],
    },
    { onConflict: "community_id" }
  );

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * Публичная витрина одним запросом (RPC get_storefront):
 * сервер сам решает, доступна ли витрина (hidden → found=false → 404)
 */
export const getStorefrontView = async (
  slug: string,
  inviteCode: string | null
): Promise<StorefrontView | null> => {
  const client = createBrowserClient();

  const { data, error } = await client.rpc("get_storefront", {
    p_slug: slug,
    ...(inviteCode ? { p_invite_code: inviteCode } : {}),
  });

  if (error) {
    throw new Error(error.message);
  }

  const raw = data as Record<string, any> | null;
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
};
