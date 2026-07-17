import { createServerClient } from "@/api/server-client";
import { pickFirstChannel } from "@/entities/channel";
import { getCommunityStructureServer } from "@/entities/channel/api/server";
import { CommunityFirstChannelRedirect } from "@/pages/community-channel";
import { redirect } from "next/navigation";

interface CommunityPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Вход в сообщество открывает его первый канал (как в Discord — отдельной «Главной»
 * нет). Резолв серверный: одним redirect() на конечный URL, без клиентского спиннера.
 * Если структура недоступна/пуста (RLS отдал пусто, гонка после создания) — рендерим
 * клиентский fallback, который дождётся структуры. НИКОГДА не редиректим назад — петля.
 */
export default async function CommunityPage({ params }: CommunityPageProps) {
  const { slug } = await params;

  const client = await createServerClient();
  const structure = await getCommunityStructureServer(client, slug);
  const firstChannel = structure ? pickFirstChannel(structure) : null;

  if (firstChannel) {
    redirect(`/communities/${slug}/${firstChannel.slug}`);
  }

  return <CommunityFirstChannelRedirect slug={slug} />;
}
