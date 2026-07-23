import { CreditCardBold20, ReceiptBold20, SealCheckmarkBold20, ShieldBold20, UserBold20 } from "@frosted-ui/icons";

export const SETTINGS_SECTIONS = [
  { id: "profile", name: "Профиль", icon: UserBold20 },
  { id: "security", name: "Конфиденциальность", icon: ShieldBold20 },
  { id: "verification", name: "Верификация", icon: SealCheckmarkBold20 },
  { id: "payment", name: "Вывод средств", icon: CreditCardBold20 },
  { id: "billing", name: "Транзакции", icon: ReceiptBold20 },
];
