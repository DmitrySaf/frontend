import { Community } from "../api/types";
import { type Community as CommunityRecord } from "@/api/communities";

export const transformCommunity = (community: CommunityRecord): Community => {
  return {
    displayName: community.display_name,
    name: community.name,
  };
};
