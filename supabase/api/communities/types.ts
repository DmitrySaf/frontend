import type { Tables, TablesInsert, TablesUpdate } from "../types/database";

export type CommunityRow = Tables<"communities">;
export type CommunityInsert = TablesInsert<"communities">;
export type CommunityUpdate = TablesUpdate<"communities">;
export type CommunityResponse = CommunityRow;

export type Community = CommunityRow;

export interface UpdateCommunityData {
  display_name?: string;
  description?: string;
  cover_url?: string | null;
  logo_url?: string | null;
  visibility?: string;
}
