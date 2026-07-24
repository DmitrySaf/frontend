// Per-icon subpath imports, NOT the barrel: `@frosted-ui/icons` re-exports 5132 modules and the
// preview compiler's resolve-policy plugin walks every one → multi-minute hang. Subpaths hit one
// file each (recorded in NOTES.md).
import { ArrowRightBold16 } from "@frosted-ui/icons/ArrowRightBold16";
import { CheckmarkBold16 } from "@frosted-ui/icons/CheckmarkBold16";
import { PlusBold16 } from "@frosted-ui/icons/PlusBold16";
import { Button } from "frontend";

/* Fluent-2-style variation matrix: sizes across the top (the 4-step control ladder
   32/36/40/48), metrics down the side (appearance / icons / states). Each cell is a real
   Button from the bundle. cardMode "column" (config) gives every matrix its own full-width row. */

type Size = "sm" | "md" | "lg" | "xl";
type Theme =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "destructiveTonal"
  | "destructiveGhost";

const SIZES: { key: Size; label: string }[] = [
  { key: "sm", label: "sm · 32" },
  { key: "md", label: "md · 36" },
  { key: "lg", label: "lg · 40" },
  { key: "xl", label: "xl · 48" },
];

const axis: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: "#9ca3af",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
};
const cellBox: React.CSSProperties = { display: "flex", alignItems: "center", minHeight: 48 };

function Matrix<R extends string, C extends string>({
  cols,
  rows,
  render,
}: {
  cols: { key: C; label: string }[];
  rows: { key: R; label: string }[];
  render: (row: R, col: C) => React.ReactNode;
}) {
  const items: React.ReactNode[] = [<div key="corner" />];
  for (const c of cols) {
    items.push(
      <div key={`h-${c.key}`} style={axis}>
        {c.label}
      </div>
    );
  }
  for (const r of rows) {
    items.push(
      <div key={`l-${r.key}`} style={axis}>
        {r.label}
      </div>
    );
    for (const c of cols) {
      items.push(
        <div key={`${r.key}-${c.key}`} style={cellBox}>
          {render(r.key, c.key)}
        </div>
      );
    }
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `minmax(150px,max-content) repeat(${cols.length}, minmax(0,1fr))`,
        gap: "14px 20px",
        alignItems: "center",
      }}
    >
      {items}
    </div>
  );
}

const THEMES: { key: Theme; label: string }[] = [
  { key: "primary", label: "Основная" },
  { key: "secondary", label: "Вторичная" },
  { key: "outline", label: "Контур" },
  { key: "ghost", label: "Призрак" },
  { key: "destructive", label: "Деструктив" },
  { key: "destructiveTonal", label: "Тональная опас." },
  { key: "destructiveGhost", label: "Призрак-опас." },
];

// Appearance × size — the primary matrix (7 тем × 4 ступени).
export const Appearance = () => (
  <Matrix
    cols={SIZES}
    rows={THEMES}
    render={(theme, size) => (
      <Button theme={theme} size={size}>
        Кнопка
      </Button>
    )}
  />
);

// Icon patterns × size.
const ICON_ROWS = [
  { key: "left", label: "Иконка слева" },
  { key: "right", label: "Иконка справа" },
  { key: "only", label: "Только иконка" },
  { key: "both", label: "Слева и справа" },
] as const;

export const WithIcons = () => (
  <Matrix
    cols={SIZES}
    rows={ICON_ROWS as unknown as { key: string; label: string }[]}
    render={(row, size) => {
      if (row === "left") {
        return (
          <Button theme="secondary" size={size} Icon={PlusBold16}>
            Создать
          </Button>
        );
      }
      if (row === "right") {
        return (
          <Button theme="secondary" size={size} IconRight={ArrowRightBold16}>
            Далее
          </Button>
        );
      }
      if (row === "only") {
        return <Button theme="secondary" size={size} Icon={PlusBold16} aria-label="Создать" />;
      }
      return (
        <Button theme="secondary" size={size} Icon={CheckmarkBold16} IconRight={ArrowRightBold16}>
          Готово
        </Button>
      );
    }}
  />
);

// States × appearance (loading holds width, disabled dims — оба блокируют клик).
const STATE_THEMES: { key: Theme; label: string }[] = [
  { key: "primary", label: "Основная" },
  { key: "secondary", label: "Вторичная" },
  { key: "outline", label: "Контур" },
  { key: "destructive", label: "Деструктив" },
];
const STATES = [
  { key: "default", label: "Обычная" },
  { key: "loading", label: "Загрузка" },
  { key: "disabled", label: "Выключена" },
] as const;

export const States = () => (
  <Matrix
    cols={STATE_THEMES}
    rows={STATES as unknown as { key: string; label: string }[]}
    render={(state, theme) => (
      <Button
        theme={theme}
        size="lg"
        isLoading={state === "loading"}
        isDisabled={state === "disabled"}
      >
        Действие
      </Button>
    )}
  />
);

// Shape — скругление ступени vs полная пилюля (с иконкой без текста → круг).
export const Shape = () => {
  const rowStyle: React.CSSProperties = { display: "flex", gap: 12, alignItems: "center" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={rowStyle}>
        <span style={{ ...axis, width: 90 }}>rounded</span>
        <Button theme="primary" size="lg" shape="rounded">
          Скруглённая
        </Button>
        <Button theme="primary" size="lg" shape="rounded" Icon={PlusBold16} aria-label="Добавить" />
      </div>
      <div style={rowStyle}>
        <span style={{ ...axis, width: 90 }}>pill</span>
        <Button theme="primary" size="lg" shape="pill">
          Пилюля
        </Button>
        <Button theme="primary" size="lg" shape="pill" Icon={PlusBold16} aria-label="Добавить" />
      </div>
    </div>
  );
};
