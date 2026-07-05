import { Community } from "../api/types";
import { type Community as CommunityRecord } from "@/api/communities";

export const transformCommunity = (community: CommunityRecord): Community => {
  return {
    id: community.id,
    name: community.name,
    displayName: community.display_name,
    ownerId: community.owner_id,
    logoUrl: community.logo_url,
  };
};
