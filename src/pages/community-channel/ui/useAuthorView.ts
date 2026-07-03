"use client";

import { CURRENT_USER_ID, getMockMember } from "@/entities/message";
import { useProfileQuery } from "@/entities/profile";

export interface AuthorView {
  displayName: string;
  avatarUrl?: string | null;
  isCommunityOwner: boolean;
}

/**
 * Резолвер автора для мок-контента: «me» → реальный профиль (владелец),
 * иначе — вымышленный участник
 */
export function useAuthorView() {
  const { data: profile } = useProfileQuery();

  return (authorId: string): AuthorView => {
    if (authorId === CURRENT_USER_ID) {
      return {
        displayName: profile?.displayName ?? "Вы",
        avatarUrl: profile?.avatarUrl,
        isCommunityOwner: true,
      };
    }
    const member = getMockMember(authorId);
    return {
      displayName: member?.displayName ?? "Участник",
      isCommunityOwner: false,
    };
  };
}
