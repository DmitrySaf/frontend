"use client";

import { useParams } from "next/navigation";
import { useCommunityQuery } from "@/entities/community";

export interface AuthorView {
  displayName: string;
  avatarUrl?: string | null;
  isCommunityOwner: boolean;
}

interface AuthorInfo {
  displayName: string;
  avatarUrl: string | null;
}

/**
 * Резолвер автора: имя/аватар приходят джойном профиля,
 * бейдж «автор» — по owner_id сообщества
 */
export function useAuthorView() {
  const params = useParams();
  const slug = (params?.slug as string) ?? "";
  const { data: community } = useCommunityQuery(slug);

  return (authorId: string, author?: AuthorInfo | null): AuthorView => ({
    displayName: author?.displayName ?? "Участник",
    avatarUrl: author?.avatarUrl ?? null,
    isCommunityOwner: !!community && authorId === community.ownerId,
  });
}
