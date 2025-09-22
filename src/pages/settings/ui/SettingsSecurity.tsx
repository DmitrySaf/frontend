"use client";

import { useCallback } from "react";
import { SettingsSecurityForm, type SecuritySettingsData } from "@/widgets/settings-security-form";

interface SettingsSecurityProps {
  initialData?: Partial<SecuritySettingsData>;
  onSave?: (data: SecuritySettingsData) => void;
}

export function SettingsSecurity({ 
  initialData = {}, 
  onSave 
}: SettingsSecurityProps) {
  const handleSubmit = useCallback(
    async (data: SecuritySettingsData) => {
      console.log("Настройки безопасности сохранены:", data);
      onSave?.(data);
    },
    [onSave]
  );

  const initValues = {
    phone: "",
    joinedVisible: true,
    ownedVisible: true,
    ...initialData,
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Безопасность</h2>
      
      <SettingsSecurityForm
        initValues={initValues}
        onSubmit={handleSubmit}
        isLoading={false} // Пока нет мутации для настроек безопасности
      />
    </div>
  );
}