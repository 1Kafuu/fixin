// components/customer/FormSelect.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, AlertCircle } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";

export interface FormSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormSelectProps {
  label?: string;
  error?: string;
  hint?: string;
  options: FormSelectOption[];
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
}

export function FormSelect({
  label, error, hint, options, placeholder = "Pilih...", value, onValueChange, disabled, required, id, className
}: FormSelectProps) {
  const selectId = id ?? React.useId();

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </label>
      )}
      <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectPrimitive.Trigger
          id={selectId}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive",
            className
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon><ChevronDown className="h-4 w-4 opacity-50" /></SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95" position="popper" sideOffset={4}>
            <SelectPrimitive.Viewport className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item key={option.value} value={option.value} disabled={option.disabled}
                  className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"><SelectPrimitive.ItemIndicator><span className="h-4 w-4">✓</span></SelectPrimitive.ItemIndicator></span>
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {error && <p className="flex items-center gap-1 text-sm text-destructive"><AlertCircle className="h-3.5 w-3.5" />{error}</p>}
      {hint && !error && <p className="text-sm text-muted-foreground">{hint}</p>}
    </div>
  );
}
