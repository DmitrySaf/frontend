export type SettingsSectionId = "profile" | "verification" | "security" | "payment" | "billing";

export interface SettingsSection {
  id: SettingsSectionId;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}
