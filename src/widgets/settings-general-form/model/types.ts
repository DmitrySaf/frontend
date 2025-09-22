import { UserSettingsData } from "./validation";

export interface SettingsGeneralFormProps {
  initValues: UserSettingsData;
  onSubmit: (data: UserSettingsData) => void;
  isLoading: boolean;
  isDataLoading?: boolean;
}

export type { UserSettingsData };
