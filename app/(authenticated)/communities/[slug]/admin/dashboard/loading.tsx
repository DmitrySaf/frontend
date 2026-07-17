import { AdminShellSkeleton } from "@/pages/community-admin";
import { Skeleton } from "@/shared/components";

// Каркас админ-раздела (шапка AdminShell) + стат-карты и графики дашборда
export default function Loading() {
  return (
    <AdminShellSkeleton
      body={
        <div className="p-4 md:p-6 space-y-5 max-w-5xl">
          <div className="flex flex-col sm:flex-row gap-3.5">
            {["a", "b", "c"].map((id) => (
              <Skeleton key={id} height={116} radius={16} className="flex-1" />
            ))}
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <Skeleton height={280} radius={16} className="flex-[2]" />
            <Skeleton height={280} radius={16} className="flex-1" />
          </div>
        </div>
      }
    />
  );
}
