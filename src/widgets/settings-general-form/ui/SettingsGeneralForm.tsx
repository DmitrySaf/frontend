"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, Textarea } from "@/shared/components";
import { Loader2 } from "lucide-react";
import { userSettingsSchema, type UserSettingsData } from "../model";

interface SettingsGeneralFormProps {
  initValues: UserSettingsData;
  onSubmit: (data: UserSettingsData) => void;
  isLoading: boolean;
}

export function SettingsGeneralForm({ initValues, onSubmit, isLoading }: SettingsGeneralFormProps) {
  const methods = useForm<UserSettingsData>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: initValues,
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = methods;

  useEffect(() => {
    reset(initValues);
  }, [initValues, reset]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
          <p className="text-gray-600">Загружаем настройки...</p>
        </div>
      </div>
    );
  }

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input name="name" size="m" label="Имя" error={errors.name?.message} />

      <Input name="username" size="m" label="Имя пользователя" error={errors.username?.message} />

      <Input name="email" size="m" label="Email" />

      <Textarea
        name="bio"
        label="О себе"
        placeholder="Расскажите о себе"
        rows={3}
        error={errors.email?.message}
      />

      <Button type="submit" theme="primary" size="l" isLoading={isSubmitting} fluid>
        Сохранить
      </Button>
    </Form>
  );
}
