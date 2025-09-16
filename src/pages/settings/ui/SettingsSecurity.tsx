"use client";

import { Switch } from "@/shared/components";
import { useState } from "react";

interface SecurityFormData {
  phone: string;
  joinedVisible: boolean;
  ownedVisible: boolean;
}

interface SettingsSecurityProps {
  initialData?: Partial<SecurityFormData>;
  onSave?: (data: SecurityFormData) => void;
}

export function SettingsSecurity({ 
  initialData = {}, 
  onSave 
}: SettingsSecurityProps) {
  const [formData, setFormData] = useState<SecurityFormData>({
    phone: "",
    joinedVisible: true,
    ownedVisible: true,
    ...initialData,
  });

  const handleSave = () => {
    onSave?.(formData);
    console.log("Настройки безопасности сохранены:", formData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Безопасность</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Подключение номера телефона
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Подключите номер телефона, чтобы использовать двухфакторную аутентификацию.
          </p>
          {/* TODO: Добавить форму для номера телефона */}
        </div>

        <div className="pt-6 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Приватность</h2>
          <p className="text-sm text-gray-600 mb-6">
            Все, что вы скроете здесь, не будет видно другим — и вы тоже не увидите это в их
            профилях.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-medium">Участие в проектах</span>
              <Switch
                checked={formData.joinedVisible}
                disabled
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, joinedVisible: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-medium">Созданные проекты</span>
              <Switch
                checked={formData.ownedVisible}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, ownedVisible: checked })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
