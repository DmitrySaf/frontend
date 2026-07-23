import { Bell, LogOut, Settings, Trash2 } from "lucide-react";
import { Button, Dropdown } from "frontend";

/* Dropdown is closed by default, so the card shows its trigger button (the menu opens on
   press). Items include a header note, a separator, and a danger action — the full API. */
export const Menu = () => (
  <Dropdown
    trigger={
      <Button theme="secondary" size="lg" Icon={Settings}>
        Меню
      </Button>
    }
    items={[
      { note: "Аккаунт" },
      { icon: Settings, label: "Настройки", onClick: () => {} },
      { icon: Bell, label: "Уведомления", onClick: () => {} },
      "separator",
      { icon: Trash2, label: "Удалить", variant: "danger", onClick: () => {} },
      { icon: LogOut, label: "Выйти", onClick: () => {} },
    ]}
  />
);
