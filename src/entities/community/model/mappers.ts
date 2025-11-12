import { Community } from "../api/types";
import { type CommunityResponse } from "@/api/communities";

export const transformCommunity = (community: CommunityResponse): Community => {
  return {
    displayName: community.display_name,
    name: community.name,
  };
};
