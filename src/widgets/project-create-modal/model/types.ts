import { CreateProjectData } from "./validation";

export interface ProjectCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProjectData) => void;
  isLoading: boolean;
}

export type { CreateProjectData };

