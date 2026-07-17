"use client";

import {
  type Channel,
  type CreateChannelFormData,
  useCommunityStructureQuery,
  useCreateChannelMutation,
  useDeleteChannelMutation,
  useMyChannelGrantsQuery,
  useUpdateChannelMutation,
} from "@/entities/channel";
import { useCommunityProfileQuery } from "@/entities/community";
import { leaveCommunity, useCommunityRole, useInvalidateMyMembership } from "@/entities/member";
import { DeleteDialog, Skeleton } from "@/shared/components";
import { cn } from "@/shared/utils";
import { ChannelCreateModal } from "@/widgets/channel-create-modal";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import CategorySection from "./CategorySection";
import ChannelRow from "./ChannelRow";
import CommunityBanner from "./CommunityBanner";
import InviteDialog from "./InviteDialog";

interface CommunitySidebarProps {
  slug: string;
  /** Переопределение ширины/рамки в мобильном drawer'е */
  className?: string;
}

function StructureSkeleton() {
  return (
    <div className="p-3 space-y-3">
      <Skeleton width={80} height={12} radius={4} />
      <Skeleton height={32} radius={10} />
      <Skeleton height={32} radius={10} />
    </div>
  );
}

export default function CommunitySidebar({ slug, className }: CommunitySidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { data: community } = useCommunityProfileQuery(slug);
  const { data: structure, isLoading } = useCommunityStructureQuery(slug);
  const { data: grants } = useMyChannelGrantsQuery();
  const { isAdmin, actualRole, isViewingAsMember, setViewAsMember } = useCommunityRole(slug);
  const invalidateMembership = useInvalidateMyMembership();

  const createChannel = useCreateChannelMutation();
  const updateChannel = useUpdateChannelMutation();
  const deleteChannel = useDeleteChannelMutation(slug);

  const canLeave = actualRole === "member";

  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [channelInvite, setChannelInvite] = useState<Channel | null>(null);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [createChannelCategoryId, setCreateChannelCategoryId] = useState<string | null>(null);
  const [editingChannel, setEditingChannel] = useState<Channel | null>(null);
  const [deletingChannel, setDeletingChannel] = useState<Channel | null>(null);

  const activeTabSlug = pathname?.split("/")[3];

  // Видимость каналов по спецификации: secret скрыт без гранта (у не-админа),
  // private виден с замком
  const visibleStructure = useMemo(() => {
    if (!structure) return null;

    const isChannelVisible = (channel: Channel) => {
      if (isAdmin) return true;
      if (channel.access === "secret") return grants?.has(channel.id) ?? false;
      return true;
    };

    return {
      uncategorized: structure.uncategorized.filter(isChannelVisible),
      categories: structure.categories.map((category) => ({
        ...category,
        channels: category.channels.filter(isChannelVisible),
      })),
    };
  }, [structure, isAdmin, grants]);

  const isChannelLocked = (channel: Channel) =>
    !isAdmin && channel.access !== "open" && !(grants?.has(channel.id) ?? false);

  const handleCreateChannel = async (data: CreateChannelFormData) => {
    const channel = await createChannel.mutateAsync({
      communitySlug: slug,
      type: data.type,
      name: data.name,
      access: data.access,
      categoryId: data.categoryId,
      newCategoryName: data.newCategoryName?.trim() || undefined,
    });
    router.push(`/communities/${slug}/${channel.slug}`);
  };

  const handleUpdateChannel = async (data: CreateChannelFormData) => {
    if (!editingChannel) return;
    await updateChannel.mutateAsync({
      channelId: editingChannel.id,
      communitySlug: slug,
      name: data.name,
      access: data.access,
      categoryId: data.categoryId,
      newCategoryName: data.newCategoryName?.trim() || undefined,
    });
  };

  const handleLeave = async () => {
    await leaveCommunity(slug);
    invalidateMembership(slug);
    toast.success("Вы покинули сообщество");
    router.push("/communities");
  };

  const renderChannel = (channel: Channel) => (
    <ChannelRow
      key={channel.id}
      channel={channel}
      communitySlug={slug}
      isActive={channel.slug === activeTabSlug}
      isLockedForViewer={isChannelLocked(channel)}
      isAdmin={isAdmin}
      onOpenSettings={() => setEditingChannel(channel)}
      onOpenInvite={() => setChannelInvite(channel)}
      onDelete={() => setDeletingChannel(channel)}
    />
  );

  return (
    <div
      className={cn(
        "w-64 shrink-0 bg-surface border-r border-gray-200 flex flex-col h-full",
        className
      )}
    >
      <CommunityBanner
        name={community?.displayName ?? slug}
        coverUrl={community?.coverUrl}
        logoUrl={community?.logoUrl}
        isAdmin={isAdmin}
        canLeave={canLeave}
        canModerate={actualRole !== "member"}
        isViewingAsMember={isViewingAsMember}
        onToggleViewAsMember={() => setViewAsMember(!isViewingAsMember)}
        onOpenAdminSection={(section) => router.push(`/communities/${slug}/admin/${section}`)}
        onInvite={() => setIsInviteOpen(true)}
        onLeave={() => setIsLeaveOpen(true)}
      />

      <div className="flex-1 overflow-y-auto px-2.5 pb-3">
        {isLoading || !visibleStructure ? (
          <StructureSkeleton />
        ) : (
          <>
            {visibleStructure.uncategorized.length > 0 && (
              <nav className="pt-2 space-y-0.5">
                {visibleStructure.uncategorized.map(renderChannel)}
              </nav>
            )}

            {visibleStructure.categories.map((category) => (
              <CategorySection
                key={category.id}
                name={category.name}
                canAddChannel={isAdmin}
                onAddChannel={() => setCreateChannelCategoryId(category.id)}
              >
                {category.channels.map(renderChannel)}
              </CategorySection>
            ))}
          </>
        )}
      </div>

      {/* Инвайт в сообщество */}
      <InviteDialog
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        communitySlug={slug}
      />

      {/* Инвайт в private/secret-канал */}
      <InviteDialog
        isOpen={channelInvite !== null}
        onClose={() => setChannelInvite(null)}
        communitySlug={slug}
        channelId={channelInvite?.id ?? null}
        channelName={channelInvite?.name}
      />

      <DeleteDialog
        isOpen={isLeaveOpen}
        onClose={() => setIsLeaveOpen(false)}
        onDelete={handleLeave}
        title="Покинуть сообщество?"
        description="Вы потеряете доступ к контенту сообщества. Вернуться можно будет по приглашению или через публичную страницу."
        confirmText="Покинуть"
      />

      {/* Создание таба */}
      <ChannelCreateModal
        isOpen={createChannelCategoryId !== null}
        onClose={() => setCreateChannelCategoryId(null)}
        onSubmit={handleCreateChannel}
        categories={structure?.categories ?? []}
        defaultCategoryId={createChannelCategoryId ?? undefined}
      />

      {/* Настройки таба */}
      <ChannelCreateModal
        isOpen={editingChannel !== null}
        onClose={() => setEditingChannel(null)}
        onSubmit={handleUpdateChannel}
        categories={structure?.categories ?? []}
        channel={editingChannel}
      />

      <DeleteDialog
        isOpen={deletingChannel !== null}
        onClose={() => setDeletingChannel(null)}
        onDelete={async () => {
          if (deletingChannel) {
            await deleteChannel.mutateAsync(deletingChannel.id);
            if (deletingChannel.slug === activeTabSlug) {
              router.push(`/communities/${slug}`);
            }
          }
        }}
        title={`Удалить таб «${deletingChannel?.name ?? ""}»?`}
        description="Контент таба будет удалён. Это действие нельзя отменить."
      />
    </div>
  );
}
