// components/customer/OrderSummary.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface OrderSummaryItem {
  label: string;
  value: number | string;
  type?: "normal" | "highlight" | "discount";
}

export interface OrderSummaryProps {
  items: OrderSummaryItem[];
  total?: number;
  totalLabel?: string;
  className?: string;
}

export function OrderSummary({ items, total, totalLabel = "Total", className }: OrderSummaryProps) {
  return (
    <div className={cn("rounded-lg border bg-card", className)}>
      <div className="p-4 space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span className={cn(item.type === "highlight" && "font-medium", item.type === "discount" && "text-green-600 dark:text-green-400")}>{item.label}</span>
            <span className={cn(typeof item.value === "number" && "font-medium", item.type === "discount" && "text-green-600 dark:text-green-400")}>
              {typeof item.value === "number" ? `Rp ${item.value.toLocaleString("id-ID")}` : item.value}
            </span>
          </div>
        ))}
        {total !== undefined && (
          <>
            <div className="border-t pt-3 mt-3" />
            <div className="flex justify-between items-center">
              <span className="font-semibold">{totalLabel}</span>
              <span className="text-lg font-bold">Rp {total.toLocaleString("id-ID")}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
