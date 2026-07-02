"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/shared/components";

interface AuthRequiredDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthRequiredDialog = ({ open, onOpenChange }: AuthRequiredDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login Required</DialogTitle>
          <DialogDescription>
            You need to be logged in to join this community. Please sign in or create an account
            to continue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button theme="outline" size="m" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button theme="primary" size="m" href="/login">
            Sign In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
