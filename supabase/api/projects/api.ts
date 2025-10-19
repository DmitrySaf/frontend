import { type TypedSupabaseClient } from "../types";
import { type ProjectRow } from "./types";

const PROJECTS_TABLE = 'projects';

export async function getProjects(client: TypedSupabaseClient): Promise<{ data: ProjectRow[] | null, error: any }> {
  return client
    .from(PROJECTS_TABLE)
    .select('*')
    .order('created_at', { ascending: false });
}

export async function getProject(client: TypedSupabaseClient, name: string): Promise<{ data: ProjectRow | null, error: any }> {
  const result = await client
    .from(PROJECTS_TABLE)
    .select('*')
    .eq('name', name)
    .single();
  
  return result;
}