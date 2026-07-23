import { Switch } from "frontend";

const row = { display: "flex", gap: 24, alignItems: "center" };
const item = { display: "flex", gap: 8, alignItems: "center", fontSize: 14, color: "#374151" };
const noop = () => {};

export const States = () => (
  <div style={row}>
    <label style={item}>
      <Switch checked onCheckedChange={noop} aria-label="Включено" /> Включено
    </label>
    <label style={item}>
      <Switch checked={false} onCheckedChange={noop} aria-label="Выключено" /> Выключено
    </label>
  </div>
);

export const Disabled = () => (
  <div style={row}>
    <label style={item}>
      <Switch checked disabled aria-label="Включено, заблокировано" /> Вкл · заблокирован
    </label>
    <label style={item}>
      <Switch checked={false} disabled aria-label="Выключено, заблокировано" /> Выкл · заблокирован
    </label>
  </div>
);
