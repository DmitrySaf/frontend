"use client";

import {
  revokeInvite,
  useCommunityInviteQuery,
  useInvalidateCommunityInvite,
} from "@/entities/invite";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Skeleton,
  toast,
} from "@/shared/components";
import { CheckmarkBold16, CopyBold16 } from "@frosted-ui/icons";
import { useState } from "react";

interface InviteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  communitySlug: string;
  /** Инвайт на private/secret-канал: даёт membership + доступ к каналу одним действием */
  channelId?: string | null;
  channelName?: string;
}

export default function InviteDialog({
  isOpen,
  onClose,
  communitySlug,
  channelId = null,
  channelName,
}: InviteDialogProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);

  const { data: invite, isLoading } = useCommunityInviteQuery(communitySlug, isOpen, channelId);
  const invalidateInvite = useInvalidateCommunityInvite();

  const inviteLink =
    invite && typeof window !== "undefined"
      ? `${window.location.origin}/${communitySlug}?invite=${invite.code}`
      : null;

  const handleCopy = async () => {
    if (!inviteLink) return;
    try {
      await navigator.clipboard.writeText(inviteLink);
      setIsCopied(true);
      toast.success("Ссылка скопирована");
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error("Не удалось скопировать ссылку");
    }
  };

  const handleRevoke = async () => {
    if (!invite) return;
    setIsRevoking(true);
    try {
      await revokeInvite(invite.id);
      invalidateInvite(communitySlug);
      toast.success("Ссылка отозвана — создана новая");
    } catch (error) {
      toast.error("Не удалось отозвать ссылку", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {channelId ? `Пригласить в таб «${channelName ?? ""}»` : "Пригласить в сообщество"}
          </DialogTitle>
          <DialogDescription>
            {channelId
              ? "Ссылка даёт вступление в сообщество и доступ к табу одним действием."
              : "По ссылке откроется витрина — даже если сообщество скрытое."}
          </DialogDescription>
        </DialogHeader>

        {isLoading || !inviteLink ? (
          <Skeleton height={48} radius={14} />
        ) : (
          <div className="space-y-2.5">
            {/* Копирование живёт внутри поля: ссылка и действие над ней — один объект.
                min-w-0 на обёртке и на тексте обязателен — иначе длинный URL распирает
                flex-строку и модалка едет по горизонтали вместо усечения. */}
            <div className="flex h-12 w-full min-w-0 items-center gap-2 rounded-[14px] bg-surface pl-3.5 pr-1.5 inset-ring inset-ring-gray-200">
              <span className="min-w-0 flex-1 truncate font-mono text-sm text-gray-600">
                {inviteLink}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Скопировать ссылку"
                className="shrink-0 size-9 flex items-center justify-center rounded-[8px] text-gray-600 transition-[background-color,color,transform] duration-150 ease-out-quart hover:bg-fill hover:text-ink active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/45"
              >
                {isCopied ? (
                  <CheckmarkBold16 className="size-4 text-primary-500" />
                ) : (
                  <CopyBold16 className="size-4" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-gray-500">Использована: {invite?.uses ?? 0} раз</span>
              <Button theme="ghost" size="md" onClick={handleRevoke} isLoading={isRevoking}>
                Отозвать ссылку
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
