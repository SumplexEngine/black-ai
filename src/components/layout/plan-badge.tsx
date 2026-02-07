"use client";

import { useAuth } from "@/hooks/use-auth";
import { useUserStats } from "@/hooks/use-user";
import { cn } from "@/lib/utils";

export function PlanBadge() {
  const { user } = useAuth();
  const { stats, isLoading } = useUserStats(user?.id ?? null);

  if (isLoading || !stats) {
    return <div className="h-4 w-20 animate-pulse rounded bg-white/10" />;
  }

  const planName = stats.planName || "Free";

  // Colores según el plan
  const planColors = {
    Free: "text-gray-400",
    Pro: "text-blue-400",
    Enterprise: "text-yellow-400",
  };

  const colorClass =
    planColors[planName as keyof typeof planColors] || "text-gray-400";

  return (
    <div className="flex items-center gap-1 text-xs">
      <span className="text-gray-500">Plan:</span>
      <span className={cn("font-medium uppercase", colorClass)}>
        {planName}
      </span>
    </div>
  );
}
