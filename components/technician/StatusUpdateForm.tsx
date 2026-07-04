"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useOfflineSync } from "@/hooks/useOfflineSync";
import { CheckCircle } from "lucide-react";

interface StatusUpdateFormProps {
  orderId: string;
  currentStatus: string;
  onStatusUpdate?: (newStatus: string) => void;
}

const STATUS_OPTIONS = [
  { value: "Menunggu Teknisi", label: "Menunggu Teknisi", next: "Menuju Lokasi" },
  { value: "Menuju Lokasi", label: "Menuju Lokasi", next: "Sedang Diperbaiki" },
  { value: "Sedang Diperbaiki", label: "Sedang Diperbaiki", next: "Menunggu Persetujuan" },
  { value: "Menunggu Persetujuan", label: "Menunggu Persetujuan", next: "Selesai" },
  { value: "Selesai", label: "Selesai", next: null },
];

export function StatusUpdateForm({ orderId, currentStatus, onStatusUpdate }: StatusUpdateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOnline, saveOfflineAction } = useOfflineSync();

  const currentOption = STATUS_OPTIONS.find((s) => s.value === currentStatus);
  const nextStatus = currentOption?.next;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nextStatus) return;

    setIsSubmitting(true);

    try {
      if (!isOnline) {
        saveOfflineAction({
          type: "status_update",
          orderId,
          newStatus: nextStatus,
        });
        onStatusUpdate?.(nextStatus);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      onStatusUpdate?.(nextStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!nextStatus) {
    return (
      <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
        <div className="flex items-center gap-2 text-emerald-700">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Servis selesai</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground mb-2">Update status ke:</p>
        <p className="font-medium text-foreground">{nextStatus}</p>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Menyimpan..." : "Simpan Status"}
      </Button>

      {!isOnline && (
        <p className="text-xs text-amber-600 text-center">
          Anda offline. Perubahan akan disimpan secara lokal dan disinkronkan saat koneksi pulih.
        </p>
      )}
    </form>
  );
}
