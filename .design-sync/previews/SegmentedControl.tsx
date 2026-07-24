// Per-icon subpaths, never the barrel (see Button.tsx — the 5132-module barrel hangs preview compile).
import { GridBold16 } from "@frosted-ui/icons/GridBold16";
import { ListBulletBold16 } from "@frosted-ui/icons/ListBulletBold16";
import { SegmentedControl } from "frontend";

const noop = () => {};

const axis: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: "#9ca3af",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
};

const FILTERS = [
  { value: "all", label: "Все" },
  { value: "mine", label: "Мои" },
  { value: "new", label: "Новые" },
];

// Size ladder — s (компактный) и m (стандарт).
export const Sizes = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={axis}>s · компактный</span>
      <SegmentedControl size="s" value="all" onChange={noop} options={FILTERS} />
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={axis}>m · стандарт</span>
      <SegmentedControl size="m" value="all" onChange={noop} options={FILTERS} />
    </div>
  </div>
);

// С иконками — переключатель вида (сетка / список).
export const WithIcons = () => (
  <SegmentedControl
    size="m"
    value="grid"
    onChange={noop}
    options={[
      { value: "grid", label: "Сетка", icon: GridBold16 },
      { value: "list", label: "Список", icon: ListBulletBold16 },
    ]}
  />
);

// Бинарный выбор — две опции.
export const TwoOptions = () => (
  <SegmentedControl
    size="m"
    value="month"
    onChange={noop}
    options={[
      { value: "month", label: "Месяц" },
      { value: "year", label: "Год" },
    ]}
  />
);
