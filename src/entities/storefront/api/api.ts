import { createBrowserClient } from "@/api/browser-client";
import { getCommunityIdBySlug } from "@/entities/community";
import { uploadDataUrlImage } from "@/shared/utils";
import { mapStorefrontView } from "../model/mappers";
import type { StorefrontFeature, StorefrontRecord, StorefrontView } from "./types";

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
      // Уже загруженные URL оставляем как есть — заливаем только новые data:-медиа
      url.startsWith("data:")
        ? uploadDataUrlImage(
            "community-covers",
            `${communityId}/storefront-${Date.now()}-${index}.jpg`,
            url
          )
        : url
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

  return mapStorefrontView(data as Record<string, unknown> | null);
};
