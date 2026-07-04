"use client";

import { LucideIcon, AlertCircle, Inbox, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: "empty" | "error" | "timeout";
}

const variantConfig = {
  empty: {
    icon: Inbox,
    iconClass: "text-muted-foreground",
    bgClass: "bg-muted/50",
  },
  error: {
    icon: AlertCircle,
    iconClass: "text-red-500",
    bgClass: "bg-red-50",
  },
  timeout: {
    icon: RefreshCw,
    iconClass: "text-amber-500",
    bgClass: "bg-amber-50",
  },
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  variant = "empty",
}: EmptyStateProps) {
  const config = variantConfig[variant];
  const Icon = icon || config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className={`flex h-16 w-16 items-center justify-center rounded-full ${config.bgClass}`}>
        <Icon className={`h-8 w-8 ${config.iconClass}`} />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground text-center">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick} variant="outline" size="sm" className="mt-4">
          {action.label}
        </Button>
      )}
    </div>
  );
}
