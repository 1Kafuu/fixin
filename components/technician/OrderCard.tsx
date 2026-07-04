"use client";

import Link from "next/link";
import { MapPin, Clock, ChevronRight, User } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";

interface OrderCardProps {
  order: {
    id: string;
    customerName: string;
    serviceType: string;
    device: string;
    address: string;
    scheduledAt: string;
    status: string;
  };
}

export function OrderCard({ order }: OrderCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Link
      href={`/technician/order/${order.id}`}
      className="block rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status={order.status} />
          </div>
          <h3 className="font-medium text-foreground truncate">{order.serviceType}</h3>
          <p className="text-sm text-muted-foreground truncate">{order.device}</p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4 shrink-0" />
          <span className="truncate">{order.customerName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="truncate">{order.address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 shrink-0" />
          <span>{formatDate(order.scheduledAt)}</span>
        </div>
      </div>
    </Link>
  );
}
