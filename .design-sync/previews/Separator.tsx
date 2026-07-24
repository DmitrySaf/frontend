import { Separator } from "frontend";

const rowText: React.CSSProperties = { fontSize: 14, color: "#374151" };

// Горизонтальный — разделяет строки списка/секции.
export const Horizontal = () => (
  <div style={{ maxWidth: 320 }}>
    <div style={{ ...rowText, paddingBottom: 12 }}>Профиль</div>
    <Separator />
    <div style={{ ...rowText, padding: "12px 0" }}>Уведомления</div>
    <Separator />
    <div style={{ ...rowText, paddingTop: 12 }}>Безопасность</div>
  </div>
);

// Вертикальный — разделяет инлайновые элементы (нужен родитель с высотой).
export const Vertical = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, height: 24 }}>
    <span style={rowText}>Профиль</span>
    <Separator orientation="vertical" />
    <span style={rowText}>Настройки</span>
    <Separator orientation="vertical" />
    <span style={rowText}>Выход</span>
  </div>
);
