// components/customer/FormTextarea.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  showCharCount?: boolean;
  maxLength?: number;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, hint, showCharCount = false, maxLength, className, id, value, required, ...props }, ref) => {
    const textareaId = id ?? React.useId();
    const charCount = typeof value === "string" ? value.length : 0;

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-foreground">
            {label}
            {required && <span className="text-destructive ml-0.5">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          value={value}
          maxLength={maxLength}
          className={cn(
            "flex min-h-[100px] w-full rounded-md border bg-background px-3 py-2 text-sm",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "resize-y",
            error && "border-destructive focus-visible:ring-destructive/20",
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        <div className="flex justify-between items-center">
          <div>
            {error && <p className="flex items-center gap-1 text-sm text-destructive"><AlertCircle className="h-3.5 w-3.5" />{error}</p>}
            {hint && !error && <p className="text-sm text-muted-foreground">{hint}</p>}
          </div>
          {showCharCount && maxLength && (
            <p className={cn("text-xs text-muted-foreground", charCount > maxLength * 0.9 && "text-yellow-600", charCount >= maxLength && "text-destructive")}>
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);
FormTextarea.displayName = "FormTextarea";
