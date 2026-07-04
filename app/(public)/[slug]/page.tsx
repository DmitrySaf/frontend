import { StorefrontPage } from "@/pages/community-preview";

interface StorefrontRouteProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ invite?: string }>;
}

// Витрина сообщества. Проверка видимости/инвайта — на клиенте (мок-режим);
// при подключении БД переезжает на сервер с единообразным 404 для hidden.
export default async function StorefrontRoute({ params, searchParams }: StorefrontRouteProps) {
  const { slug } = await params;
  const { invite } = await searchParams;

  return <StorefrontPage slug={decodeURIComponent(slug)} inviteCode={invite ?? null} />;
}
