// components/customer/PaymentCountdown.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Clock, AlertTriangle } from "lucide-react";
import { useCountdownTimer, formatCountdown } from "@/hooks/useCountdownTimer";
import { Button } from "@/components/ui/button";

export interface PaymentCountdownProps {
  initialSeconds?: number;
  onExpire?: () => void;
  onCancel?: () => void;
  className?: string;
}

const DEFAULT_SECONDS = 15 * 60;

export function PaymentCountdown({ initialSeconds = DEFAULT_SECONDS, onExpire, onCancel, className }: PaymentCountdownProps) {
  const { seconds, isExpired, start } = useCountdownTimer({ initialSeconds, onComplete: onExpire, autoStart: true });

  const isUrgent = seconds <= 300;
  const isCritical = seconds <= 60;

  return (
    <div className={cn(
      "rounded-lg border p-4",
      isExpired && "border-destructive bg-destructive/5",
      isCritical && !isExpired && "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30",
      isUrgent && !isCritical && !isExpired && "border-orange-500 bg-orange-50 dark:bg-orange-950/30",
      !isUrgent && !isExpired && "border-muted bg-muted/30",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isExpired ? <AlertTriangle className="h-6 w-6 text-destructive" /> : <Clock className={cn("h-6 w-6", isCritical && "text-yellow-600 dark:text-yellow-400", isUrgent && !isCritical && "text-orange-600 dark:text-orange-400", !isUrgent && "text-muted-foreground")} />}
          <div>
            <p className={cn("font-medium", isExpired && "text-destructive", isCritical && !isExpired && "text-yellow-700 dark:text-yellow-300", isUrgent && !isCritical && !isExpired && "text-orange-700 dark:text-orange-300")}>
              {isExpired ? "Waktu pembayaran habis" : "Waktu pembayaran tersisa"}
            </p>
            {!isExpired && <p className={cn("text-2xl font-bold tabular-nums", isCritical && "text-yellow-600 dark:text-yellow-400", isUrgent && !isCritical && "text-orange-600 dark:text-orange-400", !isUrgent && "text-foreground")}>{formatCountdown(seconds)}</p>}
          </div>
        </div>
        {onCancel && !isExpired && <Button variant="outline" size="sm" onClick={onCancel}>Batalkan</Button>}
      </div>
      {isExpired && <p className="mt-2 text-sm text-destructive">Pesanan Anda telah dibatalkan. Silakan buat pesanan baru.</p>}
    </div>
  );
}
