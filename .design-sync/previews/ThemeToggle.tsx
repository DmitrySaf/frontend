import { ThemeToggle } from "frontend";

/* Icon-only toggle (mounted-gate shows the Moon icon by default). Paired with a label so the
   card reads as a control, not an empty cell. */
export const Toggle = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <ThemeToggle />
    <span style={{ fontSize: 14, color: "#6b7280" }}>Переключатель светлой / тёмной темы</span>
  </div>
);
