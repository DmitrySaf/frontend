import { z } from "zod";
import { REQUIRED_MESSAGE } from "@/shared/constants";

export const createCommunitySchema = z.object({
  displayName: z
    .string()
    .min(1, REQUIRED_MESSAGE),
  name: z
    .string()
    .min(1, REQUIRED_MESSAGE)
    .regex(/^[a-z0-9-]+$/, " Может содержать только латинские буквы, цифры и дефисы")
    .regex(/^[a-z]/, "Должно начинаться с буквы")
    .regex(/[a-z0-9]$/, "Должно заканчиваться буквой или цифрой"),
});

export type CreateCommunityData = z.infer<typeof createCommunitySchema>;
