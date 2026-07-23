import { Skeleton } from "frontend";

export const ListItem = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, maxWidth: 340 }}>
    <Skeleton circle width={48} height={48} />
    <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
      <Skeleton width="70%" height={14} />
      <Skeleton width="45%" height={12} />
    </div>
  </div>
);

export const Card = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 300 }}>
    <Skeleton width="100%" height={140} radius={16} />
    <Skeleton width="80%" height={16} />
    <Skeleton width="55%" height={14} />
  </div>
);
