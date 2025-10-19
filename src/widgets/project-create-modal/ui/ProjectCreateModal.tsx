"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Input,
  Form,
} from "@/shared/components";
import { transliterate } from "@/shared/utils";
import {
  createProjectSchema,
  type CreateProjectData,
  type ProjectCreateModalProps,
  DEFAULT_CREATE_PROJECT_VALUES,
  PROJECT_NAME_MAX_LENGTH
} from "../model";

export function ProjectCreateModal({ isOpen, onClose, onSubmit }: ProjectCreateModalProps) {
  const methods = useForm<CreateProjectData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: DEFAULT_CREATE_PROJECT_VALUES,
  });
  const {
    formState: { errors, isSubmitting },
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

  const handleSubmit = async (data: CreateProjectData) => {
    await onSubmit(data);
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Создать новый проект</DialogTitle>
        </DialogHeader>

        <Form methods={methods} onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="displayName"
            size="l"
            label="Название проекта"
            placeholder="Введите название проекта"
            error={errors.displayName?.message}
          />

          <Input
            name="name"
            size="l"
            label="URL"
            description="Уникальное имя"
            prefix="profound.com/"
            maxLength={PROJECT_NAME_MAX_LENGTH}
            error={errors.name?.message}
          />

          <DialogFooter>
            <Button type="submit" theme="primary" size="l" fluid isLoading={isSubmitting}>
              Создать
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
