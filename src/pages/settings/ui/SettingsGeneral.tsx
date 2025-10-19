"use client";

import { useCallback } from "react";
import { useUserSettings, useUpdateUserSettings } from "@/features/settings";
import { SettingsGeneralForm, type UserSettingsData } from "@/widgets/settings-general-form";

interface SettingsGeneralProps {
  initialData?: Partial<UserSettingsData>;
  onSave?: (data: UserSettingsData) => void;
}

export function SettingsGeneral({ initialData = {}, onSave }: SettingsGeneralProps) {
  const { data: settingsData, isLoading, error } = useUserSettings();
  const updateSettings = useUpdateUserSettings();

  const handleSubmit = useCallback(
    async (data: UserSettingsData) => {
      console.log("Сохраняем настройки:", data);
      await updateSettings.mutateAsync(data);
      onSave?.(data);
    },
    [updateSettings, onSave]
  );

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-red-500 text-xl">⚠️</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Ошибка загрузки</h2>
            <p className="text-gray-600">Не удалось загрузить настройки</p>
          </div>
        </div>
      </div>
    );
  }

  console.log("⚙️ Settings data:", settingsData);

  // Подготавливаем данные для формы
  const initValues = {
    name: settingsData?.user?.name || "Arkadiy",
    email: settingsData?.user?.email || "arkadiy.parovozov01@gmail.com",
    bio: (settingsData?.user as any)?.bio || "",
    username: (settingsData?.user as any)?.username || "arkadiyparovozov",
    ...initialData,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Настройки аккаунта</h1>
      </div>

      <SettingsGeneralForm initValues={initValues} onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
