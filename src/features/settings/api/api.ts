import { mockRequest } from "@/shared/utils";

/**
 * Получение основных настроек пользователя
 */
export const getUserSettings = async () => {
  console.log("⚙️ Fetching user settings...");

  return mockRequest(
    {
      user: {
        id: "1",
        email: "user@example.com",
        name: "Иван Иванов",
        avatar: "/avatar.jpg",
        role: "user",
      },
      preferences: {
        theme: "light",
        language: "ru",
        notifications: {
          email: true,
          push: false,
          sms: false,
        },
        privacy: {
          profileVisible: true,
          showEmail: false,
          showPhone: false,
        },
      },
      subscription: {
        plan: "free",
        expiresAt: null,
        features: ["basic_projects", "limited_storage"],
      },
    },
    { delay: 500, successRate: 0.98 }
  );
};

/**
 * Обновление настроек пользователя
 */
export const updateUserSettings = async (settings: any) => {
  console.log("⚙️ Updating user settings...", settings);

  return mockRequest(
    {
      success: true,
      message: "Настройки успешно обновлены",
      updatedAt: new Date().toISOString(),
    },
    { delay: 1200, successRate: 0.9 }
  );
};
