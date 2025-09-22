import { z } from "zod";

export const createProjectSchema = z.object({
  displayName: z
    .string()
    .min(1, "Введите название проекта")
    .max(50, "Название не должно превышать 50 символов"),
  name: z
    .string()
    .min(1, "Введите имя проекта")
    .max(30, "Имя проекта не должно превышать 30 символов")
    .regex(/^[a-z0-9-]+$/, "Имя проекта может содержать только латинские буквы, цифры и дефисы")
    .regex(/^[a-z]/, "Имя проекта должно начинаться с буквы")
    .regex(/[a-z0-9]$/, "Имя проекта должно заканчиваться буквой или цифрой"),
});

export type CreateProjectData = z.infer<typeof createProjectSchema>;

