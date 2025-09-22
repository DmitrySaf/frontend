import { SecuritySettingsData } from "./validation";

export interface SettingsSecurityFormProps {
  initValues: SecuritySettingsData;
  onSubmit: (data: SecuritySettingsData) => void;
  isLoading: boolean;
  isDataLoading?: boolean;
}

export type { SecuritySettingsData };
