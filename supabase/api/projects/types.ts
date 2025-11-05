
import { Tables, TablesInsert, TablesUpdate } from "../types/database";

export type ProjectRow = Tables<'projects'>;
export type ProjectInsert = TablesInsert<'projects'>;
export type ProjectUpdate = TablesUpdate<'projects'>;
export type ProjectResponse = ProjectRow;
