// components/customer/SnackbarNotification.tsx
"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SnackbarProps {
  message: string;
  type?: "info" | "success" | "warning" | "error";
  duration?: number;
  action?: { label: string; onClick: () => void };
  onClose: () => void;
  className?: string;
}

export function Snackbar({ message, type = "info", duration = 5000, action, onClose, className }: SnackbarProps) {
  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const typeStyles = {
    info: "bg-muted text-foreground border-border",
    success: "bg-green-50 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-800",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-800",
    error: "bg-red-50 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-800",
  };

  return (
    <div className={cn("fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg animate-in slide-in-from-bottom-4 fade-in duration-300", typeStyles[type], className)} role="alert">
      <span className="text-sm font-medium">{message}</span>
      {action && <button onClick={action.onClick} className="text-sm font-semibold underline-offset-4 hover:underline">{action.label}</button>}
      <button onClick={onClose} className="ml-2 p-1 rounded-md opacity-70 hover:opacity-100" aria-label="Close"><X className="h-4 w-4" /></button>
    </div>
  );
}

interface SnackbarContextType {
  showSnackbar: (props: Omit<SnackbarProps, "onClose">) => void;
  hideSnackbar: () => void;
}

const SnackbarContext = React.createContext<SnackbarContextType | null>(null);

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snackbar, setSnackbar] = React.useState<SnackbarProps | null>(null);
  const showSnackbar = React.useCallback((props: Omit<SnackbarProps, "onClose">) => {
    setSnackbar({ ...props, onClose: () => setSnackbar(null) });
  }, []);
  const hideSnackbar = React.useCallback(() => setSnackbar(null), []);
  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      {snackbar && <Snackbar {...snackbar} onClose={() => setSnackbar(null)} />}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = React.useContext(SnackbarContext);
  if (!context) throw new Error("useSnackbar must be used within SnackbarProvider");
  return context;
}
