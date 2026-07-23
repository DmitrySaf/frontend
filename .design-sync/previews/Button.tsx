import { Button } from "frontend";
import { ArrowRight, Plus, Trash2 } from "lucide-react";

const row: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" };

export const Themes = () => (
  <div style={row}>
    <Button theme="primary" size="lg">Основное</Button>
    <Button theme="secondary" size="lg">Вторичное</Button>
    <Button theme="outline" size="lg">Контур</Button>
    <Button theme="ghost" size="lg">Призрак</Button>
  </div>
);

export const Sizes = () => (
  <div style={row}>
    <Button theme="primary" size="sm">sm</Button>
    <Button theme="primary" size="md">md</Button>
    <Button theme="primary" size="lg">lg</Button>
    <Button theme="primary" size="xl">xl</Button>
  </div>
);

export const WithIcons = () => (
  <div style={row}>
    <Button theme="secondary" size="lg" Icon={Plus}>Создать</Button>
    <Button theme="secondary" size="lg" IconRight={ArrowRight}>Следующий урок</Button>
    <Button theme="ghost" size="lg" Icon={Plus} aria-label="Добавить" />
  </div>
);

export const States = () => (
  <div style={row}>
    <Button theme="primary" size="lg">Обычная</Button>
    <Button theme="primary" size="lg" isLoading>Загрузка</Button>
    <Button theme="primary" size="lg" isDisabled>Выключена</Button>
  </div>
);

export const Destructive = () => (
  <div style={row}>
    <Button theme="destructive" size="lg" Icon={Trash2}>Удалить</Button>
    <Button theme="destructiveTonal" size="lg">Удалить</Button>
    <Button theme="destructiveGhost" size="lg">Удалить</Button>
  </div>
);
