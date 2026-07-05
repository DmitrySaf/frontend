import { createBrowserClient } from "@/api/browser-client";
import { getSessionUserId, getSessionUserIdOrNull } from "@/api/auth";
import type { VerificationRequestRecord, VerificationKind, VerificationStatus } from "./types";

const REQUEST_FIELDS = "id, user_id, kind, status, data, submitted_at";

function castRequest(record: Record<string, unknown>): VerificationRequestRecord {
  return {
    ...record,
    kind: record.kind as VerificationKind,
    status: record.status as VerificationStatus,
  } as VerificationRequestRecord;
}

/**
 * Последняя заявка текущего пользователя
 */
export const getMyVerification = async (): Promise<VerificationRequestRecord | null> => {
  const client = createBrowserClient();
  const userId = await getSessionUserIdOrNull(client);
  if (!userId) return null;

  const { data, error } = await client
    .from("verification_requests")
    .select(REQUEST_FIELDS)
    .eq("user_id", userId)
    .order("submitted_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? castRequest(data) : null;
};

/**
 * Отправка заявки (сам KYC-виджет — встраиваемый фрейм партнёра, здесь только до/после)
 */
export const submitVerification = async (
  kind: VerificationKind
): Promise<VerificationRequestRecord> => {
  const client = createBrowserClient();
  const userId = await getSessionUserId(client);

  const { data, error } = await client
    .from("verification_requests")
    .insert({ user_id: userId, kind })
    .select(REQUEST_FIELDS)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return castRequest(data);
};

/**
 * Симуляция одобрения (тестовый режим до подключения провайдера)
 */
export const approveMyVerification = async (): Promise<void> => {
  const client = createBrowserClient();
  const current = await getMyVerification();

  if (current && current.status === "pending") {
    const { error } = await client
      .from("verification_requests")
      .update({ status: "approved" })
      .eq("id", current.id);

    if (error) {
      throw new Error(error.message);
    }
  }
};
