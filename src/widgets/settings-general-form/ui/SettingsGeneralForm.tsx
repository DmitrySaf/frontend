"use client";

import { useCallback, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@/shared/components";
import { Loader2 } from "lucide-react";
import { 
  userSettingsSchema, 
  type UserSettingsData, 
  type SettingsGeneralFormProps,
  DEFAULT_USER_SETTINGS
} from "../model";

export function SettingsGeneralForm({ 
  initValues, 
  onSubmit,
  isLoading,
  isDataLoading = false
}: SettingsGeneralFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UserSettingsData>({
    resolver: zodResolver(userSettingsSchema as any),
    defaultValues: initValues
  });

  // Обновляем данные формы когда загружаются настройки
  useEffect(() => {
    reset(initValues);
  }, [initValues, reset]);

  if (isDataLoading) {
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          type="text"
          label="Имя"
          {...register("name")}
          error={errors.name?.message}
        />

        <Input
          type="text"
          label="Имя пользователя"
          {...register("username")}
          error={errors.username?.message}
        />

        <Input
          type="email"
          label="Email"
          {...register("email")}
        />

        <Textarea
          label="О себе"
          placeholder="Расскажите о себе"
          {...register("bio")}
          rows={3}
          error={errors.email?.message}
        />

        <Button
          type="submit"
          theme="primary"
          size="l"
          isLoading={isLoading}
          fluid
        >
          Сохранить
        </Button>
    </form>
  );
}
