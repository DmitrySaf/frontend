"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Check, Copy } from "lucide-react";
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

  const inviteLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/${communitySlug}`
      : `/${communitySlug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setIsCopied(true);
      toast.success("Ссылка скопирована");
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error("Не удалось скопировать ссылку");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Пригласить в сообщество</DialogTitle>
          <DialogDescription>
            Отправьте ссылку — по ней откроется страница сообщества.
          </DialogDescription>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  );
}
