import type { UpdateAuthUserData } from "@/api/auth";
import type { UpdateProfileData } from "@/api/profiles";
import { toast } from "@/shared/components";
import { useBrowserClient } from "@/shared/composables";
import { useMutation } from "@tanstack/react-query";
import { updateAuthUser, updateProfile } from "./api";
import { useInvalidateAuthUser, useInvalidateProfile } from "./queries";

/**
 * Hook to update profile with social links and privacy settings
 */
export const useUpdateProfileMutation = () => {
  const invalidateProfile = useInvalidateProfile();
  const client = useBrowserClient();

  return useMutation({
    mutationFn: (data: UpdateProfileData) => updateProfile(client, data),
    onSuccess: () => {
      toast.success("Профиль обновлен успешно");
      invalidateProfile();
    },
    onError: (error) => {
      toast.error("Ошибка при обновлении профиля", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Hook to update auth user (email, phone)
 */
export const useUpdateAuthUserMutation = () => {
  const invalidateAuthUser = useInvalidateAuthUser();
  const client = useBrowserClient();

  return useMutation({
    mutationFn: (data: UpdateAuthUserData) => updateAuthUser(client, data),
    onSuccess: (_, variables) => {
      if (variables.email) {
        toast.success("Проверьте вашу почту", {
          description: "Мы отправили ссылку для подтверждения нового email",
        });
      } else if (variables.phone) {
        toast.success("Проверьте ваш телефон", {
          description: "Мы отправили код для подтверждения нового номера",
        });
      } else {
        toast.success("Данные обновлены успешно");
      }
      invalidateAuthUser();
    },
    onError: (error) => {
      toast.error("Ошибка при обновлении данных", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};
