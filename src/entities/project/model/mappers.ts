import { Project, ProjectResponse } from "../api/types";

export const transformProject = (project: ProjectResponse): Project => {
  return {
    displayName: project.displayName,
    name: project.name,
  }
}