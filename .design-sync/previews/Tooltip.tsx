// Per-icon subpath, never the barrel (see Button.tsx — the 5132-module barrel hangs preview compile).
import { GearBold16 } from "@frosted-ui/icons/GearBold16";
import { Button, Tooltip } from "frontend";

/* Tooltip content appears on hover/focus, so the card shows the trigger; the dark plate is the
   on-hover state (documented in Tooltip.prompt.md). Padding leaves room so a captured tooltip
   wouldn't clip. */

export const OnButton = () => (
  <div style={{ padding: "28px 0", display: "flex", gap: 16 }}>
    <Tooltip content="Появляется при наведении" side="top">
      <Button theme="secondary" size="lg">
        Наведи на меня
      </Button>
    </Tooltip>
  </div>
);

export const OnIconButton = () => (
  <div style={{ padding: "28px 0" }}>
    <Tooltip content="Настройки" side="right">
      <Button theme="ghost" size="lg" Icon={GearBold16} aria-label="Настройки" />
    </Tooltip>
  </div>
);
