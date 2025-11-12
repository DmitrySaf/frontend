import { CreateCommunityData } from "./validation";

export interface CommunityCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCommunityData) => Promise<void>;
}

export type { CreateCommunityData };
