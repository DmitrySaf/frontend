// Форма повторяет docs/db-schema.md (payout_methods).

export interface PayoutMethodRecord {
  id: string;
  user_id: string;
  kind: "card";
  last4: string;
  brand: string;
  /** ФИО держателя */
  holder_name: string;
  is_default: boolean;
  created_at: string;
}

export interface PayoutMethod {
  id: string;
  last4: string;
  brand: string;
  holderName: string;
  isDefault: boolean;
}

export interface AddCardInput {
  lastName: string;
  firstName: string;
  middleName: string;
  cardNumber: string;
}
