import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsQueryKeys } from "./queryKeys";
import { getUserSettings, updateUserSettings } from "../api";

/**
 * Хук для получения настроек пользователя
 */
export const useUserSettings = () => {
  return useQuery({
    queryKey: settingsQueryKeys.userSettings,
    queryFn: getUserSettings,
    staleTime: 1000 * 60 * 10, // 10 минут
  });
};

/**
 * Хук для обновления настроек пользователя
 */
export const useUpdateUserSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserSettings,
    onSuccess: () => {
      // Инвалидируем кэш настроек после успешного обновления
      queryClient.invalidateQueries({ queryKey: settingsQueryKeys.userSettings });
      console.log("✅ Settings updated successfully");
    },
    onError: (error) => {
      console.error("❌ Failed to update settings:", error);
    },
  });
};
