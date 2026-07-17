import { createServerClient } from "@/api/server-client";
import { storefrontQueryKeys } from "@/entities/storefront";
import { getStorefrontViewServer } from "@/entities/storefront/api/server";
import { StorefrontPage } from "@/pages/community-preview";
import { HydrationBoundary } from "@/shared/components";
import { getServerQueryClient } from "@/shared/config/getServerQueryClient";
import { dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface StorefrontRouteProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ invite?: string }>;
}

// Один RPC-резолв на запрос: generateMetadata и сама страница делят результат
// (React.cache дедуплицирует по аргументам)
const resolveView = cache(async (slug: string, inviteCode: string | null) => {
  const client = await createServerClient();
  return getStorefrontViewServer(client, slug, inviteCode);
});

export async function generateMetadata({
  params,
  searchParams,
}: StorefrontRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const { invite } = await searchParams;
  const view = await resolveView(decodeURIComponent(slug), invite ?? null);

  if (!view) {
    return { title: "Страница не найдена — Bean" };
  }

  const { displayName, description, coverUrl } = view.community;
  const desc = description || `Присоединяйтесь к сообществу «${displayName}» на Bean`;

  return {
    title: `${displayName} — Bean`,
    description: desc,
    openGraph: {
      title: displayName,
      description: desc,
      images: coverUrl ? [coverUrl] : undefined,
    },
  };
}

/**
 * Публичная витрина: серверный рендер с данными для SEO. Видимость/инвайт решает
 * RPC (hidden без доступа → null → notFound). notFound вызывается ДО стриминга
 * (loading.tsx для этого маршрута намеренно нет) — корректный 404-статус. Данные
 * гидрируются в клиентский StorefrontPage, который берёт их из кэша без рефетча.
 */
export default async function StorefrontRoute({ params, searchParams }: StorefrontRouteProps) {
  const { slug } = await params;
  const { invite } = await searchParams;
  const decodedSlug = decodeURIComponent(slug);
  const inviteCode = invite ?? null;

  const view = await resolveView(decodedSlug, inviteCode);
  if (!view) {
    notFound();
  }

  const queryClient = getServerQueryClient();
  queryClient.setQueryData(storefrontQueryKeys.view(decodedSlug, inviteCode), view);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StorefrontPage slug={decodedSlug} inviteCode={inviteCode} />
    </HydrationBoundary>
  );
}
