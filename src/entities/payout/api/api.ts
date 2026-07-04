import { createMockCollection } from "@/shared/utils";
import { CURRENT_USER_ID } from "@/entities/message";
import type { PayoutMethodRecord, AddCardInput } from "./types";

const methods = createMockCollection<PayoutMethodRecord>("payout_methods");

function detectBrand(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, "");
  if (digits.startsWith("2")) return "МИР";
  if (digits.startsWith("4")) return "Visa";
  if (digits.startsWith("5")) return "Mastercard";
  return "Карта";
}

/**
 * Карты текущего пользователя
 */
export const getMyPayoutMethods = async (): Promise<PayoutMethodRecord[]> => {
  const all = await methods.list();
  return all
    .filter((record) => record.user_id === CURRENT_USER_ID)
    .sort((a, b) => a.created_at.localeCompare(b.created_at));
};

/**
 * Привязка карты (в моке номер не хранится — только последние 4 цифры)
 */
export const addPayoutMethod = async (input: AddCardInput): Promise<PayoutMethodRecord> => {
  const existing = await getMyPayoutMethods();
  const digits = input.cardNumber.replace(/\D/g, "");

  return methods.insert({
    user_id: CURRENT_USER_ID,
    kind: "card",
    last4: digits.slice(-4),
    brand: detectBrand(digits),
    holder_name: [input.lastName, input.firstName, input.middleName]
      .filter(Boolean)
      .join(" "),
    is_default: existing.length === 0,
    created_at: new Date().toISOString(),
  });
};

/**
 * Выбор карты для выплат
 */
export const setDefaultPayoutMethod = async (methodId: string): Promise<void> => {
  const mine = await getMyPayoutMethods();
  await Promise.all(
    mine.map((record) => methods.update(record.id, { is_default: record.id === methodId }))
  );
};

/**
 * Удаление карты (если удалили основную — основной становится первая из оставшихся)
 */
export const removePayoutMethod = async (methodId: string): Promise<void> => {
  await methods.remove(methodId);
  const rest = await getMyPayoutMethods();
  if (rest.length > 0 && !rest.some((record) => record.is_default)) {
    await methods.update(rest[0].id, { is_default: true });
  }
};
