export type SettingsSectionId = 
  | "general" 
  | "verification" 
  | "security" 
  | "payment" 
  | "billing";

export interface SettingsSection {
  id: SettingsSectionId;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface UserFormData {
  name: string;
  bio: string;
  email: string;
  username: string;
  phone?: string;
  joinedVisible: boolean;
  ownedVisible: boolean;
}
