// components/customer/StatusBadge.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Wifi, WifiOff, Clock, Star, CheckCircle, AlertCircle } from "lucide-react";

export type StatusType = "online" | "offline" | "busy" | "away" | "pending" | "confirmed" | "cancelled" | "completed";

interface StatusBadgeProps {
  status: StatusType;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const statusConfig: Record<StatusType, { color: string; icon: React.ElementType; defaultLabel: string }> = {
  online: { color: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800", icon: Wifi, defaultLabel: "Online" },
  offline: { color: "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700", icon: WifiOff, defaultLabel: "Offline" },
  busy: { color: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800", icon: Clock, defaultLabel: "Sibuk" },
  away: { color: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800", icon: WifiOff, defaultLabel: "Away" },
  pending: { color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800", icon: Clock, defaultLabel: "Menunggu" },
  confirmed: { color: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800", icon: CheckCircle, defaultLabel: "Dikonfirmasi" },
  cancelled: { color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800", icon: AlertCircle, defaultLabel: "Dibatalkan" },
  completed: { color: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800", icon: CheckCircle, defaultLabel: "Selesai" },
};

const sizeStyles = { sm: "text-xs px-2 py-0.5 gap-1", md: "text-sm px-2.5 py-1 gap-1.5", lg: "text-base px-3 py-1.5 gap-2" };
const iconSizeConfig = { sm: "h-3 w-3", md: "h-3.5 w-3.5", lg: "h-4 w-4" };

export function StatusBadge({ status, showIcon = true, size = "md", label, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  return (
    <span className={cn("inline-flex items-center rounded-full border font-medium", config.color, sizeStyles[size], className)}>
      {showIcon && <Icon className={iconSizeConfig[size]} />}
      {label ?? config.defaultLabel}
    </span>
  );
}

interface RatingBadgeProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function RatingBadge({ rating, reviewCount, size = "md", className }: RatingBadgeProps) {
  const getColor = (r: number) => r >= 4 ? "text-yellow-600 dark:text-yellow-400" : r >= 3 ? "text-orange-500 dark:text-orange-400" : "text-gray-500 dark:text-gray-400";
  const starSizes = { sm: "h-3 w-3", md: "h-4 w-4", lg: "h-5 w-5" };
  const textSizes = { sm: "text-xs", md: "text-sm", lg: "text-base" };
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Star className={cn("fill-current", starSizes[size], getColor(rating))} />
      <span className={cn("font-semibold", textSizes[size], getColor(rating))}>{rating.toFixed(1)}</span>
      {reviewCount !== undefined && <span className={cn("text-muted-foreground", textSizes[size])}>({reviewCount})</span>}
    </div>
  );
}
