import type { Community as CommunityRecord } from "@/api/communities";
import type { Community } from "../api/types";

export const transformCommunity = (community: CommunityRecord): Community => {
  return {
    id: community.id,
    name: community.name,
    displayName: community.display_name,
    ownerId: community.owner_id,
    logoUrl: community.logo_url,
  };
};
