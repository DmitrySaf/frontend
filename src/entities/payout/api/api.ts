import { getSessionUserId, getSessionUserIdOrNull } from "@/api/auth";
import { createBrowserClient } from "@/api/browser-client";
import type { AddCardInput, PayoutMethodRecord } from "./types";

const METHOD_FIELDS = "id, user_id, kind, last4, brand, holder_name, is_default, created_at";

function detectBrand(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, "");
  const first4 = Number(digits.slice(0, 4));
  if (first4 >= 2200 && first4 <= 2204) return "МИР";
  if (first4 >= 2221 && first4 <= 2720) return "Mastercard"; // вторая BIN-зона Mastercard
  if (digits.startsWith("4")) return "Visa";
  if (digits.startsWith("5")) return "Mastercard";
  return "Карта";
}

/**
 * Карты текущего пользователя
 */
export const getMyPayoutMethods = async (): Promise<PayoutMethodRecord[]> => {
  const client = createBrowserClient();
  const userId = await getSessionUserIdOrNull(client);
  if (!userId) return [];

  const { data, error } = await client
    .from("payout_methods")
    .select(METHOD_FIELDS)
    .eq("user_id", userId)
    .order("created_at");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as PayoutMethodRecord[];
};

/**
 * Привязка карты (номер не хранится — только последние 4 цифры)
 */
export const addPayoutMethod = async (input: AddCardInput): Promise<PayoutMethodRecord> => {
  const client = createBrowserClient();
  const userId = await getSessionUserId(client);
  const existing = await getMyPayoutMethods();
  const digits = input.cardNumber.replace(/\D/g, "");

  const { data, error } = await client
    .from("payout_methods")
    .insert({
      user_id: userId,
      kind: "card",
      last4: digits.slice(-4),
      brand: detectBrand(digits),
      holder_name: [input.lastName, input.firstName, input.middleName].filter(Boolean).join(" "),
      is_default: existing.length === 0,
    })
    .select(METHOD_FIELDS)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as PayoutMethodRecord;
};

/**
 * Выбор карты для выплат
 */
export const setDefaultPayoutMethod = async (methodId: string): Promise<void> => {
  const client = createBrowserClient();
  const userId = await getSessionUserId(client);

  const { error: clearError } = await client
    .from("payout_methods")
    .update({ is_default: false })
    .eq("user_id", userId);

  if (clearError) {
    throw new Error(clearError.message);
  }

  const { error } = await client
    .from("payout_methods")
    .update({ is_default: true })
    .eq("id", methodId);

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * Удаление карты (если удалили основную — основной становится первая из оставшихся)
 */
export const removePayoutMethod = async (methodId: string): Promise<void> => {
  const client = createBrowserClient();

  const { error } = await client.from("payout_methods").delete().eq("id", methodId);

  if (error) {
    throw new Error(error.message);
  }

  const rest = await getMyPayoutMethods();
  if (rest.length > 0 && !rest.some((record) => record.is_default)) {
    const { error: defaultError } = await client
      .from("payout_methods")
      .update({ is_default: true })
      .eq("id", rest[0].id);

    if (defaultError) {
      throw new Error(defaultError.message);
    }
  }
};
