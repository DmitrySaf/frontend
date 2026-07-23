import { Separator } from "frontend";

export const Horizontal = () => (
  <div style={{ maxWidth: 320 }}>
    <div style={{ fontSize: 14, color: "#374151", paddingBottom: 12 }}>Профиль</div>
    <Separator />
    <div style={{ fontSize: 14, color: "#374151", padding: "12px 0" }}>Уведомления</div>
    <Separator />
    <div style={{ fontSize: 14, color: "#374151", paddingTop: 12 }}>Безопасность</div>
  </div>
);
