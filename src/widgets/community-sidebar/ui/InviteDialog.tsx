"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Check, Copy, Loader2 } from "lucide-react";
import {
  revokeInvite,
  useCommunityInviteQuery,
  useInvalidateCommunityInvite,
} from "@/entities/invite";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Button,
} from "@/shared/components";

interface InviteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  communitySlug: string;
}

export default function InviteDialog({ isOpen, onClose, communitySlug }: InviteDialogProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);

  const { data: invite, isLoading } = useCommunityInviteQuery(communitySlug, isOpen);
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
          <DialogTitle>Пригласить в сообщество</DialogTitle>
          <DialogDescription>
            По ссылке откроется витрина — даже если сообщество скрытое.
          </DialogDescription>
        </DialogHeader>

        {isLoading || !inviteLink ? (
          <div className="h-11 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-gray-500" />
          </div>
        ) : (
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="flex-1 min-w-0 h-11 flex items-center px-3.5 rounded-[14px] bg-gray-100 inset-ring inset-ring-gray-200">
                <span className="truncate text-sm text-gray-600 font-mono">{inviteLink}</span>
              </div>
              <Button
                theme="outline"
                size="m"
                Icon={isCopied ? Check : Copy}
                onClick={handleCopy}
                aria-label="Скопировать ссылку"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Использована: {invite?.uses ?? 0} раз
              </span>
              <Button theme="ghost" size="s" onClick={handleRevoke} isLoading={isRevoking}>
                Отозвать ссылку
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
