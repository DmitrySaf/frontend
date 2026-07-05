import { REQUIRED_MESSAGE } from "@/shared/constants";
import { z } from "zod";

export const TIER_NAME_MAX_LENGTH = 40;

const isPositiveInt = (value: string) => /^\d+$/.test(value) && Number(value) >= 1;

// Числовые поля храним строками (дружелюбно к инпутам), конвертация — при сабмите
export const tierFormSchema = z
  .object({
    name: z
      .string()
      .min(1, REQUIRED_MESSAGE)
      .max(TIER_NAME_MAX_LENGTH, `Не длиннее ${TIER_NAME_MAX_LENGTH} символов`),
    kind: z.enum(["recurring", "one_time"]),
    priceRubles: z
      .string()
      .min(1, REQUIRED_MESSAGE)
      .refine(isPositiveInt, "Целое число рублей, минимум 1"),
    periodMonths: z.string(),
    discountPercent: z
      .string()
      .refine(
        (value) => value === "" || (isPositiveInt(value) && Number(value) <= 99),
        "Целое число от 1 до 99"
      ),
  })
  .refine(
    (data) =>
      data.kind === "one_time" ||
      (isPositiveInt(data.periodMonths) && Number(data.periodMonths) <= 120),
    {
      message: "Целое число месяцев от 1 до 120",
      path: ["periodMonths"],
    }
  );

export type TierFormData = z.infer<typeof tierFormSchema>;
