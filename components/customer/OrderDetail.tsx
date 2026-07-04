// components/customer/OrderDetail.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StatusBadge, type StatusType } from "@/components/customer";
import { Calendar, MapPin, Clock, X, CheckCircle, Wrench, Truck, Package } from "lucide-react";

export interface OrderDetailProps {
  orderId: string;
  status: StatusType;
  techName?: string;
  techPhoto?: string;
  bookingType: "pickup" | "home";
  deviceName: string;
  damageDescription: string;
  address: string;
  scheduledDate: Date;
  totalAmount: number;
  services?: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  paymentDeadline?: Date;
  onCancel?: () => void;
  showCancelButton?: boolean;
  className?: string;
}

const statusFlow = [
  { key: "pending", label: "Menunggu Pembayaran", icon: Clock },
  { key: "confirmed", label: "Dikonfirmasi", icon: CheckCircle },
  { key: "pickup", label: "Penjemputan", icon: Truck },
  { key: "repair", label: "Sedang Diperbaiki", icon: Wrench },
  { key: "completed", label: "Selesai", icon: CheckCircle },
];

export function OrderDetail({
  orderId,
  status,
  techName,
  techPhoto,
  bookingType,
  deviceName,
  damageDescription,
  address,
  scheduledDate,
  totalAmount,
  services = [],
  paymentDeadline,
  onCancel,
  showCancelButton = true,
  className,
}: OrderDetailProps) {
  const formatDate = (date: Date) =>
    date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  const formatTime = (date: Date) =>
    date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  const statusIndex = statusFlow.findIndex((s) => s.key === status);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Order ID</p>
          <p className="font-mono font-semibold">{orderId}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Tracking Timeline */}
      <div className="space-y-3">
        <h3 className="font-semibold">Tracking Pesanan</h3>
        <div className="grid grid-cols-5 gap-2">
          {statusFlow.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= statusIndex;

            return (
              <div key={step.key} className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold",
                    isCompleted
                      ? "border-indigo-500 bg-indigo-500 text-white"
                      : "border-slate-300 bg-slate-100 text-slate-400"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <p
                  className={cn(
                    "mt-1.5 text-[10px] font-medium text-center leading-tight",
                    isCompleted ? "text-slate-800 dark:text-white" : "text-slate-400"
                  )}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technician Info */}
      {techName && (
        <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
          {techPhoto ? (
            <img src={techPhoto} alt={techName} className="h-10 w-10 rounded-full object-cover" />
          ) : (
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <Wrench className="h-5 w-5 text-indigo-500" />
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-slate-800 dark:text-white">{techName}</p>
            <p className="text-xs text-slate-500">Teknisi</p>
          </div>
        </div>
      )}

      {/* Services */}
      {services.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold">Layanan Dipilih</h3>
          <div className="rounded-lg border bg-card p-4 space-y-2">
            {services.map((service) => (
              <div key={service.id} className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-300">{service.name}</span>
                <span className="font-medium">Rp {service.price.toLocaleString("id-ID")}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Device Info */}
      <div className="space-y-2">
        <h3 className="font-semibold">Informasi Perangkat</h3>
        <div className="rounded-lg border bg-card p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Perangkat</span>
            <span className="font-medium">{deviceName}</span>
          </div>
          <div>
            <span className="text-muted-foreground text-sm">Deskripsi:</span>
            <p className="text-sm mt-1">{damageDescription}</p>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="space-y-2">
        <h3 className="font-semibold">
          {bookingType === "pickup" ? "Jadwal Penjemputan" : "Jadwal Kunjungan"}
        </h3>
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">{formatDate(scheduledDate)}</p>
              <p className="text-sm text-muted-foreground">{formatTime(scheduledDate)}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-sm">{address}</p>
          </div>
        </div>
      </div>

      {/* Payment Deadline */}
      {paymentDeadline && status === "pending" && (
        <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 dark:bg-blue-950 dark:border-blue-800">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Batas Pembayaran: {formatDate(paymentDeadline)} {formatTime(paymentDeadline)}
            </p>
          </div>
        </div>
      )}

      {/* Total */}
      <div className="rounded-lg border bg-muted/30 p-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total Pembayaran</span>
          <span className="text-xl font-bold">Rp {totalAmount.toLocaleString("id-ID")}</span>
        </div>
      </div>

      {/* Cancel Button */}
      {showCancelButton &&
        status !== "completed" &&
        status !== "cancelled" &&
        onCancel && (
          <Button
            variant="outline"
            className="w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={onCancel}
          >
            <X className="h-4 w-4" />
            Batalkan Pesanan
          </Button>
        )}
    </div>
  );
}
