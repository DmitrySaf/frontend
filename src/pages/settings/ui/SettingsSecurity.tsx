"use client";

import {
  transformPrivacySettingsToApi,
  useAuthUserQuery,
  useProfileQuery,
  useUpdateAuthUserMutation,
  useUpdateProfileMutation,
} from "@/entities/profile";
import { Button, Form, Input } from "@/shared/components";
import { SettingsSecurityForm } from "@/widgets/settings-security-form";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";

interface PrivacyFormData {
  joinedVisible?: boolean;
  ownedVisible?: boolean;
  messagingAllowed?: boolean;
}

interface EmailFormData {
  email: string;
}

export function SettingsSecurity() {
  const { data: profile, isLoading: isLoadingProfile } = useProfileQuery();
  const { data: authUser, isLoading: isLoadingAuth } = useAuthUserQuery();
  const updateProfile = useUpdateProfileMutation();
  const updateAuthUser = useUpdateAuthUserMutation();

  const emailMethods = useForm<EmailFormData>({
    defaultValues: {
      email: "",
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
    const email = emailMethods.getValues("email");
    if (!email || !email.trim()) return;

    try {
      await updateAuthUser.mutateAsync({ email });
      emailMethods.setValue("email", "");
    } catch (error) {
      console.error("Error updating email:", error);
    }
  }, [emailMethods, updateAuthUser]);

  const initPrivacyValues = useMemo(() => {
    return {
      joinedVisible: profile?.privacySettings.showSubscriptions,
      ownedVisible: profile?.privacySettings.showOwnedCommunities,
      messagingAllowed: profile?.privacySettings.allowMessaging,
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

          <Form methods={emailMethods} onSubmit={(e) => e.preventDefault()}>
            <div className="mt-4 flex items-end gap-2">
              <div className="flex-1">
                <Input name="email" label="Новый email" size="xl" placeholder="example@email.com" />
              </div>
              <Button
                type="button"
                theme="primary"
                size="xl"
                onClick={handleEmailUpdate}
                isDisabled={!emailMethods.watch("email") || updateAuthUser.isPending}
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
