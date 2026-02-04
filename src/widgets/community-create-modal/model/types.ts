import { type CreateCommunityData } from "@/entities/community";

export interface CommunityCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCommunityData) => Promise<void>;
}
