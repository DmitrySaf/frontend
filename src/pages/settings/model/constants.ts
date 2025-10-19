import { Settings, BadgeCheck, Shield, CreditCard, FileText } from "lucide-react";

export const SETTINGS_SECTIONS = [
  { id: "general", name: "Основные", icon: Settings },
  { id: "verification", name: "Верификация", icon: BadgeCheck },
  { id: "security", name: "Безопасность и приватность", icon: Shield },
  { id: "payment", name: "Способы оплаты", icon: CreditCard },
  { id: "billing", name: "История платежей", icon: FileText },
];
