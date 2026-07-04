"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  Monitor,
  User,
  MessageSquare,
  CheckCircle,
  ChevronRight,
  Navigation,
  TrendingUp,
} from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { StatusUpdateForm } from "@/components/technician/StatusUpdateForm";
import { OfflineToast, useOfflineToast } from "@/components/technician/OfflineToast";
import { PageLoading } from "@/components/ui/loading";
import { cn } from "@/lib/utils";

const MOCK_ORDER = {
  id: "1",
  customerName: "Budi Santoso",
  customerPhone: "081234567890",
  serviceType: "Perbaikan Laptop",
  device: "HP Pavilion 15",
  deviceProblem: "Laptop tidak bisa menyala, kemungkinan power supply bermasalah",
  address: "Jl. Merdeka No. 10, RT 01/RW 05, Kel. Menteng, Kec. Jakarta Pusat",
  scheduledAt: "2025-01-15T09:00:00",
  status: "Menunggu Teknisi",
  estimatedPrice: 500000,
  notes: "Pelanggan prefer layanan cepat",
};

const STATUS_STEPS = [
  { key: "Menunggu Teknisi", label: "Menunggu" },
  { key: "Menuju Lokasi", label: "Menuju" },
  { key: "Sedang Diperbaiki", label: "Diperbaiki" },
  { key: "Menunggu Persetujuan", label: "Approval" },
  { key: "Selesai", label: "Selesai" },
];

export default function OrderDetailPage() {
  const params = useParams();
  const [order, setOrder] = useState(MOCK_ORDER);
  const [isLoading, setIsLoading] = useState(false);
  const { toast, showToast, hideToast } = useOfflineToast();

  useEffect(() => {
    setOrder({ ...MOCK_ORDER, id: params.id as string });
  }, [params.id]);

  const handleStatusUpdate = (newStatus: string) => {
    setOrder((prev) => ({ ...prev, status: newStatus }));
    showToast("Status berhasil diperbarui", "success");
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getCurrentStepIndex = () => {
    return STATUS_STEPS.findIndex((s) => s.key === order.status);
  };

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Back Button & Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/technician/order"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold">Detail Pesanan</h1>
          <p className="text-sm text-muted-foreground">ID: #{order.id}</p>
        </div>
      </div>

      {/* Progress Card */}
      <div className="mb-6 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <StatusBadge status={order.status} />
          <span className="text-sm text-muted-foreground">
            Step {getCurrentStepIndex() + 1} of {STATUS_STEPS.length}
          </span>
        </div>
        
        {/* Progress Steps */}
        <div className="relative">
          <div className="absolute top-3 left-0 right-0 h-0.5 bg-muted" />
          <div 
            className="absolute top-3 left-0 h-0.5 bg-blue-500 transition-all"
            style={{ width: `${(getCurrentStepIndex() / (STATUS_STEPS.length - 1)) * 100}%` }}
          />
          <div className="relative flex justify-between">
            {STATUS_STEPS.map((step, index) => {
              const isCompleted = index < getCurrentStepIndex();
              const isCurrent = index === getCurrentStepIndex();
              return (
                <div key={step.key} className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center z-10 transition-colors",
                      isCompleted || isCurrent ? "bg-blue-500 text-white" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </div>
                  <span className={cn(
                    "text-xs mt-1",
                    isCurrent ? "text-blue-500 font-medium" : "text-muted-foreground"
                  )}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status Update Form */}
      <div className="mb-6">
        <StatusUpdateForm
          orderId={order.id}
          currentStatus={order.status}
          onStatusUpdate={handleStatusUpdate}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(order.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card p-4 hover:bg-muted transition-colors"
        >
          <Navigation className="h-5 w-5 text-blue-500" />
          <span className="text-sm font-medium">Navigasi</span>
        </a>
        <Link
          href={`/technician/chat/${order.id}`}
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card p-4 hover:bg-muted transition-colors"
        >
          <MessageSquare className="h-5 w-5 text-blue-500" />
          <span className="text-sm font-medium">Chat</span>
        </Link>
      </div>

      {/* Customer Info Card */}
      <div className="mb-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Informasi Pelanggan</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <User className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{order.customerName}</p>
            </div>
          </div>
          <a
            href={`tel:${order.customerPhone}`}
            className="flex items-center gap-3 text-muted-foreground hover:text-blue-500 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>{order.customerPhone}</span>
          </a>
        </div>
      </div>

      {/* Service Details Card */}
      <div className="mb-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Detail Servis</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Monitor className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium text-foreground">{order.serviceType}</p>
              <p className="text-sm text-muted-foreground">{order.device}</p>
            </div>
          </div>
          
          <div className="border-t border-border pt-3">
            <p className="text-xs text-muted-foreground mb-1">Keluhan:</p>
            <p className="text-sm text-foreground">{order.deviceProblem}</p>
          </div>
          
          <div className="border-t border-border pt-3">
            <p className="text-xs text-muted-foreground mb-1">Estimasi Biaya:</p>
            <p className="text-lg font-semibold text-blue-500">{formatCurrency(order.estimatedPrice)}</p>
          </div>
          
          {order.notes && (
            <div className="border-t border-border pt-3">
              <p className="text-xs text-muted-foreground mb-1">Catatan:</p>
              <p className="text-sm text-foreground">{order.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Location Card */}
      <div className="mb-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Lokasi Servis</h3>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-foreground">{order.address}</p>
          </div>
        </div>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(order.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
        >
          <Navigation className="h-4 w-4" />
          Buka di Google Maps
        </a>
      </div>

      {/* Schedule Card */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Jadwal Servis</h3>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm text-foreground">{formatDate(order.scheduledAt)}</p>
        </div>
      </div>

      <OfflineToast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={hideToast}
      />
    </div>
  );
}
