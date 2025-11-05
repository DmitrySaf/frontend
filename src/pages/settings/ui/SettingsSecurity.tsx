"use client";

import { useCallback } from "react";
import { SettingsSecurityForm, type SecuritySettingsData } from "@/widgets/settings-security-form";
import { Input } from "@/shared/components/Input";
import { Form } from "@/shared/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { securitySettingsSchema } from "@/widgets/settings-security-form/model/validation";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/components/Button";

{/* <div className="flex items-center gap-2">
        <div className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-[0_0_0_1px_#00000020_inset,0px_1px_2px_0px_#00000026,0px_-1px_1px_1px_#00000014_inset,0px_1px_1px_1px_#ffffff40_inset] cursor-pointer font-semibold px-3 flex items-center gap-2">
          <img src="https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://youtube.com&size=64" className="w-7 h-7 rounded-[6px] " />
            <span>YouTube</span>
          </div>
          <div className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-[0_0_0_1px_#00000020_inset,0px_1px_2px_0px_#00000026,0px_-1px_1px_1px_#00000014_inset,0px_1px_1px_1px_#ffffff40_inset] cursor-pointer">
            <img src="https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://youtube.com&size=64" className="w-7 h-7 rounded-[6px] " />
          </div>
        </div>
         */}
interface SettingsSecurityProps {
  initialData?: Partial<SecuritySettingsData>;
  onSave?: (data: SecuritySettingsData) => void;
}

export function SettingsSecurity({ initialData = {}, onSave }: SettingsSecurityProps) {
  const methods = useForm<SecuritySettingsData>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: initialData,
  });

  const {
    formState: { errors, isSubmitting },
  } = methods;

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
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Безопасность</h2>
        <p className="text-sm text-gray-600">
          Данные для входа в систему.
        </p>
      </div>

      <Form methods={methods} onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1/2">
            <Input name="email" label="Почта" size="l" />
          </div>
          <Button
            theme="primary"
            size="l"
            isLoading={false}
            isDisabled={false}
            className="mt-6"
          >
            Подтвердить
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1/2">
            <Input name="phone" label="Номер телефона" size="l" mask="+7 (000) 000-00-00" />
          </div>
          <Button
            theme="primary"
            size="l"
            isLoading={false}
            isDisabled={false}
            className="mt-6"
          >
            Подтвердить
          </Button>
        </div>
      </Form>

      <SettingsSecurityForm
        initValues={initValues}
        onSubmit={handleSubmit}
        isLoading={false} // Пока нет мутации для настроек безопасности
      />
    </div>
  );
}
