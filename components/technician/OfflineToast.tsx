"use client";

import { useEffect, useState } from "react";
import { WifiOff, CheckCircle, AlertCircle } from "lucide-react";

interface ToastProps {
  message: string;
  type: "offline" | "success" | "error";
  visible: boolean;
  onClose: () => void;
}

export function OfflineToast({ message, type, visible, onClose }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  const config = {
    offline: {
      bg: "bg-amber-50 border-amber-200",
      icon: WifiOff,
      iconColor: "text-amber-600",
    },
    success: {
      bg: "bg-emerald-50 border-emerald-200",
      icon: CheckCircle,
      iconColor: "text-emerald-600",
    },
    error: {
      bg: "bg-red-50 border-red-200",
      icon: AlertCircle,
      iconColor: "text-red-600",
    },
  };

  const { bg, icon: Icon, iconColor } = config[type];

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-in slide-in-from-bottom-4">
      <div className={`flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg ${bg}`}>
        <Icon className={`h-5 w-5 shrink-0 ${iconColor}`} />
        <p className="text-sm font-medium text-foreground flex-1">{message}</p>
      </div>
    </div>
  );
}

// Hook for managing toast state
export function useOfflineToast() {
  const [toast, setToast] = useState<{
    message: string;
    type: "offline" | "success" | "error";
    visible: boolean;
  }>({ message: "", type: "offline", visible: false });

  const showToast = (message: string, type: "offline" | "success" | "error" = "offline") => {
    setToast({ message, type, visible: true });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  return { toast, showToast, hideToast };
}
