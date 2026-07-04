// Форма повторяет docs/db-schema.md (verification_requests).

export type VerificationKind = "passport" | "self_employed" | "ip" | "ooo";
export type VerificationStatus = "pending" | "approved" | "rejected";

export interface VerificationRequestRecord {
  id: string;
  user_id: string;
  kind: VerificationKind;
  status: VerificationStatus;
  data: Record<string, unknown>;
  submitted_at: string;
}

export interface VerificationState {
  status: "none" | VerificationStatus;
  kind: VerificationKind | null;
  submittedAt: string | null;
}
