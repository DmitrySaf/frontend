"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMyMembershipQuery } from "../api/queries";
import type { MemberRole } from "../api/types";

const viewAsKey = (slug: string) => `bean:view-as:${slug}`;
const viewAsQueryKey = (slug: string) => ["view-as", slug];

export interface CommunityRole {
  /** Эффективная роль с учётом «Смотреть как участник» */
  role: MemberRole;
  /** Фактическая роль */
  actualRole: MemberRole;
  isAdmin: boolean;
  isViewingAsMember: boolean;
  setViewAsMember: (value: boolean) => void;
}

/**
 * Роль текущего пользователя в сообществе + постоянная админ-фича
 * «Смотреть как участник» (предпросмотр интерфейса глазами участника).
 * Membership владельца создаётся триггером БД при создании сообщества.
 */
export function useCommunityRole(slug: string): CommunityRole {
  const queryClient = useQueryClient();
  const { data: membership } = useMyMembershipQuery(slug);

  const { data: viewAs } = useQuery({
    queryKey: viewAsQueryKey(slug),
    queryFn: () =>
      typeof window === "undefined" ? null : window.localStorage.getItem(viewAsKey(slug)),
    enabled: !!slug,
  });

  const actualRole: MemberRole = membership?.role ?? "member";
  const canModerate = actualRole === "owner" || actualRole === "admin";
  const isViewingAsMember = canModerate && viewAs === "member";
  const role: MemberRole = isViewingAsMember ? "member" : actualRole;

  const setViewAsMember = (value: boolean) => {
    if (typeof window !== "undefined") {
      if (value) {
        window.localStorage.setItem(viewAsKey(slug), "member");
      } else {
        window.localStorage.removeItem(viewAsKey(slug));
      }
    }
    queryClient.invalidateQueries({ queryKey: viewAsQueryKey(slug) });
  };

  return {
    role,
    actualRole,
    isAdmin: role === "owner" || role === "admin",
    isViewingAsMember,
    setViewAsMember,
  };
}
