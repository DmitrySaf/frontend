"use client";

import { Button, Switch } from "@/shared/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { type SecuritySettingsData, securitySettingsSchema } from "../model";

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
    <div className="pt-6 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Приватность</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-medium">Участие в сообществах</span>
          <Switch
            checked={watch("joinedVisible") ?? true}
            onCheckedChange={(checked) => {
              setValue("joinedVisible", checked);
              handleSubmit(onSubmit)();
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-medium">Созданные сообщества</span>
          <Switch
            checked={watch("ownedVisible") ?? true}
            onCheckedChange={(checked) => {
              setValue("ownedVisible", checked);
              handleSubmit(onSubmit)();
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-medium">Сообщения от пользователей</span>
          <Switch
            checked={watch("messagingAllowed") ?? true}
            onCheckedChange={(checked) => {
              setValue("messagingAllowed", checked);
              handleSubmit(onSubmit)();
            }}
          />
        </div>
      </div>
    </div>
  );
}
