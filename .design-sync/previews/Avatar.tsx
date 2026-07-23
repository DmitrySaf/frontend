import { Avatar } from "frontend";

const row: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" };

export const People = () => (
  <div style={row}>
    <Avatar name="Анна Петрова" size="s" shape="circle" />
    <Avatar name="Борис" size="m" shape="circle" />
    <Avatar name="Кирилл" size="l" shape="circle" />
  </div>
);

export const Communities = () => (
  <div style={row}>
    <Avatar name="Пиксель" size="s" shape="square" />
    <Avatar name="Дизайн" size="m" shape="square" />
    <Avatar name="Музыка" size="l" shape="square" />
  </div>
);

export const WithImage = () => (
  <div style={row}>
    <Avatar name="Фото" size="l" shape="circle" src="https://i.pravatar.cc/96?img=12" />
    <Avatar name="Сообщество" size="l" shape="square" src="https://picsum.photos/seed/bean/96" />
  </div>
);
