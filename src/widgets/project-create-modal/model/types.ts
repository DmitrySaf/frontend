import { CreateProjectData } from "./validation";

export interface ProjectCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProjectData) => Promise<void>;
}

export type { CreateProjectData };
