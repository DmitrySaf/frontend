import { CreateProjectData } from "./validation";

export interface ProjectCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProjectData) => Promise<void>;
  isLoading: boolean;
}

export type { CreateProjectData };

