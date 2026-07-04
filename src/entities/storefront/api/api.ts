import { createMockCollection } from "@/shared/utils";
import type { StorefrontRecord } from "./types";

const storefronts = createMockCollection<StorefrontRecord>("community_storefronts");

const EMPTY_STOREFRONT: Omit<StorefrontRecord, "id"> = {
  description: "",
  media: [],
  features: [],
};

export const getStorefront = async (communitySlug: string): Promise<StorefrontRecord> => {
  const all = await storefronts.list();
  return all.find((record) => record.id === communitySlug) ?? { id: communitySlug, ...EMPTY_STOREFRONT };
};

export const updateStorefront = async (
  communitySlug: string,
  patch: Omit<StorefrontRecord, "id">
): Promise<void> => {
  const all = await storefronts.list();
  if (all.some((record) => record.id === communitySlug)) {
    await storefronts.update(communitySlug, patch);
  } else {
    await storefronts.insert({ id: communitySlug, ...patch });
  }
};
