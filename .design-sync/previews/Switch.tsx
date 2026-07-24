import { Switch } from "frontend";

const noop = () => {};

const axis: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: "#9ca3af",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
};
const cell: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center" };

// state (on/off) × interactivity (enabled/disabled) — the full 2×2.
export const States = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "minmax(96px,auto) 1fr 1fr",
      gap: "18px 28px",
      alignItems: "center",
      maxWidth: 300,
    }}
  >
    <div />
    <div style={{ ...axis, textAlign: "center" }}>Вкл</div>
    <div style={{ ...axis, textAlign: "center" }}>Выкл</div>

    <div style={axis}>Активен</div>
    <div style={cell}>
      <Switch checked onCheckedChange={noop} aria-label="включено" />
    </div>
    <div style={cell}>
      <Switch checked={false} onCheckedChange={noop} aria-label="выключено" />
    </div>

    <div style={axis}>Заблокир.</div>
    <div style={cell}>
      <Switch checked disabled aria-label="включено, заблокировано" />
    </div>
    <div style={cell}>
      <Switch checked={false} disabled aria-label="выключено, заблокировано" />
    </div>
  </div>
);

// Real-world usage — a settings row.
export const SettingRow = () => (
  <label
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      maxWidth: 320,
      fontSize: 14,
      color: "#374151",
    }}
  >
    <span>Уведомления о новых постах</span>
    <Switch checked onCheckedChange={noop} aria-label="Уведомления о новых постах" />
  </label>
);
