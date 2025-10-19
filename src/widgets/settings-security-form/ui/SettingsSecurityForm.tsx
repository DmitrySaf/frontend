"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch, Button } from "@/shared/components";
import { Loader2 } from "lucide-react";
import { securitySettingsSchema, type SecuritySettingsData } from "../model";

interface SettingsSecurityFormProps {
  initValues: SecuritySettingsData;
  onSubmit: (data: SecuritySettingsData) => void;
  isLoading: boolean;
}

export function SettingsSecurityForm({
  initValues,
  onSubmit,
  isLoading,
}: SettingsSecurityFormProps) {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<SecuritySettingsData>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: initValues,
  });

  // Обновляем данные формы когда загружаются настройки
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Подключение номера телефона</h3>
        <p className="text-sm text-gray-600 mb-6">
          Подключите номер телефона, чтобы использовать двухфакторную аутентификацию.
        </p>
        {/* TODO: Добавить форму для номера телефона */}
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Приватность</h3>
        <p className="text-sm text-gray-600 mb-6">
          Все, что вы скроете здесь, не будет видно другим — и вы тоже не увидите это в их профилях.
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-900 font-medium">Участие в проектах</span>
            <Switch
              checked={watch("joinedVisible")}
              disabled
              onCheckedChange={(checked) => setValue("joinedVisible", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-900 font-medium">Созданные проекты</span>
            <Switch
              checked={watch("ownedVisible")}
              onCheckedChange={(checked) => setValue("ownedVisible", checked)}
            />
          </div>
        </div>
      </div>

      <Button type="submit" theme="primary" size="l" isLoading={isLoading} fluid>
        Сохранить
      </Button>
    </form>
  );
}
