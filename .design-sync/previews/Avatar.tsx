import { Avatar } from "frontend";

const axis: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: "#9ca3af",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
};
const cell: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center" };

// shape (circle = люди, square = сообщества) × size (s/m/l). Initials fallback from `name`.
export const SizesShapes = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "minmax(84px,auto) repeat(3,1fr)",
      gap: "20px 24px",
      alignItems: "center",
      maxWidth: 340,
    }}
  >
    <div />
    <div style={{ ...axis, textAlign: "center" }}>s</div>
    <div style={{ ...axis, textAlign: "center" }}>m</div>
    <div style={{ ...axis, textAlign: "center" }}>l</div>

    <div style={axis}>Круг · люди</div>
    <div style={cell}>
      <Avatar name="Анна Петрова" size="s" shape="circle" />
    </div>
    <div style={cell}>
      <Avatar name="Борис" size="m" shape="circle" />
    </div>
    <div style={cell}>
      <Avatar name="Кирилл" size="l" shape="circle" />
    </div>

    <div style={axis}>Квадрат · сообщества</div>
    <div style={cell}>
      <Avatar name="Пиксель" size="s" shape="square" />
    </div>
    <div style={cell}>
      <Avatar name="Дизайн" size="m" shape="square" />
    </div>
    <div style={cell}>
      <Avatar name="Музыка" size="l" shape="square" />
    </div>
  </div>
);

/* Self-contained data-URI images (NO network — external image hosts stall the headless
   render check on networkidle; recorded in NOTES.md). Third cell has src={null} → the
   initials fallback. */
const IMG_PERSON =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'><rect width='96' height='96' fill='%23a78bfa'/><circle cx='48' cy='38' r='17' fill='%23ffffff' opacity='0.92'/><rect x='18' y='60' width='60' height='34' rx='17' fill='%23ffffff' opacity='0.92'/></svg>";
const IMG_COMMUNITY =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'><rect width='96' height='96' fill='%2310b981'/><circle cx='64' cy='30' r='9' fill='%23ffffff' opacity='0.92'/><path d='M20 74 L42 46 L58 66 L70 52 L82 74 Z' fill='%23ffffff' opacity='0.92'/></svg>";

// С изображением — и фолбэк на инициалы, когда картинки нет.
export const WithImage = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
    <Avatar name="Фото" size="l" shape="circle" src={IMG_PERSON} />
    <Avatar name="Сообщество" size="l" shape="square" src={IMG_COMMUNITY} />
    <Avatar name="Нет Картинки" size="l" shape="circle" src={null} />
  </div>
);
