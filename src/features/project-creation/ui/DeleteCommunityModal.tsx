"use client";

import { DeleteDialog } from "@/shared/components";
import { useDeleteCommunityMutation } from "@/entities/community";

interface DeleteCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  communityName: string | null;
}

export default function DeleteCommunityModal({
  isOpen,
  onClose,
  communityName,
}: DeleteCommunityModalProps) {
  const deleteCommunity = useDeleteCommunityMutation();

  const handleDelete = async () => {
    if (!communityName) {
      throw new Error("Community name is required");
    }
    await deleteCommunity.mutateAsync(communityName);
  };

  return (
    <DeleteDialog
      isOpen={isOpen}
      onClose={onClose}
      onDelete={handleDelete}
      title="Удалить проект"
      description={`Вы уверены, что хотите удалить проект "${communityName}"? Это действие нельзя будет отменить.`}
    />
  );
}

