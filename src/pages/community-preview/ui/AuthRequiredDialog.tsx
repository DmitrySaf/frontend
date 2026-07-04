"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components";
import { Auth } from "@/features/auth";

interface AuthRequiredDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

/**
 * Вход для гостя прямо на витрине: полный OTP-флоу, после успеха
 * продолжается начатое действие (вступление/покупка)
 */
export function AuthRequiredDialog({ isOpen, onClose, onSuccess }: AuthRequiredDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="mx-auto mb-1">
            <Image src="/logo.svg" alt="Bean" width={44} height={44} />
          </div>
          <DialogTitle className="text-center">Войдите, чтобы вступить</DialogTitle>
          <DialogDescription className="text-center">
            Создайте аккаунт или войдите — вступление продолжится автоматически.
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Auth onSuccess={onSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
