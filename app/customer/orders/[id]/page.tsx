"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderDetail } from "@/components/customer";
import { useOrder } from "@/app/context/OrderContext";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getOrderById, cancelOrder } = useOrder();

  const orderId = params.id as string;
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 dark:text-slate-400">Pesanan tidak ditemukan</p>
          <Button
            onClick={() => router.push("/customer/orders")}
            className="mt-4 h-10 rounded-xl bg-indigo-500"
          >
            Kembali ke Pesanan
          </Button>
        </div>
      </div>
    );
  }

  const handleCancel = () => {
    cancelOrder(orderId);
    router.push("/customer/orders");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex h-14 items-center px-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/customer/orders")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="ml-2 text-lg font-bold text-slate-800 dark:text-white">Detail Pesanan</h1>
        </div>
      </header>

      <main className="p-4 sm:p-6">
        <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-sm">
          <OrderDetail
            orderId={order.id}
            status={order.status}
            techName={order.techName}
            techPhoto={order.techPhoto}
            bookingType={order.bookingType}
            deviceName={order.deviceName}
            damageDescription={order.damageDescription}
            address={order.address}
            scheduledDate={new Date(order.scheduledDate)}
            totalAmount={order.totalAmount}
            services={order.services}
            onCancel={handleCancel}
            showCancelButton={order.status === "pending" || order.status === "confirmed"}
          />
        </div>
      </main>
    </div>
  );
}
