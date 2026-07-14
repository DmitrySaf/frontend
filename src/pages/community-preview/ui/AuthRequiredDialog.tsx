"use client";

import { Auth } from "@/features/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  LogoTile,
} from "@/shared/components";

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
            <LogoTile size={44} />
          </div>
          {/* px-10 перебивает базовый pr-10 (резерв под крестик) — заголовок остаётся по центру */}
          <DialogTitle className="px-10 text-center">Войдите, чтобы вступить</DialogTitle>
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
