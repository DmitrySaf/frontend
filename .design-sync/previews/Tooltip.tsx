import { Button, Tooltip } from "frontend";

/* Tooltip content shows on hover, so the card shows the trigger; the dark tooltip plate is
   the on-hover state (documented in Tooltip.prompt.md). */
export const Default = () => (
  <div style={{ padding: "24px 0" }}>
    <Tooltip content="Появляется при наведении" side="right">
      <Button theme="secondary" size="lg">
        Наведи на меня
      </Button>
    </Tooltip>
  </div>
);
