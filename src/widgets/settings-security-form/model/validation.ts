import { z } from "zod";

export const securitySettingsSchema = z.object({
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Введите корректный номер телефона")
    .optional()
    .or(z.literal(""))
});

export type SecuritySettingsData = z.infer<typeof securitySettingsSchema>;
