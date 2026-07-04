// app/customer/orders/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, Package, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderCard, OrderDetail } from "@/components/customer";
import { useOrder } from "@/app/context/OrderContext";
import { OrderItem } from "@/app/context/OrderContext";

type FilterTab = "all" | "active" | "completed";

const filterTabs: { value: FilterTab; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "active", label: "Aktif" },
  { value: "completed", label: "Selesai" },
];

export default function OrdersPage() {
  const router = useRouter();
  const { orders, cancelOrder } = useOrder();
  const [filter, setFilter] = useState<FilterTab>("all");
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  const filteredOrders = orders.filter((order) => {
    if (filter === "active") {
      return order.status === "pending" || order.status === "confirmed";
    }
    if (filter === "completed") {
      return order.status === "completed" || order.status === "cancelled";
    }
    return true;
  });

  const handleCancel = () => {
    if (selectedOrder) {
      cancelOrder(selectedOrder.id);
      setSelectedOrder(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.push("/customer")} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-indigo-500" />
              <h1 className="text-lg font-bold text-slate-800 dark:text-white">Pesanan Saya</h1>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-4 sm:px-6 pb-3">
          <div className="flex gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  filter === tab.value
                    ? "bg-indigo-500 text-white shadow-md"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6">
        {selectedOrder ? (
          <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Detail Pesanan</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <OrderDetail
              orderId={selectedOrder.id}
              status={selectedOrder.status}
              techName={selectedOrder.techName}
              techPhoto={selectedOrder.techPhoto}
              bookingType={selectedOrder.bookingType}
              deviceName={selectedOrder.deviceName}
              damageDescription={selectedOrder.damageDescription}
              address={selectedOrder.address}
              scheduledDate={new Date(selectedOrder.scheduledDate)}
              totalAmount={selectedOrder.totalAmount}
              services={selectedOrder.services}
              onCancel={handleCancel}
              showCancelButton={selectedOrder.status === "pending" || selectedOrder.status === "confirmed"}
            />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <ShoppingBag className="h-8 w-8 text-slate-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Belum Ada Pesanan</h2>
            <p className="mt-2 text-sm text-slate-500">
              Pesanan Anda akan muncul di sini setelah Anda menyelesaikan checkout
            </p>
            <Button
              onClick={() => router.push("/customer/store")}
              className="mt-6 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-lg"
            >
              Hire Teknisi
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} onClick={() => setSelectedOrder(order)} className="cursor-pointer">
                <OrderCard order={{ ...order, scheduledDate: new Date(order.scheduledDate) }} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
