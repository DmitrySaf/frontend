
import { Tables, TablesInsert, TablesUpdate } from "../types/database";

export type CommunityRow = Tables<'communities'>;
export type CommunityInsert = TablesInsert<'communities'>;
export type CommunityUpdate = TablesUpdate<'communities'>;
export type CommunityResponse = CommunityRow;

export type Community = Omit<CommunityRow, 'id' | 'owner_id'>;