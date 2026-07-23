"use client";

import { Button, Skeleton, Switch } from "@/shared/components";
import { zodResolver } from "@hookform/resolvers/zod";
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
      <div className="pt-6 border-t border-gray-200">
        <Skeleton width={140} height={24} radius={6} className="mb-6" />
        <div className="space-y-4">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <Skeleton width={180} height={16} radius={4} />
              <Skeleton width={44} height={26} radius={999} />
            </div>
          ))}
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
