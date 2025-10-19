import { Project } from "../api/types";
import { type ProjectResponse } from "@/api/projects";

export const transformProject = (project: ProjectResponse): Project => {
  return {
    displayName: project.display_name,
    name: project.name,
  }
}