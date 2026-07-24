import { Skeleton } from "frontend";

const axis: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: "#9ca3af",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
};
const col: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 8, alignItems: "center" };

// Primitive shapes — circle, line, block.
export const Shapes = () => (
  <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
    <div style={col}>
      <Skeleton circle width={48} height={48} />
      <span style={axis}>круг</span>
    </div>
    <div style={col}>
      <Skeleton width={120} height={14} />
      <span style={axis}>строка</span>
    </div>
    <div style={col}>
      <Skeleton width={120} height={72} radius={12} />
      <span style={axis}>блок</span>
    </div>
  </div>
);

// Composed — a loading list item (avatar + two lines).
export const ListItem = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, maxWidth: 340 }}>
    <Skeleton circle width={48} height={48} />
    <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
      <Skeleton width="70%" height={14} />
      <Skeleton width="45%" height={12} />
    </div>
  </div>
);

// Composed — a loading card.
export const Card = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 300 }}>
    <Skeleton width="100%" height={140} radius={16} />
    <Skeleton width="80%" height={16} />
    <Skeleton width="55%" height={14} />
  </div>
);
