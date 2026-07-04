"use client";

import { OrderCard } from "./OrderCard";

interface Order {
  id: string;
  customerName: string;
  serviceType: string;
  device: string;
  address: string;
  scheduledAt: string;
  status: string;
}

interface KanbanBoardProps {
  orders: Order[];
  selectedStatus: string;
}

const KANBAN_COLUMNS = [
  { key: "Menunggu Teknisi", label: "Menunggu", color: "bg-amber-500" },
  { key: "Menuju Lokasi", label: "Menuju", color: "bg-blue-500" },
  { key: "Sedang Diperbaiki", label: "Diperbaiki", color: "bg-violet-500" },
  { key: "Menunggu Persetujuan", label: "Menunggu", color: "bg-orange-500" },
  { key: "Selesai", label: "Selesai", color: "bg-emerald-500" },
];

export function KanbanBoard({ orders, selectedStatus }: KanbanBoardProps) {
  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter((o) => o.status === selectedStatus);

  if (filteredOrders.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Tidak ada pesanan dengan status ini</p>
      </div>
    );
  }

  const groupedOrders = KANBAN_COLUMNS.reduce((acc, col) => {
    acc[col.key] = filteredOrders.filter((o) => o.status === col.key);
    return acc;
  }, {} as Record<string, Order[]>);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
      {KANBAN_COLUMNS.map((column) => {
        const columnOrders = groupedOrders[column.key] || [];
        if (selectedStatus !== "all" && column.key !== selectedStatus) {
          return null;
        }
        return (
          <div key={column.key} className="flex-shrink-0 w-72">
            <div className="sticky top-0 z-10 bg-background pb-2">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${column.color}`} />
                <h3 className="font-medium text-sm">{column.label}</h3>
                <span className="ml-auto text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                  {columnOrders.length}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {columnOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
