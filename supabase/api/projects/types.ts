import { type TypedSupabaseClient } from "../types";
import { Database } from "../types/database";

export type ProjectRow = Database['public']['Tables']['projects']['Row'];
export type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
export type ProjectUpdate = Database['public']['Tables']['projects']['Update'];
export type ProjectResponse = ProjectRow;
