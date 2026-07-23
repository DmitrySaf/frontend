import { LayoutGrid, List } from "lucide-react";
import { SegmentedControl } from "frontend";

const noop = () => {};

export const Tabs = () => (
  <SegmentedControl
    size="m"
    value="all"
    onChange={noop}
    options={[
      { value: "all", label: "Все" },
      { value: "mine", label: "Мои" },
      { value: "new", label: "Новые" },
    ]}
  />
);

export const WithIcons = () => (
  <SegmentedControl
    size="s"
    value="grid"
    onChange={noop}
    options={[
      { value: "grid", label: "Сетка", icon: LayoutGrid },
      { value: "list", label: "Список", icon: List },
    ]}
  />
);
