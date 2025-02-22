"use client";

import { Skeleton } from "@/components/ui/skeleton"; // adjust the import if needed

export default function DashboardLoading() {
  return (
    <div className="pt-20 px-8 md:pt-28 pb-10 space-y-6">
      {/* Dashboard header skeleton */}
      <div className="w-1/2 h-10">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Stats cards skeleton */}
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>

      {/* Performance chart card skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-6 w-1/2" />
        <div className="h-[300px]">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}
