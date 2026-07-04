import { createMockCollection } from "@/shared/utils";
import { CURRENT_USER_ID } from "@/entities/message";
import type { VerificationRequestRecord, VerificationKind } from "./types";

const requests = createMockCollection<VerificationRequestRecord>("verification_requests");

/**
 * Последняя заявка текущего пользователя
 */
export const getMyVerification = async (): Promise<VerificationRequestRecord | null> => {
  const all = await requests.list();
  const mine = all
    .filter((record) => record.user_id === CURRENT_USER_ID)
    .sort((a, b) => b.submitted_at.localeCompare(a.submitted_at));
  return mine[0] ?? null;
};

/**
 * Отправка заявки (сам KYC-виджет — встраиваемый фрейм партнёра, здесь только до/после)
 */
export const submitVerification = async (
  kind: VerificationKind
): Promise<VerificationRequestRecord> => {
  return requests.insert({
    user_id: CURRENT_USER_ID,
    kind,
    status: "pending",
    data: {},
    submitted_at: new Date().toISOString(),
  });
};

/**
 * Симуляция одобрения (тестовый режим до подключения провайдера)
 */
export const approveMyVerification = async (): Promise<void> => {
  const current = await getMyVerification();
  if (current && current.status === "pending") {
    await requests.update(current.id, { status: "approved" });
  }
};
