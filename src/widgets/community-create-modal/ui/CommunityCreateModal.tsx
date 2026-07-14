"use client";

import { type CreateCommunityData, createCommunitySchema } from "@/entities/community";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  Input,
} from "@/shared/components";
import { transliterate } from "@/shared/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  type CommunityCreateModalProps,
  DEFAULT_CREATE_PROJECT_VALUES,
  PROJECT_NAME_MAX_LENGTH,
} from "../model";

export function CommunityCreateModal({ isOpen, onClose, onSubmit }: CommunityCreateModalProps) {
  const methods = useForm<CreateCommunityData>({
    resolver: zodResolver(createCommunitySchema),
    defaultValues: DEFAULT_CREATE_PROJECT_VALUES,
  });
  const {
    formState: { errors, isSubmitting, isDirty },
    reset,
    watch,
    setValue,
    getFieldState,
  } = methods;

  const watchedDisplayName = watch("displayName");

  useEffect(() => {
    const transliteratedName = transliterate(watchedDisplayName);
    if (transliteratedName.length <= PROJECT_NAME_MAX_LENGTH && !getFieldState("name").isTouched) {
      setValue("name", transliteratedName);
    }
  }, [watchedDisplayName, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async (data: CreateCommunityData) => {
    await onSubmit(data);
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {/* Форма: заполненную не закрыть случайным кликом снаружи — только явной «Отменой» */}
      <DialogContent
        className="sm:max-w-md"
        aria-describedby={undefined}
        dismissOnOutside={!isDirty}
      >
        <DialogHeader>
          <DialogTitle>Создать новое сообщество</DialogTitle>
        </DialogHeader>

        <Form methods={methods} onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="displayName"
            size="l"
            label="Название сообщества"
            placeholder="Введите название сообщества"
            error={errors.displayName?.message}
          />

          <Input
            name="name"
            size="l"
            label="URL"
            description="Уникальное имя — подставляется автоматически"
            prefix="bean.com/"
            maxLength={PROJECT_NAME_MAX_LENGTH}
            error={errors.name?.message}
          />

          <DialogFooter>
            <Button type="button" theme="secondary" size="l" onClick={handleClose}>
              Отмена
            </Button>
            <Button type="submit" theme="primary" size="l" isLoading={isSubmitting}>
              Создать
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
