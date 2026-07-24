// Per-icon subpaths, never the barrel (see Button.tsx — the 5132-module barrel hangs preview compile).
import { BellBold16 } from "@frosted-ui/icons/BellBold16";
import { GearBold16 } from "@frosted-ui/icons/GearBold16";
import { HomeBold16 } from "@frosted-ui/icons/HomeBold16";
import { PeopleBold16 } from "@frosted-ui/icons/PeopleBold16";
import { Tab, Tabs } from "frontend";

/* The Tabs nav derives its active item from usePathname() (stubbed empty in the bundle), so
   the state gallery composes the exported Tab primitive directly with isActive. Navigation is
   the real <Tabs> composition. Vertical side-nav — cardMode "column" (config). */

export const States = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6, maxWidth: 260 }}>
    <Tab text="Активный пункт" href="#" Icon={HomeBold16} isActive />
    <Tab text="Обычный пункт" href="#" Icon={PeopleBold16} />
    <Tab text="Ещё один пункт" href="#" Icon={BellBold16} />
  </div>
);

export const Navigation = () => (
  <Tabs
    className="flex flex-col gap-1"
    items={[
      { id: "home", name: "Главная", href: "/", icon: HomeBold16 },
      { id: "members", name: "Участники", href: "/members", icon: PeopleBold16 },
      { id: "settings", name: "Настройки", href: "/settings", icon: GearBold16 },
    ]}
  />
);
