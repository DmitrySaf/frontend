import { BadgeCheck, Shield, CreditCard, ReceiptText, User } from "lucide-react";

export const SETTINGS_SECTIONS = [
  { id: "profile", name: "Профиль", icon: User },
  { id: "security", name: "Конфиденциальность", icon: Shield },
  { id: "verification", name: "Верификация", icon: BadgeCheck },
  { id: "payment", name: "Вывод средств", icon: CreditCard },
  { id: "billing", name: "Транзакции", icon: ReceiptText },
];
