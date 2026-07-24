// Per-icon subpaths, never the barrel (see Button.tsx — the 5132-module barrel hangs preview compile).
import { BellBold16 } from "@frosted-ui/icons/BellBold16";
import { EditBold16 } from "@frosted-ui/icons/EditBold16";
import { GearBold16 } from "@frosted-ui/icons/GearBold16";
import { LogoutBold16 } from "@frosted-ui/icons/LogoutBold16";
import { MinusCircleBold16 } from "@frosted-ui/icons/MinusCircleBold16";
import { Button, Dropdown } from "frontend";

/* Dropdown is closed by default, so the card shows its trigger (the menu opens on press). The
   items cover the full API — a header note, a separator, and a danger action — and are listed
   in Dropdown.prompt.md. Two trigger styles: a labeled button and an icon-only button. */

const items = [
  { note: "Аккаунт" },
  { icon: GearBold16, label: "Настройки", onClick: () => {} },
  { icon: BellBold16, label: "Уведомления", onClick: () => {} },
  { icon: EditBold16, label: "Редактировать профиль", onClick: () => {} },
  "separator" as const,
  { icon: MinusCircleBold16, label: "Удалить аккаунт", variant: "danger" as const, onClick: () => {} },
  { icon: LogoutBold16, label: "Выйти", onClick: () => {} },
];

export const LabeledTrigger = () => (
  <Dropdown
    trigger={
      <Button theme="secondary" size="lg" Icon={GearBold16}>
        Меню
      </Button>
    }
    items={items}
  />
);

export const IconTrigger = () => (
  <Dropdown
    align="end"
    trigger={<Button theme="ghost" size="lg" Icon={GearBold16} aria-label="Открыть меню" />}
    items={items}
  />
);
