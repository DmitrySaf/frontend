"use client";

import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  useProfileQuery,
  useUpdateProfileMutation,
  useAuthUserQuery,
  useUpdateAuthUserMutation,
  transformPrivacySettingsToApi,
} from "@/entities/profile";
import { SettingsSecurityForm } from "@/widgets/settings-security-form";
import { Button, Input, Form } from "@/shared/components";

interface PrivacyFormData {
  joinedVisible?: boolean;
  ownedVisible?: boolean;
  messagingAllowed?: boolean;
}

interface EmailPhoneFormData {
  email: string;
  phone: string;
}

export function SettingsSecurity() {
  const { data: profile, isLoading: isLoadingProfile } = useProfileQuery();
  const { data: authUser, isLoading: isLoadingAuth } = useAuthUserQuery();
  const updateProfile = useUpdateProfileMutation();
  const updateAuthUser = useUpdateAuthUserMutation();

  const emailPhoneMethods = useForm<EmailPhoneFormData>({
    defaultValues: {
      email: "",
      phone: "",
    },
  });

  const isLoading = isLoadingProfile || isLoadingAuth;

  const handlePrivacySubmit = useCallback(
    async (data: PrivacyFormData) => {
      try {
        await updateProfile.mutateAsync({
          privacy_settings: transformPrivacySettingsToApi({
            showOwnedCommunities: data.ownedVisible,
            showSubscriptions: data.joinedVisible,
            allowMessaging: data.messagingAllowed,
          }),
        });
      } catch (error) {
        console.error("Error saving privacy settings:", error);
      }
    },
    [updateProfile]
  );

  const handleEmailUpdate = useCallback(async () => {
    const email = emailPhoneMethods.getValues("email");
    if (!email || !email.trim()) return;
    
    try {
      await updateAuthUser.mutateAsync({ email });
      emailPhoneMethods.setValue("email", "");
    } catch (error) {
      console.error("Error updating email:", error);
    }
  }, [emailPhoneMethods, updateAuthUser]);

  const handlePhoneUpdate = useCallback(async () => {
    const phone = emailPhoneMethods.getValues("phone");
    if (!phone || !phone.trim()) return;
    
    try {
      await updateAuthUser.mutateAsync({ phone });
      emailPhoneMethods.setValue("phone", "");
    } catch (error) {
      console.error("Error updating phone:", error);
    }
  }, [emailPhoneMethods, updateAuthUser]);

  const initPrivacyValues = useMemo(() => {
    return {
      joinedVisible: profile?.privacySettings.showSubscriptions,
      ownedVisible: profile?.privacySettings.showOwnedCommunities,
      messagingAllowed: profile?.privacySettings.allowMessaging,
      phone: "",
    };
  }, [profile]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Безопасность</h2>
        <p className="text-sm text-gray-600">Данные для входа в систему.</p>
      </div>

      {/* Email Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Email</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Текущий email</label>
            <div className="px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-700">
              {authUser?.email || "Не указан"}
            </div>
          </div>
          
          <Form methods={emailPhoneMethods} onSubmit={(e) => e.preventDefault()}>
            <div className="mt-4 flex items-end gap-2">
              <div className="flex-1">
                <Input
                  name="email"
                  label="Новый email"
                  size="l"
                  placeholder="example@email.com"
                />
              </div>
              <Button
                type="button"
                theme="primary"
                size="l"
                onClick={handleEmailUpdate}
                isDisabled={!emailPhoneMethods.watch("email") || updateAuthUser.isPending}
                isLoading={updateAuthUser.isPending}
              >
                Изменить
              </Button>
            </div>
          </Form>
          <p className="text-xs text-gray-500 mt-2">
            После изменения на новый email будет отправлено письмо с подтверждением
          </p>
        </div>

        {/* Phone Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Телефон</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Текущий номер</label>
            <div className="px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-700">
              {authUser?.phone || "Не указан"}
            </div>
          </div>
          
          <Form methods={emailPhoneMethods} onSubmit={(e) => e.preventDefault()}>
            <div className="mt-4 flex items-end gap-2">
              <div className="flex-1">
                <Input
                  name="phone"
                  label="Новый номер телефона"
                  size="l"
                  placeholder="+7 (999) 123-45-67"
                  mask="+7 (000) 000-00-00"
                />
              </div>
              <Button
                type="button"
                theme="primary"
                size="l"
                onClick={handlePhoneUpdate}
                isDisabled={!emailPhoneMethods.watch("phone") || updateAuthUser.isPending}
                isLoading={updateAuthUser.isPending}
              >
                Изменить
              </Button>
            </div>
          </Form>
          <p className="text-xs text-gray-500 mt-2">
            После изменения на новый номер будет отправлен код подтверждения
          </p>
        </div>
      </div>

      {/* Privacy Settings Section */}
      <SettingsSecurityForm
        initValues={initPrivacyValues}
        onSubmit={handlePrivacySubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
