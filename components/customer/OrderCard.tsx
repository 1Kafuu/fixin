// components/customer/OrderCard.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { StatusBadge, type StatusType } from "@/components/customer";
import { Calendar, ChevronRight, Truck, Wrench } from "lucide-react";

export interface Order {
  id: string;
  status: StatusType;
  bookingType: "pickup" | "home";
  deviceName: string;
  address: string;
  scheduledDate: Date;
  totalAmount: number;
}

export interface OrderCardProps {
  order: Order;
  className?: string;
}

export function OrderCard({ order, className }: OrderCardProps) {
  const { id, status, bookingType, deviceName, address, scheduledDate, totalAmount } = order;
  const formatDate = (date: Date) => date.toLocaleDateString("id-ID", { month: "short", day: "numeric", year: "numeric" });
  const Icon = bookingType === "pickup" ? Truck : Wrench;

  return (
    <Link href={`/customer/orders/${id}`}>
      <div className={cn("rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50", className)}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm">{id}</span>
                <StatusBadge status={status} size="sm" />
              </div>
              <p className="font-medium truncate">{deviceName}</p>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(scheduledDate)}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-semibold">Rp {totalAmount.toLocaleString("id-ID")}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </Link>
  );
}
